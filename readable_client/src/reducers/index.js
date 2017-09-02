import {
	ADD_CATEGORY,
} from '../actions'

const initialCategoryState = {
  category: {

  },
}

function category(state=initialCategoryState, action) {
	const { category, recipe, meal } = action

	switch(action.type) {
		case ADD_CATEGORY:
	      return {

	     }
		default:
			return state
	}
}
export default category