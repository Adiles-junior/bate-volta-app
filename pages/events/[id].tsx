import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchEventById, Event } from '../../src/services/api';
import { useCart } from '../../src/context/CartContext';

const EventDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const { addItem } = useCart();

  useEffect(() => {
    if (typeof id === 'string') {
      fetchEventById(id).then(setEvent).catch(console.error);
    }
  }, [id]);

  if (!event) return <p>Carregando...</p>;

  const handleAdd = () => {
    addItem({
      id: event.id,
      name: event.title,
      price: event.price,
      quantity: 1,
      options: { destination: event.destination, type: event.type }
    });
    alert('Adicionado ao carrinho!');
  };

  return (
    <div className="container mx-auto p-4">
      <img src={event.image} alt={event.title} className="w-full h-64 object-cover mb-4" />
      <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
      <p className="mb-4">{event.description}</p>
      <button onClick={handleAdd} className="bg-green-500 text-white px-4 py-2 rounded">Adicionar ao Carrinho</button>
    </div>
  );
};

export default EventDetail;
