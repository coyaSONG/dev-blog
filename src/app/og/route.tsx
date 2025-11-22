import { ImageResponse } from 'next/og'

export const runtime = 'edge'

const size = {
  width: 1200,
  height: 630,
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  const title = searchParams.get('title') || 'coyaSONG 블로그'
  const description = searchParams.get('description') || '프론트엔드, UX, 성능에 대한 글을 다룹니다.'

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          background: 'radial-gradient(circle at 20% 20%, rgba(61,122,237,0.15), transparent 30%), radial-gradient(circle at 80% 0%, rgba(136,204,202,0.18), transparent 32%), #0f172a',
          color: '#e5e7eb',
          fontFamily: 'Inter, Pretendard, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '48px',
            borderRadius: '32px',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '64px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(15,23,42,0.8), rgba(15,23,42,0.6))',
            boxShadow: '0 20px 80px rgba(0,0,0,0.4)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#88ccca', fontWeight: 600 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', background: 'linear-gradient(135deg,#3d7aed,#88ccca)', boxShadow: '0 0 14px rgba(61,122,237,0.4)' }} />
            <span style={{ letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 18 }}>coyaSONG · Frontend</span>
          </div>

          <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div
              style={{
                fontSize: 64,
                lineHeight: 1.05,
                fontWeight: 800,
                color: '#f8fafc',
              }}
            >
              {title.length > 110 ? `${title.slice(0, 107)}...` : title}
            </div>
            <div style={{ fontSize: 28, color: '#cbd5e1', maxWidth: 880, lineHeight: 1.35 }}>
              {description.length > 160 ? `${description.slice(0, 157)}...` : description}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, color: '#94a3b8', fontSize: 22 }}>
            <span>Next.js · React · TypeScript · UX & Performance</span>
            <span style={{ color: '#cbd5e1', fontWeight: 600 }}>coyasong.dev</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      headers: {
        'Cache-Control': 'public, max-age=600, s-maxage=600, stale-while-revalidate=60',
      },
    }
  )
}
