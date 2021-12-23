<template>
	<div class="flex flex-col gap-5 overflow-y-scroll">
		<div class="text-center text-xs font-medium text-gray-900 opacity-40">
			{{ firstDate.toLocaleString() }}
		</div>
		<Bubble
			v-for="message in messages"
			:key="message.id"
			:message="message"
			:right="message.sender === senderId"
			:color="`${color}-200`"
		/>
	</div>
</template>
<script type="text/javascript">
import Bubble from './Bubble';

export default {
	props: {
		messages: {
			type: Array,
			required: true,
		},
		senderId: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			default: 'green',
		},
	},
	computed: {
		firstDate() {
			return this.messages[0].date;
		},
	},
	components: {
		Bubble,
	},
};
</script>
