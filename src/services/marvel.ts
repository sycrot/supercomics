import { Character } from "@/types/character"
import { Comic } from "@/types/comic"
import { TEvent } from "@/types/event"
import axios from "axios"
import MD5 from 'crypto-js/md5'
const apiBase = 'https://gateway.marvel.com/v1'

const headers = {
  'Content-Type': 'application/json',
  'Accept': '*/*'
}
const PRIVATE_KEY = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY ?? ''
const PUBLIC_KEY = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY
let ts = Number(new Date())
let hash = MD5(ts + PRIVATE_KEY + PUBLIC_KEY)
const params = {
  apikey: PUBLIC_KEY,
  hash
}

export async function getComics(limit?: number) {
  let response:Comic[] = []

  await axios.get(`${apiBase}/public/comics?limit=${limit}`, {
    params,
    headers
  }).then(data => {
    response = data.data.data.results
  }).catch(err => {
    handleErrors(err)
  })

  return response
}

export async function getEvents(limit?: number) {
  let response:TEvent[] = []

  await axios.get(`${apiBase}/public/events?limit=${limit}`, {
    params,
    headers
  }).then(data => {
    response = data.data.data.results
  }).catch(err => {
    handleErrors(err)
  })

  return response
}

export async function getCharacters(limit?: number) {
  let response:Character[] = []

  await axios.get(`${apiBase}/public/characters?limit=${limit}`, {
    params,
    headers
  }).then(data => {
    response = data.data.data.results
  }).catch(err => {
    handleErrors(err)
  })

  return response
}

export async function getCharacter(id: string) {
  let response: Character = {
    comics: undefined,
    description: "",
    events: undefined,
    id: 0,
    modified: "",
    name: "",
    resourceURI: "",
    series: undefined,
    stories: undefined,
    thumbnail: {
      path: "",
      extension: ""
    },
    urls: undefined
  }

  await axios.get(`${apiBase}/public/characters/${id}`, {
    params,
    headers
  }).then(data => {
    response = data.data.data.results[0]
  }).catch(err => {
    handleErrors(err)
  })

  return response
}

export function getCharactersOfListIds(
  ids: any,
  setCharacters: (character: any) => void) {
  axios.all(
    ids.map(async (item: any) =>
      await axios.get(`${apiBase}/public/characters/${item}`, {
        params,
        headers
      })
    )
  ).then(data => {
    const characters: Character[] = []

    data.map((item: any) => {
      characters.push(item.data.data.results[0])
    })

    setCharacters(characters)
  }).catch(err => {
    handleErrors(err)
  })
}

export function getEventsOfListIds(
  ids: any,
  setEvents: (character: any) => void) {
  axios.all(
    ids.map(async (item: any) =>
      await axios.get(`${apiBase}/public/events/${item}`, {
        params,
        headers
      })
    )
  ).then(data => {
    const events: TEvent[] = []

    data.map((item: any) => {
      events.push(item.data.data.results[0])
    })

    setEvents(events)
  }).catch(err => {
    handleErrors(err)
  })
}

export function getCharacterComics(
  uris: any,
  setComics: (comics: any) => void,
  sliceMin: number,
  sliceMax: number) {
  axios.all(
    uris.slice(sliceMin,sliceMax).map(async (item: any) =>
      await axios.get(`${item.resourceURI}`, {
        params,
        headers
      })
    )
  ).then(data => {
    const comics:Comic[] = []

    data.map((item: any) => {
      comics.push(item.data.data.results[0])
    })

    setComics(comics)
  }).catch(err => {
    handleErrors(err)
  })
}

function handleErrors (err: any) {
  if(err.response?.data.code === "RequestThrottled") {
    window.location.assign(`${window.location.href}/RequestThrottled`)
  }
  console.log(err)
}