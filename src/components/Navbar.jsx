import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const Navbar = ({isAuthenticated}) => {
  const history = useHistory()

  const logoutHandler = () => {
    localStorage.removeItem('storage')
    history.push('/posts')
  }

  return <>
    { isAuthenticated ?
      <nav>
        <div className="nav-wrapper z-depth-2 pink darken-1 plr-2">
          <Link to="/posts" className="brand-logo">iBlog</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><Link to="/chat">Live chat</Link></li> */}
            <li><Link to="/posts/create">Create</Link></li>
            <li><a href="/" onClick={logoutHandler}>Logout</a></li>
          </ul>
        </div>
      </nav>
      : 
      <nav>
        <div className="nav-wrapper z-depth-2 pink darken-1 plr-2">
          <Link to="/posts" className="brand-logo">iBlog</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {/* <li><Link to="/chat">Live chat</Link></li> */}
            <li><Link to="/user/login">Login</Link></li>
          </ul>
        </div>
      </nav>
    }
  </>
}

export default Navbar
