import type { NextPage } from 'next';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import CartItemComponent from '../src/components/CartItem';
import { useCart } from '../src/context/CartContext';

const Cart: NextPage = () => {
  const { items, removeItem, updateItem, clearCart, total } = useCart();
  const router = useRouter();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Seu Carrinho</h1>
      {items.length === 0 ? (
        <p>Carrinho vazio.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {items.map(item => (
              <CartItemComponent
                key={item.id + JSON.stringify(item.options)}
                item={item}
                onUpdate={updateItem}
                onRemove={removeItem}
              />
            ))}
          </div>
          <div className="card p-4 mb-6 flex justify-between items-center">
            <span className="text-2xl font-bold">
              Total: {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            <button onClick={() => clearCart()} className="btn btn-danger">
              Limpar Carrinho
            </button>
            <button onClick={() => router.push('/checkout')} className="btn btn-primary">
              Finalizar Compra
            </button>
          </div>
        </>
      )}
      <div>
        <Link href="/" className="btn btn-secondary inline-block">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
};

export default Cart;
