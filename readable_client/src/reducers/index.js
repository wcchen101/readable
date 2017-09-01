import {
	ADD_CATEGORY,
} from '../actions'

const initialCategoryState = {
  sunday: {
    breakfast: null,
    lunch: null,
    dinner: null,
  },
}

function category(state=initialCategoryState, action) {
	const { day, recipe, meal } = action

	switch(action.type) {
		case ADD_CATEGORY:
	      return {
	        ...state,
	        [day]: {
	          ...state[day],
	          [meal]: recipe.label,
	        }
	     }
		default:
			return state
	}
}
export default category