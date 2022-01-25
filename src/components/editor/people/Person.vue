<template>
	<article
		class="max-w-1/2 flex-1 rounded-md border border-gray-300 bg-white px-4 pb-4 text-gray-600 shadow-md"
	>
		<button
			class="p-0 pt-2 font-mono text-xl font-bold text-gray-400"
			@click="deletePerson(internalPerson.id)"
		>
			✕
		</button>
		<form class="flex flex-col gap-2 pt-1">
			<div class="mb-3">
				<img
					:src="
						internalPerson.avatarUrl ||
						`https://avatars.dicebear.com/api/bottts/${encodeURIComponent(
							internalPerson.name
						)}.svg`
					"
					class="mx-auto mb-4 h-16 w-16 rounded-full"
				/>
				<div class="opacity-60 hover:opacity-100">
					<input
						type="file"
						name="avatar"
						@change="fileChanged($event, internalPerson)"
						class="mb-2 min-w-full"
					/>
					<input
						type="text"
						v-model="internalPerson.avatarUrl"
						class="w-full opacity-60 hover:opacity-60 focus:opacity-100"
						:placeholder="`https://avatars.dicebear.com/api/bottts/${encodeURIComponent(
							internalPerson.name
						)}.svg`"
					/>
				</div>
			</div>

			<div>
				<label
					for="name"
					class="block text-sm font-medium text-gray-700"
				>
					{{ $t('Name') }}
				</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="text"
						name="name"
						id="name"
						class="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-4 focus:border-blue-600 focus:ring-blue-600"
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
					{{ $t('Farbe') }}
				</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<select
						v-model="internalPerson.color"
						name="color"
						id="color"
						class="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-4 focus:border-blue-600 focus:ring-blue-600"
					>
						<option value="purple">{{ $t('Lila') }}</option>
						<option value="green">{{ $t('Grün') }}</option>
						<option value="blue">{{ $t('Blau') }}</option>
					</select>
				</div>
			</div>

			<div>
				<label
					for="id-field"
					class="block text-sm font-medium text-gray-700"
				>
					{{ $t('ID') }}
				</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<input
						type="text"
						name="id-field"
						id="id-field"
						class="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-4 focus:border-blue-600 focus:ring-blue-600"
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
