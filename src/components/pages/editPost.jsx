import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import dbservice from '../../appwrite/config'
import Container from '../Container/container'
import PostForm from '../postform'

function EditPost() {
    const [post, setPost] = useState(null)
    const slug = useParams()
    const navigate = useNavigate()

    useEffect(()=> {
        if(slug) {
            dbservice.getPost(slug).then(post => {
                if(post) {
                    setPost(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <div className='py-8'>
        <Container>
            <PostForm post={post} />
        </Container>
    </div>
  ) : null
}

export default EditPost