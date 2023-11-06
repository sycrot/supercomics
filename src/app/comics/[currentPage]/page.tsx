/* eslint-disable @next/next/no-img-element */
'use client'
import OrderMenu from "@/components/OrderMenu"
import TitlePage from "@/components/TitlePage"
import InputSearch from "@/components/inputSearch"
import { getComics, getEventsOfListIds } from "@/services/marvel"
import { Comic } from "@/types/comic"
import { TEvent } from "@/types/event"
import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Flowbite, Pagination } from "flowbite-react"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import Slider from "react-slick"

let listEvents= [
  '314', // Age of ultron
  '238', // Civil War
  '330', // Civil War 2
  '270', // Secret Wars
  '308', // X-Men
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

export default function Comics() {
  const [highlighted, setHighlighted] = React.useState<TEvent[]>()
  const [comics, setComics] = React.useState<Comic[]>()
  const routerParams = useParams()
  const router = useRouter()

  const onPageChange = (page: number) => {
    router.push(`/events/${page}`)
  }

  const handleHighlightedCharacters = React.useCallback(async () => {
    getEventsOfListIds(listEvents, setHighlighted)
  }, [])

  const handleCharacters = React.useCallback(async () => {
    await getComics(100).then(data => {
      setComics(data)
    })
  }, [])

  React.useEffect(() => {
    handleHighlightedCharacters()
    handleCharacters()
  }, [handleCharacters, handleHighlightedCharacters])

  const settings = {
    centerMode: false,
    infinite: true,
    slidesToShow: 5,
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
      <TitlePage title="Comics" description="Todas as revistas em quadrinhos da Marvel" />
      <div className="container mx-auto px-3 md:px-0">
        <div className="mt-20 md:mt-28">
          {highlighted ?
            <>
              <h2 className='text-xl md:text-4xl uppercase font-semibold'>em destaque</h2>
              <Slider {...settings} className="mt-5">
                {highlighted.map((item: TEvent) => (
                  <div className="w-full h-64 md:h-416" key={item.id}>
                    <Link href={`/characters/${item.id}`} className='w-full h-full block'>
                      <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-full h-full object-cover' />
                    </Link>
                  </div>

                ))}
              </Slider>
            </>
            :
            <div></div>
          }
        </div>
        {comics ?
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
                {comics.slice(25 * (+routerParams.currentPage - 1), 25 * +routerParams.currentPage).map((item: Comic) => (
                  <div className="w-48-29 md:w-19-37 h-64 md:h-416" key={item.id}>
                    <Link href={`/characters/${item.id}`} className='w-full h-full block overflow-hidden'>
                      <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-full h-full object-cover' />
                    </Link>
                  </div>
                ))}
              </div>
              <Flowbite theme={{ theme: customTheme }} >
                <Pagination currentPage={+routerParams.currentPage} totalPages={Math.ceil(comics.length / 25)} onPageChange={onPageChange} showIcons />
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