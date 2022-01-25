<template>
	<div class="">
		<Header>
			<template v-slot:nav>
				<div
					class="flex justify-between bg-gray-200 rounded-md shadow-sm flex-1 max-w-2xl self-center"
				>
					<button
						class="flex-1 py-1 text-gray-700 px-10 rounded-l-md"
						:class="{
							'bg-blue-200 text-blue-900': tab === 'import',
						}"
						@click="tab = 'import'"
					>
						{{ $t('Importieren') }}
					</button>

					<button
						class="flex-1 py-1 text-gray-700 px-10"
						:class="{
							'bg-blue-200 text-blue-900': tab === 'people',
						}"
						@click="tab = 'people'"
					>
						{{ $t('Personen') }}
					</button>

					<button
						class="flex-1 py-1 rounded-r-md text-gray-700 px-14"
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
					class="py-1 px-4 rounded-md text-gray-700 bg-gray-200 hover:bg-blue-200 hover:text-blue-900"
					@click="preview"
					:disabled="compiling"
				>
					{{ $t('Vorschau 👁‍') }}
				</button>

				<button
					class="py-1 px-4 rounded-md text-gray-700 bg-gray-200 hover:bg-blue-200 hover:text-blue-900"
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

		<button
			class="absolute bottom-0 right-0 m-5 opacity-30 hover:opacity-100"
			@click="tab = 'settings'"
		>
			⚙️
		</button>
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
