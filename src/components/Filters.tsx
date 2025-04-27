import React, { useState } from 'react';
import { Filters as EventFilters } from '../services/api';

interface Props {
  onChange: (filters: EventFilters) => void;
}

const Filters: React.FC<Props> = ({ onChange }) => {
  const [date, setDate] = useState('');
  const [destination, setDestination] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onChange({
      date: date || undefined,
      destination: destination || undefined,
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="input"
      />
      <input
        type="text"
        placeholder="Destino"
        value={destination}
        onChange={e => setDestination(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Preço min"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        className="input w-24"
      />
      <input
        type="number"
        placeholder="Preço max"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        className="input w-24"
      />
      <button type="submit" className="btn btn-primary">
        Aplicar
      </button>
    </form>
  );
};

export default Filters;
