import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import CommentForm from './CommentForm'

class CommentList extends React.Component {

	render() {
		return (
			<div>
        <CommentForm/>
			</div>
		)
	}
}

export default CommentList
