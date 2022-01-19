import ExifReader from 'exifreader';
import md5 from '@/md5';

export function getExifData(file) {
	let exifData = ExifReader.load(file);

	delete exifData['MakerNote']; // perf

	let position = null;

	if ('GPSLatitude' in exifData && 'GPSLongitude' in exifData) {
		position = {
			lat: parseFloat(exifData['GPSLatitude'].description),
			lng: parseFloat(exifData['GPSLongitude'].description),
		};
	}

	if (!position && 'Latitude' in exifData && 'Longitude' in exifData) {
		position = {
			lat: parseFloat(exifData['Latitude'].value),
			lng: parseFloat(exifData['Longitude'].value),
		};
	}

	let tags = {};

	for (const tagName of Object.keys(exifData)) {
		const tag = exifData[tagName];

		if (!tag.description || tag.description === '') {
			continue;
		}

		tags[tagName] = tag.description;
	}

	tags.position = position;

	tags.MD5 = md5(file);
	console.log(tags.MD5);

	return { tags, position };
}
