import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import { Mail, Phone, MapPin } from "lucide-react";

const equipment = [
  {
    name: "Strength Equipment",
    description: "Premium power racks, Olympic barbells, and plate-loaded machines.",
    image: "/gymequipment.jpg",
  },
  {
    name: "Full Gym Facilities",
    description: "Vibrant and energetic lifting zones designed to maximize your gains.",
    image: "/gympics.jpg",
  },
  {
    name: "Cardio & Conditioning",
    description: "High-performance treadmills and endurance training systems.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Home() {
  return (
    <div className="h-screen w-full overflow-y-auto snap-y snap-mandatory scroll-smooth bg-[#050506]">
      
      {/* SECTION 1: HERO */}
      <section id="hero" className="relative flex h-screen w-full snap-start snap-always flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000"
          style={{ 
            backgroundImage: "url('/gymkotolanding_page.jpg')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/25 via-black/80 to-black" />

        <div className="container relative z-20 px-4 text-center max-w-4xl">
          <span className="mb-4 block text-xs font-black uppercase tracking-[0.25em] text-yellow-400 md:text-sm">
            WELCOME TO GYM KO TO FITNESS GYM
          </span>
          <h1 className="mb-6 text-5xl font-display font-black tracking-tighter text-zinc-100 sm:text-7xl md:text-8xl lg:text-9xl uppercase leading-none">
            PUSH YOUR <span className="text-yellow-400">LIMITS</span>
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-sm font-semibold tracking-wide uppercase text-zinc-400 md:text-base">
            Find Your Strength and transform your life with our state-of-the-art facilities and professional guidance.
          </p>
          <Link
            href="#booking"
            className="inline-block rounded-lg bg-yellow-400 px-8 py-4 text-sm font-black tracking-widest text-zinc-950 shadow-lg shadow-yellow-400/10 border border-yellow-400 transition-all hover:bg-yellow-500 hover:scale-[1.03] active:scale-[0.97]"
          >
            BOOK A SESSION NOW
          </Link>
        </div>
      </section>

      {/* SECTION 2: EXPLORE EQUIPMENT */}
      <section id="equipment" className="relative flex min-h-screen w-full snap-start snap-always flex-col justify-center items-center bg-black py-20 md:py-0 px-4 border-t border-zinc-950">
        <div className="container mx-auto max-w-6xl">
          <h2 className="mb-12 text-center text-4xl font-display font-black tracking-tighter text-zinc-100 uppercase">
            Explore Our <span className="text-yellow-400">Equipment</span>
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {equipment.map((item) => (
              <div key={item.name} className="group overflow-hidden rounded-lg bg-zinc-950 border border-zinc-900 transition-all duration-300 hover:border-yellow-400/45 hover:-translate-y-1">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-bold text-zinc-100 tracking-tight">{item.name}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: BOOK A SESSION */}
      <section id="booking" className="relative flex min-h-screen w-full snap-start snap-always flex-col justify-center items-center bg-[#050506] py-20 md:py-0 px-4 border-t border-zinc-950">
        <div className="container mx-auto max-w-xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-display font-black tracking-tighter text-zinc-100 uppercase mb-4">
              Book a <span className="text-yellow-400">Session</span> With Us
            </h2>
            <p className="text-sm text-zinc-400 tracking-wide">Ready to start? Fill out the form below and we will contact you shortly.</p>
          </div>
          
          <div className="rounded-xl bg-black p-8 border border-zinc-900 shadow-xl">
            <BookingForm />
          </div>
        </div>
      </section>

      {/* SECTION 4: MEET THE OWNER / CONTACT */}
      <section id="contact" className="relative flex min-h-screen w-full snap-start snap-always flex-col justify-center items-center bg-black py-20 md:py-0 px-4 border-t border-zinc-950">
        <div className="container mx-auto max-w-4xl">
          <h2 className="mb-16 text-center text-4xl font-display font-black tracking-tighter text-zinc-100 uppercase">
            Meet the <span className="text-yellow-400">Owner</span>
          </h2>

          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400 to-zinc-900 opacity-20 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200" />
              <div className="relative overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-zinc-900">
                <img 
                  src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
                  alt="Gym Owner" 
                  className="w-full h-[350px] md:h-[450px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Founder & Head Coach</span>
                <h3 className="text-3xl font-display font-black text-zinc-100 mb-4 tracking-tight">COACH MARCO</h3>
                <p className="text-base text-zinc-400 leading-relaxed italic">
                  &quot;I started GYM KO TO FITNESS GYM to help our local community reach their peak physical health. With over 10 years of experience in strength training, I believe fitness is more than just lifting weights—it is a lifestyle.&quot;
                </p>
              </div>

              <div className="space-y-4 pt-6 border-t border-zinc-900">
                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-yellow-400/50 transition-colors">
                    <Phone className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Call Me</p>
                    <p className="text-zinc-100 font-bold text-sm tracking-wide">+63 912 345 6789</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-yellow-400/50 transition-colors">
                    <Mail className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Email Me</p>
                    <p className="text-zinc-100 font-bold text-sm tracking-wide">marco@gymkotofitness.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 group">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-yellow-400/50 transition-colors">
                    <MapPin className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Our Location</p>
                    <p className="text-zinc-100 font-bold text-sm tracking-wide">123 Fitness St, Manila, Philippines</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
