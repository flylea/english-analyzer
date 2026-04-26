import { ParserPage } from '@/components/parser/parser-page'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function Home() {
  return (
    <>
      <ParserPage />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
