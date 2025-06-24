import React, {useState, useEffect} from 'react'
import dbservice from '../../appwrite/config'
import Container from '../Container/container'
import Card from '../Card'

function AllPosts() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        dbservice.listPosts([]).then((posts) => {
            if(posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  return (
    <div className='w-full py-8'>
        <Container>
            <div className='flex flex-wrap'>
            {posts.map((post)=> (
                <div key={post.$id} className='p-2 w-1/4'>
                    <Card post={post} />
                </div>
            ))}
            </div>
        </Container>
    </div>
  )
}

export default AllPosts