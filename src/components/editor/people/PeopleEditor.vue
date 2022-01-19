<template>
	<section class="max-w-4xl mx-auto">
		<h2 class="text-2xl font-medium mb-3">
			Personen ({{ peopleList.length }})
		</h2>

		<div class="flex flex-wrap items-stretch gap-3">
			<Person
				v-for="person in peopleList"
				:key="person.id"
				:person="person"
			/>
			<button
				class="block bg-blue-100 rounded-md h-full px-2 py-2"
				@click="addPerson"
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
