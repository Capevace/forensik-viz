<template>
	<div class="flex flex-col gap-3 overflow-y-scroll pb-5">
		<div class="text-center text-xs font-medium text-gray-900 opacity-40">
			{{ safeFirstDate.toLocaleString() }}
		</div>
		<div
			v-if="rebasedMessages.length === 0"
			class="text-center text-gray-600"
		>
			{{ $t('Keine Nachrichten in diesem Zeitraum') }}
		</div>
		<Bubble
			v-for="message in rebasedMessages"
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
			type: Date,
		},
		basePath: {
			type: String,
			default: '/import/Export/files/media/0/WhatsApp/Media/',
		},
	},
	computed: {
		safeFirstDate() {
			return this.messages[0]
				? this.messages[0].date
				: this.firstDate || new Date();
		},
		rebasedMessages() {
			return this.messages.map((message) => {
				if (!message.mediaSrc) return message;

				return {
					...message,
					// mediaSrc: message.mediaSrc.replace('Media/', this.basePath)
				};
			});
		},
	},
	components: {
		Bubble,
	},

	methods: {},
};
</script>
