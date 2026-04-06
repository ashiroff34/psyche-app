import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Thyself — Know thyself.'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#08031a',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* ── Deep background orbs ── */}
        <div style={{
          position: 'absolute', top: '-200px', left: '-100px',
          width: '700px', height: '700px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.28) 0%, rgba(79,46,160,0.10) 40%, transparent 70%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', bottom: '-180px', right: '80px',
          width: '600px', height: '600px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,70,239,0.16) 0%, transparent 65%)',
          display: 'flex',
        }} />
        <div style={{
          position: 'absolute', top: '120px', right: '-60px',
          width: '480px', height: '480px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 60%)',
          display: 'flex',
        }} />

        {/* ── Top gradient line ── */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.7) 20%, rgba(167,139,250,1) 50%, rgba(217,70,239,0.7) 80%, transparent 100%)',
          display: 'flex',
        }} />

        {/* ── Enneagram rings — right side ── */}
        {/* Outermost ring */}
        <div style={{
          position: 'absolute', right: '40px', top: '50%', marginTop: '-270px',
          width: '540px', height: '540px', borderRadius: '50%',
          border: '1px solid rgba(139,92,246,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            width: '420px', height: '420px', borderRadius: '50%',
            border: '1px solid rgba(167,139,250,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '300px', height: '300px', borderRadius: '50%',
              border: '1.5px solid rgba(139,92,246,0.22)',
              background: 'radial-gradient(circle, rgba(109,40,217,0.10) 0%, transparent 70%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: '180px', height: '180px', borderRadius: '50%',
                border: '1px solid rgba(167,139,250,0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {/* Core orb */}
                <div style={{
                  width: '72px', height: '72px', borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(216,180,254,0.95) 0%, rgba(124,58,237,0.75) 50%, transparent 100%)',
                  boxShadow: '0 0 40px rgba(139,92,246,1), 0 0 80px rgba(109,40,217,0.6), 0 0 120px rgba(109,40,217,0.25)',
                  display: 'flex',
                }} />
              </div>
            </div>
          </div>
        </div>

        {/* 9 type dots around outer ring */}
        {[0,1,2,3,4,5,6,7,8].map((i) => {
          const angle = (i * 40 - 90) * (Math.PI / 180)
          const r = 270
          const cx = 1200 - 40 - 270 + r * Math.cos(angle)
          const cy = 315 + r * Math.sin(angle)
          const typeColors = [
            '#a78bfa','#f472b6','#fb923c',
            '#facc15','#34d399','#22d3ee',
            '#818cf8','#e879f9','#f87171',
          ]
          const isTop = i === 0
          return (
            <div key={i} style={{
              position: 'absolute',
              left: `${cx - (isTop ? 12 : 8)}px`,
              top: `${cy - (isTop ? 12 : 8)}px`,
              width: isTop ? '24px' : '16px',
              height: isTop ? '24px' : '16px',
              borderRadius: '50%',
              background: typeColors[i],
              boxShadow: `0 0 ${isTop ? 20 : 12}px ${typeColors[i]}bb`,
              display: 'flex',
            }} />
          )
        })}

        {/* Fine spoke lines from center to dots */}
        <svg
          style={{ position: 'absolute', top: 0, left: 0, width: '1200px', height: '630px', opacity: 0.12 }}
          viewBox="0 0 1200 630"
        >
          {[0,1,2,3,4,5,6,7,8].map((i) => {
            const angle = (i * 40 - 90) * (Math.PI / 180)
            const cx = 1200 - 40 - 270
            const cy = 315
            const r = 270
            return (
              <line
                key={i}
                x1={cx} y1={cy}
                x2={cx + r * Math.cos(angle)}
                y2={cy + r * Math.sin(angle)}
                stroke="#a78bfa"
                strokeWidth="1"
              />
            )
          })}
        </svg>

        {/* ── Left content panel ── */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: '620px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '60px 72px',
        }}>

          {/* App badge */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '32px',
          }}>
            {/* Icon orb */}
            <div style={{
              width: '32px', height: '32px', borderRadius: '10px',
              background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
              boxShadow: '0 0 20px rgba(124,58,237,0.7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{
                width: '18px', height: '18px', borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(196,181,253,0.6) 100%)',
                display: 'flex',
              }} />
            </div>
            <span style={{
              color: 'rgba(196,181,253,0.65)',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}>
              Enneagram · Psychology · Self-Discovery
            </span>
          </div>

          {/* Main wordmark */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '28px',
          }}>
            <span style={{
              fontSize: '110px',
              fontWeight: 800,
              letterSpacing: '-5px',
              lineHeight: 0.88,
              color: '#ffffff',
              textShadow: '0 0 100px rgba(167,139,250,0.2)',
              display: 'flex',
            }}>
              Thyself
            </span>
          </div>

          {/* Tagline — "Know thyself." */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '44px',
          }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <span style={{
                fontSize: '26px',
                fontWeight: 300,
                color: 'rgba(229,231,235,0.7)',
                letterSpacing: '0.02em',
                fontStyle: 'italic',
              }}>
                Know{' '}
              </span>
              <span style={{
                fontSize: '26px',
                fontWeight: 700,
                background: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #e879f9 100%)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                letterSpacing: '0.01em',
                fontStyle: 'italic',
              }}>
                thyself.
              </span>
            </div>
            <span style={{
              fontSize: '14px',
              color: 'rgba(167,139,250,0.5)',
              letterSpacing: '0.06em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              fontWeight: 400,
            }}>
              9 types · 27 subtypes · Ichazo, Naranjo & Riso-Hudson
            </span>
          </div>

          {/* Stat pills */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { n: '9', label: 'Types' },
              { n: '27', label: 'Subtypes' },
              { n: '5', label: 'Assessments' },
            ].map((s) => (
              <div key={s.n} style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '14px 24px',
                borderRadius: '16px',
                background: 'rgba(139,92,246,0.10)',
                border: '1px solid rgba(139,92,246,0.22)',
                gap: '4px',
              }}>
                <span style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 800,
                  lineHeight: 1,
                }}>
                  {s.n}
                </span>
                <span style={{
                  color: 'rgba(196,181,253,0.55)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* URL */}
          <div style={{
            marginTop: 'auto', paddingTop: '32px',
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ width: '20px', height: '1px', background: 'rgba(139,92,246,0.3)', display: 'flex' }} />
            <span style={{
              color: 'rgba(139,92,246,0.4)',
              fontSize: '11px',
              letterSpacing: '0.14em',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
            }}>
              thyself.app
            </span>
          </div>
        </div>

        {/* ── Vertical divider ── */}
        <div style={{
          position: 'absolute', left: '590px', top: '60px', bottom: '60px',
          width: '1px',
          background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.15) 20%, rgba(139,92,246,0.15) 80%, transparent)',
          display: 'flex',
        }} />

      </div>
    ),
    { width: 1200, height: 630 }
  )
}
