import { useEffect, useState } from 'react'

export default function Home() {
  const [text, setText] = useState('bounty program')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setText((prevText) =>
        prevText.includes('bounty program') ? 'pentester' : 'bounty program'
      )
    }, 2000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className='place-content-center'>
      <div className='flex flex-col max-w-lg mx-auto text-center items-center'>
        <div className='text-5xl leading-snug font-semibold mb-8'>
          <h1>Find the right</h1>
          <h1 className='font-bold'>{text}</h1>
          <h1>
            for <span className='italic underline underline-offset-2'>you</span>
          </h1>
        </div>
      </div>
    </div>
  )
}
