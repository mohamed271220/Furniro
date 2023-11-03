import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <Link>
      <img src="" alt="" />
      <div>
        <div className='tags'></div>
        <h3></h3>
        <p></p>
      </div>
      <div className='readmore'></div>
    </Link>
  )
}

export default Post