import Vue from 'vue';
import VueRouter from 'vue-router';
import Editor from '../views/Editor.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'Editor',
		component: Editor,
	},
	{
		path: '/map',
		name: 'Map',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "map" */ '../views/Map.vue'),
	},
];

const router = new VueRouter({
	routes,
});

export default router;
