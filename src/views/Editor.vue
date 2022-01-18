<template>
	<div class="">
		<Header>
			<template v-slot:nav>
				<div class="flex justify-between bg-gray-200 rounded-md shadow-sm flex-1 max-w-2xl self-center">
					<button
						class="flex-1 py-1 text-gray-700 px-10 rounded-l-md"
						:class="{ 'bg-blue-200 text-blue-900': tab === 'import' }"
						@click="tab = 'import'"
					>
						Importieren
					</button>

					<button
						class="flex-1 py-1 text-gray-700 px-10"
						:class="{ 'bg-blue-200 text-blue-900': tab === 'people' }"
						@click="tab = 'people'"
					>
						Personen
					</button>
					
					<button
						class="flex-1 py-1 rounded-r-md text-gray-700 px-14"
						:class="{ 'bg-blue-200 text-blue-900': tab === 'events' }"
						@click="tab = 'events'"
					>
						Events
					</button>
				</div>
			</template>
			<template v-slot:actions>
				<button
					class="py-1 px-4 rounded-md text-gray-700 bg-gray-200 hover:bg-blue-200 hover:text-blue-900"
					@click="preview"
					:disabled="compiling"
				>
					{{ compiling ? 'Komprimieren...' : 'Vorschau 👁‍' }}
				</button>

				<button
					class="py-1 px-4 rounded-md text-gray-700 bg-gray-200 hover:bg-blue-200 hover:text-blue-900"
					@click="exportZip"
					:disabled="compiling"
				>
					{{ compiling ? 'Komprimieren...' : 'Download ZIP &nbsp;⬇' }}
				</button>
			</template>
		</Header>

		<main class="pt-5">
			<PeopleEditor v-if="tab === 'people'" />
			<EventsEditor v-show="tab === 'events'" />
			<DataImporter v-show="tab === 'import'" />
		</main>
	</div>
</template>

<script>
import Header from '@/components/layout/Header';
import PeopleEditor from '@/components/editor/people/PeopleEditor';
import EventsEditor from '@/components/editor/events/EventsEditor';
import DataImporter from '@/components/editor/importer/DataImporter';

export default {
	name: 'Editor',
	components: {
		Header,
		PeopleEditor,
		EventsEditor,
		DataImporter,
	},
	data() {
		return {
			tab: 'import',
			compiling: false
		};
	},
	methods: {
		async exportZip() {
			this.compiling = true;

			this.$store.dispatch('setup/exportAsFile');

			this.compiling = false;
		},

		async preview() {
			this.compiling = true;
			
			await this.$store.dispatch('setup/preview');

			this.compiling = false;
			this.$router.push('/map');	
		}
	}
};
</script>
