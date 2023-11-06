'use client'
import Image from "next/image"
import React from "react"
import SearchIcon from '@/assets/images/icons/search.svg'
import DeleteIcon from '@/assets/images/icons/delete-close.svg'

interface Props {
  placeholder: string
  className?: string
}

export default function InputSearch (props: Props) {
  const [searchText, setSearchText] = React.useState('')

  return (
    <form className={props.className}>
      <div className="relative">
        <input type="text" placeholder={props.placeholder} value={searchText} onChange={e => setSearchText(e.target.value)} className="w-full md:max-w-xs py-2 pl-10 pr-20 bg-gray-2f-80 border-none outline-none rounded-full text-gray-8f focus:outline-none focus:border-none truncate"/>
        <button className="absolute left-2 top-2">
          <Image src={SearchIcon} alt="Search" />
        </button>
        <button className="absolute right-2 top-2">
          <Image src={DeleteIcon} alt="Delete" />
        </button>
      </div>
    </form>
  )
}