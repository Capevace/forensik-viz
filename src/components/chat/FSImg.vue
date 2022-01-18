<template>
	<div>
		<img @click="$emit('click', $event)" :src="url" v-if="isImage" class="w-full" />
		<video v-else controls loop class="w-full">
			<source :src="url" :type="mime">
		</video>
	</div>
</template>
<script type="text/javascript">
// import { readFile } from '@/fs';

// const toBase64 = (file) =>
// 	new Promise((resolve, reject) => {
// 		const reader = new FileReader();
// 		reader.readAsDataURL(file);
// 		reader.onload = () => resolve(reader.result);
// 		reader.onerror = (error) => reject(error);
// 	});

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
	created() {
		// requestAnimationFrame(async () => {
		// 	const file = await readFile(this.src, null);
		// 	const blob = new Blob([file.buffer], { type: this.mime || 'image/jpeg' });
		// 	console.log(blob, this.mime)
		// 	this.url = (this.mime || 'image/jpeg').indexOf('video') === -1 ? await toBase64(blob) : URL.createObjectURL(blob);
		// });
	},
	computed: {
		url() {
			return this.$store.state.setup.files[this.src];
		},
		isImage() {
			return (this.mime || 'image/jpeg').indexOf('video') === -1;
		}
	}
};
</script>