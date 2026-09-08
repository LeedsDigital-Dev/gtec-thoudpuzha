import React from "react";
import {
  MapPin,
  Navigation,
  ExternalLink,
  Plus,
  Minus,
  Layers,
  Star,
} from "lucide-react";

interface FooterMapProps {
  mapsUrl?: string | null;
  mapEmbedUrl?: string | null;
  address?: string | null;
  title?: string;
}

export function FooterMap({
  mapsUrl = "https://maps.google.com/?q=G-TEC+Computer+Education,+Near+Municipal+Office,+Thodupuzha,+Kerala+685584",
  mapEmbedUrl,
  address = "Near Municipal Office, Thodupuzha, Idukki, Kerala – 685584",
  title = "G-TEC Computer Education",
}: FooterMapProps) {
  const targetUrl =
    mapsUrl ||
    "https://maps.google.com/?q=G-TEC+Computer+Education,+Near+Municipal+Office,+Thodupuzha,+Kerala+685584";

  return (
    <div className="space-y-4 text-left">
      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-sky-400 inline-block" />
        <span>Find Us On Google Maps</span>
      </h3>

      {/* Realistic Google Map Card Container */}
      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#14283f] shadow-lg group transition-all duration-300 hover:border-sky-400/40">
        {mapEmbedUrl ? (
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="180"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="G-TEC Thodupuzha Location"
            className="w-full h-44 object-cover"
          />
        ) : (
          /* Realistic Styled Google Map Interface with Thodupuzha Vector Landmark Grid */
          <div className="relative h-44 w-full bg-[#e5e3df] dark:bg-[#1a2b3c] overflow-hidden select-none">
            {/* Map Terrain / River / Roads Visual Graphic */}
            <svg
              className="absolute inset-0 size-full opacity-80"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 320 180"
              preserveAspectRatio="none"
            >
              {/* Land background */}
              <rect width="320" height="180" fill="#203348" />

              {/* Thodupuzha River Curve */}
              <path
                d="M-20,120 Q80,90 160,130 T340,110"
                fill="none"
                stroke="#155e75"
                strokeWidth="14"
                strokeLinecap="round"
                opacity="0.85"
              />
              <path
                d="M-20,120 Q80,90 160,130 T340,110"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2"
                opacity="0.4"
              />

              {/* Major Roads */}
              {/* SH 8 / Pala-Thodupuzha Rd */}
              <path
                d="M40,-10 L130,90 L260,190"
                stroke="#475569"
                strokeWidth="7"
                fill="none"
              />
              <path
                d="M40,-10 L130,90 L260,190"
                stroke="#94a3b8"
                strokeWidth="3.5"
                fill="none"
              />

              {/* Municipal Office Cross Road */}
              <path
                d="M0,75 L320,70"
                stroke="#475569"
                strokeWidth="5"
                fill="none"
              />
              <path
                d="M0,75 L320,70"
                stroke="#cbd5e1"
                strokeWidth="2.5"
                fill="none"
              />

              {/* River View Link Rd */}
              <path
                d="M130,90 L80,180"
                stroke="#475569"
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M130,90 L80,180"
                stroke="#cbd5e1"
                strokeWidth="2"
                fill="none"
              />

              {/* Nearby Buildings / Blocks */}
              <rect
                x="60"
                y="20"
                width="30"
                height="22"
                rx="2"
                fill="#2a4365"
                opacity="0.7"
              />
              <rect
                x="150"
                y="30"
                width="40"
                height="28"
                rx="2"
                fill="#2a4365"
                opacity="0.7"
              />
              <rect
                x="190"
                y="95"
                width="36"
                height="32"
                rx="2"
                fill="#2a4365"
                opacity="0.7"
              />
              <rect
                x="40"
                y="110"
                width="35"
                height="25"
                rx="2"
                fill="#2a4365"
                opacity="0.7"
              />

              {/* Municipal Office Landmark Label */}
              <text
                x="20"
                y="65"
                fill="#94a3b8"
                fontSize="7.5"
                fontWeight="bold"
                fontFamily="sans-serif"
              >
                Municipal Office
              </text>
              <text
                x="210"
                y="85"
                fill="#94a3b8"
                fontSize="7"
                fontFamily="sans-serif"
              >
                Pala Rd
              </text>
              <text
                x="170"
                y="155"
                fill="#38bdf8"
                fontSize="7"
                fontWeight="600"
                fontFamily="sans-serif"
              >
                Thodupuzha River
              </text>
            </svg>

            {/* Google Maps Style UI Controls */}
            {/* Top Left: Map / Satellite switcher */}
            <div className="absolute top-2 left-2 flex items-center rounded-md bg-[#0f172a]/90 border border-white/20 px-2 py-1 text-[10px] font-semibold text-white shadow-xs backdrop-blur-xs">
              <Layers className="size-3 mr-1 text-sky-400" />
              <span>Map</span>
            </div>

            {/* Top Right: Zoom controls */}
            <div className="absolute top-2 right-2 flex flex-col rounded-md bg-[#0f172a]/90 border border-white/20 shadow-xs backdrop-blur-xs">
              <button
                type="button"
                tabIndex={-1}
                aria-label="Zoom in"
                className="p-1 text-white/80 hover:text-white border-b border-white/10"
              >
                <Plus className="size-3" />
              </button>
              <button
                type="button"
                tabIndex={-1}
                aria-label="Zoom out"
                className="p-1 text-white/80 hover:text-white"
              >
                <Minus className="size-3" />
              </button>
            </div>

            {/* Center G-TEC Location Pin with Pulsating Beacon */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[85%] flex flex-col items-center pointer-events-none z-10">
              {/* Radar pulse */}
              <span className="absolute bottom-1 size-7 rounded-full bg-red-500/30 animate-ping" />
              <span className="absolute bottom-2 size-3.5 rounded-full bg-red-600/40" />

              {/* Pin Icon */}
              <div className="relative flex items-center justify-center size-8 rounded-full bg-red-600 text-white shadow-lg border-2 border-white transform transition-transform group-hover:scale-110">
                <MapPin className="size-4.5 fill-white text-red-600" />
              </div>
            </div>

            {/* Location Info Banner at bottom inside map */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#0b1f33] via-[#0b1f33]/90 to-transparent p-2.5 pt-4">
              <div className="flex items-center justify-between text-[11px] text-white">
                <div className="truncate pr-2">
                  <p className="font-bold text-white truncate">{title}</p>
                  <p className="text-[10px] text-slate-300 truncate">
                    Thodupuzha, Kerala
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0 bg-amber-500/20 border border-amber-400/30 px-1.5 py-0.5 rounded text-[10px] text-amber-300 font-bold">
                  <Star className="size-2.5 fill-amber-400 text-amber-400" />
                  <span>4.9</span>
                </div>
              </div>
            </div>

            {/* Google Watermark */}
            <div className="absolute bottom-1 right-2 text-[9px] font-sans font-medium text-white/50 tracking-wider">
              Google
            </div>
          </div>
        )}
      </div>

      {/* Location Details Text */}
      <div className="text-xs text-slate-300 leading-snug space-y-0.5">
        <p className="font-bold text-white">{title}</p>
        <p className="text-slate-300">{address}</p>
      </div>

      {/* "Get Directions" CTA Button */}
      <a
        href={targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="footer-location-link"
        aria-label={`Get Directions to ${title} on Google Maps`}
        className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 hover:bg-sky-400 px-4 py-2.5 text-xs sm:text-sm font-bold text-slate-950 shadow-md transition-all duration-200 hover:shadow-lg active:scale-[0.99]"
      >
        <Navigation className="size-4 transition-transform duration-200 group-hover:rotate-12" />
        <span>Get Directions</span>
        <ExternalLink className="size-3.5 opacity-70 group-hover:opacity-100 ml-1" />
      </a>
    </div>
  );
}
