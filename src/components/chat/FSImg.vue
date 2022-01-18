<template>
	<div>
		<img @click="$emit('click', $event)" :src="dataUri" v-if="isImage"  />
		<video v-else controls loop>
			<source :src="dataUri" :type="mime">
		</video>
	</div>
</template>
<script type="text/javascript">
import { readFile } from '@/fs';

const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

export default {
	props: {
		src: {
			type: String,
			required: true
		},
		mime: {
			type: String,
			default: 'image/jpeg'
		}
	},
	data() {
		return {
			dataUri: ''
		};
	},
	async created() {
		const file = await readFile(this.src.replace('Media/', '/import/Export/files/media/0/WhatsApp/Media/'), null);
		const blob = new Blob([file.buffer], { type: this.mime || 'image/jpeg' });
		console.log(blob, this.mime)
		this.dataUri = (this.mime || 'image/jpeg').indexOf('video') === -1 ? await toBase64(blob) : URL.createObjectURL(blob);

	},
	computed: {
		isImage() {
			return (this.mime || 'image/jpeg').indexOf('video') === -1;
		}
	}
};
</script>