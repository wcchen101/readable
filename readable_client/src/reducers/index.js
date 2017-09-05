import {
	ADD_CATEGORY,
	WRITE_POST,
} from '../actions'

const initialState = {
  category: {

  },
  post: {

  },
}

export function category (state=initialState, action) {
	const { category, recipe, meal } = action

	switch(action.type) {
		case ADD_CATEGORY:
	      return {

	     }
		default:
			return state
	}
}
export function post (state=initialState, action) {
	const { post, recipe, meal } = action

	switch(action.type) {
		case WRITE_POST:
	      return {

	     }
		default:
			return state
	}
}
export default category