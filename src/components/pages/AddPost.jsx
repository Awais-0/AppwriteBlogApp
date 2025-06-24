import React from 'react'
import Container from '../Container/container' 
import PostForm from '../postform'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost