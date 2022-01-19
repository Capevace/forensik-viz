import Vue from 'vue';
import Vuex from 'vuex';

import map from './map';
import setup from './setup';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		map,
		setup
	},
});
