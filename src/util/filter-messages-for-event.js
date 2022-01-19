export default function filterMessagesForEvent(messages, event) {
	return messages.filter(
		(message) =>
			message.date.toISOString() >= event.start.toISOString() &&
			message.date.toISOString() <= event.end.toISOString()
	);
}
