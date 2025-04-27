import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

type CartItem = { id: string; name: string; price: number; quantity: number; options: { destination: string; type: string } };
type Order = { id: string; items: CartItem[]; total: number; paymentType: string; name: string; email: string; phone: string; date: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
  const { id } = req.query as { id: string };
  const ordersFile = path.join(process.cwd(), 'data', 'orders.json');
  const json = await fs.promises.readFile(ordersFile, 'utf-8');
  const orders: Order[] = JSON.parse(json || '[]');
  const order = orders.find(o => o.id === id);
  if (!order) {
    return res.status(404).json({ error: 'Pedido não encontrado' });
  }
  return res.status(200).json(order);
}
