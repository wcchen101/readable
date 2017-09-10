import { combineReducers } from 'redux'
import {
	ADD_CATEGORY,
	SET_POST,
	SET_CATEGORY,
	ADD_POST,
} from '../actions'

const initialState = {
  category: null,
  post: null,
}

export function category (state=[], action={}) {
	switch(action.type) {
		case SET_CATEGORY:
			return action.category;
		default:
			return state
	}
}
export function post (state=[], action={}) {
	switch(action.type) {
		case SET_POST:
	      return action.post;
		default:
			return state
	}
}
export default combineReducers({
	category,
	post
})
