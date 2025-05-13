import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Chatbot from "@/components/Chatbot";
import OceanBackground from "@/components/OceanBackground";
import { toast } from "sonner";
import { ChevronDown, Users, Award, Building } from 'lucide-react';

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
      
      {/* Sobre nós Section */}
      <section 
        id="about-us" 
        className="py-20 px-6 bg-gradient-to-b from-white to-blue-50 relative overflow-hidden"
      >
        <div className="container mx-auto max-w-5xl">
          <h2 className="section-title text-center mb-12">Sobre nós</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-gray-700 order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <Building className="h-10 w-10 text-ocean" />
                <h3 className="text-3xl font-bold text-ocean-deep">SQT.INC</h3>
              </div>
              
              <p className="text-lg">
                A SQT.INC nasceu em 2021 da união de mentes apaixonadas por tecnologia e sustentabilidade. 
                Nossa missão é desenvolver soluções inovadoras para os desafios ambientais mais urgentes 
                do nosso planeta.
              </p>
              
              <p className="text-lg">
                O que começou como um pequeno grupo de pesquisadores e desenvolvedores cresceu para uma 
                equipe multidisciplinar dedicada a criar tecnologias que conectam as pessoas com o meio ambiente.
              </p>
              
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-ocean">
                <h4 className="font-bold text-xl text-ocean-deep mb-4">Nossa Missão</h4>
                <p>
                  Desenvolver ferramentas tecnológicas que promovam a conscientização ambiental e 
                  facilitem ações concretas para preservação dos oceanos e ecossistemas marinhos.
                </p>
              </div>
            </div>
            
            <div className="order-1 md:order-2 flex items-start justify-center">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c" 
                  alt="Equipe SQT.INC trabalhando" 
                  className="rounded-xl shadow-xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b" 
                    alt="Inovação" 
                    className="w-24 h-24 rounded-lg object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="font-bold text-xl text-ocean-deep mb-4">Pesquisa</h4>
              <p className="text-gray-700">
                Nossa equipe de cientistas e pesquisadores está constantemente explorando 
                novas formas de compreender e proteger o ambiente marinho.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="font-bold text-xl text-ocean-deep mb-4">Desenvolvimento</h4>
              <p className="text-gray-700">
                Transformamos conhecimento científico em ferramentas tecnológicas acessíveis 
                e intuitivas para conscientização ambiental.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow">
              <h4 className="font-bold text-xl text-ocean-deep mb-4">Educação</h4>
              <p className="text-gray-700">
                Acreditamos no poder da educação para mudar o mundo. Nossos projetos visam 
                informar e inspirar pessoas de todas as idades.
              </p>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>
    </div>
  );
};

export default Index;
