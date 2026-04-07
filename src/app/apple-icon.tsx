import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '180px',
          height: '180px',
          borderRadius: '40px',
          background: 'linear-gradient(145deg, #5b21b6 0%, #7c3aed 40%, #4f46e5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Depth glows */}
        <div style={{
          position: 'absolute', top: '-30px', left: '-30px',
          width: '160px', height: '160px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,181,253,0.22) 0%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-20px', right: '-20px',
          width: '120px', height: '120px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.16) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Outer ring */}
        <div style={{
          width: '136px', height: '136px', borderRadius: '50%',
          border: '1.5px solid rgba(255,255,255,0.18)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Middle ring */}
          <div style={{
            width: '98px', height: '98px', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.10)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Core orb */}
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.97) 0%, rgba(216,180,254,0.85) 40%, rgba(124,58,237,0.5) 100%)',
              boxShadow: '0 0 28px rgba(255,255,255,0.5), 0 0 56px rgba(139,92,246,0.9)',
              display: 'flex',
            }} />
          </div>

          {/* 9 type dots */}
          {[0,1,2,3,4,5,6,7,8].map((i) => {
            const angle = (i * 40 - 90) * (Math.PI / 180)
            const r = 68
            const cx = 88 + r * Math.cos(angle)
            const cy = 88 + r * Math.sin(angle)
            const colors = ['#a78bfa','#f472b6','#fb923c','#facc15','#34d399','#22d3ee','#818cf8','#e879f9','#f87171']
            return (
              <div key={i} style={{
                position: 'absolute',
                left: `${cx - 5}px`, top: `${cy - 5}px`,
                width: '10px', height: '10px', borderRadius: '50%',
                background: colors[i],
                boxShadow: `0 0 8px ${colors[i]}cc`,
                display: 'flex',
              }} />
            )
          })}
        </div>
      </div>
    ),
    { width: 180, height: 180 }
  )
}
