import { getExampleData } from '@/util/example-data';
/**
 * @typedef {Person}
 */

const { people, events } = getExampleData();

export default {
	namespaced: true,
	state: () => ({
		people: people || {},
		events: events || [],
	}),
	mutations: {},
	actions: {},
};
