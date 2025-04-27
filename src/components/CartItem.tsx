import React from 'react';
import { CartItem } from '../context/CartContext';

interface Props { item: CartItem; onUpdate: (id: string, updates: Partial<CartItem>) => void; onRemove: (id: string) => void; }

const CartItemComponent: React.FC<Props> = ({ item, onUpdate, onRemove }) => (
  <div className="card flex items-center justify-between p-4 mb-4">
    <div>
      <h3 className="font-bold">{item.name}</h3>
      <p>{item.options && JSON.stringify(item.options)}</p>
    </div>
    <div className="flex items-center">
      <input type="number" value={item.quantity} min={1} onChange={e => onUpdate(item.id, { quantity: Number(e.target.value) })} className="input w-20 mr-2" />
      <button onClick={() => onRemove(item.id)} className="btn btn-danger">Remover</button>
    </div>
    <div className="font-bold">
      {(item.price * item.quantity).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
    </div>
  </div>
);

export default CartItemComponent;
