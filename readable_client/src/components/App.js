import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory, addPost } from '../actions'
import PostForm from './PostForm'
import CategoryList from './CategoryList'
import PostList from './PostList'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import './App.css'

class App extends Component {
  render() {
    const { category, post } = this.props

    return (
        <div className="App">
          <div className="list-readable-title">
            <h1>Readable</h1>
          </div>
          <button><Link to={`/`}>Main Page</Link></button>
          <button><Link to={`/react/`}>React</Link></button>
          <button><Link to={`/redux/`}>Redux</Link></button>
          <button><Link to={`/udacity/`}>Udacity</Link></button>
          <Route exact path='/' component={CategoryList}/>
          <Route exact path='/:category' component={CategoryList}/>
          <Route exact path='/:category/:post' component={CategoryList}/>
          <Route exact path='/:category/:post/:comment' component={CategoryList}/>
        </div>
    )
  }
}

export default App
