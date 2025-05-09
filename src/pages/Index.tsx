import { EntryForm } from "@/components/EntryForm";
// import { ProductCarousel } from "@/components/ProductCarousel";
import { Separator } from "@/components/ui/separator";
import { ThreeGiftShowcase } from "../components/ThreeGiftShowcase";

const Index = () => {
  return (
    <div className="min-h-screen font-inter text-gray-800 relative">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#F7931A] via-[#FFFFFF] to-[#FDB455] opacity-10 animate-gradient-1 blur-[40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-[#F7931A] via-[#FFFFFF] to-[#FDB455] opacity-10 animate-gradient-2 blur-[40px]"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-[#F7931A] via-[#FFFFFF] to-[#FDB455] opacity-10 animate-gradient-3 blur-[40px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10">
        {/* Header Logo */}
        <div className="absolute top-8 right-8 z-20">
          <img 
            src="/images/Arch Public Logo Black.png" 
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

        {/* Promo Video Section */}
        <section className="w-full flex justify-center items-center bg-black">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full max-w-4xl h-auto object-cover rounded-lg shadow-lg"
            poster="/images/Rolex-1.jpg"
          >
            <source src="/images/Rolex-v1.webm" type="video/webm" />
            <source src="/images/Rolex-v1.mp4" type="video/mp4" />
            Sorry, your browser doesn't support embedded videos. Please use Chrome, Safari, or Firefox.
          </video>
        </section>

        {/* Three Gift Showcase Section */}
        <section className="py-8">
          <div className="max-w-6xl mx-auto">
            <ThreeGiftShowcase />
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

        {/* About Arch Public & Case Study Section */}
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-2xl font-playfair mb-4 text-gray-900">About Arch Public</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              <span className="font-semibold text-[#F7931A]">Arch Public</span> is a leader in algorithmic Bitcoin yield generation, empowering investors to grow their Bitcoin holdings without ever giving up custody or locking up their assets. Our proprietary Arbitrage Algorithm delivers industry-leading cash yields while keeping your Bitcoin safe and accessible at all times.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-8 mt-8">
              <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Why Choose Our Arbitrage Algorithm?</h3>
                <ul className="text-left text-gray-700 space-y-2 text-base mx-auto max-w-xs">
                  <li><span className="font-semibold text-[#F7931A]">Full Custody:</span> Your Bitcoin always remains in your control.</li>
                  <li><span className="font-semibold text-[#F7931A]">Zero Lockup:</span> No need to lock your assets—withdraw anytime.</li>
                  <li><span className="font-semibold text-[#F7931A]">Superior Returns:</span> Outperforms traditional buy & hold strategies, even in bear markets.</li>
                </ul>
              </div>
              <div className="flex-1 bg-white rounded-xl shadow-lg p-6 border border-gray-200 flex flex-col items-center justify-center">
                <h3 className="text-xl font-semibold mb-4 text-gray-900">Case Study Results</h3>
                <div className="grid grid-cols-2 gap-4 w-full max-w-xs">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-xs text-gray-500">Initial Capital</div>
                    <div className="text-xl font-bold text-gray-900">$100,000</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-xs text-gray-500">Final Portfolio Value</div>
                    <div className="text-xl font-bold text-[#22c55e]">$244,372</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-xs text-gray-500">CAGR</div>
                    <div className="text-xl font-bold text-[#22c55e]">25.77%</div>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="text-xs text-gray-500">Annual Yield (APY)</div>
                    <div className="text-xl font-bold text-[#22c55e]">20.32%</div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-600">No lockup. No loss of custody. Just superior Bitcoin yield.</div>
              </div>
            </div>
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
              src="/images/Arch Public Logo Black.png" 
              alt="Arch Public"
              className="h-8 w-auto invert"
            />
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
