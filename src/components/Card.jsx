import React from 'react'
import dbservice from '../appwrite/config'
import { Link } from 'react-router-dom'

function Card({ post }) {
  console.log("Preview URL:", dbservice.getFilePreview(post.image))

  return (
    <Link to={`/posts/${post.$id}`}>
      <div className='w-full bg-gray-100 rounded-xl p-4'>
        <div className='w-full justify-center mb-4'>
          <img src={dbservice.getFilePreview(post.image)} alt={post.title} className='rounded-xl' />
        </div>
        <h2 className='text-xl font-bold'>{post.title}</h2>
      </div>
    </Link>
  )
}


export default Card