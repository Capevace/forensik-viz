import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/tailwind.css';

import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';

import { initFS } from './fs';

async function main() {
	await initFS();

	Vue.use(VueViewer);

	Vue.config.productionTip = false;

	new Vue({
		router,
		store,
		render: (h) => h(App),
	}).$mount('#app');
}

main().catch((e) => console.error('GLOBAL CATCH:', e));
