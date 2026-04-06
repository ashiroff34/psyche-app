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
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #5b21b6 0%, #7c3aed 50%, #4f46e5 100%)',
        }}
      >
        <img
          src="https://psyche-app-two.vercel.app/thyself-logo.svg"
          style={{ width: '180px', height: '180px' }}
        />
      </div>
    ),
    { width: 180, height: 180 }
  )
}
