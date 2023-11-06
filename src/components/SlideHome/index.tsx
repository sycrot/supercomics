/* eslint-disable @next/next/no-img-element */
'use client'
import React from 'react'
import styles from './style.module.scss'
import { Character } from '@/types/character'
import { getCharactersOfListIds } from '@/services/marvel'

let listCharacters = [
  '1009281',
  '1009718',
  '1009368',
  '1009664',
  '1009187'
]
export default function SlideHome() {
  const [characters, setCharacters] = React.useState<Character[]>()

  React.useEffect(() => {
    const handleCharacters = () => {
      getCharactersOfListIds(listCharacters, setCharacters)
    }
    handleCharacters()
  }, [])

  return (
    <div className={styles.slide}>
      {characters ?
        <div className="overflow-hidden w-full h-360 md:h-707">
          <form action="">
            {characters.map((item: Character, index: any) => (
              <>
                <input type="radio" id={item.id.toString()} name="sld" checked/>
                <label htmlFor={item.id.toString()} className='relative'>
                  <div className='w-full h-full flex justify-center items-end md:items-center absolute overflow-hidden'>
                    <div className="w-full px-6 pr-9 mb-6 md:mb-0">
                      <h1 className='text-2xl uppercase font-bold text-left'>{item.name}</h1>
                      <p className='text-sm text-left'>{item.description}</p>
                    </div>
                  </div>
                  <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt={item.name} className='absolute top-0 left-0 w-full h-full object-cover -z-10' />
                </label>
              </>
            ))}
          </form>
        </div>
        :
        <div>
          loading
        </div>
      }

    </div>
  )
}