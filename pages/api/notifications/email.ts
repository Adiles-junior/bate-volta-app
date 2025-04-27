import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';
import nodemailer from 'nodemailer';

type CartItem = { id: string; name: string; price: number; quantity: number; options: { destination: string; type: string } };
type Order = { id: string; items: CartItem[]; total: number; paymentType: string; email: string; phone: string; date: string };

async function generatePdfBuffer(order: Order): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ autoFirstPage: false });
    const buffers: Buffer[] = [];
    doc.on('data', (chunk) => buffers.push(chunk));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    doc.addPage({ size: 'A4', margin: 50 });
    // Header gradient
    const width = doc.page.width;
    const gradient = doc.linearGradient(0, 0, width, 0)
      .stop(0, '#8b5cf6')
      .stop(0.5, '#f87171')
      .stop(1, '#ea580c');
    doc.save().rect(0, 0, width, 80).fill(gradient).restore();
    // Logo
    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    if (fs.existsSync(logoPath)) {
      doc.image(logoPath, 50, 20, { width: 100 });
    }
    // Title
    doc.fillColor('#ffffff').fontSize(20).text('Ingresso - Bate e Volta dos Amigos', 160, 35).fillColor('#000000');
    // Order info
    doc.fontSize(12)
      .text(`Pedido: ${order.id}`, 50, 100)
      .text(`Data: ${new Date(order.date).toLocaleString('pt-BR')}`, 50, 120)
      .text(`Pagamento: ${order.paymentType}`, 50, 140)
      .text(`Total: ${order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 50, 160);
    // Items
    doc.moveDown().fontSize(12).text('Itens:', { underline: true, margin: 50 });
    order.items.forEach((item, idx) => {
      doc.text(
        `${idx + 1}. ${item.name} (${item.options.destination}) x${item.quantity} - ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`
      );
    });
    // QR Code
    QRCode.toDataURL(`Pedido:${order.id}`).then((qrDataUrl) => {
      const qrImage = Buffer.from(qrDataUrl.split(',')[1], 'base64');
      doc.image(qrImage, width - 150, 100, { width: 100 });
      doc.end();
    }).catch(reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { orderId } = req.body as { orderId: string };
  const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
  const json = await fs.promises.readFile(ordersFile, 'utf-8');
  const orders: Order[] = JSON.parse(json || '[]');
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  const pdfBuffer = await generatePdfBuffer(order);
  // Configure SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: order.email,
    subject: `Seu ingresso - Pedido ${order.id}`,
    text: 'Segue em anexo seu ingresso da Bate e Volta dos Amigos.',
    attachments: [
      { filename: `ticket_${order.id}.pdf`, content: pdfBuffer }
    ],
  });
  return res.status(200).json({ success: true });
}
