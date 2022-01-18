<template>
	<div class="">
		<nav
			class="max-w-2xl mx-auto flex bg-gray-200 rounded-md shadow-sm my-5"
		>
			<button
				class="flex-1 py-2 rounded-l-md text-gray-700"
				:class="{ 'bg-blue-200 text-blue-900': tab === 'people' }"
				@click="tab = 'people'"
			>
				Personen
			</button>
			<button
				class="flex-1 py-2 text-gray-700"
				:class="{ 'bg-blue-200 text-blue-900': tab === 'import' }"
				@click="tab = 'import'"
			>
				Importieren
			</button>
			<button
				class="flex-1 py-2 rounded-r-md text-gray-700"
				:class="{ 'bg-blue-200 text-blue-900': tab === 'events' }"
				@click="tab = 'events'"
			>
				Events
			</button>
		</nav>

		<main>
			<PeopleEditor v-if="tab === 'people'" />
			<EventsEditor v-show="tab === 'events'" />
			<DataImporter v-show="tab === 'import'" />
		</main>
	</div>
</template>

<script>
import PeopleEditor from '@/components/editor/people/PeopleEditor';
import EventsEditor from '@/components/editor/events/EventsEditor';
import DataImporter from '@/components/editor/importer/DataImporter';

export default {
	name: 'Editor',
	components: {
		PeopleEditor,
		EventsEditor,
		DataImporter,
	},
	data() {
		return {
			tab: 'people',
		};
	},
};
</script>
