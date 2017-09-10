import { fetchCategories, fetchPosts, writePost  } from '../utils/readableAPI'
import { applyMiddleware, createStore } from 'redux'

import thunk from 'redux-thunk'

export const ADD_CATEGORY = 'ADD_CATEGORY'
export const SET_POST = 'SET_POST'
export const SET_CATEGORY = 'SET_CATEGORY'
export const ADD_POST = 'ADD_POST'


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

export function addPost() {
	return dispatch => {
		fetch(`${api}/posts`, { headers, method: 'GET'  })
			.then(res => res.json())
			.then(data => dispatch(setPost(data)))
	}
}
