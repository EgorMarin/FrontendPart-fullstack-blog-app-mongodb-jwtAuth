import React, { useEffect, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { useMessage } from '../hooks/toast.hook'
import Loader from '../components/Loader'
// import axios from 'axios'

import { Context } from '../index'
import { observer } from "mobx-react";

const ShowPost = () => {
  const store = useContext(Context)

  // const [post, setPost] = useState({
  //   text: '', username: '', time: ''
  // })
  // const [loading, setLoading] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const message = useMessage()

  // useEffect(() => {
  //   const id = location.pathname.split('/posts/post/')[1]
  //   const fetchPost = async () => {
  //     setLoading(true)
  //     const {data} = await axios.get(`/api/posts/post/${id}`)
  //     if(data.error) return message(data.error)
  //     setPost({text: data.text, username: data.username, time: data.updatedAt})
  //     setLoading(false)
  //   }
  //   fetchPost()
  //   // eslint-disable-next-line
  // }, [location.pathname])

  useEffect(() => {
    const id = location.pathname.split('/posts/post/')[1]
    store.fetchPost(id)
    if (store.error) {
      message(store.error)
      store.setError(null)
    }
    // eslint-disable-next-line
  }, [location.pathname])

  const clickHandler = () => history.push('/posts')

  return <>
    { store.loading ? <Loader /> : (
      <div className="row ">
        <div className="col s12 m10 offset-m1">
          <div className="card grey lighten-4 mt-1">
            <div className="card-content black-text">
              <span>{store.post.updatedAt}</span>
              <span className="card-title">Author: {store.post.username}</span>
              <p>{store.post.text}</p>
            </div>
            <div className="card-action">
              <i onClick={clickHandler} className="material-icons cp">arrow_back</i>
            </div>
          </div>
        </div>
      </div>
    )}
  </>
}

export default observer(ShowPost)
