
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X } from 'lucide-react';
import { toast } from 'sonner';

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

// Pre-defined responses for the chatbot
const responses: Record<string, string> = {
  'default': 'Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais ou como usar o simulador.',
  'oi': 'Olá! Como posso ajudar você hoje?',
  'olá': 'Olá! Como posso ajudar você hoje?',
  'o que é acidificação': 'A acidificação dos oceanos é o processo de diminuição do pH da água do mar, causado principalmente pela absorção de dióxido de carbono (CO₂) da atmosfera. Isso afeta organismos marinhos com conchas e esqueletos de carbonato de cálcio, como corais e mariscos.',
  'como funciona o simulador': 'Nosso simulador permite visualizar os efeitos da acidificação oceânica em diferentes cenários. Você pode ajustar os níveis de CO₂ e observar as mudanças nos ecossistemas marinhos em tempo real.',
  'quais os impactos': 'Os impactos da acidificação incluem: enfraquecimento de conchas e esqueletos de organismos marinhos, branqueamento de corais, alterações na cadeia alimentar marinha e redução da biodiversidade oceânica.',
  'como posso ajudar': 'Você pode ajudar reduzindo sua pegada de carbono através de ações como: diminuir o uso de combustíveis fósseis, apoiar energias renováveis, reduzir o consumo de carne, e participar de iniciativas de conservação marinha.',
  'quem criou': 'O EcoBot foi criado por uma equipe de cientistas e desenvolvedores comprometidos com a educação ambiental e a preservação dos oceanos.',
};

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  // Function to find the best response based on user input
  const getBotResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    // Check if any key phrase is in the user input
    for (const [key, value] of Object.entries(responses)) {
      if (lowercaseInput.includes(key)) {
        return value;
      }
    }
    
    return responses.default;
  };

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot typing with a small delay
    setTimeout(() => {
      const botResponse: Message = {
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-ocean-deep/20"
          >
            <X size={20} />
          </Button>
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
            />
            <Button 
              onClick={handleSendMessage}
              disabled={!input.trim()}
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
