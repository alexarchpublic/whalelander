import { useEffect, useRef } from 'react';

interface Product {
  title: string;
  description: string;
  details: string;
  imageUrl: string;
  link: string;
}

const products: Product[] = [
  {
    title: "Rolex Submariner Date",
    description: "Oyster, 41 mm, Oystersteel and yellow gold with Cerachrom bezel insert in blue ceramic",
    details: "The Submariner Date features a royal blue dial with Chromalight display for exceptional legibility underwater. Water-resistant to 300 meters, with a unidirectional rotatable bezel and Oysterlock clasp with Glidelock extension system.",
    imageUrl: "/images/rolex-bluesy.png",
    link: "https://www.rolex.com/en-us/watches/submariner/m126613lb-0002"
  },
  {
    title: "Louis Vuitton 3 Watch Case",
    description: "Monogram canvas watch case with luxurious microfiber lining",
    details: "Perfect for the discerning collector, this elegant watch case in iconic Monogram canvas features three removable cushions, a microfiber lining, and golden brass hardware. Made in France with meticulous attention to detail.",
    imageUrl: "/images/lv-watch-case.png",
    link: "https://us.louisvuitton.com/eng-us/products/3-watch-case-monogram-canvas-000727/M47530"
  }
];

// Duplicate the products array to create a seamless loop
const allProducts = [...products, ...products, ...products];

export const ProductCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        if (scrollRef.current.scrollLeft >= (scrollRef.current.scrollWidth / 3) * 2) {
          scrollRef.current.scrollLeft = 0;
        } else {
          scrollRef.current.scrollLeft += 1;
        }
      }
    };

    const intervalId = setInterval(scroll, 40);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full overflow-hidden py-12">
      <div 
        ref={scrollRef}
        className="flex gap-16 overflow-x-hidden whitespace-nowrap"
        style={{ scrollBehavior: 'smooth' }}
      >
        {allProducts.map((product, index) => (
          <div
            key={`${product.title}-${index}`}
            className="inline-flex flex-col min-w-[400px] max-w-[500px]"
          >
            <a 
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-center mt-6 space-y-2">
                <h3 className="text-lg font-light tracking-wide">{product.title}</h3>
                <p className="text-sm font-light text-gray-600">{product.description}</p>
                <p className="text-xs font-light text-gray-500 max-w-[80%] mx-auto leading-relaxed">
                  {product.details}
                </p>
                <div className="text-xs text-gold mt-4 font-light tracking-wider">
                  View on official website →
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}; 