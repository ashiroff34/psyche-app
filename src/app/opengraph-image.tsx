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
          background: '#0f0a1e',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Georgia, "Times New Roman", serif',
        }}
      >
        {/* Background radial blob — top right purple */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-80px',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(124,58,237,0.45) 0%, rgba(124,58,237,0.15) 50%, transparent 75%)',
            display: 'flex',
          }}
        />

        {/* Background radial blob — bottom left indigo */}
        <div
          style={{
            position: 'absolute',
            bottom: '-150px',
            left: '-100px',
            width: '550px',
            height: '550px',
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(79,70,229,0.35) 0%, rgba(79,70,229,0.12) 50%, transparent 75%)',
            display: 'flex',
          }}
        />

        {/* Subtle mid glow — center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '800px',
            height: '400px',
            borderRadius: '50%',
            background:
              'radial-gradient(ellipse, rgba(109,40,217,0.08) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Dot grid texture overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle, rgba(167,139,250,0.12) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            display: 'flex',
          }}
        />

        {/* Ouroboros circle — decorative ring left side */}
        <div
          style={{
            position: 'absolute',
            left: '-80px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            border: '2px solid rgba(139,92,246,0.18)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-60px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '1px solid rgba(167,139,250,0.10)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            left: '-40px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            border: '1px solid rgba(124,58,237,0.22)',
            display: 'flex',
          }}
        />

        {/* Decorative ring — right side watermark */}
        <div
          style={{
            position: 'absolute',
            right: '-100px',
            bottom: '-80px',
            width: '380px',
            height: '380px',
            borderRadius: '50%',
            border: '1.5px solid rgba(139,92,246,0.10)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            right: '-70px',
            bottom: '-50px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            border: '1px solid rgba(167,139,250,0.08)',
            display: 'flex',
          }}
        />

        {/* Horizontal separator lines — top and bottom */}
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            height: '3px',
            background:
              'linear-gradient(90deg, transparent, rgba(124,58,237,0.7) 30%, rgba(167,139,250,0.9) 50%, rgba(124,58,237,0.7) 70%, transparent)',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '2px',
            background:
              'linear-gradient(90deg, transparent, rgba(79,70,229,0.5) 30%, rgba(124,58,237,0.7) 50%, rgba(79,70,229,0.5) 70%, transparent)',
            display: 'flex',
          }}
        />

        {/* Main content — centered column */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0px',
            padding: '60px 100px',
          }}
        >
          {/* Badge pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 22px',
              borderRadius: '100px',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(167,139,250,0.4)',
              marginBottom: '28px',
            }}
          >
            <span
              style={{
                color: 'rgba(196,181,253,0.95)',
                fontSize: '14px',
                letterSpacing: '0.18em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontWeight: 500,
              }}
            >
              ✦ KNOW THYSELF
            </span>
          </div>

          {/* Main title */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '0px',
              marginBottom: '20px',
            }}
          >
            <span
              style={{
                fontSize: '108px',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-2px',
                lineHeight: 1,
                fontFamily: 'Georgia, "Times New Roman", serif',
                textShadow: '0 0 60px rgba(167,139,250,0.3)',
              }}
            >
              Thyself
            </span>
          </div>

          {/* Subtitle */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '32px',
            }}
          >
            <span
              style={{
                color: 'rgba(196,181,253,0.55)',
                fontSize: '13px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                letterSpacing: '0.08em',
              }}
            >
              ◆
            </span>
            <span
              style={{
                color: 'rgba(209,213,219,0.75)',
                fontSize: '26px',
                letterSpacing: '0.04em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontWeight: 300,
              }}
            >
              The Enneagram
            </span>
            <span
              style={{
                color: 'rgba(196,181,253,0.4)',
                fontSize: '13px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
              }}
            >
              ·
            </span>
            <span
              style={{
                color: 'rgba(209,213,219,0.75)',
                fontSize: '26px',
                letterSpacing: '0.04em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontWeight: 300,
              }}
            >
              Cognitive Functions
            </span>
            <span
              style={{
                color: 'rgba(196,181,253,0.4)',
                fontSize: '13px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
              }}
            >
              ·
            </span>
            <span
              style={{
                color: 'rgba(209,213,219,0.75)',
                fontSize: '26px',
                letterSpacing: '0.04em',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                fontWeight: 300,
              }}
            >
              Deep Psychology
            </span>
            <span
              style={{
                color: 'rgba(196,181,253,0.55)',
                fontSize: '13px',
                fontFamily: '"Helvetica Neue", Arial, sans-serif',
                letterSpacing: '0.08em',
              }}
            >
              ◆
            </span>
          </div>

          {/* Divider line */}
          <div
            style={{
              width: '480px',
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(139,92,246,0.5) 30%, rgba(167,139,250,0.7) 50%, rgba(139,92,246,0.5) 70%, transparent)',
              marginBottom: '32px',
              display: 'flex',
            }}
          />

          {/* Stat pills row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            {/* 9 Types */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '14px 28px',
                borderRadius: '14px',
                background: 'rgba(15,10,30,0.7)',
                border: '1px solid rgba(139,92,246,0.35)',
                backdropFilter: 'blur(10px)',
                gap: '4px',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 700,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 1,
                }}
              >
                9
              </span>
              <span
                style={{
                  color: 'rgba(196,181,253,0.7)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                }}
              >
                TYPES
              </span>
            </div>

            {/* Separator dot */}
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(139,92,246,0.4)',
                display: 'flex',
              }}
            />

            {/* 27 Subtypes */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '14px 28px',
                borderRadius: '14px',
                background: 'rgba(15,10,30,0.7)',
                border: '1px solid rgba(139,92,246,0.35)',
                backdropFilter: 'blur(10px)',
                gap: '4px',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 700,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 1,
                }}
              >
                27
              </span>
              <span
                style={{
                  color: 'rgba(196,181,253,0.7)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                }}
              >
                SUBTYPES
              </span>
            </div>

            {/* Separator dot */}
            <div
              style={{
                width: '4px',
                height: '4px',
                borderRadius: '50%',
                background: 'rgba(139,92,246,0.4)',
                display: 'flex',
              }}
            />

            {/* 5 Assessments */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '14px 28px',
                borderRadius: '14px',
                background: 'rgba(15,10,30,0.7)',
                border: '1px solid rgba(139,92,246,0.35)',
                backdropFilter: 'blur(10px)',
                gap: '4px',
              }}
            >
              <span
                style={{
                  color: '#ffffff',
                  fontSize: '32px',
                  fontWeight: 700,
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  lineHeight: 1,
                }}
              >
                5
              </span>
              <span
                style={{
                  color: 'rgba(196,181,253,0.7)',
                  fontSize: '13px',
                  letterSpacing: '0.1em',
                  fontFamily: '"Helvetica Neue", Arial, sans-serif',
                  fontWeight: 500,
                }}
              >
                ASSESSMENTS
              </span>
            </div>
          </div>
        </div>

        {/* Bottom-right URL watermark */}
        <div
          style={{
            position: 'absolute',
            bottom: '22px',
            right: '36px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span
            style={{
              color: 'rgba(139,92,246,0.5)',
              fontSize: '12px',
              fontFamily: '"Helvetica Neue", Arial, sans-serif',
              letterSpacing: '0.12em',
            }}
          >
            psyche-app-two.vercel.app
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
