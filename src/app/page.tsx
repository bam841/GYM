import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex min-h-[calc(100vh-64px)] flex-col items-center justify-center overflow-hidden">
      {/* Background Placeholder Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-40 transition-opacity duration-1000"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')",
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-zinc-950/20 via-zinc-950/60 to-zinc-950" />

      <div className="container relative z-20 px-4 text-center">
        <h1 className="mb-6 text-6xl font-black tracking-tighter text-zinc-100 md:text-8xl">
          PUSH YOUR <span className="text-orange-500">LIMITS</span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg font-medium text-zinc-400 md:text-xl">
          Find Your Strength and transform your life with our state-of-the-art facilities and professional guidance.
        </p>
        <Link
          href="/discover"
          className="inline-block rounded-full bg-orange-500 px-8 py-4 text-lg font-bold text-zinc-950 transition-transform hover:scale-105 active:scale-95"
        >
          BOOK A SESSION NOW
        </Link>
      </div>
    </div>
  );
}
