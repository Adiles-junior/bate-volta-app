import type { NextPage, GetStaticProps } from 'next';
import React, { useEffect, useState } from 'react';
import fs from 'fs';
import path from 'path';
import Filters from '../src/components/Filters';
import EventCard from '../src/components/EventCard';
import Carousel from '../src/components/Carousel';
import { fetchEvents, Event, Filters as EventFilters } from '../src/services/api';

type HomeProps = { carouselImages: string[] };

const Home: NextPage<HomeProps> = ({ carouselImages }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [filters, setFilters] = useState<EventFilters>({});
  const cities = ['Caruaru', 'Campina Grande', 'Gravatá', 'Serra Negra', 'Carpina'];

  useEffect(() => {
    fetchEvents(filters).then(setEvents);
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <Carousel images={carouselImages} />
      <div className="flex flex-wrap gap-2 overflow-x-auto mb-4">
        {cities.map(city => (
          <button
            key={city}
            onClick={() => setFilters(prev => ({ ...prev, destination: city }))}
            className={`btn transform transition duration-200 ${filters.destination === city ? 'btn-primary scale-110 shadow-md' : 'btn-secondary hover:scale-105'}`}
          >
            {city}
          </button>
        ))}
      </div>
      <Filters onChange={setFilters} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const dir = path.join(process.cwd(), 'public/images');
  const files = await fs.promises.readdir(dir);
  const carouselImages = files
    .filter(f => /\.(png|jpe?g|gif|webp)$/i.test(f))
    .map(f => `/images/${f}`);
  return { props: { carouselImages } };
};

export default Home;
