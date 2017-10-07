import { combineReducers } from 'redux'
import {
	SET_POST,
	SET_CATEGORY,
	SET_COMMENT,
	UPDATE_VOTESCORE,
	UP_VOTESCORE,
	DOWN_VOTESCORE,
	POST_UP_VOTESCORE,
	POST_DOWN_VOTESCORE,
	POST_NEW_COMMENT,
	DELETE_COMMENT,
	DELETE_POST,
	POST_NEW_POST,
} from '../actions'

export function category (state=[], action={}) {
	switch(action.type) {
		case SET_CATEGORY:
			return action.category;
		default:
			return state
	}
}
export function post (state=[], action={}) {
	let index = 0
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

		case DELETE_POST:
			const removeIndex = action.index
			return [
				...state.slice(0, removeIndex),
				...state.slice(removeIndex + 1)
			]

		case POST_NEW_POST:
			return [
				...state,
				{
					id: action.id,
					timestamp: action.timestamp,
					title: action.title,
					body: action.body,
					author: action.author,
					category: action.category,
					voteScore: 1,
				}
			]

		case POST_UP_VOTESCORE:
			index = action.index
			return [
				...state.slice(0, index),
				{...state[index], voteScore: state[index].voteScore + 1},
				...state.slice(index + 1),
			]

		case POST_DOWN_VOTESCORE:
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

		case POST_NEW_COMMENT:
			return [
				...state,
				{
					id: action.id,
					timestamp: action.timestamp,
					body: action.body,
					author: action.author,
					parentId: action.parentId,
					voteScore: 1,
				}
			]

		case DELETE_COMMENT:
			const removeIndex = action.index
			return [
				...state.slice(0, removeIndex),
				...state.slice(removeIndex + 1)
			]

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
