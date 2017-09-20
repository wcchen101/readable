import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addCategory, addPost } from '../actions'
import CategoryList from './CategoryList'
import PostList from './PostList'
import PostForm from './PostForm'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'

class App extends Component {
  render() {
    const { category, post } = this.props

    return (
      <div className="App">
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
