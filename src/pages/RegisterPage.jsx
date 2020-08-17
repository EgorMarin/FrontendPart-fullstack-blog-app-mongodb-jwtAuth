import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/toast.hook'
// import axios from 'axios'

import { Context } from '../index'
import { observer } from "mobx-react";

const RegisterPage = () => {
  const store = useContext(Context)
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const history = useHistory()
  const message = useMessage()

  // const onRegister = async (e) => {
  //   e.preventDefault()
  //   const {data} = await axios.post("/api/user/register", {username, email, password})
  //   if (data.error) return message(data.error)
  //   message("Welcome! You're already registered. Please sign in")
  //   history.push('/user/login')
  // }

  const onRegister = async (e) => {
    e.preventDefault()
    store.user.register({username, email, password})
  }
  if (store.error) {
    message(store.error)
    store.setError(null)
  }
  if (store.user.registered) {
    message("Welcome! You're already registered. Please sign in")
    history.push('/user/login')
  }

  return (
    <div className="row">
      <form className="col s11 offset-s3">
        <h2>Create an account</h2>
        <div className="row">
          <div className="input-field col s6">
            <input value={username} onChange={e => setUsername(e.target.value)} id="first_name" type="text" className="validate"  />
            <label htmlFor="first_name">Name</label>
          </div>
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
        <button onClick={onRegister} className="btn waves-effect orange darken-2" type="submit" name="action">Sign up</button>
      </form>
    </div>
  )
}

export default observer(RegisterPage)
