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

    const intervalId = setInterval(scroll, 40); // Slightly slower scroll
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white/50 backdrop-blur-sm py-12">
      <div 
        ref={scrollRef}
        className="flex gap-12 overflow-x-hidden whitespace-nowrap" // Increased gap
        style={{ scrollBehavior: 'smooth' }}
      >
        {allProducts.map((product, index) => (
          <div
            key={`${product.title}-${index}`}
            className="inline-flex flex-col min-w-[400px] max-w-[500px]" // Larger cards
          >
            <a 
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-square overflow-hidden bg-white">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain p-4" // Changed to contain and added padding
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-6 transform translate-y-[calc(100%-4rem)] group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                <p className="text-md font-semibold text-gold mb-2">{product.description}</p>
                <p className="text-sm opacity-90 leading-relaxed">{product.details}</p>
                <div className="mt-4 text-sm text-gold/90 hover:text-gold">
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