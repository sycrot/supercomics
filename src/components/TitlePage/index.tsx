import Image, { StaticImageData } from "next/image";

interface Props {
  title: string
  description: string
  image: StaticImageData
}

export default function TitlePage (props: Props) {
  return (
    <div className="w-full h-60 md:h-80 relative">
      <Image src={props.image} alt="bg" className="w-full h-full object-cover opacity-30"/>
      <div className="text-center absolute w-full h-full top-0 flex items-center justify-center flex-col z-10">
        <h1 className="uppercase text-4xl md:text-6xl tracking-widest title-page block relative">{props.title}</h1>
        <p className="md:text-xl">{props.description}</p>
      </div>
    </div>
  )
}