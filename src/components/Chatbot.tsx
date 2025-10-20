import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Leaf, 
  Recycle, 
  Truck, 
  DollarSign,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion';
}

interface QuickAction {
  id: string;
  text: string;
  icon: React.ComponentType<any>;
  action: () => void;
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! I\'m your EcoCompost assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions: QuickAction[] = [
    {
      id: '1',
      text: 'How does waste pickup work?',
      icon: Truck,
      action: () => handleQuickAction('How does waste pickup work?')
    },
    {
      id: '2',
      text: 'What can I sell?',
      icon: Recycle,
      action: () => handleQuickAction('What can I sell?')
    },
    {
      id: '3',
      text: 'How much can I earn?',
      icon: DollarSign,
      action: () => handleQuickAction('How much can I earn?')
    },
    {
      id: '4',
      text: 'What is vermicompost?',
      icon: Leaf,
      action: () => handleQuickAction('What is vermicompost?')
    }
  ];

  const getBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('pickup') || message.includes('waste collection')) {
      return 'Our waste pickup service works like this:\n\n1. Book a pickup through our website\n2. We collect your organic waste on scheduled days\n3. You earn money based on the weight\n4. We process it into valuable compost\n\nYou can book a pickup by clicking "Book Pickup" in the menu!';
    }
    
    if (message.includes('sell') || message.includes('earn') || message.includes('money')) {
      return 'You can earn money by selling your organic waste:\n\n• 5-10 kg: ₹2 per kg\n• 10-20 kg: ₹3 per kg\n• 20+ kg: ₹4 per kg\n\nWe accept vegetable peels, fruit scraps, tea leaves, coffee grounds, and egg shells. No plastics or non-organic materials!';
    }
    
    if (message.includes('vermicompost') || message.includes('compost')) {
      return 'Vermicompost is nutrient-rich compost made by earthworms processing organic waste. It\'s excellent for:\n\n• Improving soil health\n• Increasing crop yield\n• Natural fertilizer\n• Environmentally friendly\n\nYou can buy premium vermicompost from our shop section!';
    }
    
    if (message.includes('what we accept') || message.includes('accepted')) {
      return 'We accept these organic materials:\n\n✅ Vegetable & fruit peels\n✅ Tea & coffee grounds\n✅ Egg shells\n✅ Garden waste\n\n❌ No plastics\n❌ No glass\n❌ No batteries\n❌ No chemicals\n\nKeep it organic and natural!';
    }
    
    if (message.includes('price') || message.includes('cost')) {
      return 'Our pricing is simple:\n\n💰 Wet Waste Selling:\n• 5-10 kg: ₹2/kg\n• 10-20 kg: ₹3/kg\n• 20+ kg: ₹4/kg\n\n🌱 Vermicompost:\n• 1kg bag: ₹50\n• 5kg bag: ₹200\n• 10kg bag: ₹350\n\nFree pickup for all orders!';
    }
    
    if (message.includes('contact') || message.includes('help') || message.includes('support')) {
      return 'You can reach us through:\n\n📧 Email: info@ecocompost.in\n📞 Phone: +91 98765 43210\n📍 Address: EcoCompost Hub, Green Valley, Mumbai\n\n🕒 Working Hours: Mon-Sat 9AM-6PM\n\nWe\'re here to help you turn waste into wonder!';
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return 'Hello! Welcome to EcoCompost! 🌱 I\'m here to help you learn about our waste-to-wonder mission. What would you like to know?';
    }
    
    if (message.includes('mission') || message.includes('vision') || message.includes('goal')) {
      return 'Our mission is to create a sustainable future by:\n\n🌍 Protecting the environment\n👥 Building eco-conscious communities\n💼 Creating economic opportunities\n🌱 Transforming waste into valuable resources\n\nJoin us in making the world greener, one household at a time!';
    }
    
    return 'That\'s a great question! I\'m still learning, but I can help you with:\n\n• Waste pickup process\n• Pricing and earnings\n• What we accept\n• Vermicompost benefits\n• Contact information\n\nFeel free to ask me anything else, or check our website sections for more details!';
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage(action);
  };

  const handleSendMessage = (message?: string) => {
    const userMessage = message || inputValue.trim();
    if (!userMessage) return;

    // Add user message
    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: userMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Chatbot Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all duration-300 z-50"
          size="lg"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>
      )}

      {/* Chatbot Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] shadow-2xl border-2 border-green-200 z-50 bg-white">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">EcoCompost Assistant</h3>
                  <p className="text-xs text-green-100">Always here to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <CardContent className="p-0 h-[400px] flex flex-col">
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.sender === 'user'
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        {message.sender === 'bot' && (
                          <Bot className="h-4 w-4 mt-1 flex-shrink-0" />
                        )}
                        {message.sender === 'user' && (
                          <User className="h-4 w-4 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="text-sm whitespace-pre-line">{message.text}</p>
                          <p className={`text-xs mt-1 ${
                            message.sender === 'user' ? 'text-green-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 rounded-lg p-3 max-w-[80%]">
                      <div className="flex items-center gap-2">
                        <Bot className="h-4 w-4" />
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="p-4 border-t bg-gray-50">
                  <p className="text-sm text-gray-600 mb-3 font-medium">Quick Actions:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        className="text-xs h-auto p-2 justify-start"
                        onClick={action.action}
                      >
                        <action.icon className="h-3 w-3 mr-1" />
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about EcoCompost..."
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isTyping}
                    size="sm"
                    className="bg-green-500 hover:bg-green-600"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>
      )}
    </>
  );
};
