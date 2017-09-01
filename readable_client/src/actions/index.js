export const ADD_CATEGORY = 'ADD_CATEGORY'

export function addCategory({ category }) {
	return {
		type: ADD_CATEGORY,
		category,
	}
}