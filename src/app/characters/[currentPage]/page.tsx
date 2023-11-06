/* eslint-disable @next/next/no-img-element */
'use client'
import OrderMenu from "@/components/OrderMenu"
import TitlePage from "@/components/TitlePage"
import InputSearch from "@/components/inputSearch"
import { getCharacters, getCharactersOfListIds, getEvents } from "@/services/marvel"
import { Character } from "@/types/character"
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite, Pagination } from "flowbite-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import Slider from "react-slick"

let listCharacters = [
  '1009384', // Kang
  '1011299', // Guardians of The galaxy
  '1009281', // Doctor Doom
  '1009351', // Hulk
  '1009155', // Ant Man
  '1009610', // Spider Man
]

const customTheme: CustomFlowbiteTheme = {
  pagination: {
    base: 'flex justify-center mt-10',
    pages: {
      previous: {
        base: 'text-zero items-center pt-2 mr-5',
        icon: 'w-10 h-10 block rounded-full border-2 border-solid border-white'
      },
      next: {
        base: 'text-zero items-center ml-5 opacity-90',
        icon: 'w-10 h-10 block rounded-full border-2 border-solid border-white'
      },
      selector: {
        base: 'w-6 text-white p-1 font-bold enabled:hover:bg-gray-1e dark:text-gray-400 enabled:dark:hover:text-white',
        active: 'bg-red-primary'
      }
    }
  }
}

export default function Characters() {
  const [highlighted, setHighlighted] = React.useState<Character[]>()
  const [characters, setCharacters] = React.useState<Character[]>()
  const routerParams = useParams()
  const router = useRouter()

  const onPageChange = (page: number) => {
    router.push(`/characters/${page}`)
  }

  const handleHighlightedCharacters = React.useCallback(async () => {
    getCharactersOfListIds(listCharacters, setHighlighted)
  }, [])

  const handleCharacters = React.useCallback(async () => {
    await getCharacters(100).then(data => {
      setCharacters(data)
    })
  }, [])

  React.useEffect(() => {
    handleHighlightedCharacters()
    handleCharacters()
  }, [handleCharacters, handleHighlightedCharacters])

  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: 6,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 940,
        settings: {
          centerMode: true,
          infinite: false,
          slidesToShow: 1,
          speed: 500,
          arrows: false,
        }
      },
    ]
  };

  return (
    <div className="">
      <TitlePage title="Personagens" description="Todos os heróis e vilões da Marvel" />
      <div className="container mx-auto px-3 md:px-0">
        <div className="mt-20 md:mt-28">
          {highlighted ?
            <>
              <h2 className='text-xl md:text-4xl uppercase font-semibold'>em destaque</h2>
              <Slider {...settings} className="mt-5">
                {highlighted.map((item: Character) => (
                  <div className="w-full h-64" key={item.id}>
                    <Link href={`/characters/${item.id}`} className='px-8 w-full h-full relative block'>
                      <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} className='absolute top-0 left-0 w-full h-full object-cover -z-10' />
                      <div className="bg-gradient-heroes absolute w-full h-2/4 bottom-0 left-0 z-10 p-5 flex items-end">
                        <p className="text-2xl font-semibold uppercase">{item.name}</p>
                      </div>
                    </Link>
                  </div>

                ))}
              </Slider>
            </>
            :
            <div></div>
          }
        </div>
        {characters ?
          <div className="mt-20 md:mt-28 comics-section">
            <h2 className='text-xl md:text-4xl uppercase font-semibold'>lista de personagens</h2>
            <div className="mt-10">
              <div className="flex justify-between md:justify-end gap-1 md:gap-16">
                <InputSearch placeholder="Qual personagem você procura?" className="w-3/5 md:w-max" />
                <OrderMenu />
              </div>
            </div>
            <div className="mt-10">
              <div className="flex flex-wrap gap-3">
                {characters.slice(36 * (+routerParams.currentPage - 1), 36 * +routerParams.currentPage).map((item: Character) => (
                  <div className="w-48-29 md:w-16p h-64" key={item.id}>
                    <Link href={`/characters/${item.id}`} className='px-8 w-full h-full relative block'>
                      <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} className='absolute top-0 left-0 w-full h-full object-cover -z-10' />
                      <div className="bg-gradient-heroes absolute w-full h-2/4 bottom-0 left-0 z-10 p-5 flex items-end">
                        <p className="text-2xl font-semibold uppercase">{item.name}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
              <Flowbite theme={{ theme: customTheme }} >
                <Pagination currentPage={+routerParams.currentPage} totalPages={Math.ceil(characters.length / 36)} onPageChange={onPageChange} showIcons />
              </Flowbite>
            </div>
          </div>
          :
          <></>
        }

      </div>
    </div>
  )
}