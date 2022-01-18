<template>
	<section class="max-w-4xl mx-auto">
		<h2 class="text-2xl font-medium mb-3">
			Personen ({{ peopleList.length }})
		</h2>

		<div class="flex flex-wrap items-stretch gap-3">
			<article
				v-for="person in peopleList"
				:key="person.id"
				class="max-w-xs px-3 py-3 bg-white rounded-md shadow-md"
			>
				<button
					class="p-0 font-mono font-bold text-xs text-gray-400"
					@click="deletePerson(person.id)"
				>
					X
				</button>
				<form class="flex flex-col gap-2">
					<div class="mb-3">
						<img
							:src="person.avatarUrl"
							class="mx-auto rounded-full w-16 h-16 mb-2"
						/>
						<input
							type="file"
							name="avatar"
							@change="fileChanged($event, person)"
						/>
					</div>

					<div>
						<label
							for="name"
							class="block text-sm font-medium text-gray-700"
						>
							Name
						</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<input
								type="text"
								name="name"
								id="name"
								class="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm bg-gray-100 border-gray-300 rounded-md"
								placeholder="Markus Gasleiter"
								v-model="person.name"
							/>
						</div>
					</div>

					<div>
						<label
							for="color"
							class="block text-sm font-medium text-gray-700"
						>
							Color
						</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<select
								v-model="person.color"
								name="color"
								id="color"
								class="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm bg-gray-100 border-gray-300 rounded-md"
							>
								<option value="purple">Purple</option>
								<option value="green">Green</option>
								<option value="blue">Blue</option>
							</select>
						</div>
					</div>

					<div>
						<label
							for="id-field"
							class="block text-sm font-medium text-gray-700"
						>
							ID
						</label>
						<div class="mt-1 relative rounded-md shadow-sm">
							<input
								type="text"
								name="id-field"
								id="id-field"
								class="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 px-4 sm:text-sm bg-gray-100 border-gray-300 rounded-md"
								placeholder="1ed7504b-35bd-41b7-b8d7-38149b8a027c"
								v-model="person.id"
							/>
						</div>
					</div>
				</form>
			</article>
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
const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export default {
	computed: {
		people() {
			return this.$store.state.setup.people;
		},
	},

	data(vm) {
		return {
			peopleList: Object.values(vm.$store.state.setup.people),
		};
	},

	watch: {
		people() {
			this.peopleList = Object.values(this.people);
		},

		peopleList() {
			let people = {};
			for (const person of this.peopleList) {
				people[person.id] = person;
			}

			this.$store.commit('setup/setPeople', people);
		},
	},

	methods: {
		addPerson() {
			const person = {
				id: `1ed7504b-35bd-41b7-b8d7-${Math.floor(
					Math.random() * 90000
				)}`,
				name: '',
				avatarUrl: '',
				color: 'purple',
			};

			this.peopleList.push(person);
		},

		deletePerson(id) {
			const index = this.peopleList.findIndex(
				(person) => person.id === id
			);

			if (index !== -1) this.peopleList.splice(index, 1);
		},

		async fileChanged(event, person) {
			const file = event.target.files[0];
			person.avatarUrl = await toBase64(file);
		},
	},
};
</script>
