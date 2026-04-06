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
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(145deg, #5b21b6 0%, #7c3aed 50%, #4f46e5 100%)',
        }}
      >
        <img
          src="https://psyche-app-two.vercel.app/thyself-logo.svg"
          style={{ width: '32px', height: '32px' }}
        />
      </div>
    ),
    { width: 32, height: 32 }
  )
}
