import { EntryForm } from "@/components/EntryForm";
import { PrizeCard } from "@/components/PrizeCard";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F1F0FB] via-white to-[#D3E4FD] font-inter text-gray-800">
      {/* Hero Section */}
      <section className="relative py-20 px-6 text-center max-w-6xl mx-auto overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gold/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gold-light/20 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
            You're Almost In!
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-800">
            Win a Rolex, Louis Vuitton Set, and $25,000 Arch Public Concierge Package!
          </p>
          <p className="text-lg text-gray-600 mb-12">
            Scan the QR code to enter — exclusive to Whale Pass holders at the BTC Conference in Las Vegas.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 px-6 bg-white/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-playfair mb-8">Enter your details below to claim your entry:</h2>
          <EntryForm />
        </div>
      </section>

      {/* Prizes Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair text-center mb-12">Exclusive Prizes</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PrizeCard
              title="Rolex Bluesy"
              description="The iconic Submariner Date in steel and gold, a timeless symbol of luxury."
              imageUrl="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5"
            />
            <PrizeCard
              title="Louis Vuitton Travel Set"
              description="Travel in style with a complete set of luxury luggage."
              imageUrl="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05"
            />
            <PrizeCard
              title="$25k Concierge Package"
              description="Exclusive access to Arch Public's premium concierge services."
              imageUrl="https://images.unsplash.com/photo-1500375592092-40eb2168fd21"
            />
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-2xl font-playfair mb-8">Giveaway Details</h2>
          <p>Winners drawn live on May 29th at the BTC Conference in Las Vegas.</p>
          <p>The $25,000 Concierge Program winner announced during a private VIP Zoom event with special guest John Deaton.</p>
          <p className="text-gold font-semibold italic">
            "Good luck, Whale. You're already elite — now it's time to level up."
          </p>
        </div>
      </section>

      {/* Legal Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Separator className="mb-8" />
          <div className="text-sm text-gray-500 space-y-4">
            <p>Rolex SA and Louis Vuitton are not affiliated with, nor do they endorse, this giveaway.</p>
            <p>No purchase necessary. Must be a Whale Pass holder to enter. One entry per person.</p>
            <p>Entries close at 11:59 PM PT on May 28, 2025.</p>
            <p>The Concierge Program is subject to Arch Public's standard licensing and compliance agreements.</p>
            <p>By entering, you agree to receive marketing updates from Arch Public and Gemini (unsubscribe anytime).</p>
            <p><a href="#" className="text-gold hover:underline">View full terms and privacy policy</a></p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-gray-900 text-white text-center">
        <p className="font-playfair">Exclusive to Whale Pass holders. See you in Las Vegas!</p>
      </footer>
    </div>
  );
};

export default Index;
