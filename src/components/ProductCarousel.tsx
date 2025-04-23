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
    description: "41mm Oystersteel and yellow gold with blue ceramic bezel",
    imageUrl: "/images/rolex-bluesy.png",
    link: "https://www.rolex.com/en-us/watches/submariner/m126613lb-0002"
  },
  {
    title: "Louis Vuitton Watch Case",
    description: "Monogram canvas 3-watch case with microfiber lining",
    imageUrl: "/images/lv-watch-case.png",
    link: "https://us.louisvuitton.com/eng-us/products/3-watch-case-monogram-canvas-000727/M47530"
  }
];

// Create a longer array for seamless scrolling
const allProducts = [...products, ...products, ...products, ...products];

export const ProductCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Reset to first set of items when reaching middle
        if (scrollLeft >= (scrollWidth - clientWidth) / 2) {
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
              <div className="text-center mt-6">
                <h3 className="text-lg font-light tracking-wide mb-2">{product.title}</h3>
                <p className="text-sm font-light text-gray-600">{product.description}</p>
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