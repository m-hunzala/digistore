import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const categories = [
  { id: "headphones", name: "Headphones", count: 24 },
  { id: "speakers", name: "Speakers", count: 18 },
  { id: "watches", name: "Smart Watches", count: 12 },
  { id: "keyboards", name: "Keyboards", count: 16 },
  { id: "mice", name: "Mice", count: 14 },
  { id: "webcams", name: "Webcams", count: 8 },
];

const brands = [
  { id: "sony", name: "Sony", count: 15 },
  { id: "bose", name: "Bose", count: 12 },
  { id: "apple", name: "Apple", count: 18 },
  { id: "samsung", name: "Samsung", count: 14 },
  { id: "logitech", name: "Logitech", count: 22 },
];

const colors = [
  { id: "black", name: "Black", hex: "#000000" },
  { id: "white", name: "White", hex: "#FFFFFF" },
  { id: "blue", name: "Blue", hex: "#3B82F6" },
  { id: "red", name: "Red", hex: "#EF4444" },
  { id: "green", name: "Green", hex: "#10B981" },
];

export function ProductFilter() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    price: true,
    colors: true,
    rating: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedColors([]);
    setPriceRange([0, 500]);
  };

  const activeFiltersCount = selectedCategories.length + selectedBrands.length + selectedColors.length;

  return (
    <div className="space-y-6 p-6 bg-card rounded-2xl shadow-sm border">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Filters</h3>
        {activeFiltersCount > 0 && (
          <Badge variant="secondary">{activeFiltersCount}</Badge>
        )}
      </div>

      {activeFiltersCount > 0 && (
        <Button
          variant="outline"
          size="sm"
          onClick={clearAllFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      )}

      <Separator />

      {/* Categories */}
      <Collapsible open={openSections.categories}>
        <CollapsibleTrigger
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full p-0 hover:no-underline"
        >
          <h4 className="font-medium text-foreground">Categories</h4>
          {openSections.categories ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 mt-4"
          >
            {categories.map((category) => (
              <div key={category.id} className="flex items-center space-x-3">
                <Checkbox
                  id={category.id}
                  checked={selectedCategories.includes(category.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCategories([...selectedCategories, category.id]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(id => id !== category.id));
                    }
                  }}
                />
                <label
                  htmlFor={category.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {category.name}
                </label>
                <span className="text-xs text-muted-foreground">
                  ({category.count})
                </span>
              </div>
            ))}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Price Range */}
      <Collapsible open={openSections.price}>
        <CollapsibleTrigger
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full p-0 hover:no-underline"
        >
          <h4 className="font-medium text-foreground">Price Range</h4>
          {openSections.price ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-4 mt-4"
          >
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={500}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </motion.div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Brands */}
      <Collapsible open={openSections.brands}>
        <CollapsibleTrigger
          onClick={() => toggleSection("brands")}
          className="flex items-center justify-between w-full p-0 hover:no-underline"
        >
          <h4 className="font-medium text-foreground">Brands</h4>
          {openSections.brands ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3 mt-4"
          >
            {brands.map((brand) => (
              <div key={brand.id} className="flex items-center space-x-3">
                <Checkbox
                  id={brand.id}
                  checked={selectedBrands.includes(brand.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedBrands([...selectedBrands, brand.id]);
                    } else {
                      setSelectedBrands(selectedBrands.filter(id => id !== brand.id));
                    }
                  }}
                />
                <label
                  htmlFor={brand.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex-1 cursor-pointer"
                >
                  {brand.name}
                </label>
                <span className="text-xs text-muted-foreground">
                  ({brand.count})
                </span>
              </div>
            ))}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>

      <Separator />

      {/* Colors */}
      <Collapsible open={openSections.colors}>
        <CollapsibleTrigger
          onClick={() => toggleSection("colors")}
          className="flex items-center justify-between w-full p-0 hover:no-underline"
        >
          <h4 className="font-medium text-foreground">Colors</h4>
          {openSections.colors ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-5 gap-3 mt-4"
          >
            {colors.map((color) => (
              <Button
                key={color.id}
                variant={selectedColors.includes(color.id) ? "default" : "outline"}
                size="sm"
                className="h-10 w-10 p-0 rounded-full"
                style={{
                  backgroundColor: selectedColors.includes(color.id) ? color.hex : "transparent",
                  borderColor: color.hex,
                }}
                onClick={() => {
                  if (selectedColors.includes(color.id)) {
                    setSelectedColors(selectedColors.filter(id => id !== color.id));
                  } else {
                    setSelectedColors([...selectedColors, color.id]);
                  }
                }}
                title={color.name}
              >
                {!selectedColors.includes(color.id) && (
                  <div
                    className="w-6 h-6 rounded-full border-2"
                    style={{ backgroundColor: color.hex, borderColor: color.hex }}
                  />
                )}
              </Button>
            ))}
          </motion.div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}