import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="container mx-auto pt-28 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="mb-16 text-center text-4xl font-display font-black tracking-tighter text-zinc-100 uppercase">
          Meet the <span className="text-yellow-400">Owner</span>
        </h2>

        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-yellow-400 to-zinc-900 opacity-20 blur transition duration-1000 group-hover:opacity-60 group-hover:duration-200" />
            <div className="relative overflow-hidden rounded-lg bg-zinc-950 ring-1 ring-zinc-900">
              <img 
                src="/OWNER.jpg" 
                alt="Gym Owner" 
                className="w-full h-[500px] object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-yellow-400">Founder & Head Coach</span>
              <h3 className="text-3xl font-display font-black text-zinc-100 mb-2 tracking-tight">COACH MARCO</h3>
              <p className="text-sm font-semibold text-yellow-400 tracking-wide mb-6 uppercase">
                &quot;Your BODY SPEAKS who you are. Love your body, be body proud.&quot;
              </p>
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
                  <p className="text-zinc-100 font-bold text-sm tracking-wide">09853787222</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-yellow-400/50 transition-colors">
                  <Mail className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Email Me</p>
                  <p className="text-zinc-100 font-bold text-sm tracking-wide">gymkoto3@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-950 border border-zinc-900 group-hover:border-yellow-400/50 transition-colors">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest">Our Location</p>
                  <p className="text-zinc-100 font-bold text-sm tracking-wide">Biga, Villa Adella</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
