import React, { Component } from 'react'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    console.log('props', this.props)
    return (
      <div className="App">
        hello world
      </div>
    )
  }
}

function mapStateToProps (category) {
  return {
    category:'Tyler'
  }
}
export default connect(mapStateToProps)(App)
