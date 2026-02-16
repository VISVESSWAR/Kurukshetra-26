import React from "react";

interface WorkshopCardProps {
  title: string;
  participants: string;
  description: string;
  image: string;
  onPrev?: () => void;
  onNext?: () => void;
}

export function WorkshopCard({
  title,
  participants,
  description,
  image,
  onPrev,
  onNext,
}: WorkshopCardProps) {
  return (
    <div
      className="relative w-full max-w-[1100px] rounded-[22px] border border-purple-400/40 backdrop-blur-xl bg-black/40 overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(168,85,247,0.25)" }}
    >
      {/* Tabs */}
      <div className="flex flex-wrap gap-3 px-5 pt-5">
        <button className="px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white">
          📝 Description
        </button>
        {["📋 Prerequisites", "👥 Speakers", "🚶 Takeaways", "🕐 Schedule", "👤 Contact"].map(
          (tab) => (
            <button
              key={tab}
              className="px-4 py-2 rounded-full text-sm font-semibold bg-black/40 border border-white/15 text-white/80"
            >
              {tab}
            </button>
          )
        )}
      </div>

      {/* Content */}
      <div className="grid md:grid-cols-[240px,1fr] gap-6 px-5 py-6">
        {/* Image */}
        <div className="rounded-[16px] border border-cyan-400/40 bg-gradient-to-br from-cyan-400/20 to-transparent flex items-center justify-center p-4">
          <img src={image} alt={title} className="max-h-[160px] object-contain" />
        </div>

        {/* Text */}
        <div className="relative pr-12">
          {/* Arrows */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-3">
            <button onClick={onPrev} className="w-9 h-9 rounded-full bg-black/50 border border-white/20 text-white">‹</button>
            <button onClick={onNext} className="w-9 h-9 rounded-full bg-black/50 border border-white/20 text-white">›</button>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-white">{title}</h3>
          <p className="text-sm text-white/70 mb-3">Participation: {participants}</p>

          {/* Description */}
          <p className="text-sm leading-relaxed text-white/90">{description}</p>
        </div>
      </div>
    </div>
  );
}