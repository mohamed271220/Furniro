import React from 'react';
import { Link } from 'react-router-dom';

import { BsPersonFill } from 'react-icons/bs';
import { AiFillCalendar, AiFillTag } from 'react-icons/ai';

const Post = ({ post, isWidget }) => {
  const date = new Date(post.createdAt);
  const formattedDate = `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;


  if (isWidget) {
    return (
      <Link className='w-full flex flex-row gap-3 justify-start items-center' to={`/blog/${post._id}`}>
        <img className=' object-cover rounded-lg h-[70px] w-[70px] ' src={post.image} alt="" />
        <div className='flex flex-col '>
          <h2 className='font-semibold text-[2vh] '>{post.title}</h2>
          <p className='text-[1.6vh]'>{formattedDate}</p>
        </div>
      </Link>
    )
  }


  return (
    <Link className='w-full ' to={`/blog/${post._id}`}>
      <img className='w-full h-[500px] object-cover rounded-lg' src={post.image} alt="" />
      <div className='flex flex-col gap-[2vh] mt-[1vh] '>
        <div className='flex flex-row flex-wrap gap-[3vh] text-gray-400 text-[2vh]'>
          <span className='m-0 flex flex-row items-center gap-2'><BsPersonFill />{post.postedBy}</span>
          <span className='m-0 flex flex-row items-center gap-2'><AiFillCalendar /> {formattedDate}</span>
          <span className='m-0 flex flex-row items-center gap-2'><AiFillTag />{post.tag}</span>
        </div>
        <h3 className='font-semibold text-[3.5vh]'>{
          post.title
        }</h3>
        <p className='text-gray-400 text-[2vh]'>
          {post.body.find(element => element.type === 'paragraph')?.content}
        </p>
      </div>
      <div className='mt-[3.5vh]  text-[2vh]'>
        <span className='m-0 border-b-2 border-black pb-2 '>Read More</span>
      </div>
    </Link>
  )
}

export default Post