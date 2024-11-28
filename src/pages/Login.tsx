
import { auth, provider } from "../config/firebase"

import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
function Login() {
  const navigate = useNavigate()
  const signInWithGoogle = async () => {
     await signInWithPopup(auth, provider)
    navigate('/')
    console.log(auth.currentUser);


  }

  return (
    <>
      {/* <p>Sign in with Google to Continue</p>
      <button onClick={signInWithGoogle}>Sign in with Google</button> */}


<div className="login-container">
      <div className="login-card">
        <h1>Welcome Back!</h1>
        <p>Sign in with Google to continue.</p>
        <button className="login-button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
    </div>

    </>
  )

}

export default Login