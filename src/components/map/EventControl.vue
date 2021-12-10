<template>
	<div>
		<Timeline
			:items="events"
			:options="options"
			:events="['select']"
			:selection="selection"
			@select="onEventSelect"
		/>
		<ButtonGroup class="w-full">
			<Button type="primary" icon="el-icon-arrow-left">
				Vorheriges Event
			</Button>
			<Button type="primary">
				Nächstes Event
				<i class="el-icon-arrow-right el-icon-right" />
			</Button>
		</ButtonGroup>
	</div>
</template>
<script>
import { Button, ButtonGroup } from 'element-ui';
import { Timeline } from 'vue-visjs';

export default {
	props: {
		events: {
			type: Array,
			required: true,
		},
		selection: {
			type: String,
		},
	},
	components: {
		Button,
		ButtonGroup,
		Timeline,
	},
	computed: {
		groups: () => [
			{
				id: 0,
				content: 'Group 1',
			},
		],
		items: () => [
			{
				id: 0,
				group: 0,
				start: new Date(),
				content: 'Item 1',
			},
		],
		options: () => ({
			editable: false,
			// height: 95,
			// minHeight: 95,
			width: '100%',
			stack: false,
			align: 'left',
			type: 'range',
		}),
	},
	methods: {
		onEventSelect({ items }) {
			this.$emit('select', items[0]);
		},
	},
};
</script>
<style type="text/css">
.vis-content {
	min-height: 95px;
}
</style>
