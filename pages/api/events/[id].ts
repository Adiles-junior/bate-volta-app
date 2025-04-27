import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchEventById, updateEvent, deleteEvent } from '../../../src/services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query as { id: string };
  if (req.method === 'GET') {
    const event = await fetchEventById(id);
    return res.status(200).json(event);
  }
  if (req.method === 'PUT') {
    const updated = await updateEvent(id, req.body);
    return res.status(200).json(updated);
  }
  if (req.method === 'DELETE') {
    await deleteEvent(id);
    return res.status(204).end();
  }
  res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
