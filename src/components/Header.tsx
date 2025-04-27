import React from 'react';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
  const { items } = useCart();
  const totalCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const { pathname } = useRouter();

  return (
    <header className="bg-gradient-to-r from-purple-600 via-red-500 to-orange-500 shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/" className={`text-2xl font-bold text-white hover:scale-105 transform transition duration-200 ${pathname === '/' ? 'underline decoration-white decoration-4 underline-offset-4' : ''}`}>
          Bate e Volta dos Amigos
        </Link>
        <nav className="flex space-x-4">
          <Link href="/" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/' ? 'border-b-2 border-white' : ''}`}>
            Home
          </Link>
          <Link href="/create-event" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/create-event' ? 'border-b-2 border-white' : ''}`}>
            Criar Evento
          </Link>
          <Link href="/events/manage" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/events/manage' ? 'border-b-2 border-white' : ''}`}>
            Gerenciar Eventos
          </Link>
          <Link href="/cadastro-cliente" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/cadastro-cliente' ? 'border-b-2 border-white' : ''}`}>
            Cadastro Cliente
          </Link>
          <Link href="/relatorios" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/relatorios' ? 'border-b-2 border-white' : ''}`}>
            Relatórios
          </Link>
          <Link href="/quem-somos" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/quem-somos' ? 'border-b-2 border-white' : ''}`}>
            Quem Somos
          </Link>
          <Link href="/vendas" className={`text-white px-2 py-1 transition-transform transform hover:scale-105 duration-200 ${pathname === '/vendas' ? 'border-b-2 border-white' : ''}`}>
            Vendas
          </Link>
        </nav>
        <Link href="/cart" className="relative text-white text-xl transition-transform transform hover:scale-110">
          🛒
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {totalCount}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Header;
