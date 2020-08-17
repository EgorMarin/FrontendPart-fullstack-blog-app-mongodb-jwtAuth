import React, { useEffect, useState, useContext } from 'react'
import Pagination from '../components/Pagination'
import PostsList from '../components/PostsList'
import Loader from '../components/Loader'
// import axios from 'axios'

import { Context } from '../index'
import { observer } from "mobx-react";

const AllPosts = () => {
  const store = useContext(Context)

  // const [posts, setPosts] = useState([])
  const [index, setIndex] = useState(0)
  // const [count, setCount] = useState(0)
  // const [userId, setUserId] = useState(null)
  // const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     setLoading(true)
  //     const {data} = await axios.get(`/api/posts/${index}`)
  //     const {userId} = JSON.parse(localStorage.getItem('storage') || "{}")
  //     setUserId(userId)
  //     setPosts(data.posts)
  //     setCount(data.count)
  //     setLoading(false)
  //   }
  //   fetchPosts()
  // }, [index])

  useEffect(() => {
    store.user.getUserId()
    store.fetchPosts(index)
    // eslint-disable-next-line
  }, [index])

  return <>
    {store.loading ? <Loader/> : (
      <div className="row mt-1" >
        {/* <PostsList posts={posts} userId={userId}/> */}
        <PostsList posts={store.posts} userId={store.user.userId}/>

        <div className="col s6 offset-s5">
          <Pagination 
            count={store.count} 
            index={index} 
            setIndex={(idx) => setIndex(idx)}
          />
        </div> 
      </div>
    )}
  </>
}

export default observer(AllPosts)
