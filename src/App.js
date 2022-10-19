import React, { useRef, useState, useEffect } from 'react'
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { Provider, connect } from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
import { store } from './store'
import './App.css'
import ChatRoom from './components/Home/ChatRoom'

function App({ CurrentUser = '', dispatch }) {
  const chatname = useRef('')
  const formref = useRef()
  const [user, setUser] = useState(CurrentUser)

  function adduser() {
    dispatch({ type: 'SAVE_CHAT_NAME', payload: chatname.current.value })
    setUser(chatname.current.value)
  }

  return (
    <Provider store={store}>
      <ToastProvider placement="top-center">
        <div className="site">
          <Router>
            <Switch>
              <Route exact path="/chatroom">
                <div>
                  {user == '' && (
                    <div className="userform">
                      <div className="userInput">
                        <TextField
                          label="Please Enter A Chat Name!"
                          margin="normal"
                          inputRef={chatname}
                          variant="outlined"
                          autoComplete="off"
                          fullWidth
                          ref={formref}
                        />
                        <div
                          style={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                          }}
                        >
                          <Button
                            variant="contained"
                            onClick={() => adduser()}
                            style={{
                              color: '#ffff',
                              maxWidth: '100px',
                              maxHeight: '30px',
                              minWidth: '30px',
                              minHeight: '30px',
                              background: '#1F2937',
                            }}
                          >
                            Submit
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                  <ChatRoom />
                </div>
              </Route>
            </Switch>
          </Router>
        </div>
      </ToastProvider>{' '}
    </Provider>
  )
}

const MapStateToprops = (store) => {
  return { ...store }
}

export default connect(MapStateToprops)(App)
