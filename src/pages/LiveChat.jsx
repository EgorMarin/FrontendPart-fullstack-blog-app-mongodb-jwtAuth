import React, { useState, useEffect, useCallback } from 'react'
import io from 'socket.io-client';
import '../chat.css'

const LiveChat = () => {
  const [messages, setMessages] = useState([])
  const [users, setUsers] = useState([])
  const [userName, setUserName] = useState('')
  const [authorized, setAuthorized] = useState(false)

  const socket = io();

  const onLogin = (e) => {
    e.preventDefault()
    if(userName) socket.emit('ROOM:JOIN', userName)
    setAuthorized(true)
  }

  useEffect(() => { 
    socket.on('ROOM:SET_MESSAGES', msgs => {
      setMessages(msgs)
    })
    socket.on('ROOM:SET_USERS', usrs => {
      setUsers(usrs)
    })
    // eslint-disable-next-line
  }, [])



  ///////////////////chat.jsx
  const [messageValue, setMessageValue] = useState('')

  const onWriting = useCallback((e) => {
    e.preventDefault()
    if (messageValue) {
      socket.emit('ROOM:NEW_MESSAGE', {
        text: messageValue, userName
      })
      setMessageValue('')
    }
  }, [userName, messageValue])

  return (
    <>
    {
      !authorized ? (
      <div className="row">
        <form className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input 
                value={userName} 
                onChange={e => setUserName(e.target.value)} 
                id="text" 
                type="text" 
                className="validate" 
              />
              <label htmlFor="text">Nickname</label>
            </div>
            <button onClick={onLogin} className="btn waves-effect" type="submit">Submit</button>
          </div>
        </form>
      </div> ) : (
        <>
          <div className="box-silver">
            <span>Online: ({users.length})</span>
            {users.map(user => (
              <div key={user.socketId}>
                <strong>{user.userName}</strong>
              </div>
            ))}
          </div>
    
          <div className="row msg-container mt-1">
            <div className="col m12 col s12">
              <div className="box-blue">
                {messages.map(message => <>
                  <span className="content">{message.text}</span>
                  <div>
                  <strong>{message.userName}</strong>
                  </div>
                </>)}
              </div>
            </div>
          </div>
        
          <div className="row">
            <form>
              <div className="col m11 s11">
                <input type="text" value={messageValue} onChange={e => setMessageValue(e.target.value)} placeholder="Введите сообщение..."/>
              </div>
              <div className="col m1 s1">
                <button onClick={onWriting} type="submit" className="btn chat-submit-button"><i className="material-icons">send</i></button>
              </div>
            </form>
          </div>
        </>
      )
    }
    </>
  )
}

export default LiveChat
