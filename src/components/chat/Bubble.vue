<template>
	<div
		:class="`text-lg max-w-sm flex gap-2 ${
			this.right ? 'flex-row-reverse' : ''
		}`"
	>
		<img class="h-6 w-6 rounded-full" :src="avatarUrl" />
		<div :class="classes">
			<p class="block mb-1">{{ message.text }}</p>
			<span class="block text-xs text-gray-500">
				{{ message.date.toLocaleString() }}
			</span>
		</div>
	</div>
</template>
<script type="text/javascript">
// const content = {
// 	type: 'text' || 'image',
// 	text: '',
// 	url: '',
// };
export default {
	props: {
		message: {
			type: Object,
			required: true,
		},
		right: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		avatarUrl() {
			return this.$store.state.people[this.message.sender].avatarUrl;
		},
		classes() {
			return {
				'block px-4 py-2 rounded-lg text-left': true,
				'rounded-tr-none bg-green-200': !!this.right,
				'rounded-tl-none bg-gray-300': !this.right,
			};
		},
	},
};
</script>
