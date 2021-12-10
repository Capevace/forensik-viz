<template>
	<div class="flex flex-col gap-5 w-full bg-yellow-100 rounded-lg p-2">
		<div
			v-for="message in messages"
			:key="message.id"
			:class="`w-full flex justify-${
				message.sender === sender ? 'end' : 'start'
			}`"
		>
			<Bubble :right="message.sender === sender" :message="message" />
		</div>
	</div>
</template>
<script type="text/javascript">
import Bubble from './Bubble';
export default {
	props: {
		sender: {
			type: String,
			default: '1',
		},
	},
	components: {
		Bubble,
	},
	computed: {
		messages() {
			return [
				{
					id: '1',
					date: new Date(),
					type: 'text',
					text: 'Hello',
					sender: '1',
				},
				{
					id: '2',
					date: new Date(),
					type: 'text',
					text: 'Hello2',
					sender: '2',
				},
			];
		},
	},
};
</script>
