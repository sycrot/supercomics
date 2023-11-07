import type { Metadata } from 'next'
import { Jost } from 'next/font/google'
import './globals.css'
import NavbarComponent from '@/components/nav'
import Footer from '@/components/footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-loading-skeleton/dist/skeleton.css'

const inter = Jost({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarComponent />
        <div className="relative">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  )
}
