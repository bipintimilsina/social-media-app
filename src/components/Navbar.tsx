import { auth } from '../config/firebase';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
function Navbar() {
  const [user] = useAuthState(auth);

  const defaultAvatar = "https://via.placeholder.com/100";

  // Debugging: Check the user object
  console.log("User object:", user);

  const signUserOut = async () => {
    await signOut(auth)

  }

  return (
    // <div className="flex mt-3 justify-center items-center">
    //   <Link className="border rounded-md p-2 text-white bg-blue-400" to="/">
    //     Homepage
    //   </Link>
    //   {user ? (<Link to="/createPost">Create Post</Link>) : (<Link className="border rounded-md p-2 text-white bg-blue-400" to="/login">

    //     Login
    //   </Link>
    //   )
    //   }
    //   <div>
    //     {user && (
    //       <>
    //         <p>{user?.displayName || "Guest"}</p>
    //         <img
    //           src={user?.photoURL || defaultAvatar}
    //           alt="User Avatar"
    //           width="100px"
    //           height="100px"
    //           className="rounded-full border"
    //         />
    //       </>
    //     )


    //     }
    //     <button onClick={signUserOut}>Logout</button>
    //   </div>
    // </div>



    <nav className="navbar">
    <div className="navbar-logo">
      <Link to="/">MyApp</Link>
    </div>
    <div className="navbar-links">
      <Link to="/" className="navbar-link">
        Homepage
      </Link>
      {user ? (
        <Link to="/createPost" className="navbar-link">
          Create Post
        </Link>
      ) : (
        <Link to="/login" className="navbar-link">
          Login
        </Link>
      )}
    </div>
    {user && (
      <div className="navbar-user">
        <img
          src={user.photoURL || defaultAvatar}
          alt="User Avatar"
          className="navbar-avatar"
        />
        <p className="navbar-username">{user.displayName || "Guest"}</p>
        <button onClick={signUserOut} className="navbar-logout">
          Logout
        </button>
      </div>
    )}
  </nav>
  );
}

export default Navbar;
