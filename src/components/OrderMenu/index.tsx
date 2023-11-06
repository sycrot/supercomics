'use client'
import { Dropdown } from "flowbite-react";
import Image from "next/image";
import DropdownIcon from '@/assets/images/icons/dropdown.svg'

export default function OrderMenu() {
  return (
    <Dropdown className="bg-gray-1e border-none" label="" dismissOnClick={false} renderTrigger={() => (
      <div className="flex gap-3 items-center">
        <p className="uppercase text-gray-8f ">sort by</p>
        <div className="flex items-center gap-3 text-red-primary cursor-pointer">A-Z<Image src={DropdownIcon} alt="Dropdown" /></div>
      </div>
    )}>
      <Dropdown.Item className="bg-none text-gray-8f hover:bg-gray-2f-80">
        <p className="pr-6">Alphabetical, A - Z</p>
      </Dropdown.Item>
      <Dropdown.Item className="bg-none text-gray-8f hover:bg-gray-2f-80">
        <p className="pr-6">Alphabetical, Z - A</p>
      </Dropdown.Item>
    </Dropdown>
  )
}