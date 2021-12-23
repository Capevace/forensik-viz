import Vue from 'vue';
import Vuex from 'vuex';

import presentation from './presentation';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		people: {
			1: {
				name: 'Markus Gasleiter',
				avatarUrl: 'https://i.pravatar.cc/300',
			},
			2: {
				name: 'Frank Susmann',
				avatarUrl: 'https://i.pravatar.cc/200',
			},
		},
	},
	mutations: {},
	actions: {},
	modules: {
		presentation,
	},
});
