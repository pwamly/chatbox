import React, { useRef, useState, useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { useToasts } from 'react-toast-notifications'
import './chatroom.css'
import { SEND_SMS } from '../../actions'
import { connect } from 'react-redux'

function ChatRoom({ mesagesData = [], CurrentUser, dispatch }) {
  const { addToast } = useToasts()

  const messageinput = useRef('')
  const formref = useRef()

  function sendMessage() {
    dispatch({
      type: SEND_SMS,
      payload: { username: 'J', message: 'hi', time: '19:00', sender: true },
    })
  }

  return (
    <div className="chat">
      <div className="message-box">
        <>
          <span style={{ display: 'flex', justifyContent: 'center', fontSize: '18px' }}>
            Chat Room
          </span>
          {mesagesData &&
            mesagesData.map((sms, i) => (
              <div className="dialog" id={i}>
                {!sms.sender && (
                  <div
                    className="avar"
                    id={i}
                    style={{ background: sms.sender ? 'rgb(190, 191, 199)' : 'rgb(95, 105, 185)' }}
                  >
                    <span className="usn" id={i}>
                      {sms.username}
                    </span>
                  </div>
                )}
                <div
                  className="message"
                  id={i}
                  style={{
                    display: 'flex',
                    justifyContent: sms.sender ? 'center' : 'center',
                    background: sms.sender ? 'rgb(190, 191, 199)' : 'rgb(95, 105, 185)',
                  }}
                >
                  <span id={i}>{sms.message}</span>
                </div>
                {sms.sender && (
                  <div
                    className="avar"
                    id={i}
                    style={{ background: sms.sender ? 'rgb(190, 191, 199)' : 'rgb(95, 105, 185)' }}
                  >
                    <span className="usn" id={i}>
                      {sms.username}
                    </span>
                  </div>
                )}
              </div>
            ))}
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
              Send
            </Button>
          </div>
        </>
      </div>
    </div>
  )
}

const MapStateToprops = (store) => {
  return { ...store }
}

export default connect(MapStateToprops)(ChatRoom)