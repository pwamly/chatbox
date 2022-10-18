import React from 'react'
import { Redirect, BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import Dashboard from "./components/Dashboard";
import { Provider } from 'react-redux'
import { ToastProvider } from 'react-toast-notifications'
import { store } from './store'
import './App.css'
import ChatRoom from './components/Home/ChatRoom'

function App() {
  return (
    <Provider store={store}>
      <ToastProvider placement="top-center">
        <div className="site">
          <Router>
            <Switch>
              <Route exact path="/chatroom">
                <ChatRoom />
              </Route>{' '}
            </Switch>{' '}
          </Router>{' '}
        </div>{' '}
      </ToastProvider>{' '}
    </Provider>
  )
}

export default App
