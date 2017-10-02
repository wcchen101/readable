import { combineReducers } from 'redux'
import {
	ADD_CATEGORY,
	SET_POST,
	SET_CATEGORY,
	ADD_POST,
	SET_COMMENT,
	ADD_COMMENT,
	UPDATE_VOTESCORE,
	UP_VOTESCORE,
	DOWN_VOTESCORE,
} from '../actions'

const initialState = {
  category: null,
  post: null,
	comment: null,
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
				if (action.comment) {
					state.concat(action.comment)
				}
				let undeletedPost = []
				for (let i = 0; i < action.post.length; i++){
					if (action.post[i].deleted !== true) {
						undeletedPost.push(action.post[i])
					}
				}
	      return undeletedPost;
		default:
			return state
	}
}

export function updateVoteScore(postId) {
  return {
    type: UPDATE_VOTESCORE,
    postId,
  }
}

export function comment (state=[], action={}) {
	let index = 0
	switch(action.type) {
		case SET_COMMENT:
			return action.comment;

		case UP_VOTESCORE:
			index = action.index
			return [
				...state.slice(0, index),
				{...state[index], voteScore: state[index].voteScore + 1},
				...state.slice(index + 1),
			]

		case DOWN_VOTESCORE:
			index = action.index
			return [
				...state.slice(0, index),
				{...state[index], voteScore: state[index].voteScore - 1},
				...state.slice(index + 1),
			]

		default:
			return state
	}
}
export default combineReducers({
	category,
	post,
	comment
})
