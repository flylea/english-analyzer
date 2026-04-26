import { ParserPage } from '@/components/parser/parser-page'
import { VercelAnalytics } from '@/components/analytics'

export default function Home() {
  return (
    <>
      <ParserPage />
      <VercelAnalytics />
    </>
  )
}
