// import { getExampleData } from '@/util/example-data';
/**
 * @typedef {Person}
 */

// const { people, events } = getExampleData();

export default {
	namespaced: true,
	state: () => ({
		selectedEventId: null
	}),
	mutations: {
		selectEvent(state, id) {
			state.selectedEventId = id;
		}
	},
	actions: {
	}
};
