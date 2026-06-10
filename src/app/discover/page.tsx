import BookingForm from "@/components/BookingForm";

const equipment = [
  {
    name: "Treadmills",
    description: "High-performance running machines with incline control.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Free Weights",
    description: "Wide range of dumbbells and kettlebells for all levels.",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2adfcd?q=80&w=2070&auto=format&fit=crop",
  },
  {
    name: "Bench Press",
    description: "Professional Olympic benches and power racks.",
    image: "https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?q=80&w=2070&auto=format&fit=crop",
  },
];

export default function Discover() {
  return (
    <div className="container mx-auto py-16 px-4">
      <section className="mb-20">
        <h2 className="mb-12 text-center text-4xl font-black tracking-tighter text-zinc-100 uppercase">
          Explore Our <span className="text-orange-500">Equipment</span>
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          {equipment.map((item) => (
            <div key={item.name} className="group overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 transition-all hover:border-orange-500/50">
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-zinc-100">{item.name}</h3>
                <p className="text-zinc-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-zinc-800 to-transparent my-16" />

      <section id="booking" className="max-w-xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black tracking-tighter text-zinc-100 uppercase mb-4">
            Book a <span className="text-orange-500">Session</span> With Us
          </h2>
          <p className="text-zinc-400">Ready to start? Fill out the form below and we will contact you shortly.</p>
        </div>
        
        <div className="rounded-3xl bg-zinc-900 p-8 border border-zinc-800 shadow-2xl">
          <BookingForm />
        </div>
      </section>
    </div>
  );
}
