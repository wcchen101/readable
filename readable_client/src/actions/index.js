import { fetchCategories, fetchPosts, writePost  } from '../utils/readableAPI'
import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const SET_POST = 'SET_POST'
export const SET_CATEGORY = 'SET_CATEGORY'
export const ADD_POST = 'ADD_POST'
export const SET_CATEGORY_POST = 'SET_CATEGORY_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const SET_COMMENT = 'SET_COMMENT'
export const UP_VOTESCORE = 'UP_VOTESCORE'
export const DOWN_VOTESCORE = 'DOWN_VOTESCORE'
export const UPDATE_VOTESCORE = 'UPDATE_VOTESCORE'
export const POST_UP_VOTESCORE = 'POST_UP_VOTESCORE'
export const POST_DOWN_VOTESCORE = 'POST_DOWN_VOTESCORE'
export const POST_NEW_COMMENT = 'POST_NEW_COMMENT'

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:5002'

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token,
  'Content-Type': 'application/json',

}
export function setCategory(category) {
	return {
		type: SET_CATEGORY,
		category,
	}
}
export function addCategory() {
	return dispatch => {
		fetch(`${api}/categories`, { headers, method: 'GET' })
		  .then(res => res.json())
		  .then(data => dispatch(setCategory(data.categories)));
	}
}

export function setPost(post) {
	return {
		type: SET_POST,
		post,
	}
}

export function addVoteScore(postId) {
	return dispatch => {
		fetch(`${api}/posts/${postId}`, { headers, method: 'POST',   body: JSON.stringify({
        option: 'upVote',
        })
      })
			.then(res => res.json())
			.then(data => dispatch(updateVoteScore(data)))
	}
}

export function updateVoteScore(postId) {
  return {
    type: UPDATE_VOTESCORE,
    postId,
  }
}
export function addPost() {
	return dispatch => {
		fetch(`${api}/posts`, { headers, method: 'GET'  })
			.then(res => res.json())
			.then(data => dispatch(setPost(data)))
	}
}

export function setCategoryPost(categoryPost) {
  return {
    type: SET_CATEGORY_POST,
    categoryPost,
  }
}

export function setComment(comment) {
  return {
    type: SET_COMMENT,
    comment
  }
}
export function upVoteScore(index) {
  return {
    type: UP_VOTESCORE,
    index
  }
}
export function downVoteScore(index) {
  return {
    type: DOWN_VOTESCORE,
    index
  }
}
export function postUpVoteScore(index) {
  return {
    type: POST_UP_VOTESCORE,
    index
  }
}
export function postDownVoteScore(index) {
  return {
    type: POST_DOWN_VOTESCORE,
    index
  }
}
export function addComment(postId) {
  return dispatch => {
    fetch(`${api}/posts/${postId}/comments`, { headers, method: 'GET' })
      .then(res => res.json())
      .then(data => dispatch(setComment(data)))
  }
}
export function postNewComment(id, timestamp, body, author, parentId) {
  console.log('post new comment')
  return {
    type: 'POST_NEW_COMMENT',
    id,
    timestamp,
    body,
    author,
    parentId
  }
}
