<template>
	<article class="max-w-xs px-3 py-3 bg-white rounded-md shadow-md">
		<button
			class="p-0 font-mono font-bold text-xs text-gray-400"
			@click="deletePerson(internalPerson.id)"
		>
			X
		</button>
		<form class="flex flex-col gap-2">
			<div class="mb-3">
				<img
					:src="
						internalPerson.avatarUrl ||
						`https://avatars.dicebear.com/api/bottts/${encodeURIComponent(
							internalPerson.name
						)}.svg`
					"
					class="mx-auto rounded-full w-16 h-16 mb-2"
				/>
				<input
					type="file"
					name="avatar"
					@change="fileChanged($event, internalPerson)"
					class="mb-2"
				/>
				<input
					type="text"
					v-model="internalPerson.avatarUrl"
					class="w-full"
					:placeholder="`https://avatars.dicebear.com/api/bottts/${encodeURIComponent(
						internalPerson.name
					)}.svg`"
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
						v-model="internalPerson.name"
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
						v-model="internalPerson.color"
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
						v-model="internalPerson.id"
					/>
				</div>
			</div>
		</form>
	</article>
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
	props: {
		person: {
			type: Object,
			required: true,
		},
	},
	data(vm) {
		return {
			internalPerson: vm.person,
		};
	},
	watch: {
		internalPerson() {
			this.$store.commit('updatePerson', this.internalPerson);
		},
	},
	methods: {
		deletePerson(id) {
			this.$store.commit('setup/deletePerson', id);
		},

		async fileChanged(event, person) {
			const file = event.target.files[0];
			person.avatarUrl = await toBase64(file);
		},
	},
};
</script>
