import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const size = { width: 32, height: 32 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #7c3aed 0%, #5b21b6 50%, #4f46e5 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Inner glow */}
        <div style={{
          position: 'absolute',
          top: '-4px', left: '-4px',
          width: '24px', height: '24px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(196,181,253,0.35) 0%, transparent 70%)',
          display: 'flex',
        }} />
        {/* Core orb */}
        <div style={{
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(216,180,254,0.8) 50%, rgba(139,92,246,0.4) 100%)',
          boxShadow: '0 0 8px rgba(255,255,255,0.6), 0 0 16px rgba(139,92,246,0.8)',
          display: 'flex',
        }} />
        {/* Ring */}
        <div style={{
          position: 'absolute',
          width: '22px', height: '22px',
          borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.2)',
          display: 'flex',
        }} />
      </div>
    ),
    { width: 32, height: 32 }
  )
}
