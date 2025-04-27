import type { NextPage } from 'next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type CartItem = { id: string; name: string; price: number; quantity: number; options: { destination: string; type: string } };
type Order = { id: string; items: CartItem[]; total: number; paymentType: string; date: string };

const TicketPage: NextPage = () => {
  const router = useRouter();
  const { orderId } = router.query as { orderId?: string };
  const [order, setOrder] = useState<Order | null>(null);
  const pdfUrl = orderId ? `/api/tickets/${orderId}` : '';

  useEffect(() => {
    if (!orderId) return;
    fetch(`/api/orders/${orderId}`)
      .then(res => res.json())
      .then(setOrder)
      .catch(console.error);
  }, [orderId]);

  if (!order) return <p>Carregando ingresso...</p>;

  const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    `Seu ingresso - Pedido ${order.id}: ${typeof window !== 'undefined' ? window.location.origin : ''}${pdfUrl}`
  )}`;
  const mailtoLink = `mailto:?subject=Seu Ingresso&body=${encodeURIComponent(
    `Olá, aqui está seu ingresso do pedido ${order.id}: ${typeof window !== 'undefined' ? window.location.origin : ''}${pdfUrl}`
  )}`;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Ingresso - Pedido {order.id}</h1>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
        <a href={pdfUrl} className="btn btn-primary" download>
          Baixar PDF
        </a>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
          Enviar WhatsApp
        </a>
        <a href={mailtoLink} className="btn btn-secondary">
          Enviar E-mail
        </a>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-2">Preview do Ingresso</h2>
        <iframe src={pdfUrl} title="Ingresso" className="w-full h-96 border" />
      </div>
    </div>
  );
};

export default TicketPage;
