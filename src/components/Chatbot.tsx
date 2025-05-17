import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X } from 'lucide-react';
import { toast } from 'sonner';
import { getBotResponse } from './botResponses';

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

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const endOfMessagesRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);

  const simulateTyping = async (text: string): Promise<string> => {
    return new Promise((resolve) => {
      const typingTime = Math.min(1000, Math.max(500, text.length * 20));
      setTimeout(() => {
        resolve(text);
      }, typingTime);
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = getBotResponse(input);
      const botResponse = await simulateTyping(responseText);

      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      const fallbackResponse: Message = {
        text: 'Desculpe, não entendi sua pergunta. Você pode me perguntar sobre acidificação dos oceanos, impactos ambientais, como usar o simulador, ou como ajudar. Sobre o que quer saber?',
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, fallbackResponse]);
      toast.error('Ocorreu um erro ao processar sua mensagem.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    setTimeout(() => {
      endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md h-[600px] max-h-[90vh] flex flex-col bg-white overflow-hidden rounded-2xl shadow-2xl">
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
              aria-label="Fechar chat"
            >
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${msg.sender === 'user'
                      ? 'bg-ocean text-white rounded-tr-none'
                      : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                >
                  <p>{msg.text}</p>
                  <div className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-tl-none px-4 py-2">
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={endOfMessagesRef} />
          </div>
        </div>

        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="flex-1"
              disabled={isTyping}
              aria-label="Campo de mensagem"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="bg-ocean hover:bg-ocean-deep"
              aria-label="Enviar mensagem"
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
