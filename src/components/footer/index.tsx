import Image from "next/image";
import Link from "next/link";
import Logo from '@/assets/images/logo.svg'
import MarvelLogo from '@/assets/images/marvellogo.svg'
import Instagram from '@/assets/images/icons/instagram.svg'
import Facebook from '@/assets/images/icons/facebook.svg'
import XTwitter from '@/assets/images/icons/x-twitter.svg'

export default function Footer() {
  return (
    <footer className="bg-gray-1a1">
      <div className="flex flex-col items-center pt-16 container mx-auto gap-20 mt-20 md:mt-28 md:flex-row md:justify-between md:items-start">
        <Link href="/">
          <Image src={Logo} alt="Super" className="w-full" />
        </Link>
        <div className="uppercase flex flex-col items-center text-sm gap-2 font-semibold md:items-start">
          <Link href="/" >
            inicio
          </Link>
          <Link href="/characters">Personagens</Link>
          <Link href="/comics">Comics</Link>
          <Link href="/events">Events</Link>
        </div>
        <div className="uppercase flex flex-col items-center text-sm gap-2 font-semibold md:items-start">
          <Link href="/characters">sobre a super</Link>
          <Link href="/comics">marvel api</Link>
          <div className="flex flex-col items-center md:flex-row md:gap-2">
            <Image src={MarvelLogo} alt="Marvel" />
            <p>Data provided by Marvel. © 2014 Marvel</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <p className="font-semibold text-sm uppercase">follow super</p>
          <div className="flex gap-3 mt-2">
            <Link href="/">
              <Image src={Instagram} alt="Instagram" />
            </Link>
            <Link href="/">
              <Image src={Facebook} alt="Facebook" />
            </Link>
            <Link href="/">
              <Image src={XTwitter} alt="X" />
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-20 w-full py-6 bg-gray-1a1 shadow-footer">
        <p className="font-semibold text-xs text-center text-gray-63 uppercase">
          Desenvolvido por &copy; 2023 <Link href="https://portfolio-thiagofarias.vercel.app/" className="hover:underline">Thiago Farias</Link>
        </p>
      </div>
    </footer>
  )
}