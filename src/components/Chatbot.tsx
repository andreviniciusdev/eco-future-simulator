
import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { MessageCircle, X } from 'lucide-react';
import { toast } from 'sonner';
import MessageList from './chat/MessageList';
import ChatInput from './chat/ChatInput';
import { Message } from '@/types/chat';
import { getOfflineResponse, simulateTyping } from '@/utils/chatResponses';

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
  const [isTyping, setIsTyping] = useState(false);

  // Handle sending a message
  const handleSendMessage = async (input: string) => {
    // Add user message
    const userMessage: Message = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
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
        text: 'Desculpe, não entendi sua pergunta. Posso ajudar com informações sobre acidificação dos oceanos, impactos ambientais ou como usar o simulador.',
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      toast.error('Ocorreu um erro ao processar sua mensagem.');
    } finally {
      setIsTyping(false);
    }
  };

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
        <MessageList messages={messages} isTyping={isTyping} />
        
        {/* Input area */}
        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </Card>
    </div>
  );
};

export default Chatbot;
