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
			<img class="h-6 w-6 rounded-full" :src="sender.avatarUrl || `https://avatars.dicebear.com/api/bottts/${encodeURIComponent(sender.name)}.svg`" />
			<div :class="classes">
				<button v-if="message.mediaSrc" class="block mb-2 w-full">
					<FSImg :src="message.mediaSrc" :mime="message.mimeType" @click="onImageClick(message)"/>
				</button>
				<p
					v-if="message.text"
					:class="`block text-gray-900 mb-2`"
				>
					{{ message.text }}
				</p>
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
import FSImg from '@/components/chat/FSImg';
import inspectImage from '@/util/inspect-image';
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
		sender: {
			type: Object,
			default: () => ({
				id: '1ed7504b-35bd-41b7-b8d7-38149b8a027c',
				name: 'Unbekannt',
				avatarUrl:
					'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00bb8a893a2e125c3fce471364154f950a8db60d.jpg',
				color: 'purple',
			}),
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
		classes() {
			return {
				'block px-3 py-2 rounded-lg text-left shadow': true,
				[`rounded-tr-none bg-${this.color}`]: !!this.right,
				'rounded-tl-none bg-gray-300': !this.right,
			};
		},
	},
	methods: {
		onImageClick(message) {
			inspectImage(this.$viewerApi, this.$store.state.setup, message.mediaSrc);
		},
	},
	components: {
		FSImg
	},
};
</script>
