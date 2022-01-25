<template>
	<section class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-2xl font-medium">
			<span class="block">
				{{ $t('Personen') }} ({{ peopleList.length }})</span
			>
			<span class="text-gray-400">{{ $t('Identitäten') }}</span>
		</h2>

		<div class="flex flex-wrap items-stretch gap-10">
			<Person
				v-for="person in peopleList"
				:key="person.id"
				:person="person"
			/>
			<button
				class="block h-full h-full max-w-1/2 flex-1 rounded-md bg-blue-200 px-2 py-2 text-xl font-medium text-blue-700 opacity-60 hover:opacity-100"
				@click="addPerson"
				style="height: 390px"
			>
				{{ $t('Person hinzufügen') }}
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
				name: this.$t('Unbenannte Person'),
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
