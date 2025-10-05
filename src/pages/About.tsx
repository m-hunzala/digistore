import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Eye, Heart, Shield, Zap, Users } from "lucide-react";

const visionMissionCards = [
  {
    title: "Our Mission",
    description: "To provide premium digital products that enhance everyday life through innovative technology and exceptional customer service.",
    icon: Target,
    color: "from-blue-500/20 to-blue-600/20"
  },
  {
    title: "Our Vision", 
    description: "To be the world's most trusted destination for cutting-edge technology, connecting people with products that inspire and empower.",
    icon: Eye,
    color: "from-purple-500/20 to-purple-600/20"
  },
  {
    title: "Customer First",
    description: "Every decision we make puts our customers at the center, ensuring satisfaction and building lasting relationships.",
    icon: Heart,
    color: "from-red-500/20 to-red-600/20"
  },
  {
    title: "Quality Assurance",
    description: "We partner only with trusted brands and rigorously test every product to guarantee premium quality and reliability.",
    icon: Shield,
    color: "from-green-500/20 to-green-600/20"
  },
  {
    title: "Innovation",
    description: "We constantly seek the latest technological advances to bring you products that define the future of digital living.",
    icon: Zap,
    color: "from-yellow-500/20 to-yellow-600/20"
  },
  {
    title: "Community",
    description: "Building a community of tech enthusiasts who share our passion for innovation and excellence in digital products.",
    icon: Users,
    color: "from-indigo-500/20 to-indigo-600/20"
  }
];

const About = () => {
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
            About DigiStore
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Your premier destination for cutting-edge digital products and technology solutions
          </p>
        </motion.div>

        {/* Introduction Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <Card className="rounded-2xl shadow-lg border-border overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-accent/30 to-accent" />
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-foreground mb-6">
                    Redefining Digital Commerce
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                    At DigiStore, we believe technology should enhance every aspect of your life. 
                    Since our founding, we've been committed to curating the finest selection of 
                    digital products from the world's most innovative brands.
                  </p>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Our dedication to premium quality, exceptional customer service, and 
                    competitive pricing has made us the trusted choice for tech enthusiasts 
                    and professionals worldwide.
                  </p>
                </div>
                <div className="flex justify-center">
                  <div className="w-full max-w-md h-64 bg-gradient-to-br from-accent/20 to-primary/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-8 h-8 text-accent-foreground" />
                      </div>
                      <p className="text-lg font-semibold text-foreground">Team Illustration</p>
                      <p className="text-sm text-muted-foreground">Placeholder for team image</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Vision & Mission Cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Our Values & Vision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visionMissionCards.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="group"
                >
                  <Card className="h-full rounded-2xl shadow-lg border-border hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${card.color}`} />
                    <CardHeader className="pb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-xl bg-accent/10">
                          <IconComponent className="w-6 h-6 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-semibold">
                          {card.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <CardDescription className="text-muted-foreground leading-relaxed">
                        {card.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;