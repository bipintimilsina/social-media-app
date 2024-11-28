import { useEffect, useState } from 'react'


import { PostType } from '../pages/Home'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore'
import { auth, db } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
interface PropType {
  post: PostType
}


interface Like {
  userId: string,
  likeId: string,
}

function Post(props: PropType) {

  const [user] = useAuthState(auth)


  const [like, setLike] = useState<Like[] | null>(null)
  const { post } = props
  const likesRef = collection(db, 'postsLikes')

  const likesDoc = query(likesRef, where("postId", "==", post.id))

  const fetchLikes = async () => {
    const data = await getDocs(likesDoc)

    setLike(data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id })))
  }
  const hasUserLiked = like?.find((like) => user?.uid == like.userId)

  const onAddLike = async () => {

    const newDoc = await addDoc(likesRef, { userId: user?.uid, postId: post.id })
    if (user) {
      setLike((prev) => prev ? [...prev, { userId: user?.uid, likeId: newDoc.id }] : [{ userId: user?.uid, likeId: newDoc.id }])
    }

  }


  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(likesRef, where('postId', "==", post.id), where('userId', "==", user?.uid))

      const likeToDeleteData =
        await getDocs(likeToDeleteQuery)
      const likeId = likeToDeleteData.docs[0].id

      const likeToDelete = doc(db, 'postsLikes', likeToDeleteData.docs[0].id)
      console.log(likeToDeleteData)
      // console.log)


      await deleteDoc(likeToDelete)
      setLike((prev) => prev!.filter((like) => like.likeId != likeId))



    }
    catch (err) { console.log(err) }
  }


  useEffect(() => {
    fetchLikes()
  }, [])


  return (
    // <div>

    //   <ul>
    //     <li>{post.title}</li>
    //     <li>{post.description}</li>
    //     <button onClick={hasUserLiked ? removeLike : onAddLike}>


    //       {hasUserLiked ? "👎" :
    //         "👍"}</button>
    //     <span>Like:{like?.length}</span>
    //     <br />


    //   </ul>



    // </div>


    <div className="post-card">
    <h2 className="post-title">{post.title}</h2>
    <p className="post-description">{post.description}</p>

    <div className="post-actions">
      <button
        onClick={hasUserLiked ? removeLike : onAddLike}
        className={`post-button ${hasUserLiked ? "liked" : ""}`}
      >
        {hasUserLiked ? "👎 Unlike" : "👍 Like"}
      </button>
      <span className="post-likes">Likes: {like?.length || 0}</span>
    </div>

    {/* {error && <p className="post-error">{error}</p>} */}
  </div>
  )
}

export default Post