import { EntryForm } from "@/components/EntryForm";
import { ProductCarousel } from "@/components/ProductCarousel";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  return (
    <div className="min-h-screen font-inter text-gray-800 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7931A] via-[#FFFFFF] to-[#FDB455] opacity-10 animate-gradient-1"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#F7931A] via-[#FFFFFF] to-[#FDB455] opacity-10 animate-gradient-2"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F7931A] via-[#FFFFFF] to-[#FDB455] opacity-10 animate-gradient-3"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header Logo */}
        <div className="absolute top-8 right-8 z-20">
          <img 
            src="/images/arch-public-logo.png" 
            alt="Arch Public"
            className="h-12 w-auto"
          />
        </div>

        {/* Hero Section */}
        <section className="relative py-20 px-6 text-center max-w-6xl mx-auto">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6 bg-gradient-to-r from-[#F7931A] to-[#FDB455] bg-clip-text text-transparent">
              You're Almost In!
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-800">
              Win a Rolex, Louis Vuitton Set, and $25,000 Arch Public Concierge Package!
            </p>
          </div>
        </section>

        {/* Prize Carousel Section */}
        <section className="py-8">
          <div className="max-w-[100vw] mx-auto">
            <ProductCarousel />
          </div>
        </section>

        {/* Form Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-playfair mb-8">Enter your details below to enter:</h2>
            <EntryForm />
          </div>
        </section>

        {/* Details Section */}
        <section className="py-16 px-6">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-2xl font-playfair mb-8">Giveaway Details</h2>
            <p>Winners drawn live on May 29th at the BTC Conference in Las Vegas.</p>
            <p>The winners will be announced during a private VIP Zoom event with special guest John Deaton.</p>
            <p className="text-[#F7931A] font-semibold italic">
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
              <p><a href="#" className="text-[#F7931A] hover:underline">View full terms and privacy policy</a></p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 bg-gray-900 bg-opacity-90">
          <div className="max-w-6xl mx-auto flex items-center justify-between text-white">
            <p className="font-playfair">Exclusive to Whale Pass holders. See you in Las Vegas!</p>
            <img 
              src="/images/arch-public-logo.png" 
              alt="Arch Public"
              className="h-8 w-auto"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
