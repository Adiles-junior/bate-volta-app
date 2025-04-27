import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchEvents, createEvent } from '../../../src/services/api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const events = await fetchEvents({});
    return res.status(200).json(events);
  }
  if (req.method === 'POST') {
    const event = await createEvent(req.body);
    return res.status(201).json(event);
  }
  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
