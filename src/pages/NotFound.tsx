
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import OceanBackground from "@/components/OceanBackground";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <OceanBackground />
      
      <div className="text-center z-10 bg-white/90 backdrop-blur-md p-10 rounded-xl shadow-xl max-w-md">
        <h1 className="text-8xl font-bold mb-4 text-ocean">404</h1>
        <p className="text-2xl text-gray-700 mb-6">Oops! Página não encontrada</p>
        <p className="text-gray-600 mb-8">Parece que você navegou para águas desconhecidas.</p>
        <a 
          href="/" 
          className="ocean-button-primary inline-block"
        >
          Voltar ao Início
        </a>
      </div>
    </div>
  );
};

export default NotFound;
