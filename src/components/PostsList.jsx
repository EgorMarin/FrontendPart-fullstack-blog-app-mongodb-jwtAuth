import React from 'react'
import { Link, useHistory } from 'react-router-dom'

const PostsList = ({posts, userId}) => {
  const history = useHistory()
  return <>
    {posts.map(post => {
      const clickHandler = () => history.push(`/posts/post/${post._id}`)
      return (
        <div className="col s6 m4" key={post._id}>
          <div className="card grey lighten-4 hoverable cp">
            <div className="card-content black-text" onClick={clickHandler}>
              <span>{post.updatedAt}</span>
              <span className="card-title">Author: {post.username}</span>
              <p className="truncate">{post.text}</p>
            </div>
            {
              userId === post.userId 
              ? <div className="card-action">
                  <Link to={`/posts/post/${post._id}`}>Open</Link>
                  <Link to={`/posts/edit/${post._id}`}>Edit</Link>
                </div>
              : <div className="card-action">
                  <Link to={`/posts/post/${post._id}`}>Open</Link>
              </div>
            }
          </div>
        </div>
      )
    })}
  </>
}

export default PostsList
