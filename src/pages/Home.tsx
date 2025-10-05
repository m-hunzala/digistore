import { motion } from "framer-motion";
import { ArrowRight, Shield, Truck, RotateCcw, Headphones, Star, ShoppingBag, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

// Featured products with high-quality images
const featuredProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop&crop=center",
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isOnSale: true,
    slug: "premium-wireless-headphones"
  },
  {
    id: "2", 
    name: "Smart Fitness Watch",
    price: 199,
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=250&fit=crop&crop=center",
    rating: 4.6,
    reviewCount: 89,
    isNew: true,
    slug: "smart-fitness-watch"
  },
  {
    id: "3",
    name: "Bluetooth Speaker Pro", 
    price: 149,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=250&fit=crop&crop=center",
    rating: 4.7,
    reviewCount: 156,
    isOnSale: true,
    slug: "bluetooth-speaker-pro"
  },
  {
    id: "4",
    name: "4K Webcam Pro",
    price: 89,
    originalPrice: 119,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=250&fit=crop&crop=center",
    rating: 4.4,
    reviewCount: 98,
    isOnSale: true,
    slug: "4k-webcam-pro"
  }
];

const features = [
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your transactions are protected with bank-level security"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $50"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns", 
    description: "30-day return policy for your peace of mind"
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer service support"
  }
];

const collections = [
  {
    id: "1",
    name: "Electronics",
    description: "Latest gadgets & tech",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=600&h=400&fit=crop&crop=center",
    productCount: 156,
    slug: "electronics"
  },
  {
    id: "2", 
    name: "Audio & Sound",
    description: "Premium audio equipment",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&h=400&fit=crop&crop=center",
    productCount: 89,
    slug: "audio-sound"
  },
  {
    id: "3",
    name: "Smart Wearables", 
    description: "Fitness & smart watches",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=600&h=400&fit=crop&crop=center",
    productCount: 67,
    slug: "smart-wearables"
  }
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        {/* Hero Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=1920&h=1080&fit=crop&crop=center"
            alt="Modern e-commerce technology background"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-muted/80" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
          
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Discover Premium
                <span className="text-accent block lg:inline"> Digital Products</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Explore our curated collection of cutting-edge electronics, gadgets, and digital accessories designed for modern living.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg">
                  <Link to="/products">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-accent/20 hover:bg-accent/5">
                  <Link to="/collections">
                    Browse Collections
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">500+</div>
                  <div className="text-sm text-muted-foreground">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">50k+</div>
                  <div className="text-sm text-muted-foreground">Customers</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-1">
                    <Star className="w-4 h-4 fill-accent text-accent mr-1" />
                    <span className="text-2xl font-bold text-accent">4.9</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Rating</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Shop by Collection
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover curated collections of premium products designed for your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <Link to={`/collections/${collection.slug}`}>
                  <Card className="overflow-hidden border-0 shadow-lg group-hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-48 overflow-hidden">
                      {isLoading ? (
                        <Skeleton className="w-full h-full" />
                      ) : (
                        <>
                          <img
                            src={collection.image}
                            alt={`${collection.name} collection`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute bottom-4 left-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{collection.name}</h3>
                            <p className="text-sm opacity-90">{collection.productCount} products</p>
                          </div>
                        </>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground text-center">{collection.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Why Choose DigiStore?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best shopping experience with premium products and exceptional service.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 rounded-2xl bg-accent/10 w-fit group-hover:bg-accent/20 transition-colors duration-300">
                      <feature.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Hand-picked selection of our most popular and highest-rated products
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-64 w-full rounded-2xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center">
            <Button asChild size="lg" variant="outline" className="border-accent/20 hover:bg-accent/5">
              <Link to="/products">
                View All Products <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Start Shopping?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust DigiStore for their premium tech needs
            </p>
            <Button
              asChild
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 shadow-lg"
            >
              <Link to="/products">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}