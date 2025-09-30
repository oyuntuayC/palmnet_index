import LightHeader from '../../../components/LightHeader'
import Footer from '../../../components/Footer'

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="wrap">
      <LightHeader />
      {children}
      <Footer />
    </div>
  )
}


