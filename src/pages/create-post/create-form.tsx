import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../config/firebase'
export default function CreateForm() {




  interface CreateFormData {
    title: string;
    description: string;

  }


  const [user] = useAuthState(auth)


  const schema = yup.object().shape({
    title: yup.string().required("You must add a title")
    ,
    description: yup.string().required("You must add a description"),

  })


  const postsRef = collection(db, "posts")

  const { register, handleSubmit, formState: { errors } } = useForm<CreateFormData>({
    resolver: yupResolver(schema)
  })



  const onCreatePost = async (data: CreateFormData) => {
    await (addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      id: user?.uid,


    }))

    console.log(data)


  }

  return (
    // <div><form onSubmit={handleSubmit(onCreatePost)}>

    //   <input type="text" placeholder='Title' {...register('title')} />


    //   <p style={{ color: 'red' }}>{errors.title?.message}</p>
    //   <textarea placeholder='Description' {...register('description')} />
    //   <p style={{ color: 'red' }}>{errors.description?.message}</p>

    //   <input type="submit" />



    // </form></div>

    <div className="form-container">
      <form onSubmit={handleSubmit(onCreatePost)} className="create-form">
        <div className="input-group">
          <input
            type="text"
            placeholder="Title"
            {...register('title')}
            className="input-field"
          />
          {errors.title && <p className="error-message">{errors.title.message}</p>}
        </div>

        <div className="input-group">
          <textarea
            placeholder="Description"
            {...register('description')}
            className="input-field"
          />
          {errors.description && <p className="error-message">{errors.description.message}</p>}
        </div>

        <button type="submit" className="submit-btn" >Create Post
          {/* {isSubmitting ? 'Submitting...' : 'Create Post'} */}
        </button>
      </form>
    </div>
  )
}

