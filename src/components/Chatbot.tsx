
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageCircle, Send, X, Key, AlertCircle } from 'lucide-react';
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

// Pre-defined responses for the chatbot as fallback
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
  const [isApiKeyConfigOpen, setIsApiKeyConfigOpen] = useState(false);
  const [apiKey, setApiKey] = useState<string>(() => {
    return localStorage.getItem('perplexityApiKey') || '';
  });
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'valid' | 'invalid' | 'error'>('unknown');

  // Save API key to local storage when it changes
  useEffect(() => {
    if (apiKey) {
      localStorage.setItem('perplexityApiKey', apiKey);
      setApiStatus('unknown');
    }
  }, [apiKey]);

  // Function to make API call to Perplexity
  const getPerplexityResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      setApiStatus('invalid');
      return "Preciso de uma chave de API para poder conversar melhor. Clique no ícone de configuração para adicionar sua chave da Perplexity.";
    }

    setIsTyping(true);
    
    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "llama-3.1-sonar-small-128k-online",
          messages: [
            {
              role: "system",
              content: `Você é Eco, um assistente especializado em acidificação dos oceanos e proteção ambiental marinha. 
              Seu tom é educativo, paciente e amigável. Você sempre responde em português do Brasil.
              Responda de forma concisa e clara, com foco em educar o usuário sobre questões relacionadas à acidificação oceânica, 
              seus impactos nos ecossistemas marinhos e como as pessoas podem ajudar a mitigar esses problemas.
              Adapte suas respostas para serem compreensíveis para diferentes faixas etárias.`
            },
            {
              role: "user",
              content: userMessage
            }
          ],
          temperature: 0.7,
          max_tokens: 500,
          return_images: false,
          return_related_questions: false
        })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Perplexity API error:', response.status, errorData);
        
        if (response.status === 401) {
          setApiStatus('invalid');
          throw new Error('Chave de API inválida');
        } else {
          setApiStatus('error');
          throw new Error(`Erro ${response.status}: ${errorData.error?.message || 'Falha na API'}`);
        }
      }

      setApiStatus('valid');
      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Perplexity API:', error);
      
      // Fallback to pre-defined responses
      return getFallbackResponse(userMessage);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to find the best response based on user input (fallback)
  const getFallbackResponse = (userInput: string): string => {
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
      // Get response from Perplexity API
      const botResponse = await getPerplexityResponse(input);
      
      const botMessage: Message = {
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Fallback to pre-defined responses
      const fallbackResponse: Message = {
        text: getFallbackResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, fallbackResponse]);
      toast.error('Não foi possível conectar à API. Usando respostas offline.');
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

  // Handle saving API key
  const handleSaveApiKey = () => {
    setIsApiKeyConfigOpen(false);
    toast.success('Chave de API salva com sucesso!');
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
            <Sheet open={isApiKeyConfigOpen} onOpenChange={setIsApiKeyConfigOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white hover:bg-ocean-deep/20 mr-2"
                >
                  <Key size={18} />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Configurar API Perplexity</SheetTitle>
                </SheetHeader>
                <div className="py-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Para usar a IA do Perplexity, adicione sua chave de API abaixo. Você pode obter uma chave gratuita em <a href="https://www.perplexity.ai/settings/api" target="_blank" rel="noopener noreferrer" className="text-ocean underline">perplexity.ai/settings/api</a>
                  </p>
                  <Input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    placeholder="Chave de API Perplexity"
                    className="mb-4"
                  />
                  <Button 
                    className="w-full bg-ocean hover:bg-ocean-deep"
                    onClick={handleSaveApiKey}
                  >
                    Salvar
                  </Button>

                  {apiStatus === 'invalid' && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        A chave de API parece ser inválida. Por favor, verifique-a e tente novamente.
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  {apiStatus === 'error' && (
                    <Alert variant="destructive" className="mt-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Ocorreu um erro na comunicação com a API. Por favor, tente novamente mais tarde.
                      </AlertDescription>
                    </Alert>
                  )}
                </div>
              </SheetContent>
            </Sheet>
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
