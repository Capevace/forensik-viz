<template>
	<div class="flex gap-10">
		<div class="w-1/2 flex flex-col gap-2">
			<form
				class="text-left text-sm font-medium px-3 py-2 rounded-md hover:shadow bg-purple-200 transition text-purple-900 w-full gap-2 flex flex-col mb-5"
				@submit.prevent="addLocation"
			>
				<h4>Ort hinzufügen</h4>
				<input
					type="text" 
					name="description" 
					id="description" 
					class="focus:ring-purple-500 focus:border-purple-500 block flex-1 py-2 px-4 sm:text-sm border-gray-300 rounded-md" 
					placeholder="Description"
					v-model="newLocation.description"
					required
				/>

				<input
					type="text" 
					name="lat" 
					id="lat" 
					class="focus:ring-purple-500 focus:border-purple-500 block flex-1 py-2 px-4 sm:text-sm border-gray-300 rounded-md" 
					placeholder="Latitude"
					v-model="newLocation.position.lat"
					required
				/>

				<input
					type="text" 
					name="long" 
					id="long" 
					class="focus:ring-purple-500 focus:border-purple-500 block flex-1 py-2 px-4 sm:text-sm border-gray-300 rounded-md" 
					placeholder="Longitude"
					v-model="newLocation.position.lng"
					required
				/>

				<div class="flex-1 flex justify-end">
					<button class="hover:bg-purple-300 px-2 py-1 rounded-md" type="submit">
						Hinzufügen
					</button>
				</div>
			</form>

			<button
				v-for="location in locations"
				:key="location.id"
				class="text-left text-sm font-medium px-3 flex gap-2 py-2 rounded-md hover:shadow bg-purple-200 hover:bg-purple-300 transition text-purple-900 w-full"
				:class="{ 'bg-purple-300': viewedLocation && viewedLocation.id === location.id, 'opacity-60': !value.includes(location.id) }"
				@click="viewLocation(location)"
			>
				<input
					type="checkbox"
					name=""
					@change="selectLocation($event, location)"
					:checked="value.includes(location.id)"
				/>

				<div class="flex-1">
					<button
						
						class="flex-1 text-left mb-1"
					>
						{{ location.description }}

					</button>

					<select @change="changePerson($event, location)" class="w-full">
						<option value="" :selected="location.person === null">–</option>
						<option
							v-for="person in allPeople"
							:key="person.id"
							:value="person.id"
							:selected="location.person === person.id"
						>
							{{ person.name }}
						</option>
					</select>
				</div>

				<button @click="removeLocation(location)" class="font-mono">X</button>
			</button>
		</div>
		<div class="w-1/2">
			<LMap v-if="viewedLocation" style="height: 300px" :zoom="15" :center="viewedLocation.position" class="rounded-md shadow-md">
				<LTileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					:attribution="null"
				/>
				<LMarker 
					:lat-lng="viewedLocation.position" 
					:icon="icon(viewedLocation)"
				/>
			</LMap>
		</div>
	</div>
</template>
<script type="text/javascript">
import uuid from 'uuid/v4';
import 'leaflet/dist/leaflet.css';
import {
	LMap,
	LTileLayer,
	// LControl,
	LMarker,
	// LTooltip,
	// LIcon,
} from 'vue2-leaflet';
import createIcon from '@/util/create-icon';


export default {
	props: {
		value: {
			type: Array,
			default: () => [],
		},
		locations: {
			type: Array,
			default: () => [
				{
					id: 'aaa',
					position: { lat: 53.228909, lng: 10.401397 },
					date: new Date(),
					description: `Kiosk`,
				},
			],
		},
	},
	data(vm) {
		return {
			newLocation: {
				id: uuid(),
				position: { lat: 53.228093, lng: 10.373144 },
				// date: new Date('2021-10-01 15:50:00'),
				// person: personA.id,
				description: `Haus`,
			},
			viewedLocation:
				vm.locations && vm.locations.length > 0
					? vm.locations[0]
					: null,
		};
	},
	computed: {
		selectedLocations() {
			return this.value;
		},
		allPeople() {
			return Object.values(this.$store.state.setup.people);
		}
	},
	methods: {
		icon(location) {
			return createIcon(location, this.$store.state.setup.people);
		},
		selectLocation($event, location) {
			let locations = this.selectedLocations;

			if ($event.target.checked) {
				locations.push(location.id);
			} else {
				const index = locations.indexOf(location.id);

				if (index !== -1) locations.splice(index, 1);
			}

			this.$emit('value', locations);
		},

		addLocation() {
			this.$store.commit('setup/newLocation', this.newLocation);
			this.selectLocation({ target: { checked: true }}, this.newLocation);
			this.newLocation = {
				id: uuid(),
				position: { lat: 53.228093, lng: 10.373144 },
				// date: new Date('2021-10-01 15:50:00'),
				// person: personA.id,
				description: ``,
			};

			setTimeout(() => {
				this.$forceUpdate();
			}, 1000);
		},

		viewLocation(location) {
			this.viewedLocation = location;
		},

		removeLocation(location) {
			this.$store.commit('setup/removeLocation', location);

			let locations = this.selectedLocations;

			const index = locations.indexOf(location.id);
			if (index !== -1) locations.splice(index, 1);

			this.$emit('value', locations);

			this.$forceUpdate();
		},

		changePerson($event, location) {
			console.log('lol')
			this.$store.commit('setup/setLocationPerson', { location, person: $event.target.value });
		}
	},
	components: {
		LMap,
		LTileLayer,
		LMarker,
	},
};
</script>
