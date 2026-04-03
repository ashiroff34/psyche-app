"use client";

export default function LogoPreview() {
  // Reusable ouroboros SVG matching the reference, snake biting its tail, visible head with eye, overlapping body
  const Ouroboros = ({ size = 32, color = "white", strokeW = 2 }: { size?: number; color?: string; strokeW?: number }) => (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      {/* Main body circle — slight overlap where head meets tail */}
      <path
        d="M32 8 C46 8 56 18 56 32 C56 46 46 56 32 56 C18 56 8 46 8 32 C8 18 17 9 28 8"
        stroke={color}
        strokeWidth={strokeW}
        fill="none"
        strokeLinecap="round"
      />
      {/* Inner overlap — tail going under the head */}
      <path
        d="M28 8 C24 8.5 20 10 17 13"
        stroke={color}
        strokeWidth={strokeW * 0.7}
        fill="none"
        strokeLinecap="round"
        opacity={0.5}
      />
      {/* Snake head — wider, biting down on tail */}
      <path
        d="M28 7 L32 4 L36 7 L34 9 Q32 11 29 9 Z"
        fill={color}
        stroke={color}
        strokeWidth={strokeW * 0.3}
        strokeLinejoin="round"
      />
      {/* Jaw/mouth opening — biting the tail */}
      <path
        d="M29 9 L32 11 L35 9"
        stroke={color}
        strokeWidth={strokeW * 0.5}
        fill="none"
        strokeLinecap="round"
      />
      {/* Eye */}
      <circle cx="31" cy="6" r="1" fill={color === "white" ? "rgba(99,102,241,0.8)" : "white"} />
      {/* Nostril */}
      <circle cx="33.5" cy="5" r="0.5" fill={color === "white" ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.6)"} />
    </svg>
  );

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-serif font-bold text-slate-900 mb-2">Ouroboros Logo, Round 2</h1>
      <p className="text-slate-500 mb-8">Closer to the reference, snake with visible head biting its tail. Same sky-to-indigo colors.</p>

      <div className="grid grid-cols-2 gap-8 max-w-2xl">

        {/* Option A: Gradient rounded square */}
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-slate-200 bg-slate-50">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-200/50">
            <Ouroboros size={36} color="white" strokeW={2.2} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center">
              <Ouroboros size={20} color="white" strokeW={2.8} />
            </div>
            <span className="text-lg font-serif font-semibold text-slate-800">Thyself</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">A, Gradient square</span>
        </div>

        {/* Option B: Gradient circle */}
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-slate-200 bg-slate-50">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-200/50">
            <Ouroboros size={38} color="white" strokeW={2} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center">
              <Ouroboros size={22} color="white" strokeW={2.5} />
            </div>
            <span className="text-lg font-serif font-semibold text-slate-800">Thyself</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">B, Gradient circle</span>
        </div>

        {/* Option C: White background, colored snake */}
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-slate-200 bg-slate-50">
          <div className="w-16 h-16 rounded-2xl bg-white border-2 border-indigo-200 flex items-center justify-center shadow-sm">
            <Ouroboros size={36} color="#4f46e5" strokeW={2} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-white border-2 border-indigo-200 flex items-center justify-center">
              <Ouroboros size={20} color="#4f46e5" strokeW={2.5} />
            </div>
            <span className="text-lg font-serif font-semibold text-slate-800">Thyself</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">C, Outlined (indigo on white)</span>
        </div>

        {/* Option D: Dark background, white snake */}
        <div className="flex flex-col items-center gap-4 p-8 rounded-3xl border border-slate-200 bg-slate-50">
          <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-400/30">
            <Ouroboros size={36} color="white" strokeW={2} />
          </div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center">
              <Ouroboros size={20} color="white" strokeW={2.5} />
            </div>
            <span className="text-lg font-serif font-semibold text-slate-800">Thyself</span>
          </div>
          <span className="text-xs text-slate-400 font-medium">D, White on dark</span>
        </div>
      </div>

      <p className="text-slate-400 text-sm mt-8">Tell me A, B, C, or D!</p>
    </div>
  );
}
