import { useState } from "react";
import { motion } from "framer-motion";
import { Filter, Grid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/product/ProductCard";
import { ProductFilter } from "@/components/product/ProductFilter";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

// Mock data with product-specific images
const mockProducts = [
  {
    id: "1",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=250&fit=crop&crop=center&q=80",
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
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=400&h=250&fit=crop&crop=center&q=80",
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
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=250&fit=crop&crop=center&q=80",
    rating: 4.7,
    reviewCount: 156,
    isOnSale: true,
    slug: "bluetooth-speaker-pro"
  },
  {
    id: "4",
    name: "Wireless Phone Charger",
    price: 49,
    image: "https://images.unsplash.com/photo-1591290619762-d1c52d0b4464?w=400&h=250&fit=crop&crop=center&q=80",
    rating: 4.5,
    reviewCount: 203,
    slug: "wireless-phone-charger"
  },
  {
    id: "5",
    name: "Gaming Mechanical Keyboard",
    price: 129,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=250&fit=crop&crop=center&q=80",
    rating: 4.9,
    reviewCount: 267,
    slug: "gaming-mechanical-keyboard"
  },
  {
    id: "6",
    name: "4K Webcam Pro",
    price: 89,
    originalPrice: 119,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400&h=250&fit=crop&crop=center&q=80",
    rating: 4.4,
    reviewCount: 98,
    isOnSale: true,
    slug: "4k-webcam-pro"
  }
];

export default function Products() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isLoading, setIsLoading] = useState(false);

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
          All Products
        </h1>
        <p className="text-xl text-muted-foreground">
          Discover our complete collection of premium digital products
        </p>
      </motion.div>

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
                placeholder="Search products..."
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
              Showing {filteredProducts.length} of {mockProducts.length} products
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
                  src="/placeholder.svg"
                  alt="No products found"
                  className="w-32 h-32 mx-auto mb-6 opacity-50"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No products found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search or filter criteria
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
  );
}