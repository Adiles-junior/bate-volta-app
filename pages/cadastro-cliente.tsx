import type { NextPage } from 'next';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CadastroCliente: NextPage = () => {
  const router = useRouter();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Cliente ${nome} cadastrado com sucesso!`);
    router.push('/');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Cliente</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <input
          type="text"
          placeholder="Nome"
          className="input w-full"
          value={nome}
          onChange={e => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          className="input w-full"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Telefone"
          className="input w-full"
          value={telefone}
          onChange={e => setTelefone(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Cadastrar Cliente
        </button>
      </form>
    </div>
  );
};

export default CadastroCliente;
