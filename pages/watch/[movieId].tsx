import React from 'react';
import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import useMovie from '@/hooks/useMovie';

const Watch = () => {
  const router = useRouter();
  const { movieId } = router.query;

  const { data } = useMovie(movieId as string);

  return (
    <div className='h-screen w-screen bg-black'>
      <nav className='
          fixed
          w-full
          p-4
          z-10
          flex
          flex-row
          items-center
          bg-black
          gap-8
          bg-opacity-70
        '>

        <AiOutlineArrowLeft className='text-white cursor-pointer' size={30} onClick={() => router.push('/')}/>
        <p className='text-white text-xl md:text-3xl font-bold'>
          <span className='font-light mr-1'>
            Watching:
          </span>
          {data?.title}
        </p>
      </nav>
      <video src={data?.videoUrl} className='h-full w-full' autoPlay controls></video>
    </div>
  )
}

export default Watch;