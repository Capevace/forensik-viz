import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/tailwind.css';
import '@fontsource/fira-sans';

import 'viewerjs/dist/viewer.css';
import VueViewer from 'v-viewer';
import VueMeta from 'vue-meta';
import VueI18n from 'vue-i18n';

import enLang from '@/lang/en';

import { initFS } from './fs';

async function main() {
	await initFS();

	Vue.use(VueViewer);
	Vue.use(VueMeta);
	Vue.use(VueI18n);

	Vue.config.productionTip = false;

	const locale = window.localStorage.getItem('locale') || 'de';

	// Create VueI18n instance with options
	const i18n = new VueI18n({
		locale: locale,
		messages: { en: enLang },
		fallbackLocale: 'de',
		formatFallbackMessages: true,
	});

	new Vue({
		i18n,
		router,
		store,
		render: (h) => h(App),
	}).$mount('#app');
}

main().catch((e) => console.error('GLOBAL CATCH:', e));
