import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Link from 'next/link';

type Order = { id: string; total: number; paymentType: string; email: string; phone: string; date: string; };

const Vendas: NextPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  const resendEmail = async (orderId: string) => {
    const res = await fetch('/api/notifications/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ orderId }),
    });
    if (res.ok) alert('E-mail enviado com sucesso');
    else alert('Erro ao enviar e-mail');
  };

  const whatsappLink = (orderId: string) => {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${orderId}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(`Seu ingresso: ${url}`)}`;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendas</h1>
      <table className="min-w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Total</th>
            <th className="px-4 py-2">Pagamento</th>
            <th className="px-4 py-2">E-mail</th>
            <th className="px-4 py-2">Telefone</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id} className="border-t">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{new Date(order.date).toLocaleString('pt-BR')}</td>
              <td className="px-4 py-2">{order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
              <td className="px-4 py-2">{order.paymentType}</td>
              <td className="px-4 py-2">{order.email}</td>
              <td className="px-4 py-2">{order.phone}</td>
              <td className="px-4 py-2 space-x-2">
                <Link href={`/tickets/${order.id}`} className="btn btn-sm btn-primary">
                  Visualizar
                </Link>
                <button onClick={() => resendEmail(order.id)} className="btn btn-sm btn-secondary">
                  Reenviar E-mail
                </button>
                <button onClick={() => window.open(whatsappLink(order.id), '_blank')} className="btn btn-sm btn-secondary">
                  Enviar WhatsApp
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Vendas;
