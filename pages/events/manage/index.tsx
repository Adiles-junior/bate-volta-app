import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEvents, Event } from '../../../src/services/api';

const ManageEvents: NextPage = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const loadEvents = () => {
    fetchEvents({}).then(setEvents).catch(console.error);
  };

  useEffect(() => {
    loadEvents();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir este evento?')) return;
    const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
    if (res.ok) loadEvents();
    else alert('Erro ao excluir evento');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gerenciar Eventos</h1>
      <Link href="/create-event" className="btn btn-primary mb-4">Novo Evento</Link>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Título</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Preço</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.id} className="border-t">
              <td className="px-4 py-2">{event.title}</td>
              <td className="px-4 py-2">{new Date(event.date).toLocaleDateString('pt-BR')}</td>
              <td className="px-4 py-2">{event.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td className="px-4 py-2 space-x-2">
                <Link href={`/events/manage/${event.id}`} className="btn btn-sm btn-secondary">Editar</Link>
                <button onClick={() => handleDelete(event.id)} className="btn btn-sm btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageEvents;
