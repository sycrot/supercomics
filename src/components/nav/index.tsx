'use client';
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite, Navbar } from 'flowbite-react';
import Logo from "@/assets/images/logo.svg"
import Image from 'next/image';
import InputSearch from '../inputSearch';
import { usePathname } from 'next/navigation';

const customTheme: CustomFlowbiteTheme = {
  navbar: {
    link: {
      active: {
        on: "bg-red-primary text-white md:text-red-primary dark:text-white md:bg-transparent md:font-bold uppercase",
        off: "border-b border-gray-100 text-white bg-gradient-menu hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-red-primary md:dark:hover:bg-transparent md:bg-none md:dark:hover:text-white uppercase"
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-white hover:bg-gray-100 focus:outline-none  dark:text-gray-400 dark:hover:bg-gray-700 md:hidden",
    }
  }
};

export default function NavbarComponent() {
  const routerPath = usePathname()

  return (
    <Flowbite theme={{ theme: customTheme }} >
      <Navbar className='bg-gradient-menu fixed z-20 w-full top-0'>
        <Navbar.Brand href="/">
          <Image src={Logo} alt="Super comics - Logo" className='w-10' />
        </Navbar.Brand>
        <Navbar.Toggle className='hover:bg-transparent outline-none border-none focus:outline-none' />
        <Navbar.Collapse className='flowbite-navbar-collapse'>
          <div className="w-full justify-center flex mb-3 md:mb-0 md:order-2 md:ml-12">
            <InputSearch placeholder='Search' className='w-full' />
          </div>
          <Navbar.Link href="/" active={routerPath === '/'}>
            Home
          </Navbar.Link>
          <Navbar.Link href="/characters/1" active={routerPath.includes('/characters/')}>Personagens</Navbar.Link>
          <Navbar.Link href="/comics/1" active={routerPath.includes('/comics/')}>Comics</Navbar.Link>
          <Navbar.Link href="/events/1" active={routerPath.includes('/events/')}>Events</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </Flowbite>

  )
}