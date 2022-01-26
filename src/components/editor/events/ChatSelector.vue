<template>
	<div class="mb-10 flex gap-10">
		<div class="flex w-1/2 flex-col gap-2">
			<h2 v-if="chats.length === 0" class="text-gray-400">
				{{ $t('Keine Chats importiert') }}
			</h2>
			<button
				v-for="chat in chats"
				:key="chat.id"
				class="flex w-full gap-3 rounded-md border-2 border-transparent bg-green-200 px-3 py-2 text-left text-sm font-medium text-green-900 transition hover:bg-green-300 hover:shadow"
				:class="{
					'border-green-400 bg-green-300':
						viewedChat && viewedChat.id === chat.id,
					'opacity-60': !selectedChats.includes(chat.id),
				}"
				@click="viewChat(chat)"
			>
				<input
					type="checkbox"
					name=""
					:checked="selectedChats.includes(chat.id)"
					@change="selectChat($event, chat)"
				/>
				<div>
					<h4>{{ toSender(chat.receiver).name }}</h4>
					<h5 class="text-sm text-green-700">{{ chat.type }}</h5>
				</div>
			</button>
		</div>
		<div class="w-1/2">
			<Chat
				v-if="viewedChat"
				:sender="toSender(viewedChat.sender)"
				:receiver="toSender(viewedChat.receiver)"
				:firstDate="filterStart"
				:messages="
					viewedChat.messages.filter(
						(message) =>
							message.date >= filterStart &&
							message.date <= filterEnd
					)
				"
				style="max-height: 800px"
			/>
			<!--  -->
		</div>
	</div>
</template>
<script type="text/javascript">
import Chat from '@/components/chat/Chat';

export default {
	props: {
		value: {
			type: Object,
			default: () => {},
		},
		chats: {
			type: Array,
			default: () => [],
		},

		filterStart: {
			type: Date,
			default: () => new Date(),
		},

		filterEnd: {
			type: Date,
			default: () => new Date(),
		},
	},
	data(vm) {
		return {
			viewedChat: vm.chats && vm.chats.length > 0 ? vm.chats[0] : null,
		};
	},
	computed: {
		selectedChats() {
			return this.value.chats;
		},
	},
	methods: {
		toSender(senderId) {
			return this.$store.state.setup.people[senderId];
		},
		selectChat($event, chat) {
			let chats = this.selectedChats;

			if ($event.target.checked) {
				chats.push(chat.id);
			} else {
				const index = chats.indexOf(chat.id);

				if (index !== -1) chats.splice(index, 1);
			}

			this.$emit('value', chats);
			this.$emit('change');
		},

		viewChat(chat) {
			this.viewedChat = chat;
		},
	},
	components: {
		Chat,
	},
};
</script>
