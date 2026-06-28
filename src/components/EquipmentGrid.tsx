"use client";

import { useState } from "react";

const equipment = [
  {
    name: "Equipment",
    description: "High-performance strength training zone and equipment.",
    image: "/724242197_1343948297662899_8703094555014951804_n.jpg",
  },
  {
    name: "Equipment",
    description: "Heavy-duty plates and premium lifting platform.",
    image: "/724769931_862208840280354_5787744177744767005_n.jpg",
  },
  {
    name: "Equipment",
    description: "Ergonomic adjustable bench and gym layout.",
    image: "/726145302_1924577684875059_4906762039111171800_n.jpg",
  },
  {
    name: "Equipment",
    description: "Professional-grade power racks and safety bars.",
    image: "/726220149_1437485878397570_8084326434437458303_n.jpg",
  },
  {
    name: "Equipment",
    description: "Durable workout systems for comprehensive workouts.",
    image: "/726307317_4555552628007456_804993713745217278_n.jpg",
  },
  {
    name: "Equipment",
    description: "Premium selectorized machines for isolated training.",
    image: "/726372776_1623201652114377_6073587374626772845_n.jpg",
  },
  {
    name: "Equipment",
    description: "Multi-functional cables and attachment systems.",
    image: "/726420026_960964920258141_2677564094402725951_n.jpg",
  },
  {
    name: "Equipment",
    description: "High-quality dumbbells and free weight station.",
    image: "/726524748_1335284584683287_8067734599039890826_n.jpg",
  },
  {
    name: "Equipment",
    description: "Cardio zones and dynamic conditioning gear.",
    image: "/726524825_2472395939944821_2951737215843792809_n.jpg",
  },
  {
    name: "Equipment",
    description: "Lifting cage built for safety and heavy loading.",
    image: "/726563943_1404099381573000_1072421443444340937_n.jpg",
  },
  {
    name: "Equipment",
    description: "High-impact athletic rubber flooring and space.",
    image: "/726808341_896487919397121_6426763146360900506_n.jpg",
  },
  {
    name: "Equipment",
    description: "Double pulley cross-overs for versatile exercises.",
    image: "/726953855_1002463835868933_6805306245692288273_n.jpg",
  },
  {
    name: "Equipment",
    description: "Advanced machine press for safe muscle isolation.",
    image: "/727000956_1457383916422902_3647181175873383346_n.jpg",
  },
  {
    name: "Equipment",
    description: "Functional fitness zone for group and solo sessions.",
    image: "/727988914_1053666493851750_919158918066466505_n.jpg",
  },
  {
    name: "Equipment",
    description: "Solid Olympic weight plates in multiple increments.",
    image: "/728420150_1324579185989352_3564411917288991322_n.jpg",
  },
  {
    name: "Equipment",
    description: "Precision-engineered barbells for smooth rotation.",
    image: "/728511758_989900007198792_654629468799625369_n.jpg",
  },
  {
    name: "Equipment",
    description: "Dedicated lifting platforms for power exercises.",
    image: "/729616128_1319304013198062_966035683930808642_n.jpg",
  },
  {
    name: "Equipment",
    description: "High-density squat stands and rack configurations.",
    image: "/730353642_1514657053489551_2616333730769361982_n.jpg",
  },
];

export default function EquipmentGrid() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const displayedEquipment = isExpanded ? equipment : equipment.slice(0, 3);

  return (
    <>
      <div className="grid gap-8 md:grid-cols-3">
        {displayedEquipment.map((item) => (
          <div 
            key={item.image} 
            onClick={() => setSelectedImage(item.image)}
            className="group relative overflow-hidden rounded-lg bg-zinc-950 border border-zinc-900 h-[380px] flex flex-col justify-end transition-all duration-500 hover:border-yellow-400/50 hover:shadow-lg hover:shadow-yellow-400/5 hover:-translate-y-1 cursor-pointer"
          >
            {/* Image Container (Expands to h-full on hover) */}
            <div className="absolute top-0 left-0 w-full h-48 z-0 overflow-hidden transition-all duration-500 ease-out group-hover:h-full">
              <img 
                src={item.image} 
                alt={item.name} 
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />
              {/* Gradient overlay when hovered */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-500" />
            </div>

            {/* Text Content (Always visible, background becomes transparent overlay on hover) */}
            <div className="relative z-10 bg-zinc-950 p-6 h-[188px] flex flex-col justify-center transition-colors duration-500 group-hover:bg-zinc-950/60 backdrop-blur-[0px] group-hover:backdrop-blur-xs">
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {equipment.length > 3 && (
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="rounded-lg bg-yellow-400 hover:bg-yellow-500 text-zinc-950 px-8 py-3 text-sm font-black tracking-widest transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg shadow-yellow-400/10 border border-yellow-400"
          >
            {isExpanded ? "SHOW LESS" : "SEE ALL EQUIPMENT"}
          </button>
        </div>
      )}

      {/* Lightbox Modal Overlay */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)} 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xs p-4 cursor-zoom-out animate-in fade-in duration-300"
        >
          <div className="relative max-w-4xl max-h-[85vh] w-full flex items-center justify-center">
            {/* Close button */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
              className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-950/80 border border-zinc-900 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              aria-label="Close lightbox"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Lightbox Image */}
            <img 
              src={selectedImage} 
              alt="Equipment Preview" 
              className="max-w-full max-h-[80vh] rounded-lg border border-zinc-900 object-contain shadow-2xl animate-in zoom-in-95 duration-300 cursor-default"
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image itself
            />
          </div>
        </div>
      )}
    </>
  );
}
