import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchEventById, updateEvent, Event } from '../../../src/services/api';

const EditEvent: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    if (typeof id === 'string') {
      fetchEventById(id).then(e => {
        setEvent(e);
        setTitle(e.title);
        setDescription(e.description);
        setImage(e.image);
        setPrice(e.price.toString());
        setDestination(e.destination);
        setDate(e.date);
        setType(e.type);
      }).catch(console.error);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof id === 'string') {
      await updateEvent(id, { title, description, image, price: Number(price), destination, date, type });
      alert('Evento atualizado!');
      router.push('/events/manage');
    }
  };

  if (!event) return <p>Carregando...</p>;

  const cities = ['Caruaru', 'Campina Grande', 'Gravatá', 'Serra Negra', 'Carpina'];
  const typesList = ['Evento'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Editar Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input type="text" placeholder="Título" value={title} onChange={e => setTitle(e.target.value)} className="input w-full" required />
        <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} className="input w-full h-24" required />
        <input type="text" placeholder="URL da imagem" value={image} onChange={e => setImage(e.target.value)} className="input w-full" required />
        <input type="number" placeholder="Preço" value={price} onChange={e => setPrice(e.target.value)} className="input w-full" required />
        <select value={destination} onChange={e => setDestination(e.target.value)} className="input w-full" required>
          <option value="">Selecione a Cidade</option>
          {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
        <input type="date" value={date} onChange={e => setDate(e.target.value)} className="input w-full" required />
        <select value={type} onChange={e => setType(e.target.value)} className="input w-full" required>
          <option value="">Selecione o Tipo</option>
          {typesList.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <button type="submit" className="btn btn-primary w-full">Salvar Alterações</button>
      </form>
    </div>
  );
};

export default EditEvent;
