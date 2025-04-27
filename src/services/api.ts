export interface Event {
  id: string;
  title: string;
  image: string;
  price: number;
  description: string;
  destination: string;
  date: string;
  type: string;
}

export interface Filters {
  date?: string;
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
}

let eventsDB: Event[] = [
  // Alto do Moura (Lote 2): domingos de junho, R$80
  { id: '3', title: 'Alto do Moura', image: '/images/PSD-LOTE2-alto-do-moura.png', price: 80, description: 'Alto do Moura em Caruaru', destination: 'Caruaru', date: '2025-06-01', type: 'Evento' },
  { id: '4', title: 'Alto do Moura', image: '/images/PSD-LOTE2-alto-do-moura.png', price: 80, description: 'Alto do Moura em Caruaru', destination: 'Caruaru', date: '2025-06-08', type: 'Evento' },
  { id: '5', title: 'Alto do Moura', image: '/images/PSD-LOTE2-alto-do-moura.png', price: 80, description: 'Alto do Moura em Caruaru', destination: 'Caruaru', date: '2025-06-15', type: 'Evento' },
  { id: '6', title: 'Alto do Moura', image: '/images/PSD-LOTE2-alto-do-moura.png', price: 80, description: 'Alto do Moura em Caruaru', destination: 'Caruaru', date: '2025-06-22', type: 'Evento' },
  { id: '7', title: 'Alto do Moura', image: '/images/PSD-LOTE2-alto-do-moura.png', price: 80, description: 'Alto do Moura em Caruaru', destination: 'Caruaru', date: '2025-06-29', type: 'Evento' },
  // Patio de Eventos: datas específicas
  { id: '8', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-05-31', type: 'Evento' },
  { id: '9', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-06', type: 'Evento' },
  { id: '10', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-07', type: 'Evento' },
  { id: '11', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-14', type: 'Evento' },
  { id: '12', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-21', type: 'Evento' },
  { id: '13', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-23', type: 'Evento' },
  { id: '14', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-27', type: 'Evento' },
  { id: '15', title: 'Patio de Eventos', image: '/images/geral.png', price: 100, description: 'Patio de Eventos em Caruaru', destination: 'Caruaru', date: '2025-06-28', type: 'Evento' },
];

// Mock fetch
export const fetchEvents = async (filters: Filters): Promise<Event[]> => {
  let result = eventsDB;
  if (filters.destination) {
    result = result.filter(e => e.destination === filters.destination);
  }
  if (filters.date) {
    result = result.filter(e => e.date === filters.date);
  }
  if (filters.minPrice !== undefined) {
    result = result.filter(e => e.price >= filters.minPrice!);
  }
  if (filters.maxPrice !== undefined) {
    result = result.filter(e => e.price <= filters.maxPrice!);
  }
  return result;
};

export const fetchEventById = async (id: string): Promise<Event> => {
  const event = eventsDB.find(e => e.id === id);
  if (!event) throw new Error('Evento não encontrado');
  return event;
};

export const createEvent = async (event: Omit<Event,'id'>): Promise<Event> => {
  const newEvent: Event = { id: Date.now().toString(), ...event };
  eventsDB.push(newEvent);
  return newEvent;
};

// Atualiza um evento existente
export const updateEvent = async (id: string, event: Omit<Event,'id'>): Promise<Event> => {
  const index = eventsDB.findIndex(e => e.id === id);
  if (index === -1) throw new Error('Evento não encontrado');
  eventsDB[index] = { ...eventsDB[index], ...event, id };
  return eventsDB[index];
};

// Remove um evento pelo ID
export const deleteEvent = async (id: string): Promise<void> => {
  eventsDB = eventsDB.filter(e => e.id !== id);
};
