import React, { useRef, useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useToasts } from 'react-toast-notifications'
import './chatroom.css'
import { SEND_SMS, CLEAR_SMS } from '../../actions'
import { connect } from 'react-redux'

function ChatRoom({ mesagesData = [], CurrentUser = '', dispatch }) {
  let messagestore = JSON.parse(localStorage.getItem('messageData'))

  const { addToast } = useToasts()
  const [messages, setMessages] = useState(mesagesData)

  const messageinput = useRef('')
  const formref = useRef()

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(messagestore)
    }, 500)
    return () => clearInterval(interval)
  })

  function sendMessage() {
    if (messageinput.current.value !== '') {
      dispatch({
        type: SEND_SMS,
        payload: { username: CurrentUser, message: messageinput.current.value, time: '19:00' },
      })
    }
    messageinput.current.value = ''
  }

  function isender(localsender, messagesender) {
    if (localsender == messagesender) {
      return true
    }
  }

  document.body.onkeyup = function (e) {
    if (e.code == 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="chat">
      <div>
        <div className="message-box">
          <>
            <span style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
              Chat Room{' '}
            </span>
            {messages &&
              messages.map((sms, i) => (
                <div className="dialog" id={i}>
                  {!isender(CurrentUser, sms.username) && (
                    <div
                      className="avar"
                      id={i}
                      style={{
                        background: !isender(CurrentUser, sms.username)
                          ? 'rgb(190, 191, 199)'
                          : 'rgb(95, 105, 185)',
                      }}
                    >
                      <span className="usn" id={i}>
                        {sms.username}
                      </span>{' '}
                    </div>
                  )}{' '}
                  <div
                    className="message"
                    id={i}
                    style={{
                      display: 'flex',
                      justifyContent: sms.sender ? 'center' : 'center',
                      background: !isender(CurrentUser, sms.username)
                        ? 'rgb(190, 191, 199)'
                        : 'rgb(95, 105, 185)',
                    }}
                  >
                    <span id={i}> {sms.message} </span>{' '}
                  </div>{' '}
                  {isender(CurrentUser, sms.username) && (
                    <div
                      className="avar"
                      id={i}
                      style={{
                        background: !isender(CurrentUser, sms.username)
                          ? 'rgb(190, 191, 199)'
                          : 'rgb(95, 105, 185)',
                      }}
                    >
                      <span className="usn" id={i}>
                        {' '}
                        {sms.username.substring(0, 5)}{' '}
                      </span>{' '}
                    </div>
                  )}{' '}
                </div>
              ))}{' '}
          </>
        </div>
        <div className="messsage-form">
          <TextField
            label="Type message "
            margin="normal"
            inputRef={messageinput}
            variant="outlined"
            autoComplete="off"
            fullWidth
            ref={formref}
          />{' '}
          <Button
            variant="contained"
            onClick={() => sendMessage()}
            style={{
              color: '#ffff',
              maxWidth: '100px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px',
              background: '#1F2937',
              marginTop: '25px',
            }}
          >
            Send{' '}
          </Button>{' '}
          <Button
            variant="contained"
            onClick={() => dispatch({ type: CLEAR_SMS })}
            style={{
              color: '#ffff',
              maxWidth: '100px',
              maxHeight: '30px',
              minWidth: '30px',
              minHeight: '30px',
              background: '#1F2937',
              marginTop: '25px',
            }}
          >
            Clear{' '}
          </Button>{' '}
        </div>{' '}
      </div>
    </div>
  )
}

const MapStateToprops = (store) => {
  return { ...store }
}

export default connect(MapStateToprops)(ChatRoom)
