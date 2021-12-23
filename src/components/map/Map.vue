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

		<LMarker
			v-for="location in mappedLocations"
			:key="location.id"
			name="lolol"
			:lat-lng="location.position"
			:icon="createIcon(location)"
			@click="alert(location)"
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
import markerIcon from '@/assets/marker-icon.png';
import markerShadow from '@/assets/marker-shadow.png';
import { icon, latLng } from 'leaflet';
import {
	LMap,
	LTileLayer,
	LControl,
	LMarker,
	LTooltip,
	LIcon,
} from 'vue2-leaflet';

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
			return this.locations.map((location) =>
				!location.person
					? location
					: {
							...location,
							person: this.$store.state.presentation.people[
								location.person
							],
					  }
			);
		},
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
		recalculateBounds() {
			if (this.locations.length === 0) return;

			const bounds = this.locations.map((location) => [
				location.position.lat,
				location.position.lng,
			]);

			this.$refs.map.fitBounds(bounds, { padding: [200, 200] });
		},
		createIcon(location) {
			return location.person
				? icon({
						iconUrl: location.person.avatarUrl,
						iconAnchor: [16, 16],
						tooltipAnchor: [16, 0],
						className: `rounded-full shadow-lg border-2 border-gray-500`,
				  })
				: icon({
						iconUrl: markerIcon,
						shadowUrl: markerShadow,
						iconSize: [25, 41],
						iconAnchor: [12, 41],
						popupAnchor: [1, -34],
						tooltipAnchor: [16, -28],
						shadowSize: [41, 41],
				  });
		},
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
