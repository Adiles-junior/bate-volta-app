import React from 'react';
import Link from 'next/link';
import { Event } from '../services/api';

interface Props { event: Event; }

const EventCard: React.FC<Props> = ({ event }) => (
  <Link href={`/events/${event.id}`} className="card">
    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h2 className="font-bold text-lg">
        {`${event.title} - ${new Date(event.date).toLocaleDateString('pt-BR')} - ${event.price.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}${['Alto do Moura','Patio de Eventos'].includes(event.title) ? ' (Lote 2)' : ''}`}
      </h2>
      <p className="text-gray-700">{event.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
    </div>
  </Link>
);

export default EventCard;
