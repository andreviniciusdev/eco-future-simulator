
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import OceanBackground from "@/components/OceanBackground";
import { toast } from "sonner";
import { ChevronDown } from 'lucide-react';

const Index = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(prev => !prev);
  };

  const handlePlayNow = () => {
    toast.info("O simulador está sendo preparado para você!", {
      description: "Estamos trabalhando nesta funcionalidade.",
    });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar onToggleChat={toggleChat} />
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center text-white overflow-hidden">
        <OceanBackground />
        
        {/* Floating bubbles for visual effect */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="bubble animate-bubble-rise"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 5}px`,
                height: `${Math.random() * 20 + 5}px`,
                animationDelay: `${Math.random() * 15}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
        
        <div className="container mx-auto px-6 z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-float drop-shadow-lg">
            EcoBot
            <span className="block text-3xl md:text-4xl mt-2 font-bold text-blue-200">
              Simule o futuro dos oceanos
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-10 text-blue-100">
            Descubra os impactos da acidificação em tempo real.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button onClick={handlePlayNow} className="ocean-button-primary">
              Jogar Agora
            </button>
            <button 
              onClick={() => scrollToSection('about')} 
              className="ocean-button-secondary"
            >
              Saiba Mais
            </button>
          </div>
        </div>
        
        {/* Scroll indicator - Agora será clicável */}
        <div 
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
          onClick={() => scrollToSection('about')}
        >
          <ChevronDown className="text-white h-8 w-8 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </section>
      
      {/* About Section */}
      <section 
        id="about" 
        className="py-20 px-6 bg-white relative overflow-hidden"
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-title text-center">O que é a acidificação dos oceanos?</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center mt-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb" 
                alt="Oceano e sua biodiversidade" 
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
            
            <div className="space-y-6 text-gray-700">
              <p className="text-lg">
                A acidificação dos oceanos é um fenômeno causado pela absorção excessiva de dióxido de carbono (CO₂) da atmosfera pelos oceanos. Este processo químico reduz o pH da água, tornando-a mais ácida.
              </p>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-ocean">
                <h3 className="font-bold text-xl text-ocean-deep mb-2">Principais causas:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Emissões excessivas de CO₂ na atmosfera</li>
                  <li>Queima de combustíveis fósseis</li>
                  <li>Desmatamento e mudanças no uso da terra</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-ocean-accent">
                <h3 className="font-bold text-xl text-ocean-deep mb-2">Impactos nos organismos marinhos:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dissolução de conchas e esqueletos calcários</li>
                  <li>Branqueamento de corais</li>
                  <li>Alterações na cadeia alimentar marinha</li>
                  <li>Redução da biodiversidade oceânica</li>
                </ul>
              </div>
              
              <p className="text-lg font-medium text-ocean-deep">
                A conscientização sobre este problema é fundamental para promover ações que possam mitigar seus efeitos devastadores nos ecossistemas marinhos e na vida humana.
              </p>
              
              <div className="pt-4">
                <button 
                  type="button"
                  onClick={handlePlayNow} 
                  className="ocean-button-primary hover:scale-105 transition-transform cursor-pointer"
                >
                  Jogar Agora
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Background wave decoration */}
        <div className="absolute bottom-0 left-0 right-0 h-32 w-[200%] bg-hero-pattern opacity-10 animate-wave" />
      </section>
    </div>
  );
};

export default Index;
