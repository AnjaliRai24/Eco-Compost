import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Search, 
  X, 
  ArrowRight, 
  Leaf, 
  Recycle, 
  Truck, 
  DollarSign, 
  Users,
  HelpCircle,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  url?: string;
  action?: () => void;
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useLanguage();

  // Search results data
  const searchData: SearchResult[] = [
    {
      id: '1',
      title: 'How to Book a Pickup',
      description: 'Learn how to schedule a waste pickup at your location',
      category: 'Services',
      icon: Truck,
      url: '#how-it-works'
    },
    {
      id: '2',
      title: 'What We Accept',
      description: 'Find out what organic waste materials we collect',
      category: 'Information',
      icon: Recycle,
      url: '#what-we-accept'
    },
    {
      id: '3',
      title: 'Earning Opportunities',
      description: 'Discover how much you can earn by selling waste',
      category: 'Services',
      icon: DollarSign,
      url: '#wet-waste-selling'
    },
    {
      id: '4',
      title: 'Vermicompost Products',
      description: 'Browse our premium vermicompost products',
      category: 'Products',
      icon: Leaf,
      url: '#vermicompost'
    },
    {
      id: '5',
      title: 'Community Leaderboard',
      description: 'See top contributors and community stats',
      category: 'Community',
      icon: Users,
      url: '#leaderboard'
    },
    {
      id: '6',
      title: 'Contact Support',
      description: 'Get help with your account or services',
      category: 'Support',
      icon: HelpCircle,
      url: '#contact'
    },
    {
      id: '7',
      title: 'Video Tutorials',
      description: 'Watch tutorials in your preferred language',
      category: 'Learning',
      icon: HelpCircle,
      url: '#video-tutorial'
    },
    {
      id: '8',
      title: 'Partnership Programs',
      description: 'Join as a government officer or retailer',
      category: 'Business',
      icon: Users,
      url: '#partners'
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    
    // Simulate search delay
    const timer = setTimeout(() => {
      const filtered = searchData.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      
      setResults(filtered);
      setSelectedIndex(-1);
      setIsLoading(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, -1));
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault();
      handleResultClick(results[selectedIndex]);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleResultClick = (result: SearchResult) => {
    if (result.url) {
      // Scroll to section
      const element = document.querySelector(result.url);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    if (result.action) {
      result.action();
    }
    onClose();
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Services': 'bg-blue-100 text-blue-800',
      'Information': 'bg-green-100 text-green-800',
      'Products': 'bg-purple-100 text-purple-800',
      'Community': 'bg-orange-100 text-orange-800',
      'Support': 'bg-red-100 text-red-800',
      'Learning': 'bg-indigo-100 text-indigo-800',
      'Business': 'bg-yellow-100 text-yellow-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search EcoCompost
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for services, information, products..."
              className="pl-10 pr-10"
            />
            {query && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          <div className="max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              </div>
            ) : query && results.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No results found for "{query}"</p>
                <p className="text-sm">Try different keywords or check spelling</p>
              </div>
            ) : query && results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <Card
                    key={result.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      index === selectedIndex ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => handleResultClick(result)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <result.icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground truncate">
                              {result.title}
                            </h4>
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${getCategoryColor(result.category)}`}
                            >
                              {result.category}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {result.description}
                          </p>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Start typing to search</p>
                <p className="text-sm">Find services, information, and more</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {!query && (
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Quick Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setQuery('pickup');
                    inputRef.current?.focus();
                  }}
                >
                  <Truck className="h-4 w-4 mr-2" />
                  Book Pickup
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="justify-start"
                  onClick={() => {
                    setQuery('earnings');
                    inputRef.current?.focus();
                  }}
                >
                  <DollarSign className="h-4 w-4 mr-2" />
                  View Earnings
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
