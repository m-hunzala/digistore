import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw,
  Plus,
  Minus,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductCard } from "@/components/product/ProductCard";

// Mock products database
const allProducts = {
  "premium-wireless-headphones": {
    id: "1",
    slug: "premium-wireless-headphones",
    name: "Premium Wireless Headphones",
    price: 299,
    originalPrice: 399,
    rating: 4.8,
    reviewCount: 124,
    inStock: true,
    stockCount: 15,
    isNew: true,
    isOnSale: true,
    description: "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day listening.",
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium comfort design",
      "High-quality audio drivers",
      "Fast charging support",
      "Bluetooth 5.0 connectivity"
    ],
    variants: {
      colors: [
        { 
          id: "black", 
          name: "Midnight Black", 
          hex: "#000000",
          images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=600&fit=crop&q=80"
          ]
        },
        { 
          id: "white", 
          name: "Pearl White", 
          hex: "#FFFFFF",
          images: [
            "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1577174881658-0f30157f5c99?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcf?w=800&h=600&fit=crop&q=80"
          ]
        },
        { 
          id: "blue", 
          name: "Ocean Blue", 
          hex: "#0066CC",
          images: [
            "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&q=80"
          ]
        }
      ],
      sizes: [
        { id: "one-size", name: "One Size", available: true }
      ]
    }
  },
  "smart-fitness-watch": {
    id: "2",
    slug: "smart-fitness-watch",
    name: "Smart Fitness Watch",
    price: 199,
    originalPrice: null,
    rating: 4.6,
    reviewCount: 89,
    inStock: true,
    stockCount: 20,
    isNew: true,
    isOnSale: false,
    description: "Track your fitness goals with advanced health monitoring, GPS tracking, and smart notifications on your wrist.",
    features: [
      "Heart rate monitoring",
      "GPS tracking",
      "Water resistant up to 50m",
      "7-day battery life",
      "Sleep tracking",
      "Multiple sport modes"
    ],
    variants: {
      colors: [
        { 
          id: "black", 
          name: "Black", 
          hex: "#000000",
          images: [
            "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop&q=80"
          ]
        },
        { 
          id: "silver", 
          name: "Silver", 
          hex: "#C0C0C0",
          images: [
            "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&h=600&fit=crop&q=80"
          ]
        }
      ],
      sizes: [
        { id: "38mm", name: "38mm", available: true },
        { id: "42mm", name: "42mm", available: true },
        { id: "45mm", name: "45mm", available: true }
      ]
    }
  },
  "bluetooth-speaker-pro": {
    id: "3",
    slug: "bluetooth-speaker-pro",
    name: "Bluetooth Speaker Pro",
    price: 149,
    originalPrice: 199,
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    stockCount: 12,
    isNew: false,
    isOnSale: true,
    description: "Powerful portable speaker with 360-degree sound, waterproof design, and 24-hour playtime.",
    features: [
      "360-degree sound",
      "Waterproof (IPX7)",
      "24-hour battery",
      "USB-C charging",
      "Built-in microphone",
      "Bluetooth 5.2"
    ],
    variants: {
      colors: [
        { 
          id: "black", 
          name: "Black", 
          hex: "#000000",
          images: [
            "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&h=600&fit=crop&q=80"
          ]
        },
        { 
          id: "blue", 
          name: "Blue", 
          hex: "#0066CC",
          images: [
            "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1531104985437-603d6490e6d4?w=800&h=600&fit=crop&q=80"
          ]
        }
      ],
      sizes: [
        { id: "standard", name: "Standard", available: true }
      ]
    }
  },
  "wireless-phone-charger": {
    id: "4",
    slug: "wireless-phone-charger",
    name: "Wireless Phone Charger",
    price: 49,
    originalPrice: null,
    rating: 4.5,
    reviewCount: 203,
    inStock: true,
    stockCount: 30,
    isNew: false,
    isOnSale: false,
    description: "Fast wireless charging pad with Qi certification, LED indicator, and sleek aluminum design.",
    features: [
      "Fast wireless charging",
      "Qi certified",
      "LED charging indicator",
      "Non-slip surface",
      "Aluminum body",
      "15W power output"
    ],
    variants: {
      colors: [
        { 
          id: "black", 
          name: "Black", 
          hex: "#000000",
          images: [
            "https://images.unsplash.com/photo-1591290619762-d1c52d0b4464?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1585509828823-1369ce05f6b2?w=800&h=600&fit=crop&q=80"
          ]
        },
        { 
          id: "white", 
          name: "White", 
          hex: "#FFFFFF",
          images: [
            "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=800&h=600&fit=crop&q=80"
          ]
        }
      ],
      sizes: [
        { id: "standard", name: "Standard", available: true }
      ]
    }
  },
  "gaming-mechanical-keyboard": {
    id: "5",
    slug: "gaming-mechanical-keyboard",
    name: "Gaming Mechanical Keyboard",
    price: 129,
    originalPrice: null,
    rating: 4.9,
    reviewCount: 267,
    inStock: true,
    stockCount: 8,
    isNew: false,
    isOnSale: false,
    description: "Professional gaming keyboard with mechanical switches, RGB lighting, and programmable keys.",
    features: [
      "Mechanical switches",
      "RGB backlighting",
      "Programmable keys",
      "Anti-ghosting",
      "Aluminum frame",
      "USB-C connection"
    ],
    variants: {
      colors: [
        { 
          id: "black", 
          name: "Black", 
          hex: "#000000",
          images: [
            "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&h=600&fit=crop&q=80"
          ]
        },
        { 
          id: "white", 
          name: "White", 
          hex: "#FFFFFF",
          images: [
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&h=600&fit=crop&q=80"
          ]
        }
      ],
      sizes: [
        { id: "full", name: "Full Size", available: true },
        { id: "tkl", name: "TKL", available: true }
      ]
    }
  },
  "4k-webcam-pro": {
    id: "6",
    slug: "4k-webcam-pro",
    name: "4K Webcam Pro",
    price: 89,
    originalPrice: 119,
    rating: 4.4,
    reviewCount: 98,
    inStock: true,
    stockCount: 18,
    isNew: false,
    isOnSale: true,
    description: "Professional 4K webcam with autofocus, built-in microphone, and adjustable viewing angles.",
    features: [
      "4K resolution @ 30fps",
      "Autofocus",
      "Built-in microphone",
      "Adjustable mount",
      "Low-light correction",
      "Wide-angle lens"
    ],
    variants: {
      colors: [
        { 
          id: "black", 
          name: "Black", 
          hex: "#000000",
          images: [
            "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&h=600&fit=crop&q=80",
            "https://images.unsplash.com/photo-1590935216814-2a491f8e15e1?w=800&h=600&fit=crop&q=80"
          ]
        }
      ],
      sizes: [
        { id: "standard", name: "Standard", available: true }
      ]
    }
  }
};

const recommendedProducts = [
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 199,
    image: "/placeholder.svg",
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
    image: "/placeholder.svg",
    rating: 4.7,
    reviewCount: 156,
    isOnSale: true,
    slug: "bluetooth-speaker-pro"
  },
  {
    id: "4",
    name: "Wireless Phone Charger",
    price: 49,
    image: "/placeholder.svg",
    rating: 4.5,
    reviewCount: 203,
    slug: "wireless-phone-charger"
  }
];

export default function ProductDetail() {
  const { slug } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState("black");
  const [selectedSize, setSelectedSize] = useState("one-size");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Get product based on slug
  const mockProduct = slug ? allProducts[slug as keyof typeof allProducts] : null;

  // If product not found, show error
  if (!mockProduct) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-muted-foreground mb-8">The product you're looking for doesn't exist.</p>
        <Button asChild>
          <a href="/products">Back to Products</a>
        </Button>
      </div>
    );
  }

  const discountPercentage = mockProduct.originalPrice
    ? Math.round(((mockProduct.originalPrice - mockProduct.price) / mockProduct.originalPrice) * 100)
    : 0;

  // Get current color's images
  const currentColorData = mockProduct.variants.colors.find(c => c.id === selectedColor);
  const currentImages = currentColorData?.images || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          {/* Main Image */}
          <div className="relative overflow-hidden rounded-2xl bg-muted">
            <img
              src={currentImages[selectedImage] || currentImages[0]}
              alt={`${mockProduct.name} in ${currentColorData?.name} - High-quality product image`}
              className="w-full h-[500px] object-cover"
            />
            {mockProduct.isOnSale && discountPercentage > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-4 left-4 text-sm px-3 py-1"
              >
                -{discountPercentage}% OFF
              </Badge>
            )}
          </div>

          {/* Thumbnail Images */}
          <div className="flex gap-4">
            {currentImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative overflow-hidden rounded-lg border-2 transition-colors ${
                  selectedImage === index 
                    ? "border-accent" 
                    : "border-border hover:border-accent/50"
                }`}
              >
                <img
                  src={image}
                  alt={`${mockProduct.name} in ${currentColorData?.name} - View ${index + 1}`}
                  className="w-20 h-20 object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Badges */}
          <div className="flex gap-2">
            {mockProduct.isNew && (
              <Badge className="bg-accent text-accent-foreground">New Arrival</Badge>
            )}
            {mockProduct.inStock ? (
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                <Check className="w-3 h-3 mr-1" />
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {/* Title & Rating */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {mockProduct.name}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(mockProduct.rating)
                        ? "fill-accent text-accent"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {mockProduct.rating} ({mockProduct.reviewCount} reviews)
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-foreground">
              ${mockProduct.price}
            </span>
            {mockProduct.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${mockProduct.originalPrice}
              </span>
            )}
            {discountPercentage > 0 && (
              <Badge variant="destructive" className="text-sm">
                Save {discountPercentage}%
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className="text-muted-foreground leading-relaxed">
            {mockProduct.description}
          </p>

          {/* Color Selection */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Color</h3>
            <div className="flex gap-3">
              {mockProduct.variants.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => {
                    setSelectedColor(color.id);
                    setSelectedImage(0); // Reset to first image when changing color
                  }}
                  className={`relative w-12 h-12 rounded-full border-2 transition-all ${
                    selectedColor === color.id
                      ? "border-accent scale-110"
                      : "border-border hover:border-accent/50"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColor === color.id && (
                    <div className="absolute inset-0 rounded-full border-2 border-accent animate-pulse" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity >= mockProduct.stockCount}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {mockProduct.stockCount} available
              </span>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={!mockProduct.inStock}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "text-red-500 border-red-500" : ""}
              >
                <Heart className={`h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
              </Button>
            </div>
          </div>

          {/* Features */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {mockProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-accent flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Truck className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-sm">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <Shield className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-sm">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
              <RefreshCw className="h-5 w-5 text-accent" />
              <div>
                <p className="font-medium text-sm">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-day policy</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Product Details Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-16"
      >
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Product Description</h3>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {mockProduct.description}
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    These premium wireless headphones deliver exceptional audio quality with deep bass and crystal-clear highs. The active noise cancellation technology blocks out ambient noise, allowing you to focus on your music, calls, or content.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="specifications" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Battery Life</span>
                      <span className="font-medium">30 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Charging Time</span>
                      <span className="font-medium">2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bluetooth Version</span>
                      <span className="font-medium">5.0</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weight</span>
                      <span className="font-medium">250g</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Driver Size</span>
                      <span className="font-medium">40mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frequency Response</span>
                      <span className="font-medium">20Hz - 20kHz</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Customer Reviews</h3>
                <p className="text-muted-foreground">Reviews feature coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Recommended Products */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-8">
          You Might Also Like
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recommendedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}