import React, { Component } from 'react'
import PostForm from './PostForm'
import CategoryList from './CategoryList'
import { Route } from 'react-router-dom'
import './App.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

class App extends Component {

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="My Readable" />
          <Route exact path='/' component={CategoryList}/>
          <Route exact path='/:category' component={CategoryList}/>
          <Route exact path='/:category/:post' component={CategoryList}/>
          <Route exact path='/:category/:post/:comment' component={CategoryList}/>
          <Route exact path='/newpost' component={PostForm}/>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
