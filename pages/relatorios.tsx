import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  options: { destination: string; type: string };
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  paymentType: string;
  date: string;
}

const Relatorios: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const salesByEvent = Object.values(
    orders.reduce((acc, order) => {
      order.items.forEach(item => {
        const key = item.id;
        if (!acc[key]) acc[key] = { name: item.name, qty: 0, revenue: 0 };
        acc[key].qty += item.quantity;
        acc[key].revenue += item.price * item.quantity;
      });
      return acc;
    }, {} as Record<string, { name: string; qty: number; revenue: number }>)
  );

  const salesByCity = Object.entries(
    orders.reduce((acc, order) => {
      order.items.forEach(item => {
        const city = item.options.destination;
        acc[city] = (acc[city] || 0) + item.price * item.quantity;
      });
      return acc;
    }, {} as Record<string, number>)
  );

  const salesByPayment = Object.entries(
    orders.reduce((acc, order) => {
      const pt = order.paymentType;
      if (!acc[pt]) acc[pt] = { count: 0, revenue: 0 };
      acc[pt].count += 1;
      acc[pt].revenue += order.total;
      return acc;
    }, {} as Record<string, { count: number; revenue: number }>)
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Relatórios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">Total de Pedidos</h2>
          <p className="text-2xl">{totalOrders}</p>
        </div>
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">Receita Total</h2>
          <p className="text-2xl">{totalRevenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">Vendas por Evento</h2>
          <ul className="list-disc pl-5 space-y-1">
            {salesByEvent.map(ev => (
              <li key={ev.name}>
                {ev.name}: {ev.qty} vendidos ({ev.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
              </li>
            ))}
          </ul>
        </div>
        <div className="card p-4">
          <h2 className="text-lg font-semibold mb-2">Vendas por Cidade</h2>
          <ul className="list-disc pl-5 space-y-1">
            {salesByCity.map(([city, rev]) => (
              <li key={city}>
                {city}: {rev.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="card p-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Vendas por Tipo de Pagamento</h2>
        <ul className="list-disc pl-5 space-y-1">
          {salesByPayment.map(([pt, info]) => (
            <li key={pt}>
              {pt}: {info.count} pedidos ({info.revenue.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Relatorios;
