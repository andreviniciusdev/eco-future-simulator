import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageCircle } from 'lucide-react';

export const Navbar = ({
  onToggleChat
}: {
  onToggleChat: () => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'bg-[#1f2937]/90 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-5'
        }`}
    >
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <h1 className="font-bold text-2xl text-white">EcoBot</h1>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => scrollToSection('hero')}
            className="text-white hover:text-[#0891b2] transition duration-150 ease-in-out;"
          >
            Início
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className="text-white hover:text-[#0891b2] transition duration-150 ease-in-out;"
          >
            Saiba Mais
          </button>
          <button
            onClick={() => scrollToSection('about-us')}
            className="text-white hover:text-[#0891b2] transition duration-150 ease-in-out;"
          >
            Sobre Nós
          </button>
          <Button
            onClick={onToggleChat}
            className="ml-4 bg-[#0ea5e9] hover:bg-[#0891b2] text-white flex items-center gap-2"
          >
            <MessageCircle size={18} />
            <span>Chatbot</span>
          </Button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden flex items-center">
          <Button
            onClick={onToggleChat}
            className="mr-2 bg-ocean hover:bg-ocean-shallow text-white"
            size="icon"
          >
            <MessageCircle size={18} />
          </Button>
          <button
            className="p-2 rounded-md text-gray-600 hover:text-ocean focus:outline-none"
            onClick={() => {
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.classList.toggle('hidden');
              }
            }}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-white shadow-lg absolute w-full">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <button
            onClick={() => {
              scrollToSection('hero');
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.classList.add('hidden');
              }
            }}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ocean w-full text-left"
          >
            Início
          </button>
          <button
            onClick={() => {
              scrollToSection('about');
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.classList.add('hidden');
              }
            }}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ocean w-full text-left"
          >
            Saiba Mais
          </button>
          <button
            onClick={() => {
              scrollToSection('about-us');
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.classList.add('hidden');
              }
            }}
            className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-ocean w-full text-left"
          >
            Sobre Nós
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
