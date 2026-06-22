import BookingForm from "@/components/BookingForm";

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

export default function Discover() {
  return (
    <div className="container mx-auto pt-24 pb-16 px-4">
      <section className="mb-20">
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
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-900 to-transparent my-16" />

      <section id="booking" className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-display font-black tracking-tighter text-zinc-100 uppercase mb-4">
            Book a <span className="text-yellow-400">Session</span> With Us
          </h2>
          <p className="text-sm text-zinc-400 tracking-wide">Ready to start? Fill out the form below and we will contact you shortly.</p>
        </div>
        
        <div className="rounded-xl bg-zinc-950 p-8 border border-zinc-900 shadow-xl">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
