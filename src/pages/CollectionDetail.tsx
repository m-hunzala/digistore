import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilter } from "@/components/product/ProductFilter";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock collection data
const collectionData = {
  "electronics": {
    id: "1",
    name: "Electronics",
    description: "Discover the latest in cutting-edge electronic devices, from smartphones to laptops",
    longDescription: "Our electronics collection features the most innovative and reliable devices from top brands. Each product is carefully selected for quality, performance, and value.",
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop&crop=center",
    productCount: 156,
    products: [
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
        id: "5",
        name: "Gaming Mechanical Keyboard",
        price: 129,
        image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=250&fit=crop&crop=center",
        rating: 4.9,
        reviewCount: 267,
        slug: "gaming-mechanical-keyboard"
      },
      {
        id: "6",
        name: "4K Webcam Pro",
        price: 89,
        originalPrice: 119,
        image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=250&fit=crop&crop=center",
        rating: 4.4,
        reviewCount: 98,
        isOnSale: true,
        slug: "4k-webcam-pro"
      }
    ]
  },
  "audio-sound": {
    id: "2",
    name: "Audio & Sound",
    description: "Premium audio equipment for audiophiles and music enthusiasts",
    longDescription: "Immerse yourself in crystal-clear sound with our premium audio collection. From high-fidelity headphones to powerful speakers, every product delivers exceptional audio quality.",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=1200&h=600&fit=crop&crop=center",
    productCount: 89,
    products: [
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
        id: "3",
        name: "Bluetooth Speaker Pro",
        price: 149,
        originalPrice: 199,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=250&fit=crop&crop=center",
        rating: 4.7,
        reviewCount: 156,
        isOnSale: true,
        slug: "bluetooth-speaker-pro"
      }
    ]
  },
  "smart-wearables": {
    id: "3",
    name: "Smart Wearables",
    description: "Fitness trackers and smart watches for an active lifestyle",
    longDescription: "Stay connected and track your fitness goals with our smart wearables collection. Advanced sensors and long battery life keep you informed throughout your day.",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=1200&h=600&fit=crop&crop=center",
    productCount: 67,
    products: [
      {
        id: "2",
        name: "Smart Fitness Watch",
        price: 199,
        image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=250&fit=crop&crop=center",
        rating: 4.6,
        reviewCount: 89,
        isNew: true,
        slug: "smart-fitness-watch"
      }
    ]
  }
};

export default function CollectionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(true);

  const collection = slug ? collectionData[slug as keyof typeof collectionData] : null;

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (collection) {
      document.title = `${collection.name} Collection - DigiStore`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `${collection.description} - Shop premium ${collection.name.toLowerCase()} products at DigiStore.`);
      }
    }
  }, [collection]);

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Collection Not Found</h1>
          <p className="text-muted-foreground mb-6">The collection you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/collections">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Collections
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const filteredProducts = collection.products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-96 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={collection.image}
            alt={`${collection.name} collection banner`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </div>
        
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-2xl text-white"
            >
              <Button
                asChild
                variant="ghost"
                className="text-white hover:bg-white/20 mb-4"
              >
                <Link to="/collections">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Collections
                </Link>
              </Button>
              
              <Badge className="mb-4 bg-accent text-accent-foreground">
                {collection.productCount} Products
              </Badge>
              
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                {collection.name}
              </h1>
              
              <p className="text-xl opacity-90 mb-6">
                {collection.longDescription}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <ProductFilter />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8 p-4 bg-card rounded-2xl shadow-sm border">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder={`Search in ${collection.name}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background"
                />
              </div>

              {/* Mobile Filter Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <ProductFilter />
                  </div>
                </SheetContent>
              </Sheet>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} of {collection.products.length} products in {collection.name}
              </p>
            </div>

            {/* Product Grid */}
            {isLoading ? (
              <div className={`grid gap-6 ${
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-64 w-full rounded-2xl" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                    : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            {/* No Results */}
            {filteredProducts.length === 0 && !isLoading && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-16"
              >
                <div className="max-w-md mx-auto">
                  <img
                    src="https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=200&h=200&fit=crop&crop=center"
                    alt="No products found"
                    className="w-32 h-32 mx-auto mb-6 opacity-50 rounded-full object-cover"
                  />
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    No products found
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Try adjusting your search or browse all products
                  </p>
                  <Button onClick={() => setSearchQuery("")}>
                    Clear search
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}