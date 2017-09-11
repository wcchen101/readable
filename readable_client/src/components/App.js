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
        <Route exact path='/category' component={CategoryList}/>
        <Route exact path='/:category' component={CategoryList}/>
        <Route exact path='/:category/:post' component={CategoryList}/>          
      </div>
    )
  }
}

export default App
