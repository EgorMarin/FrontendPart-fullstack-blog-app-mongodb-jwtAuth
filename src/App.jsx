import React, { useState, useEffect } from 'react'
import { Switch, Route, Redirect} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CreatePost from './pages/CreatePost'
import Navbar from './components/Navbar'
import AllPosts from './pages/AllPosts'
import EditPost from './pages/EditPost'
import ShowPost from './pages/ShowPost'
// import LiveChat from './pages/LiveChat'


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  useEffect(() => {
    const {token} = JSON.parse(localStorage.getItem('storage') || "{}")
    if (token) setIsAuthenticated(!!token)
  }, [])

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated}/>
      <div className="container">
          { isAuthenticated 
            ? <Switch>
                <Route path="/posts" component={AllPosts} exact />
                <Route path="/posts/post/:id" component={ShowPost} exact/>
                <Route path="/posts/edit/:id" component={EditPost} exact />
                <Route path="/posts/create" component={CreatePost} exact />
                <Route path="/user/login" component={LoginPage} exact />
                {/* <Route path='/chat' component={LiveChat} /> */}
                <Redirect to="/posts" exact/>
              </Switch>
            : <Switch>
                <Route path="/posts" component={AllPosts} exact />
                <Route path="/posts/post/:id" component={ShowPost} exact/>
                <Route path="/user/register" component={RegisterPage} exact />
                <Route path="/user/login" component={LoginPage} exact />
                {/* убери redirect для проверки роутов, юзер не может удалить или редакт не свой пост на странице posts/edit/:id(чужого поста)*/}
                <Redirect to="/posts" exact/>
            </Switch>
          }
      </div>
    </>
  )
}

export default App
