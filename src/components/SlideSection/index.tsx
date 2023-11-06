'use client'
import { ReactNode } from "react"
import Slider from "react-slick";

interface Props {
  title: string
  data: ReactNode
}

export default function SlideSection(props: Props) {
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
    <div>
      <h2 className='text-xl md:text-4xl uppercase font-semibold px-3'>{props.title}</h2>
      <Slider {...settings} className='mt-5'>
        {props.data}
      </Slider>
    </div>
  )
}