import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

const ordersFile = path.join(process.cwd(), 'data', 'orders.json');

type CartItem = { id: string; name: string; price: number; quantity: number; };
type Order = { id: string; items: CartItem[]; total: number; paymentType: string; name: string; email: string; phone: string; date: string; };

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const json = await fs.promises.readFile(ordersFile, 'utf-8');
    const orders: Order[] = JSON.parse(json || '[]');
    return res.status(200).json(orders);
  }

  if (req.method === 'POST') {
    const { items, total, paymentType, name, email, phone } = req.body as { items: CartItem[]; total: number; paymentType: string; name: string; email: string; phone: string };
    const json = await fs.promises.readFile(ordersFile, 'utf-8');
    const orders: Order[] = JSON.parse(json || '[]');
    const newOrder: Order = {
      id: Date.now().toString(),
      items,
      total,
      paymentType,
      name,
      email,
      phone,
      date: new Date().toISOString(),
    };
    orders.push(newOrder);
    await fs.promises.writeFile(ordersFile, JSON.stringify(orders, null, 2));
    return res.status(201).json(newOrder);
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
