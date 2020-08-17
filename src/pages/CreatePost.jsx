import React, { useState, useEffect, useContext } from 'react'
import { useHistory} from 'react-router-dom'
import { useMessage } from '../hooks/toast.hook'
// import axios from 'axios'

import { Context } from '../index'
import { observer } from "mobx-react";

const CreatePost = () => {
  const store = useContext(Context)

  const [text, setText] = useState('')
  // const [jwt, setJwt] = useState('')
  const history = useHistory()
  // const location = useLocation()
  const message = useMessage()

  // useEffect(() => {
  //   const {token} = JSON.parse(localStorage.getItem('storage') || "{}")
  //   if (token) setJwt(token)
  // }, [location.pathname])

  // const onCreate = async () => {
  //   const {data} = await axios.post("/api/posts/create", {text}, { headers: {'authtoken': jwt}})
  //   if (data.error) return message(data.error)
  //   message("You've successfully created a new post")
  //   history.push('/posts')
  // }

  useEffect(() => {
    store.user.getToken()
    // eslint-disable-next-line
  }, [])

  const onCreate = async () => {
    if (!text) return message("Post can't be empty!") 
    const error = await store.createPost(text)
    if (error) return message(error)
    message("You've successfully created a new post")
    history.push('/posts')
  }

  const clickHandler = () => history.push('/posts')

  return (
    <div className="row">
      <h2>Create a new post</h2>
      <div className="input-field col s12">
        <textarea 
          value={text} 
          onChange={e => setText(e.target.value)} 
          id="textarea1" 
          className="materialize-textarea"
        />
        <label htmlFor="textarea1">Textarea</label>
      </div>
      <button onClick={onCreate} className="btn waves-effect orange darken-2 col s2" name="action">Create</button>
      <i onClick={clickHandler} className="medium material-icons cp col s12 mt-1">keyboard_return</i>
    </div>
  )
}

export default observer(CreatePost)
