import BookingForm from "@/components/BookingForm";
import EquipmentGrid from "@/components/EquipmentGrid";

export default function Discover() {
  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <section className="relative overflow-hidden rounded-xl bg-zinc-950/85 p-8 md:p-12 border border-zinc-900 shadow-xl mb-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-45"
          style={{ 
            backgroundImage: "url('/focus.jpeg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/25 to-black/60" />

        <div className="relative z-20">
          <h2 className="mb-12 text-center text-4xl font-display font-black tracking-tighter text-zinc-100 uppercase">
            Explore Our <span className="text-yellow-400">Equipment</span>
          </h2>
          <EquipmentGrid />
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent my-16" />

      <section id="booking" className="relative overflow-hidden rounded-xl bg-zinc-950/85 p-8 border border-zinc-900 shadow-xl backdrop-blur-xs max-w-xl mx-auto">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-25"
          style={{ 
            backgroundImage: "url('/gympics.jpg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#050506]/95 via-[#050506]/50 to-[#050506]/95" />

        <div className="relative z-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-black tracking-tighter text-zinc-100 uppercase mb-4">
              Book a <span className="text-yellow-400">Session</span> With Us
            </h2>
            <p className="text-sm text-zinc-400 tracking-wide">Ready to start? Fill out the form below and we will contact you shortly.</p>
          </div>
          
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
