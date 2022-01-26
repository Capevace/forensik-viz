<template>
	<div class="">
		<Header>
			<template v-slot:nav>
				<div
					class="flex max-w-2xl flex-1 justify-between self-center rounded-md bg-gray-200 shadow-sm"
				>
					<button
						class="flex-1 rounded-l-md py-1 px-10 text-gray-700"
						:class="{
							'bg-blue-200 text-blue-900': tab === 'import',
						}"
						@click="tab = 'import'"
					>
						{{ $t('Importieren') }}
					</button>

					<button
						class="flex-1 py-1 px-10 text-gray-700"
						:class="{
							'bg-blue-200 text-blue-900': tab === 'people',
						}"
						@click="tab = 'people'"
					>
						{{ $t('Personen') }}
					</button>

					<button
						class="flex-1 rounded-r-md py-1 px-14 text-gray-700"
						:class="{
							'bg-blue-200 text-blue-900': tab === 'events',
						}"
						@click="tab = 'events'"
					>
						{{ $t('Events') }}
					</button>
				</div>
			</template>
			<template v-slot:actions>
				<button
					class="rounded-md bg-gray-200 py-1 px-4 text-gray-700 hover:bg-blue-200 hover:text-blue-900"
					@click="preview"
					:disabled="compiling"
				>
					{{ $t('Vorschau 👁‍') }}
				</button>

				<button
					class="rounded-md bg-gray-200 py-1 px-4 text-gray-700 hover:bg-blue-200 hover:text-blue-900"
					@click="exportZip"
					:disabled="compiling"
				>
					{{
						compiling
							? $t('Komprimieren...')
							: $t('Download ZIP &nbsp;⬇')
					}}
				</button>
			</template>
		</Header>

		<main class="pt-7 pb-20">
			<PeopleEditor v-if="tab === 'people'" />
			<EventsEditor v-show="tab === 'events'" />
			<DataImporter v-show="tab === 'import'" />
			<Settings v-show="tab === 'settings'" />
		</main>

		<footer
			class="fixed bottom-0 right-0 -z-1 m-5 flex items-center gap-5 text-gray-300"
		>
			<p class="text-xs font-light">
				Forensik Viz – Von Inken, Armin und Lukas
			</p>
			<button
				class="opacity-30 hover:opacity-100"
				@click="tab = 'settings'"
			>
				⚙️
			</button>
		</footer>
	</div>
</template>

<script>
import Header from '@/components/layout/Header';
import PeopleEditor from '@/components/editor/people/PeopleEditor';
import EventsEditor from '@/components/editor/events/EventsEditor';
import DataImporter from '@/components/editor/importer/DataImporter';

import Settings from '@/components/settings/Settings';

export default {
	name: 'Editor',
	components: {
		Header,
		PeopleEditor,
		EventsEditor,
		DataImporter,
		Settings,
	},
	data() {
		return {
			tab: 'import',
			compiling: false,
		};
	},
	methods: {
		async exportZip() {
			this.compiling = true;

			this.$store.dispatch('setup/exportAsFile');

			this.compiling = false;
		},

		async preview() {
			this.$router.push('/');
		},
	},
};
</script>
