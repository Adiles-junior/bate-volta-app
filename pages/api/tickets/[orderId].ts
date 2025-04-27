import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';
import PDFDocument from 'pdfkit';
import QRCode from 'qrcode';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { orderId } = req.query as { orderId: string };
  const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
  const json = await fs.promises.readFile(ordersFile, 'utf-8');
  const orders = JSON.parse(json || '[]');
  const order = orders.find((o: any) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }

  res.setHeader('Content-Type', 'application/pdf');
  // Inline preview; download only on button click

  const doc = new PDFDocument({ autoFirstPage: false });
  doc.pipe(res);
  doc.addPage({ size: 'A4', margin: 50 });
  doc.font('Helvetica');

  const width = doc.page.width;
  const gradient = doc.linearGradient(0, 0, width, 0)
    .stop(0, '#8b5cf6')
    .stop(0.5, '#f87171')
    .stop(1, '#ea580c');
  doc.save();
  doc.rect(0, 0, width, 100).fill(gradient);
  doc.restore();

  const logoPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  if (fs.existsSync(logoPath)) {
    doc.image(logoPath, 50, 20, { fit: [150, 75] });
  }

  doc.font('Helvetica-Bold').fontSize(22).fillColor('#ffffff')
    .text('Ingresso - Bate e Volta dos Amigos', 160, 35)
    .fillColor('#000000');

  doc.font('Helvetica').fontSize(12)
    .text(`Pedido: ${order.id}`, 50, 140)
    .text(`Nome: ${order.name}`, 50, 160)
    .text(`Data: ${new Date(order.date).toLocaleString('pt-BR')}`, 50, 180)
    .text(`Pagamento: ${order.paymentType}`, 50, 200)
    .text(`Total: ${order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`, 50, 220);

  doc.font('Helvetica-Bold').fontSize(14).text('Itens:', 50, 260);
  order.items.forEach((item: any, idx: number) => {
    doc.font('Helvetica').fontSize(12).text(
      `${idx + 1}. ${item.name} (${item.options.destination}) x${item.quantity} - ${(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}`,
      50,
      280 + idx * 20
    );
  });

  const qrDataUrl = await QRCode.toDataURL(`Pedido:${order.id}`);
  const qrImage = Buffer.from(qrDataUrl.split(',')[1], 'base64');
  doc.image(qrImage, width - 150, 100, { width: 100 });

  doc.end();
}
