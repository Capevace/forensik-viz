<template>
	<section class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-2xl font-medium">
			<span class="block">{{ $t('Daten importieren') }}</span>
			<span class="text-gray-400">{{ $t('Via Mobile Revelator') }}</span>
		</h2>

		<section
			class="mb-10 rounded-md border border-gray-300 bg-white px-5 py-4 shadow-md"
		>
			<h3 class="mb-3 font-medium">
				<span class="block text-xl">{{
					$t('ZIP-Datei auswählen')
				}}</span>
				<span class="text-lg text-gray-400">{{
					$t('Mobile Revelator Export (.zip)')
				}}</span>
			</h3>
			<input type="file" @change="changed" />
			<select v-model="rootPath" class="mb-8">
				<option>/</option>
				<option v-for="dir in rootDirs" :key="dir">/{{ dir }}</option>
			</select>

			<h3 class="mb-3 font-medium">
				<span class="block text-xl">{{
					$t('Dateien überprüfen')
				}}</span>
				<span class="text-lg text-gray-400">{{
					$t('Datenbank-Dateien werden automatisch erkannt')
				}}</span>
			</h3>
			<h3 class="mb-4 text-lg font-medium">
				Path:
				<code class="font-mono text-gray-500">{{ rootPath }}</code>
			</h3>

			<h3 class="mb-1 text-lg font-medium">{{ $t('Dateien') }}</h3>
			<p v-if="parsedDirs.length === 0" class="text-gray-500">
				{{ $t('Keine Dateien gefunden') }}
			</p>
			<table class="mb-5 mt-3 w-full text-left text-gray-600" v-else>
				<thead>
					<th class="font-normal">{{ $t('Erkannt') }}:</th>
					<th class="font-normal">{{ $t('Dateiname') }}:</th>
					<th class="font-normal">{{ $t('Importieren als') }}:</th>
				</thead>
				<tbody class="font-mono">
					<tr v-for="dir in parsedDirs" :key="dir.dir">
						<td>
							{{ dir.type !== 'none' ? '✅' : '❓' }}
						</td>
						<td :class="{ 'opacity-60': dir.type === 'none' }">
							{{ dir.dir }}
						</td>
						<td>
							<select v-model="dir.type" @change="$forceUpdate()">
								<option
									v-for="type in typeOptions"
									:key="type.value"
									:value="type.value"
								>
									{{ type.label }}
								</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>

			<div class="flex w-full justify-end">
				<button
					class="block h-full rounded-md bg-blue-100 px-2 py-2 text-base hover:bg-blue-200"
					@click="loadData"
				>
					{{ $t('Daten auslesen') }}
				</button>
			</div>
		</section>

		<div class="mb-20 px-5">
			<strong v-if="importMessage" class="mb-10 block">
				{{ importMessage }}
			</strong>

			<h4
				class="mb-5 text-xl font-medium text-gray-700"
				v-if="activeImport"
			>
				{{ $t('Gefundene Chats') }}:
			</h4>
			<table class="mb-8 text-left text-gray-600" v-if="activeImport">
				<thead>
					<th>{{ $t('Typ') }}:</th>
					<th>{{ $t('Empfänger') }}:</th>
					<th>{{ $t('Sender') }}:</th>
					<th>{{ $t('Importieren') }}:</th>
				</thead>
				<tbody class="font-mono">
					<tr
						v-for="chat in activeImport.chats"
						:key="chat.id"
						:class="{ 'opacity-60': !chat.enabled }"
					>
						<td>
							{{
								chat.type === 'whatsapp'
									? $t('WhatsApp')
									: chat.type
							}}
						</td>
						<td>
							<select
								v-model="chat.receiver"
								@change="$forceUpdate()"
								class="w-3/4"
							>
								<option
									v-for="person in allPeople"
									:key="person.id"
									:value="person.id"
								>
									{{ person.name }}
								</option>
								<option
									v-for="person in activeImport.people"
									:key="person.id"
									:value="person.id"
								>
									{{ person.name }}
								</option>
							</select>
						</td>
						<td>
							<select
								v-model="chat.sender"
								@change="$forceUpdate()"
								class="w-3/4"
							>
								<option
									v-for="person in allPeople"
									:key="person.id"
									:value="person.id"
								>
									{{ person.name }}
								</option>
								<option
									v-for="person in activeImport.people"
									:key="person.id"
									:value="person.id"
								>
									{{ person.name }}
								</option>
							</select>
						</td>
						<td>
							<input type="checkbox" v-model="chat.enabled" />
						</td>
					</tr>
				</tbody>
			</table>

			<div class="flex justify-end">
				<button
					class="block h-full rounded-md bg-blue-100 px-2 py-2 text-base hover:bg-blue-200"
					@click="importData"
					v-if="activeImport"
				>
					{{ $t('Importieren') }}
				</button>
			</div>
		</div>
	</section>
</template>
<script type="text/javascript">
import { fs, mountZipFile, readFile } from '@/fs';
import { parseMsgStore, addPeopleMeta } from '@/data-import';

function getDirs(rootPath = '') {
	const path = `/import${rootPath}`;
	return fs.existsSync(path) ? fs.readdirSync(path) : [];
}

function findDirType(dir) {
	switch (dir) {
		case 'Messenger.db':
			return 'mr-messages';
		case 'msgstore.db':
			return 'wa-msgstore';
		case 'Calls.db':
			return 'mr-calls';
	}

	return 'none';
}

export default {
	data() {
		return {
			rootPath: '/',
			rootDirs: getDirs('/'),
			dirs: getDirs('/'),
			counter: 0,
			activeImport: null,
			importMessage: null,
		};
	},
	methods: {
		async changed(e) {
			if (e.target.files.length !== 0) {
				await mountZipFile(e.target.files[0]);
			}

			this.rootDirs = getDirs('/');
			this.dirs = getDirs(this.rootPath);
		},

		async loadData() {
			let msgStore = null;
			let mrMessages = null;

			await Promise.all(
				this.parsedDirs.map(async (dir) => {
					switch (dir.type) {
						case 'wa-msgstore':
							msgStore = await readFile(
								`/import${this.rootPath}/${dir.dir}`,
								null
							);
							break;
						case 'mr-messages':
							mrMessages = await readFile(
								`/import${this.rootPath}/${dir.dir}`,
								null
							);
							break;
					}
				})
			);

			this.importMessage = null;

			const msgStoreData = await parseMsgStore(
				msgStore,
				`/import${this.rootPath}`
			);

			if (mrMessages) {
				const dataWithMeta = await addPeopleMeta(
					mrMessages,
					msgStoreData
				);
				this.activeImport = dataWithMeta;
				// this.$store.commit('setup/update', { chats, people });
			} else {
				this.activeImport = msgStoreData;
				// this.$store.commit('setup/update', { chats: msgStoreData.chats, people: msgStoreData.people });
			}

			const chatsCount = Object.values(this.activeImport.chats).length;
			const peopleCount = Object.values(this.activeImport.people).length;

			this.importMessage = this.$t(
				'Es wurden {chats} Chats und {people} Personen gefunden.',
				{ chats: chatsCount, people: peopleCount }
			);
		},

		async importData() {
			if (!this.activeImport) return;

			let chats = {};
			let peopleCount = 0;

			for (const chat of Object.values(this.activeImport.chats)) {
				if (chat.enabled) {
					chats[chat.id] = chat;

					const sender =
						this.activeImport.people[chat.sender] ||
						this.$store.state.setup.people[chat.sender];
					const receiver =
						this.activeImport.people[chat.receiver] ||
						this.$store.state.setup.people[chat.receiver];

					if (sender) {
						this.$store.commit('setup/updatePerson', sender);
						peopleCount++;
					}

					if (receiver) {
						this.$store.commit('setup/updatePerson', receiver);
						peopleCount++;
					}
				}
			}

			const chatsCount = Object.values(chats).length;

			this.importMessage = this.$t(
				'Es wurden {chats} Chats und {people} Personen importiert.',
				{ chats: chatsCount, people: peopleCount }
			);

			this.$store.commit('setup/addChats', chats);
			this.$store.commit('setup/addFiles', this.activeImport.files);
			this.$store.commit('setup/addExif', this.activeImport.exif);
			this.$store.commit(
				'setup/addLocations',
				this.activeImport.locations
			);

			this.activeImport = null;
		},
	},
	computed: {
		importActive() {
			return this.dirs.includes('msgstore.db');
		},
		parsedDirs() {
			return this.dirs.map((dir) => {
				return {
					dir,
					type: findDirType(dir),
				};
			});
		},
		typeOptions() {
			return [
				{
					label: '-',
					value: 'none',
				},
				{
					label: 'Mobile Revelator – Messenger.db',
					value: 'mr-messages',
				},
				{
					label: 'WhatsApp – msgstore.db',
					value: 'wa-msgstore',
				},
				{
					label: 'Mobile Revelator – Calls.db',
					value: 'mr-calls',
				},
			];
		},

		allPeople() {
			return Object.values(this.$store.state.setup.people).filter(
				(person) => !!person
			);
		},
	},
	watch: {
		rootPath(newPath) {
			this.dirs = getDirs(newPath);
		},
	},
};
</script>
