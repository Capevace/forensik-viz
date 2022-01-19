<template>
	<LMap ref="map" :zoom="zoom" :center="center">
		<LTileLayer :url="url" :attribution="attribution" />
		<LControl
			class="w-full max-w-2xl p-3"
			style="width: 400px"
			:position="'bottomright'"
			:disableScrollPropagation="true"
		>
			<slot name="chat" />
		</LControl>
		<LControl
			:position="'bottomleft'"
			class="w-full max-w-xl p-5"
			style="min-width: 40vw"
			:disableScrollPropagation="true"
		>
			<slot name="control" />
		</LControl>
		<LControl
			:position="'topright'"
			class="w-full max-w-xl"
			style="min-width: 10vw"
		>
			<slot name="load" />
		</LControl>

		<LMarker
			v-for="location in mappedLocations"
			:key="location.id"
			name="lolol"
			:lat-lng="location.position"
			:icon="icon(location)"
			@click="markerClicked(location)"
		>
			<LTooltip :content="location.description" />
		</LMarker>

		<LIcon :icon-anchor="[16, 16]">
			<!-- <img
				class="rounded-full shadow"
				:src="location.person ? location.person.avatarUrl : null"
			/> -->
		</LIcon>
	</LMap>
</template>

<script>
import 'leaflet/dist/leaflet.css';
import { latLng } from 'leaflet';
import {
	LMap,
	LTileLayer,
	LControl,
	LMarker,
	LTooltip,
	LIcon,
} from 'vue2-leaflet';

import createIcon from '@/util/create-icon';
import inspectImage from '@/util/inspect-image';

export default {
	props: {
		locations: {
			type: Array,
			required: true,
		},
	},
	name: 'Example',
	components: {
		LMap,
		LTileLayer,
		LControl,
		LMarker,
		LTooltip,
		LIcon,
	},
	mounted() {
		this.recalculateBounds();
	},
	computed: {
		mappedLocations() {
			return this.locations
			.map((location) => this.$store.state.setup.locations[location]);
		},
	},
	data() {
		return {
			zoom: 6,
			center: latLng(51.38619, 10.56072),
			url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			attribution:
				'&copy; <a href="https://mateffy.me">Lukas Mateffy</a> & <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
		};
	},
	methods: {
		markerClicked(location) {
			if (location.mediaSrc) {
				inspectImage(this.$viewerApi, this.$store.state.setup, location.mediaSrc);
			}
		},
		recalculateBounds() {
			if (this.locations.length === 0) return;
			const bounds = this.mappedLocations.map((location) => [
				location.position.lat,
				location.position.lng,
							console.log(location)

			]);

			this.$refs.map.fitBounds(bounds, { padding: [50, 50], maxZoom: 14 });
		},
		icon(location) {
			return createIcon(location, this.$store.state.setup);
		}
	},
	watch: {
		locations() {
			this.recalculateBounds();
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
