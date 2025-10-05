import { motion } from "framer-motion";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    rating: number;
    reviewCount: number;
    isNew?: boolean;
    isOnSale?: boolean;
    slug: string;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  
  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  // Generate fallback product image URL using product ID as seed for consistency
  const getFallbackImageUrl = (productId: string, productName: string) => {
    const seed = parseInt(productId) || Math.abs(productId.split('').reduce((a, b) => a + b.charCodeAt(0), 0));
    
    // Determine category based on product name
    let category = 'technology';
    const name = productName.toLowerCase();
    
    if (name.includes('headphone') || name.includes('audio') || name.includes('speaker')) {
      category = 'headphones';
    } else if (name.includes('watch') || name.includes('fitness')) {
      category = 'smartwatch';
    } else if (name.includes('keyboard') || name.includes('gaming')) {
      category = 'mechanical-keyboard';
    } else if (name.includes('webcam') || name.includes('camera')) {
      category = 'webcam';
    } else if (name.includes('charger') || name.includes('wireless')) {
      category = 'wireless-charger';
    } else if (name.includes('phone') || name.includes('mobile')) {
      category = 'smartphone';
    } else if (name.includes('laptop') || name.includes('computer')) {
      category = 'laptop';
    }
    
    return `https://images.unsplash.com/photo-${1500000000 + seed}?w=400&h=250&fit=crop&crop=center&q=80`;
  };

  const imageUrl = imageError || product.image === "/placeholder.svg" 
    ? getFallbackImageUrl(product.id, product.name)
    : product.image;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="relative overflow-hidden h-64">
          <Link to={`/products/${product.slug}`}>
            {imageLoading && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-t-2xl" />
            )}
            <motion.img
              src={imageUrl}
              alt={`${product.name} - High-quality product image for premium ${product.name.toLowerCase()}`}
              className={`w-full h-full object-cover transition-all duration-300 rounded-t-2xl group-hover:scale-105 ${
                imageLoading ? "opacity-0" : "opacity-100"
              }`}
              onLoad={() => setImageLoading(false)}
              onError={() => {
                if (!imageError) {
                  setImageError(true);
                  setImageLoading(false);
                }
              }}
              whileHover={{ scale: 1.05 }}
              loading="lazy"
            />
          </Link>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground">New</Badge>
            )}
            {product.isOnSale && discountPercentage > 0 && (
              <Badge variant="destructive">-{discountPercentage}%</Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="icon"
              variant="secondary"
              className="h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm"
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
              size="sm"
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <Link to={`/products/${product.slug}`}>
            <h3 className="font-semibold text-foreground hover:text-accent transition-colors line-clamp-2 mb-2 min-h-[3rem]">
              {product.name}
            </h3>
          </Link>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating)
                      ? "fill-accent text-accent"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}