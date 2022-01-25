<template>
	<header
		:class="{
			'flex items-center justify-between bg-blue-600 font-bold text-blue-100': true,
			'h-12 px-3': !small,
			'h-8 text-xs': small,
		}"
	>
		<h1 class="flex-1">
			<input
				type="text"
				name=""
				:value="projectName"
				@input="changedProjectName"
				class="rounded border-none bg-transparent pl-2 font-bold text-blue-100 focus:bg-blue-100 focus:text-blue-900"
				:class="{ 'text-sm': small, 'text-xl': !small }"
				:disabled="locked"
			/>
		</h1>

		<nav class="mx-auto my-5 flex items-center justify-center px-10">
			<slot name="nav" />
		</nav>

		<div class="flex flex-1 items-center justify-end gap-5">
			<slot name="actions" />
		</div>
	</header>
</template>

<script type="text/javascript">
export default {
	props: {
		small: {
			type: Boolean,
		},
		locked: {
			type: Boolean,
			default: () => false,
		},
	},
	computed: {
		projectName() {
			return this.$store.state.setup.projectName;
		},
	},
	methods: {
		changedProjectName(e) {
			this.$store.commit('setup/setProjectName', e.target.value);
		},
	},
};
</script>
