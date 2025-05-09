
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Message {
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    text: 'Olá! Eu sou o Eco, seu assistente virtual. Estou aqui para responder suas dúvidas sobre acidificação dos oceanos e o nosso simulador. Como posso ajudar hoje?',
    sender: 'bot',
    timestamp: new Date()
  }
];

// Expanded pre-defined responses for the chatbot
const responses: Record<string, string> = {
  'default': 'Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais ou como usar o simulador.',
  'oi': 'Olá! Como posso ajudar você hoje?',
  'olá': 'Olá! Como posso ajudar você hoje?',
  'ajuda': 'Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais, como usar o simulador, ou como você pode contribuir para soluções.',
  'o que é acidificação': 'A acidificação dos oceanos é o processo de diminuição do pH da água do mar, causado principalmente pela absorção de dióxido de carbono (CO₂) da atmosfera. Isso afeta organismos marinhos com conchas e esqueletos de carbonato de cálcio, como corais e mariscos.',
  'como funciona o simulador': 'Nosso simulador permite visualizar os efeitos da acidificação oceânica em diferentes cenários. Você pode ajustar os níveis de CO₂ e observar as mudanças nos ecossistemas marinhos em tempo real.',
  'quais os impactos': 'Os impactos da acidificação incluem: enfraquecimento de conchas e esqueletos de organismos marinhos, branqueamento de corais, alterações na cadeia alimentar marinha e redução da biodiversidade oceânica.',
  'como posso ajudar': 'Você pode ajudar reduzindo sua pegada de carbono através de ações como: diminuir o uso de combustíveis fósseis, apoiar energias renováveis, reduzir o consumo de carne, e participar de iniciativas de conservação marinha.',
  'quem criou': 'O EcoBot foi criado por uma equipe de cientistas e desenvolvedores comprometidos com a educação ambiental e a preservação dos oceanos.',
  'ph oceano': 'O pH médio dos oceanos era de aproximadamente 8,2 antes da era industrial. Atualmente, está em torno de 8,1, o que representa um aumento de 30% na acidez (lembrando que a escala de pH é logarítmica). Projeções indicam que pode cair para 7,8 até o final deste século se as emissões de CO₂ continuarem no ritmo atual.',
  'corais': 'Os corais são extremamente sensíveis à acidificação dos oceanos. O pH mais baixo dificulta a formação de seus esqueletos de carbonato de cálcio e pode levar ao branqueamento. Além disso, a acidificação combinada com o aquecimento dos oceanos cria um "efeito duplo" devastador para os recifes de coral.',
  'solução': 'As principais soluções para a acidificação dos oceanos envolvem: redução das emissões globais de CO₂, desenvolvimento de energias renováveis, reflorestamento, proteção de ecossistemas marinhos como manguezais e pradarias marinhas (que capturam carbono), e pesquisa de técnicas de restauração de recifes e outros habitats marinhos.',
  'história do brasil': 'Como assistente especializado em acidificação dos oceanos, não tenho informações detalhadas sobre a história do Brasil. Posso ajudar com questões relacionadas aos oceanos, acidificação e impactos ambientais marinhos.',
  'biodiversidade': 'A acidificação dos oceanos ameaça a biodiversidade marinha de várias formas: afeta organismos que formam conchas ou esqueletos calcários, altera a cadeia alimentar, reduz a capacidade reprodutiva de certas espécies e pode modificar comportamentos dos organismos marinhos. Ecossistemas inteiros, como recifes de coral, que abrigam 25% de toda a vida marinha, estão em risco.',
  'economia': 'A acidificação dos oceanos tem impactos econômicos significativos, afetando a pesca comercial, a aquicultura (especialmente de moluscos), o turismo relacionado aos recifes de coral, e aumentando os custos de adaptação e mitigação. Estima-se que os danos econômicos globais possam chegar a trilhões de dólares até o final do século.',
  'experimentos': 'Cientistas realizam diversos experimentos para estudar a acidificação dos oceanos, incluindo: estudos em laboratório com tanques de água do mar em diferentes níveis de pH, instalações de enriquecimento de CO₂ em campo (FOCE - Free Ocean CO₂ Enrichment), monitoramento de áreas com fontes naturais de CO₂ (como respiradouros vulcânicos submarinos), e modelagem computacional de cenários futuros.',
  'definição': 'A acidificação dos oceanos é o processo contínuo de redução do pH das águas oceânicas, causado principalmente pela absorção do excesso de dióxido de carbono (CO₂) da atmosfera. Quando o CO₂ se dissolve na água do mar, forma ácido carbônico, liberando íons de hidrogênio que aumentam a acidez da água.'
};

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  // Function to find the best response based on user input (offline mode)
  const getOfflineResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check if any key phrase is in the user input
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseInput.includes(key)) {
        return value;
      }
    }
    
    // If no specific match is found, try to find a relevant response
    // by checking if any key is somewhat related to the input
    const words = lowercaseInput.split(/\s+/);
    for (const word of words) {
      if (word.length < 3) continue; // Skip short words
      
      for (const [key, value] of Object.entries(responses)) {
        if (key.includes(word) || word.includes(key)) {
          return value;
        }
      }
    }
    
    return responses.default;
  };

  // Add typing simulation for a more natural chatbot feel
  const simulateTyping = async (text: string): Promise<string> => {
    return new Promise((resolve) => {
      // Simulate typing delay based on message length
      const typingTime = Math.min(1000, Math.max(500, text.length * 20));
      setTimeout(() => {
        resolve(text);
      }, typingTime);
    });
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Add typing indicator
    setIsTyping(true);
    
    try {
      // Get response from offline responses with typing simulation
      const responseText = getOfflineResponse(input);
      const botResponse = await simulateTyping(responseText);
      
      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Fallback response
      const fallbackResponse: Message = {
        text: responses.default,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      toast.error('Ocorreu um erro ao processar sua mensagem.');
    } finally {
      setIsTyping(false);
    }
  };

  // Handle key press (send on enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Scroll to bottom when messages update
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col bg-white overflow-hidden rounded-2xl shadow-2xl">
        {/* Chat header */}
        <div className="flex items-center justify-between bg-ocean p-4 text-white">
          <div className="flex items-center gap-2">
            <MessageCircle size={20} />
            <h2 className="font-bold">Chat com Eco</h2>
          </div>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-ocean-deep/20"
            >
              <X size={20} />
            </Button>
          </div>
        </div>
        
        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.sender === 'user'
                      ? 'bg-ocean text-white rounded-tr-none'
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                  <div
                    className={`text-xs mt-1 ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                    }`}
                  >
                    {msg.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot animation-delay-200"></div>
                    <div className="typing-dot animation-delay-400"></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={endOfMessagesRef} />
          </div>
        </div>
        
        {/* Input area */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              disabled={isTyping}
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-ocean hover:bg-ocean-deep"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Chatbot;
