import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useCart } from '../src/context/CartContext';
import { useRouter } from 'next/router';

const Checkout: NextPage = () => {
  const { items, total, clearCart } = useCart();
  const [paymentType, setPaymentType] = useState('Cartão');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, total, paymentType, name, email, phone }),
    });
    if (res.ok) {
      const order = await res.json();
      clearCart();
      router.push(`/tickets/${order.id}`);
    } else {
      alert('Erro ao processar pedido');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="card p-4 mb-4">
        <h2 className="font-semibold mb-2">Itens</h2>
        <ul className="list-disc pl-5">
          {items.map(item => (
            <li key={item.id + JSON.stringify(item.options)}>
              {item.name} x{item.quantity} - {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </li>
          ))}
        </ul>
        <p className="mt-2 font-bold">
          Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Tipo de Pagamento</label>
        <select
          value={paymentType}
          onChange={e => setPaymentType(e.target.value)}
          className="input w-full max-w-xs"
        >
          <option>Cartão</option>
          <option>PIX</option>
          <option>Dinheiro</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Nome</label>
        <input type="text" value={name} onChange={e => setName(e.target.value)} className="input w-full max-w-xs" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">E-mail</label>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input w-full max-w-xs" required />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Telefone</label>
        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} className="input w-full max-w-xs" required />
      </div>
      <button onClick={handleSubmit} className="btn btn-primary">
        Confirmar Pedido
      </button>
    </div>
  );
};

export default Checkout;
