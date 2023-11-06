import Link from "next/link";

export default function RequestThrottled () {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      Exceeded rate limit. Please try again later.
      <Link href="/" className="mt-5 hover:underline">Reload</Link>
    </div>
  )
}