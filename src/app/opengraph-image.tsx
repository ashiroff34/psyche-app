import { ImageResponse } from 'next/og'

export const dynamic = 'force-static'
export const alt = 'Thyself — Know Your Enneagram Type'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #0a0618 0%, #0f0a1e 40%, #120d28 100%)',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: '"Helvetica Neue", Arial, sans-serif',
        }}
      >
        {/* Left panel dark overlay */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '580px',
          background: 'rgba(8,4,20,0.5)',
          borderRight: '1px solid rgba(139,92,246,0.10)',
          display: 'flex',
        }} />

        {/* Ambient glow top-left */}
        <div style={{
          position: 'absolute',
          top: '-160px', left: '-80px',
          width: '560px', height: '560px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(109,40,217,0.32) 0%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Ambient glow bottom-right */}
        <div style={{
          position: 'absolute',
          bottom: '-140px', right: '-60px',
          width: '500px', height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217,70,239,0.18) 0%, transparent 65%)',
          display: 'flex',
        }} />

        {/* Enneagram visual — right half */}
        {/* Outer ring */}
        <div style={{
          position: 'absolute',
          right: '55px',
          top: '50%',
          marginTop: '-230px',
          width: '460px', height: '460px',
          borderRadius: '50%',
          border: '1.5px solid rgba(139,92,246,0.20)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Middle ring */}
          <div style={{
            width: '340px', height: '340px',
            borderRadius: '50%',
            border: '1px solid rgba(167,139,250,0.13)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* Inner ring + glow */}
            <div style={{
              width: '210px', height: '210px',
              borderRadius: '50%',
              border: '1px solid rgba(139,92,246,0.28)',
              background: 'radial-gradient(circle, rgba(109,40,217,0.16) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              {/* Core orb */}
              <div style={{
                width: '66px', height: '66px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(196,181,253,0.95) 0%, rgba(109,40,217,0.7) 55%, transparent 100%)',
                boxShadow: '0 0 28px rgba(139,92,246,0.9), 0 0 56px rgba(109,40,217,0.5)',
                display: 'flex',
              }} />
            </div>
          </div>
        </div>

        {/* 9 type dots around outer ring */}
        {[0,1,2,3,4,5,6,7,8].map((i) => {
          const angle = (i * 40 - 90) * (Math.PI / 180);
          const r = 230;
          const cx = 1200 - 55 - 230 + r * Math.cos(angle);
          const cy = 315 + r * Math.sin(angle);
          const colors = ['#a78bfa','#f472b6','#fb923c','#facc15','#34d399','#22d3ee','#818cf8','#e879f9','#f87171'];
          return (
            <div key={i} style={{
              position: 'absolute',
              left: `${cx - 9}px`,
              top: `${cy - 9}px`,
              width: '18px', height: '18px',
              borderRadius: '50%',
              background: colors[i],
              boxShadow: `0 0 14px ${colors[i]}99`,
              display: 'flex',
            }} />
          );
        })}

        {/* Top gradient line */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.85) 25%, rgba(167,139,250,1) 50%, rgba(217,70,239,0.85) 75%, transparent)',
          display: 'flex',
        }} />

        {/* Left content */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0,
          width: '600px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 64px',
        }}>
          {/* Label */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '26px',
          }}>
            <div style={{
              width: '24px', height: '24px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #c4b5fd 0%, #7c3aed 100%)',
              boxShadow: '0 0 16px rgba(139,92,246,0.7)',
              display: 'flex',
            }} />
            <span style={{
              color: 'rgba(196,181,253,0.75)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}>
              Psychology · Growth · Self-Knowledge
            </span>
          </div>

          {/* Title */}
          <span style={{
            fontSize: '100px',
            fontWeight: 800,
            color: '#ffffff',
            letterSpacing: '-4px',
            lineHeight: 0.9,
            fontFamily: 'Georgia, "Times New Roman", serif',
            marginBottom: '22px',
            textShadow: '0 0 80px rgba(167,139,250,0.25)',
            display: 'flex',
          }}>
            Thyself
          </span>

          {/* Tagline */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginBottom: '38px' }}>
            <span style={{
              fontSize: '24px',
              fontWeight: 300,
              color: 'rgba(229,231,235,0.88)',
              letterSpacing: '0.01em',
            }}>
              Know yourself deeply.
            </span>
            <span style={{
              fontSize: '15px',
              color: 'rgba(167,139,250,0.6)',
              letterSpacing: '0.03em',
            }}>
              Enneagram · Cognitive Functions · Deep Psychology
            </span>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', gap: '10px' }}>
            {[
              { n: '9', label: 'Types' },
              { n: '27', label: 'Subtypes' },
              { n: '100+', label: 'Lessons' },
            ].map((s) => (
              <div key={s.n} style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '13px 22px',
                borderRadius: '14px',
                background: 'rgba(139,92,246,0.10)',
                border: '1px solid rgba(139,92,246,0.25)',
                gap: '3px',
              }}>
                <span style={{
                  color: '#ffffff',
                  fontSize: '30px',
                  fontWeight: 700,
                  lineHeight: 1,
                  fontFamily: 'Georgia, serif',
                }}>
                  {s.n}
                </span>
                <span style={{
                  color: 'rgba(196,181,253,0.6)',
                  fontSize: '10px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* URL watermark */}
          <div style={{
            marginTop: 'auto',
            paddingTop: '28px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <div style={{ width: '18px', height: '1px', background: 'rgba(139,92,246,0.35)', display: 'flex' }} />
            <span style={{ color: 'rgba(139,92,246,0.45)', fontSize: '11px', letterSpacing: '0.12em' }}>
              thyself.app
            </span>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
