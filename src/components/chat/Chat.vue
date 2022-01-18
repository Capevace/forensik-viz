<template>
	<div class="flex flex-col gap-5 overflow-y-scroll">
		<div class="text-center text-xs font-medium text-gray-900 opacity-40">
			{{ safeFirstDate.toLocaleString() }}
		</div>
		<Bubble
			v-for="message in messages"
			:key="message.id"
			:message="message"
			:right="message.isSender"
			:sender="message.isSender ? sender : receiver"
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
		sender: {
			type: Object,
			required: true,
		},
		receiver: {
			type: Object,
			required: true,
		},
		color: {
			type: String,
			default: 'green',
		},
		firstDate: {
			type: Date
		}
	},
	computed: {
		safeFirstDate() {
			return this.messages[0] ? this.messages[0].date : this.firstDate || new Date();
		},
	},
	components: {
		Bubble,
	},

	methods: {
		
	}
};
</script>
