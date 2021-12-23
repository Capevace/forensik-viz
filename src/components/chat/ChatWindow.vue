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
						:src="receiver.avatarUrl"
					/>
					{{ receiver.name }}
				</div>
				<div class="flex items-center gap-2">
					{{ sender.name }}
					<img class="h-4 w-4 rounded-full" :src="sender.avatarUrl" />
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
				:sender-id="selectedChat.sender"
				:messages="selectedChat.messages"
				:color="selectedColor"
			/>
		</template>
		<nav class="w-full flex justify-around">
			<TabButton
				v-for="chat in chats"
				:key="chat.id"
				:color="chatColor(chat.type)"
				:count="chat.messages.length"
				:active="selectedChat.id === chat.id"
				@click="selectChat(chat)"
			>
				{{ chatName(chat.type) }}
			</TabButton>
		</nav>
	</div>
</template>
<script type="text/javascript">
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
		this.selectedChat = this.chats[0];
	},
	computed: {
		messages() {
			if (!this.selectedChat) return null;

			return this.selectedChat.messages;
		},
		sender() {
			return this.$store.state.presentation.people[
				this.selectedChat.sender
			];
		},
		receiver() {
			return this.$store.state.presentation.people[
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
				this.chats.find((chat) => chat.id === this.selectedChat.id) ||
				this.chats[0];
		},
	},
};
</script>
