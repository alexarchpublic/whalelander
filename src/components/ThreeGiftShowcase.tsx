import React, { useEffect, useState } from "react";

const gifts = [
  {
    title: "Rolex Submariner Date",
    description: "41mm Oystersteel and yellow gold with blue ceramic bezel.",
    images: [
      "/images/Rolex-1.jpg",
      "/images/Rolex-2.jpg",
      "/images/Rolex-3.jpg",
      "/images/Rolex-4.jpg"
    ]
  },
  {
    title: "Louis Vuitton Luggage",
    description: "Classic Monogram canvas trunk with brass hardware.",
    images: [
      "/images/Louis-Vuitton-Luggage-1.jpg",
      "/images/Louis-Vuitton-Luggage-2.jpg",
      "/images/Louis-Vuitton-Luggage-3.jpg",
      "/images/Louis-Vuitton-Luggage-4.jpg",
      "/images/Louis-Vuitton-Luggage-5.jpg"
    ]
  },
  {
    title: "Louis Vuitton 8 Watch Case",
    description: "Monogram canvas trunk-style case with luxurious microfiber lining.",
    images: [
      "/images/Louis-Vuitton-Watch-Case-1.jpg",
      "/images/Louis-Vuitton-Watch-Case-2.jpg",
      "/images/Louis-Vuitton-Watch-Case-3.jpg"
    ]
  }
];

export const ThreeGiftShowcase = () => {
  const [indices, setIndices] = useState(Array(gifts.length).fill(0));

  useEffect(() => {
    const interval = setInterval(() => {
      setIndices((prev) =>
        prev.map((idx, i) => {
          const numImages = gifts[i].images.length;
          return numImages > 1 ? (idx + 1) % numImages : 0;
        })
      );
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const isVideo = (src: string) => src.endsWith('.mp4') || src.endsWith('.webm');

  return (
    <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full">
      {gifts.map((gift, i) => (
        <div
          key={gift.title}
          className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col items-center"
        >
          <div className="aspect-video w-full max-w-xs mb-4 overflow-hidden rounded-lg flex items-center justify-center bg-gray-50">
            {isVideo(gift.images[indices[i]]) ? (
              <video
                src={gift.images[indices[i]]}
                className="w-full h-full object-cover transition-all duration-700"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <img
                src={gift.images[indices[i]]}
                alt={gift.title}
                className="w-full h-full object-contain transition-all duration-700"
                loading="lazy"
              />
            )}
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">{gift.title}</h3>
          <p className="text-sm text-gray-600 text-center">{gift.description}</p>
        </div>
      ))}
    </div>
  );
}; 