export const ADD_CATEGORY = 'ADD_CATEGORY'
export const WRITE_POST = 'WRITE_POST'

export function addCategory({ category }) {
	return {
		type: ADD_CATEGORY,
		category,
	}
}

export function createPost({ post }) {
	return {
		type: WRITE_POST,
		post,
	}
}