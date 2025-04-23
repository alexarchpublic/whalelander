import { useEffect, useRef } from 'react';

interface Product {
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

const products: Product[] = [
  {
    title: "Rolex Submariner Date",
    description: "The iconic Submariner Date in steel and gold (126613LB), featuring a royal blue dial and Cerachrom bezel.",
    imageUrl: "/images/rolex-bluesy.png",
    link: "https://www.rolex.com/watches/submariner/m126613lb-0002"
  },
  {
    title: "Louis Vuitton Watch Case",
    description: "Elegant watch travel case in iconic Monogram canvas, perfect for the discerning collector.",
    imageUrl: "/images/lv-watch-case.png",
    link: "https://www.louisvuitton.com/eng-us/watches/watch-accessories"
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

    const intervalId = setInterval(scroll, 30);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-white/50 backdrop-blur-sm py-12">
      <div 
        ref={scrollRef}
        className="flex gap-8 overflow-x-hidden whitespace-nowrap"
        style={{ scrollBehavior: 'smooth' }}
      >
        {allProducts.map((product, index) => (
          <div
            key={`${product.title}-${index}`}
            className="inline-flex flex-col min-w-[300px] max-w-[400px]"
          >
            <a 
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="text-lg font-bold mb-2">{product.title}</h3>
                <p className="text-sm opacity-90">{product.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}; 