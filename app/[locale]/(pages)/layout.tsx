import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default async function PagesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div id="wrap">
      <Header theme="light" />
      {children}
      <Footer />
    </div>
  )
}


