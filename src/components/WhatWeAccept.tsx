import { Check, X, Leaf, Download, Share2, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

export const WhatWeAccept = () => {
  const { t } = useLanguage();

  return (
    <section id="what-we-accept" className="py-24 bg-gradient-to-b from-blue-50 via-green-50 to-yellow-50 relative overflow-hidden">
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-green-200/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-yellow-200/20 rounded-full blur-2xl animate-bounce" />
      <div className="absolute bottom-1/4 right-1/3 w-48 h-48 bg-purple-200/25 rounded-full blur-3xl animate-pulse" />

      <div className="container relative z-10">
        <div className="text-center mb-16 animate-slide-in-bottom">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            {t('acceptTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Simple guide to understand what goes in your compost bin
          </p>
        </div>


        {/* Quick Reference Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* What We Accept */}
          <Card className="border-green-300 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <Check className="h-6 w-6" />
                What We Accept
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg border border-green-200">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Vegetable & Fruit Peels</p>
                    <p className="text-sm text-green-600">Banana peels, apple cores, potato skins</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg border border-green-200">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Tea & Coffee Grounds</p>
                    <p className="text-sm text-green-600">Used tea leaves, coffee filters, coffee grounds</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-green-100 rounded-lg border border-green-200">
                  <div className="h-8 w-8 rounded-full bg-green-500 flex items-center justify-center">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-green-800">Egg Shells</p>
                    <p className="text-sm text-green-600">Crushed egg shells, organic matter</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-green-200/50 rounded-lg border border-green-300">
                <p className="text-sm text-green-800 font-medium">
                  <Check className="h-4 w-4 inline mr-2" />
                  Keep organic waste separate from other waste
                </p>
              </div>
            </CardContent>
          </Card>

          {/* What We Don't Accept */}
          <Card className="border-red-300 shadow-xl bg-gradient-to-br from-red-50 to-pink-50 hover:shadow-2xl transition-all duration-300">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-xl">
                <X className="h-6 w-6" />
                What We Don't Accept
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-800">Plastics</p>
                    <p className="text-sm text-red-600">Bottles, bags, containers, packaging</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-800">Batteries</p>
                    <p className="text-sm text-red-600">All types of batteries and electronics</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-red-100 rounded-lg border border-red-200">
                  <div className="h-8 w-8 rounded-full bg-red-500 flex items-center justify-center">
                    <X className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-red-800">Glass & Bulbs</p>
                    <p className="text-sm text-red-600">Glass containers, light bulbs, mirrors</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-red-200/50 rounded-lg border border-red-300">
                <p className="text-sm text-red-800 font-medium">
                  <X className="h-4 w-4 inline mr-2" />
                  Do not mix these with organic waste
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Banner */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-4 p-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl shadow-lg">
            <div className="flex items-center gap-2">
              <Check className="h-6 w-6 text-green-200" />
              <span className="text-lg font-semibold">Green Tick = YES</span>
            </div>
            <div className="h-6 w-px bg-white/30" />
            <div className="flex items-center gap-2">
              <X className="h-6 w-6 text-red-200" />
              <span className="text-lg font-semibold">Red Cross = NO</span>
            </div>
            <div className="h-6 w-px bg-white/30" />
            <span className="text-lg font-bold">EASY TO UNDERSTAND!</span>
          </div>
        </div>
      </div>
    </section>
  );
};
