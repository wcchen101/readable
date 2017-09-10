import { combineReducers } from 'redux'
import {
	ADD_CATEGORY,
	SET_POST,
	SET_CATEGORY,
	ADD_POST,
	SET_CATEGORY_POST,
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
		case SET_CATEGORY_POST:
			const index = state.findIndex(item => item.id === action.game.id);
			if (index > -1) {
				return state.map(item => {
					if (item.id === action.game.id) return action.game;
					return item;
				});
			}
			else {
				return [
					...state,
					action.game
				];
			}
		default:
			return state
	}
}
export default combineReducers({
	category,
	post
})
