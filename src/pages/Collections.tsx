import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight, User, Users, Baby, Watch, Smartphone, Headphones } from "lucide-react";
import { useState } from "react";

const collections = [
  {
    title: "Men's Collection",
    description: "Discover premium gadgets and accessories designed for the modern man",
    icon: User,
    color: "from-blue-500/20 to-blue-600/20",
    imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=200&fit=crop&crop=center&q=80",
    slug: "electronics"
  },
  {
    title: "Women's Collection", 
    description: "Elegant tech solutions crafted with style and sophistication",
    icon: Users,
    color: "from-pink-500/20 to-pink-600/20",
    imageUrl: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=400&h=200&fit=crop&crop=center&q=80",
    slug: "audio-sound"
  },
  {
    title: "Kids' Collection",
    description: "Safe, fun, and educational technology for young minds",
    icon: Baby,
    color: "from-green-500/20 to-green-600/20",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&crop=center&q=80",
    slug: "smart-wearables"
  },
  {
    title: "Smart Watches",
    description: "Track your fitness and stay connected with premium smartwatches",
    icon: Watch,
    color: "from-purple-500/20 to-purple-600/20",
    imageUrl: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=400&h=200&fit=crop&crop=center&q=80",
    slug: "smart-wearables"
  },
  {
    title: "Smartphones",
    description: "Latest flagship phones with cutting-edge technology",
    icon: Smartphone,
    color: "from-orange-500/20 to-orange-600/20",
    imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=200&fit=crop&crop=center&q=80",
    slug: "electronics"
  },
  {
    title: "Audio & Headphones",
    description: "Immersive sound experience with premium audio equipment",
    icon: Headphones,
    color: "from-red-500/20 to-red-600/20",
    imageUrl: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=200&fit=crop&crop=center&q=80",
    slug: "audio-sound"
  }
];

const Collections = () => {
  const [imageLoading, setImageLoading] = useState<Record<string, boolean>>({});

  const handleImageLoad = (slug: string) => {
    setImageLoading(prev => ({ ...prev, [slug]: false }));
  };

  const handleImageError = (slug: string) => {
    setImageLoading(prev => ({ ...prev, [slug]: false }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Collections
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our curated collections of premium digital products
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => {
            const IconComponent = collection.icon;
            const isLoading = imageLoading[collection.slug] !== false;
            
            return (
              <motion.div
                key={collection.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="group"
              >
                <Card className="h-full rounded-2xl shadow-lg border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    {isLoading && (
                      <Skeleton className="absolute inset-0 w-full h-full" />
                    )}
                    <img
                      src={collection.imageUrl}
                      alt={`${collection.title} - Premium collection showcase`}
                      className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
                        isLoading ? "opacity-0" : "opacity-100"
                      }`}
                      onLoad={() => handleImageLoad(collection.slug)}
                      onError={() => handleImageError(collection.slug)}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                    
                    {/* Icon overlay */}
                    <div className="absolute bottom-4 left-4">
                      <div className="p-3 rounded-xl bg-background/90 backdrop-blur-sm border border-border/50">
                        <IconComponent className="w-6 h-6 text-accent" />
                      </div>
                    </div>
                  </div>

                  <div className={`h-2 bg-gradient-to-r ${collection.color}`} />
                  
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold">
                      {collection.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {collection.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <Button 
                      className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-medium group-hover:translate-x-1 transition-transform duration-200"
                      size="lg"
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Collections;