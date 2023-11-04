import React from 'react'
import { Link } from 'react-router-dom'

const Post = ({ post }) => {
  return (
    <Link>
      <img src={post.image} alt="" />
      <div>
        <div className='tags'>
          <span>{post.tag}</span>
          <span>{post.postedBy}</span>
          <span>{post.createdAt}</span>
        </div>
        <h3>{
          post.title
        }</h3>
        <p>
          {post.body.find(element => element.type === 'title')?.content}
        </p>
      </div>
      <div className='readmore'>
        <span>Read More</span>
        <i className="fa-solid fa-angle-right"></i>

      </div>
    </Link>
  )
}

export default Post