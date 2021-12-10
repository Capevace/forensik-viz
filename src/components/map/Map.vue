<template>
	<l-map :zoom="zoom" :center="center">
		<l-tile-layer :url="url" :attribution="attribution" />
		<l-control
			class="w-full max-w-2xl p-3"
			style="width: 400px"
			:position="'bottomright'"
			:disableScrollPropagation="true"
		>
			<slot name="chat" />
		</l-control>
		<l-control
			:position="'bottomleft'"
			class="w-full max-w-lg p-5"
			:disableScrollPropagation="true"
		>
			<slot name="control" />
		</l-control>
	</l-map>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { latLng } from 'leaflet';
import { LMap, LTileLayer, LControl } from 'vue2-leaflet';

export default {
	name: 'Example',
	components: {
		LMap,
		LTileLayer,
		LControl,
	},
	data() {
		return {
			zoom: 13,
			center: latLng(52.923, 10.405),
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution:
				'&copy; <a href="https://mateffy.me">Lukas Mateffy</a> & <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		};
	},
	methods: {
		showAlert() {
			alert('Click!');
		},
	},
};
</script>

<style>
.example-custom-control {
	background: #fff;
	padding: 0 0.5em;
	border: 1px solid #aaa;
	border-radius: 0.1em;
}
.custom-control-watermark {
	font-size: 200%;
	font-weight: bolder;
	color: #aaa;
	text-shadow: #555;
}
</style>
