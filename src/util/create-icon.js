import markerIcon from '@/assets/marker-icon.png';
import markerShadow from '@/assets/marker-shadow.png';
import { icon } from 'leaflet';

export default function createIcon(location, people) {
	return location.person
		? icon({
				iconUrl: people[location.person].avatarUrl,
				iconSize: [32, 32],
				iconAnchor: [16, 16],
				tooltipAnchor: [16, 0],
				popupAnchor: [1, -34],
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
}