"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IProductType } from "@/models/types";
export function ImageCarousel(product: IProductType) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateCarouselState = () => {
      setCurrentIndex(carouselApi.selectedScrollSnap());
      setTotalItems(carouselApi.scrollSnapList().length);
    };

    updateCarouselState();

    carouselApi.on("select", updateCarouselState);

    return () => {
      carouselApi.off("select", updateCarouselState); // Clean up on unmount
    };
  }, [carouselApi]);

  const scrollToIndex = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  return (
    <div className="relative h-40 px-5 mx-auto mt-5 max-w-7xl lg:mt-6">
      <Carousel
        setApi={setCarouselApi}
        opts={{ loop: true }}
        className="w-full max-w-7xl h-96 max-h-[500px] z-10"
      >
        <CarouselContent>
          {product.images.map((o, index) => (
            <CarouselItem key={index}>
              <Card className="bg-gray-400">
                <CardContent className="flex items-center justify-center h-96 max-h-[500px] p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </CardContent>
              </Card>
              {/* <CustomImage className="aspect-square w-full rounded-t-xl max-w-[300px] max-h-[500px]">
                <CustomImageInput src={product.images[0]} />
                <CustomImageFallback className="rounded-t-xl">
                  CN
                </CustomImageFallback>
              </CustomImage> */}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Navigation Arrows */}
      <div className="absolute inset-0 z-20 flex items-center justify-between px-3 pointer-events-none">
        <Button
          onClick={() => scrollToIndex(currentIndex - 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronLeft className="size-32" strokeWidth={0.5} />
        </Button>
        <Button
          onClick={() => scrollToIndex(currentIndex + 1)}
          className="pointer-events-auto rounded-full w-32 h-32 p-0 bg-transparent shadow-none hover:bg-transparent"
        >
          <ChevronRight className="size-32" strokeWidth={0.5} />
        </Button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2 z-20">
        {Array.from({ length: totalItems }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-black" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
