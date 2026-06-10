import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-16 text-center text-4xl font-black tracking-tighter text-zinc-100 uppercase">
          Meet the <span className="text-orange-500">Owner</span>
        </h2>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-orange-500 to-zinc-800 opacity-25 blur transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
            <div className="relative overflow-hidden rounded-2xl bg-zinc-900 ring-1 ring-zinc-800">
              <img 
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
                alt="Gym Owner" 
                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-3xl font-black text-zinc-100 mb-4 tracking-tight">COACH MARCO</h3>
              <p className="text-lg text-zinc-400 leading-relaxed italic">
                "I started this gym to help our community reach their peak physical health. With over 10 years of experience in strength training, I believe fitness is more than just lifting weights—it is a lifestyle."
              </p>
            </div>

            <div className="space-y-6 pt-6">
              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/50 transition-colors">
                  <Phone className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Call Me</p>
                  <p className="text-zinc-100 font-medium">+63 912 345 6789</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/50 transition-colors">
                  <Mail className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Me</p>
                  <p className="text-zinc-100 font-medium">marco@localgym.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 group-hover:border-orange-500/50 transition-colors">
                  <MapPin className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Our Location</p>
                  <p className="text-zinc-100 font-medium">123 Fitness St, Manila, Philippines</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
