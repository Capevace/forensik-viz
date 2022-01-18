import Vue from 'vue';
import VueRouter from 'vue-router';
import Map from '../views/Map.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Map',
		component: Map,
	},
	{
		path: '/editor',
		name: 'Editor',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "map" */ '../views/Editor.vue')
	},
];

const router = new VueRouter({
	routes,
});

export default router;
