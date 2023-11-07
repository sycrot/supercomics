import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export function SkeletonComics() {
  return (
    <div className='px-3 overflow-hidden'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton height={52} width={300} />
        </p>
        <div className="flex gap-3 mt-5">
          {Array(8).fill('skeleton').map((item, index) => (
            <Skeleton height={416} width={339} key={index} />
          ))}

        </div>
      </SkeletonTheme>
    </div>
  )
}

export function SkeletonHeroes() {
  return (
    <div className='px-3 overflow-hidden'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton height={52} width={300} />
        </p>
        <div className="flex gap-3 mt-5">
          {Array(8).fill('skeleton').map((item, index) => (
            <Skeleton height={256} width={244} key={index} />
          ))}

        </div>
      </SkeletonTheme>
    </div>
  )
}

export function SkeletonList() {
  return (
    <div className='px-3 overflow-hidden'>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <p>
          <Skeleton height={52} width={300} />
        </p>
        <div className="flex justify-end mt-10">
          <Skeleton height={40} width={405} />
        </div>
        <div className="flex gap-3 mt-10">
          {Array(5).fill('skeleton').map((item, index) => (
            <Skeleton height={416} width={297} key={index} />
          ))}

        </div>
      </SkeletonTheme>
    </div>
  )
}