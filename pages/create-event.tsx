import type { NextPage } from 'next';
import React, { useState } from 'react';
import { createEvent } from '../src/services/api';
import { useRouter } from 'next/router';

const CreateEvent: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [price, setPrice] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');

  const cities = ['Caruaru', 'Campina Grande', 'Gravatá', 'Serra Negra', 'Carpina'];
  const types = ['Viagem', 'Passeio'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createEvent({ title, description, image: preview, price: Number(price), destination, date, type });
    alert('Evento criado com sucesso!');
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Evento</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="input w-full"
          required
        />
        <textarea
          placeholder="Descrição"
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="input w-full h-24"
          required
        />
        <label className="btn btn-secondary w-full relative cursor-pointer text-center">
          Selecionar Imagem
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) {
                setImageFile(file);
                const reader = new FileReader();
                reader.onloadend = () => setPreview(reader.result as string);
                reader.readAsDataURL(file);
              }
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            required
          />
        </label>
        {preview && (
          <img src={preview} alt="Preview" className="w-32 h-32 object-cover mt-2 rounded mx-auto" />
        )}
        <input
          type="number"
          placeholder="Preço"
          value={price}
          onChange={e => setPrice(e.target.value)}
          className="input w-full"
          required
        />
        <select
          value={destination}
          onChange={e => setDestination(e.target.value)}
          className="input w-full"
          required
        >
          <option value="">Selecione a Cidade</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="input w-full"
          required
        />
        <select
          value={type}
          onChange={e => setType(e.target.value)}
          className="input w-full"
          required
        >
          <option value="">Selecione o Tipo</option>
          {types.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary w-full">
          Criar Evento
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
