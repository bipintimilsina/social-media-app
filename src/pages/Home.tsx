import  { useEffect, useState } from 'react'


import Post from '../components/Post'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase'


export interface PostType {
  id: string,
  title: string,
  userId: string,
  description: string,
  username: string,

}

function Home() {

  const [postList, setPostsList] = useState<PostType[] | null>(null)

  const postRef = collection(db, 'posts')

  const fetchPosts = async () => {
    const result = await getDocs(postRef)
    setPostsList(result.docs.map((doc) => ({...doc.data(),id:doc.id})) as PostType[])
    console.log(result.docs.map((doc) => ({...doc.data(),id:doc.id})) as PostType[])


    // console.log(postList)

  }

  useEffect(() => {
    fetchPosts()
  }, [])


  return (

    // <div>{postList?.map((post) => {



    //   return <Post key={post.id} post={post}></Post>

    // })}


    // </div>


    <div className="home-container">
    {postList && postList.length > 0 ? (
      postList.map((post) => <Post key={post.id} post={post} />)
    ) : (
      <p>No posts available. Be the first to create one!</p>
    )}
  </div>

  )

}

export default Home