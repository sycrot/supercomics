/* eslint-disable @next/next/no-img-element */
'use client'
import SlideHome from '@/components/SlideHome'
import { getCharacter, getCharacterComics, getCharactersOfListIds, getComics, getEvents } from '@/services/marvel'
import { Character } from '@/types/character';
import React from 'react'
import Slider from "react-slick";
import IronManLogo from '@/assets/images/ironman.svg'
import CaptainAmericaLogo from '@/assets/images/captainamerica.svg'
import DoctorStrangeLogo from '@/assets/images/doctorstrange.svg'
import HulkLogo from '@/assets/images/hulk.svg'
import ThorLogo from '@/assets/images/thor.svg'
import AntManLogo from '@/assets/images/antman.svg'
import SpiderManLogo from '@/assets/images/spiderman.svg'
import MonnKnightLogo from '@/assets/images/moonknight.svg'
import ComicIcon from '@/assets/images/icons/comic-icon.svg'
import Image from 'next/image';
import { Comic } from '@/types/comic';
import Link from 'next/link';
import SlideSection from '@/components/SlideSection';
import SectionHero from '@/components/SectionHero';
import { TEvent } from '@/types/event';

let listCharacters = [
  '1009368', // Iron Man
  '1009220', // Captain America
  '1009282', // Doctor Strange
  '1009351', // Hulk
  '1009664', // Thor
  '1009155', // Ant Man
  '1009610', // Spider Man
  '1009452', // Moon Knight
]

const HandleLogoHeroes = (props: { id: number }) => {
  return (
    props.id === 1009368 ? <Image src={IronManLogo} alt="Iron Man" /> :
      props.id === 1009220 ? <Image src={CaptainAmericaLogo} alt="Captain America" /> :
        props.id === 1009282 ? <Image src={DoctorStrangeLogo} alt="Doctor Strange" /> :
          props.id === 1009351 ? <Image src={HulkLogo} alt="Hulk" /> :
            props.id === 1009664 ? <Image src={ThorLogo} alt="Thor" /> : props.id === 1009155 ? <Image src={AntManLogo} alt="Ant Man" /> : props.id === 1009610 ? <Image src={SpiderManLogo} alt="Spider Man" /> : props.id === 1009452 ? <Image src={MonnKnightLogo} alt="Moon Knight" /> : <></>
  )
}

export default function Home() {
  const [characters, setCharacters] = React.useState<Character[]>()
  const [comicsMarvel, setComicsMarvel] = React.useState<Comic[]>()
  const [comicsSpiderMan, setComicsSpiderMan] = React.useState<Comic[]>()
  const [comics, setComics] = React.useState<Comic[]>()
  const [events, setEvents] = React.useState<TEvent[]>()
  const [comicSelected, setComicSelected] = React.useState(0)

  const handleCharacters = React.useCallback(() => {
    getCharactersOfListIds(listCharacters, setCharacters)
  }, [])
  const handleAvengersComics = React.useCallback(() => {
    getCharacter('1009165').then(data => {
      if (data.comics) {
        getCharacterComics(data.comics.items, setComicsMarvel, 4, 10)
      }
    })
  }, [])

  const handleComics = React.useCallback(async () => {
    await getComics(10).then(data => {
      setComics(data)
    })
  }, [])

  const handleEvents = React.useCallback(async () => {
    await getEvents(10).then(data => {
      setEvents(data)
    })
  }, [])

  const handleSpiderManComics = React.useCallback(async () => {
    getCharacter('1009610').then(data => {
      if (data.comics) {
        getCharacterComics(data.comics.items, setComicsSpiderMan, 0, 5)
      }
    })
  }, [])

  React.useEffect(() => {
    handleCharacters()
    handleAvengersComics()
    handleComics()
    handleSpiderManComics()
    handleEvents()
  }, [handleAvengersComics, handleCharacters, handleComics, handleEvents, handleSpiderManComics])

  const settings = {
    centerMode: true,
    infinite: false,
    slidesToShow: 4,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 906,
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
    <main className="">
      <SlideHome />

      <div className="container mx-auto">
        <div className="mt-20 md:mt-28 comics-section">
          {characters ?
            <>
              <h2 className='text-xl md:text-4xl uppercase font-semibold px-3'>Principais Personagens</h2>
              <Slider {...settings} className='mt-5'>
                {characters.map((item: Character) => (
                  <div key={item.id} className='bg-gray-1e px-8 w-full h-72'>
                    <div className="flex justify-center items-center h-full w-full">
                      <HandleLogoHeroes id={item.id} />
                    </div>
                  </div>
                ))}
              </Slider>
            </>
            :
            <div></div>
          }
        </div>

        <div className="mt-20 md:mt-28 px-3">
          {comicsMarvel ?
            <>
              <h2 className='text-xl md:text-4xl uppercase font-semibold'>os vingadores</h2>
              <div className="flex h-80 md:h-707 mt-5">
                <div className="w-1/6 overflow-auto flex flex-col gap-1">
                  {comicsMarvel.map((item: Comic, index: number) => (
                    <div key={item.id} onClick={() => setComicSelected(index)}>
                      <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} />
                    </div>
                  ))}
                </div>
                <div className="w-5/6 ml-1 overflow-hidden relative">
                  <img src={`${comicsMarvel[comicSelected].thumbnail.path}.${comicsMarvel[comicSelected].thumbnail.extension}`} alt={comicsMarvel[comicSelected].title} className='w-full h-full object-cover scale-150 grayscale opacity-30' />
                  <div className="absolute top-0 left-0 z-10 flex flex-col justify-center  px-6 py-12">
                    <h1 className='font-bold text-2xl'>{comicsMarvel[comicSelected].title}</h1>
                    <p className='mt-5 line-clamp-4'>{comicsMarvel[comicSelected].description}</p>
                    <Link href={`/comic/${comicsMarvel[comicSelected].id}`} className='flex items-center mt-6'>
                      <Image src={ComicIcon} alt="View more" />
                      <p className='font-bold uppercase ml-1'>ver mais</p>
                    </Link>
                  </div>
                </div>
              </div>
            </>
            :
            <div></div>
          }

        </div>

        <div className="mt-20 md:mt-28 comics-section">
          {comics ?
            <SlideSection title='quadrinhos' data={
              comics.map((item: Comic) => (
                <div key={item.id} className='h-416 md:h-440 bg-white'>
                  <Link href="/" className='w-full h-full block pointer-events-none'>
                    <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-full h-full object-cover' />
                  </Link>
                </div>
              ))
            }
            />
            :
            <></>
          }
        </div>

        <div className="mt-20 md:mt-28">
          {comicsSpiderMan ?
            <SectionHero title='quadrinhos' data={
              comicsSpiderMan.map((item, index) => (
                <div key={item.id} className='h-416 md:h-440 bg-white'>
                  <Link href="/" className='w-full h-full block'>
                    <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-full h-full object-cover' />
                  </Link>
                </div>
              ))
            }
            />
            :
            <></>
          }
        </div>

        <div className="mt-72 md:mt-80 comics-section">
          {events ?
            <SlideSection title='eventos' data={
              events.map((item: TEvent) => (
                <div key={item.id} className='h-416 md:h-440 bg-white'>
                  <Link href="/" className='w-full h-full block pointer-events-none'>
                    <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.title} className='w-full h-full object-cover' />
                  </Link>
                </div>
              ))
            }
            />
            :
            <></>
          }
        </div>
      </div>
    </main>
  )
}
