/* eslint-disable @next/next/no-img-element */
import Slider from "react-slick";
import SpiderManLogo from '@/assets/images/spiderman.svg'
import Image from "next/image";

interface Props {
  title: string
  data: React.ReactNode
}

export default function SectionHero(props: Props) {
  const settings = {
    infinite: false,
    slidesToShow: 5,
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
    <div className="relative">
      <div className="w-full h-707 flex justify-center md:justify-start items-end pb-52 md:pl-28 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full object-cover -z-10">
          <img src="https://assetsio.reedpopcdn.com/header_bfV6yAK.jpg?width=1920&height=1920&fit=bounds&quality=80&format=jpg&auto=webp" alt="Spider Man wallpaper" className="w-full h-full object-cover" />
          <div className="bg-gradient-left w-full h-full absolute z-10 top-0">
          </div>
        </div>
        <Image src={SpiderManLogo} alt="Spider Man" />
      </div>
      <div className="absolute z-10 w-full -bottom-60 md:-bottom-64">
        <Slider {...settings} className='mt-5 md:px-3'>
          {props.data}
        </Slider>
      </div>
    </div>
  )
}