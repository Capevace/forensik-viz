<template>
	<div
		class="flex flex-col w-full bg-gray-100 bg-opacity-80 rounded-lg overflow-hidden"
		style="max-height: 70vh"
	>
		<template v-if="selectedChat">
			<button
				:class="`w-full bg-${selectedColor}-300 text-${selectedColor}-900 py-1 hover:opacity-90`"
				@click="chatHidden = !chatHidden"
			>
				<span v-if="chatHidden">
					Anzeigen
					<i class="el-icon-arrow-up" />
				</span>
				<span v-else>
					Schließen
					<i class="el-icon-arrow-down" />
				</span>
			</button>
			<div
				:class="`flex justify-between items-center px-2 py-1 text-xs bg-${selectedColor}-200 text-${selectedColor}-800`"
			>
				<div class="flex items-center gap-2">
					<img
						class="h-4 w-4 rounded-full"
						:src="receiver.avatarUrl || `https://avatars.dicebear.com/api/bottts/${encodeURIComponent(receiver.name)}.svg`"
					/>
					{{ receiver.name }}
				</div>
				<div class="flex items-center gap-2">
					{{ sender.name }}
					<img class="h-4 w-4 rounded-full" :src="sender.avatarUrl || `https://avatars.dicebear.com/api/bottts/${encodeURIComponent(sender.name)}.svg`" />
				</div>
			</div>
			<Chat
				class="w-full transition-all p-2"
				:style="
					chatHidden
						? {
								'max-height': '0px',
								paddingTop: 0,
								paddingBottom: 0,
						  }
						: { 'max-height': '70vh' }
				"
				:sender="sender"
				:receiver="receiver"
				:messages="messages"
				:color="selectedColor"
			/>
		</template>
		<nav class="w-full flex justify-around">
			<TabButton
				v-for="chat in chatList"
				:key="chat.id"
				:color="chatColor(chat.type)"
				:count="filterMessagesForEvent(chat.messages, selectedEvent).length"
				:active="selectedChat.id === chat.id"
				@click="selectChat(chat)"
				:style="`max-width: ${100/chatList.length}%`"
			>
				<div class="flex flex-col text-left flex-shrink-1 truncate overflow-ellipsis overflow-hidden">
					<div class="truncate">{{ toPerson(chat.receiver).name }}</div>
					<div :class="`text-xs text-${selectedColor}-600`">
						{{ chatName(chat.type) }}
					</div>
				</div>
				<!-- 
					text-gray-100 text-gray-200 text-gray-300 text-gray-400 text-gray-500 text-gray-600 text-gray-700 text-gray-800 text-gray-900
					text-purple-100 text-purple-200 text-purple-300 text-purple-400 text-purple-500 text-purple-600 text-purple-700 text-purple-800 text-purple-900
					text-green-100 text-green-200 text-green-300 text-green-400 text-green-500 text-green-600 text-green-700 text-green-800 text-green-900
					text-blue-100 text-blue-200 text-blue-300 text-blue-400 text-blue-500 text-blue-600 text-blue-700 text-blue-800 text-blue-900
					text-indigo-100 text-indigo-200 text-indigo-300 text-indigo-400 text-indigo-500 text-indigo-600 text-indigo-700 text-indigo-800 text-indigo-900
					text-yellow-100 text-yellow-200 text-yellow-300 text-yellow-400 text-yellow-500 text-yellow-600 text-yellow-700 text-yellow-800 text-yellow-900

					bg-gray-100 bg-gray-200 bg-gray-300 bg-gray-400 bg-gray-500 bg-gray-600 bg-gray-700 bg-gray-800 bg-gray-900
					bg-purple-100 bg-purple-200 bg-purple-300 bg-purple-400 bg-purple-500 bg-purple-600 bg-purple-700 bg-purple-800 bg-purple-900
					bg-green-100 bg-green-200 bg-green-300 bg-green-400 bg-green-500 bg-green-600 bg-green-700 bg-green-800 bg-green-900
					bg-blue-100 bg-blue-200 bg-blue-300 bg-blue-400 bg-blue-500 bg-blue-600 bg-blue-700 bg-blue-800 bg-blue-900
					bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900
					bg-yellow-100 bg-yellow-200 bg-yellow-300 bg-yellow-400 bg-yellow-500 bg-yellow-600 bg-yellow-700 bg-yellow-800 bg-yellow-900
				 -->
			</TabButton>
		</nav>
	</div>
</template>
<script type="text/javascript">
import filterMessagesForEvent from '@/util/filter-messages-for-event';
import TabButton from './TabButton';
import Chat from './Chat';

export default {
	props: {
		chats: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			chatHidden: false,
			selectedChat: null,
		};
	},
	beforeMount() {
		this.selectedChat = this.chatList[0];
	},
	computed: {
		chatList() {
			return this.chats.map(chatId => this.$store.state.setup.chats[chatId]);
		},
		selectedEvent() {
			return this.$store.state.setup.events[this.$store.state.map.selectedEventId];
		},
		messages() {
			if (!this.selectedChat) return null;

			const messages = filterMessagesForEvent(
				this.selectedChat.messages, 
				this.selectedEvent
			);

			return messages;
		},
		sender() {
			return this.$store.state.setup.people[
				this.selectedChat.sender
			];
		},
		receiver() {
			return this.$store.state.setup.people[
				this.selectedChat.receiver
			];
		},
		selectedColor() {
			return this.chatColor(
				this.selectedChat ? this.selectedChat.type : ''
			);
		},
	},
	components: {
		Chat,
		TabButton,
	},
	methods: {
		filterMessagesForEvent,
		toPerson(id) {
			return this.$store.state.setup.people[id] || this.$store.state.setup.people[id];
		},
		selectChat(chat) {
			this.selectedChat = chat;
		},
		chatColor(chatType) {
			switch (chatType) {
				case 'whatsapp':
					return 'green';
				case 'sms':
					return 'purple';
				case 'phonelog':
					return 'pink';
				default:
					return 'gray';
			}
		},
		chatName(chatType) {
			switch (chatType) {
				case 'whatsapp':
					return 'WhatsApp';
				case 'sms':
					return 'SMS';
				case 'phonelog':
					return 'Phone Calls';
			}
		},
	},
	watch: {
		chats() {
			// If chats are updated we try to find the old selected chat id, or select the first one
			if (!this.selectedChat) return;

			this.selectedChat =
				this.chatList.find((chat) => chat.id === this.selectedChat.id) ||
				this.chatList[0];
		},
	},
};
</script>
