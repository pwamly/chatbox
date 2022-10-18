import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Container from '@material-ui/core/Container'
import TextField from '@material-ui/core/TextField'
import Check from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import { useToasts } from 'react-toast-notifications'
import './chatroom.css'
import { fabClasses } from '@mui/material'

function ChatRoom() {
  const { addToast } = useToasts()
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState(false)

  //   const [formData, setForm] = useState({});
  const message = useRef('')
  const formref = useRef()

  const messages = [
    { username: 'J', message: 'hi', time: '19:00', sender: true },
    { username: 'P', message: 'mambo kfcjgfffffffffffffffffffff', time: '19:00', sender: false },
    { username: 'J', message: 'poa', time: '19:00', sender: true },
  ]

  function sendMessage() {}

  return (
    <div className="chat">
      <div className="message-box">
        <>
          <span style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
            Chat Room
          </span>
          {messages.map((sms) => (
            <div className="dialog">
              {!sms.sender && (
                <div
                  className="avar"
                  style={{ background: sms.sender ? 'rgb(190, 191, 199)' : 'rgb(95, 105, 185)' }}
                >
                  <spa className="usn">{sms.username}</spa>
                </div>
              )}
              <div
                className="message"
                style={{
                  display: 'flex',
                  justifyContent: sms.sender ? 'center' : 'center',
                  background: sms.sender ? 'rgb(190, 191, 199)' : 'rgb(95, 105, 185)',
                }}
              >
                <span>{sms.message}</span>
              </div>
              {sms.sender && (
                <div
                  className="avar"
                  style={{ background: sms.sender ? 'rgb(190, 191, 199)' : 'rgb(95, 105, 185)' }}
                >
                  <spa className="usn">{sms.username}</spa>
                </div>
              )}
            </div>
          ))}
          <div className="messsage-form">
            <TextField
              label="Type message "
              margin="normal"
              inputRef={message}
              variant="outlined"
              autoComplete="off"
              fullWidth
              ref={formref}
            />{' '}
            <Button
              variant="contained"
              onClick={sendMessage}
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
              Send
            </Button>
          </div>
        </>
      </div>
    </div>
  )
}

export default ChatRoom
