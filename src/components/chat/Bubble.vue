<template>
	<div
		:class="`w-full flex ${
			right ? 'justify-end pl-12' : 'justify-start pr-12'
		}`"
	>
		<div
			:class="`max-w-sm flex gap-2  ${
				this.right ? 'flex-row-reverse' : ''
			}`"
		>
			<img class="h-6 w-6 rounded-full" :src="sender.avatarUrl" />
			<div :class="classes">
				<p
					v-if="message.type === 'text'"
					:class="`block mb-1 text-gray-900`"
				>
					{{ message.text }}
				</p>
				<button v-else-if="message.type === 'image'" class="block mb-2">
					<img @click="onImageClick" :src="message.mediaSrc" />
				</button>
				<span
					:class="`block text-xs text-gray-900 opacity-60 ${
						right ? 'text-right' : ''
					}`"
				>
					{{ message.date.toLocaleString() }}
				</span>
			</div>
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
		color: {
			type: String,
			default: 'gray-300',
		},
	},
	computed: {
		sender() {
			return this.$store.state.presentation.people[this.message.sender];
		},
		classes() {
			return {
				'block px-3 py-2 rounded-lg text-left shadow': true,
				[`rounded-tr-none bg-${this.color}`]: !!this.right,
				'rounded-tl-none bg-gray-300': !this.right,
			};
		},
	},
	methods: {
		onImageClick(e) {
			this.$viewerApi({
				images: [e.target.src],
				options: {
					toolbar: false,
					navbar: false,
				},
			});
		},
	},
	components: {},
};
</script>
