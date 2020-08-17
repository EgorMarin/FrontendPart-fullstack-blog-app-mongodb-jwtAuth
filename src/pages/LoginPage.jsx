import React, { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/toast.hook'
// import axios from 'axios'

import { Context } from '../index'
import { observer } from "mobx-react";

const LoginPage = () => {
  const store = useContext(Context)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
  const message = useMessage()

  // const onLogin = async (e) => {
  //   e.preventDefault()
  //   const {data} = await axios.post("/api/user/login", {email, password})
  //   if (data.error) return message(data.error)
  //   if (data.token) {
  //     message("You're successfully logined")
  //     localStorage.setItem('storage', JSON.stringify(data))
  //     history.push('/posts')
  //   }
  // }

  const onLogin = async (e) => {
    e.preventDefault()
    store.user.login({email, password})
  }

  if (store.error) {
    message(store.error)
    store.setError(null)
  }
  // console.log('token', store.user.token);
  // console.log('userId', store.user.userId);

  if (store.user.token) {
    message("You're successfully logined")
    history.push('/posts')
  }

  return (
    <div className="row">
    <form className="col s11 offset-s3">
      <h2>Login Page</h2>
      <div className="row">
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input value={email} onChange={e => setEmail(e.target.value)} id="email" type="email" className="validate" />
          <label htmlFor="email">Email</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s6">
          <input value={password} onChange={e => setPassword(e.target.value)} id="password" type="password" className="validate" />
          <label htmlFor="password">Password</label>
        </div>
      </div>
      <button onClick={onLogin} className="btn waves-effect orange darken-2" type="submit" name="action">Sign in</button>
      <h5>Don't have an account? <Link to="/user/register">Sign Up</Link></h5>
    </form>
    </div>
  )
}

export default observer(LoginPage)
