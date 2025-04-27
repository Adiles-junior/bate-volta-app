import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => (
  <footer className="bg-gradient-to-r from-purple-600 via-red-500 to-orange-500 text-white py-6 mt-12">
    <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <p className="mb-4 md:mb-0"> {new Date().getFullYear()} Bate e Volta dos Amigos. Todos os direitos reservados.</p>
      <div className="flex space-x-6">
        <Link href="https://www.instagram.com/bate_voltadosamigos/" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
          <FaInstagram className="mr-2 text-xl" />Instagram
        </Link>
        <Link href="https://wa.me" target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
          <FaWhatsapp className="mr-2 text-xl" />WhatsApp
        </Link>
        <Link href="mailto:bate_voltadosamigos@outlook.com" className="hover:underline flex items-center">
          <FaEnvelope className="mr-2 text-xl" />Email
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
