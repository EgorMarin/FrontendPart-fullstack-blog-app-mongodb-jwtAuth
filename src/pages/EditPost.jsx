import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/toast.hook'
import Loader from '../components/Loader'
// import axios from 'axios'

import { Context } from '../index'
import { observer } from "mobx-react";

const EditPost = () => {
  const store = useContext(Context)

  const [text, setText] = useState('')
  // const [jwt, setJwt] = useState('')
  // const [loading, setLoading] = useState(false)
  const message = useMessage()
  const location = useLocation()
  const history = useHistory()
  const id = location.pathname.split('/posts/edit/')[1]

  // useEffect(() => {
  //   const fetchPost = async () => {
  //     setLoading(true)
  //     const {data} = await axios.get(`/api/posts/post/${id}`)
  //     setText(data.text)
  //     setLoading(false)
  //   }
  //   fetchPost()
  //   // eslint-disable-next-line
  // }, [location.pathname])

  useEffect(() => {
    const fetchPost = async () => {
      //не успевает текст занестись в форму, поэтому возращаем text из запроса
      const postText = await store.fetchPost(id)
      setText(postText)
    }
    fetchPost() 
    store.user.getToken()
    // 
    // eslint-disable-next-line
  }, [])

  // useEffect(() => {
  //   const {token} = JSON.parse(localStorage.getItem("storage") || "{}")
  //   if (token) setJwt(token)
  // }, [])
  
  // const editHandler = async () => {
  //   const {data} = await axios.post(`/api/posts/edit/${id}`, {text}, { headers: {'authtoken': jwt}})
  //   if (data.error) return message(data.error)
  //   message("You've successfuly edited your post")
  //   history.push('/posts')
  // }

  const editHandler = async () => {
    const error = await store.editPost({id, text})
    if (error) return message(error)
    message("You've successfuly edited your post")
    history.push('/posts')
  }

  // const deleteHandler = async () => {
  //   const {data} = await axios.delete(`/api/posts/delete/${id}`, { headers: {'authtoken': jwt}})
  //   if (data.error) return message(data.error)
  //   message("You've successfuly deleted your post")
  //   history.push('/posts')
  // }

  const deleteHandler = async () => {
    const error = await store.deletePost(id)
    if (error) return message(error)
    message("You've successfuly deleted your post")
    history.push('/posts')
  }

  const clickHandler = () => history.push('/posts')
  
  if (store.error) return message(store.error)

  return <>
    { store.loading ? <Loader /> : (
      <div className="row">
        <h2>Edit or delete post</h2>
        <div className="input-field col s12">
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            id="textarea1" 
            className="materialize-textarea"
          />
          <label className="active" htmlFor="textarea1">Textarea</label>
        </div >
        <div className="card-action">
          <button onClick={editHandler} className="btn waves-effect green accent-3 col s1" type="submit" name="action">Edit</button>
          <button onClick={deleteHandler} className="btn waves-effect red accent-4 col s1 offset-s1" type="submit" name="action">Delete</button>
        </div>
        <i onClick={clickHandler} className="medium material-icons cp col s12 mt-1">keyboard_return</i>
      </div>
    )}
  </>
}

export default observer(EditPost)
