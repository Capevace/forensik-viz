<template>
	<button
		:class="classes"
		:disabled="count === 0"
		@click="$emit('click', $event)"
	>
		<slot />
		<span :class="countClasses">{{ count }}</span>
	</button>
</template>
<script type="text/javascript">
export default {
	props: {
		color: {
			type: String,
			default: 'gray',
		},
		count: {
			type: Number,
			default: 0,
		},
		active: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		classes() {
			return `bg-${this.color}-300 text-${
				this.color
			}-900 flex-1 py-2 flex gap-2 items-center justify-between px-3 disabled:opacity-50 disabled:cursor-not-allowed font-medium ${
				this.active ? '' : 'opacity-70 hover:opacity-90'
			}`;
		},
		countClasses() {
			return `bg-${this.color}-200 text-${this.color}-800 h-5 px-1 min-w-5 rounded-full inline-block flex items-center justify-center font-mono font-bold`;
		},
	},
};
</script>
