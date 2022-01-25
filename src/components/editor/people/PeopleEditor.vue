<template>
	<section class="max-w-4xl mx-auto">
		<h2 class="text-2xl font-medium mb-8">
			<span class="block">Personen ({{ peopleList.length }})</span>
			<span class="text-gray-400">Identitäten</span>
		</h2>

		<div class="flex flex-wrap items-stretch gap-10">
			<Person
				v-for="person in peopleList"
				:key="person.id"
				:person="person"
			/>
			<button
				class="text-xl max-w-1/2 flex-1 h-full block bg-blue-200 text-blue-700 rounded-md h-full px-2 py-2 opacity-60 hover:opacity-100 font-medium"
				@click="addPerson"
				style="height: 390px;"
			>
				Person hinzufügen
			</button>
		</div>
	</section>
</template>
<script type="text/javascript">
import uuid from 'uuid/v4';
import Person from '@/components/editor/people/Person';

export default {
	computed: {
		people() {
			return this.$store.state.setup.people;
		},
		peopleList() {
			return Object.values(this.people);
		},
	},

	methods: {
		addPerson() {
			const person = {
				id: uuid(),
				name: 'Unbenannte Person',
				avatarUrl: '',
				color: 'purple',
			};

			this.$store.commit('setup/updatePerson', person);
		},
	},
	components: {
		Person,
	},
};
</script>
