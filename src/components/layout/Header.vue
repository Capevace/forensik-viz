<template>
	<header
		:class="{ 'bg-blue-600 text-blue-100 font-bold flex items-center justify-between': true, 'h-12 px-3': !small, 'h-8 text-xs': small }"
	>
		<h1 class="flex-1">
			<input
				type="text"
				name=""
				:value="projectName"
				@input="changedProjectName"
				class="font-bold text-blue-100 bg-transparent border-none focus:bg-blue-100 focus:text-blue-900 rounded pl-2"
				:class="{ 'text-sm': small, 'text-xl': !small }"
				:disabled="locked"
			/>
		</h1>

		<nav class="mx-auto flex justify-center items-center my-5 px-10">
			<slot name="nav" />
		</nav>

		<div class="flex-1 flex justify-end items-center gap-5">
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
			default: () => false
		}
	},
	computed: {
		projectName() {
			return this.$store.state.setup.projectName;
		}
	},
	methods: {
		changedProjectName(e) {
			this.$store.commit('setup/setProjectName', e.target.value);
		}
	}
};
</script>
