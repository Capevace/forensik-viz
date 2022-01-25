<template>
	<div class="max-w-4xl mx-auto">
		<h2 class="text-2xl font-medium mb-8">
			<span class="block">{{ $t('Einstellungen') }}</span>
			<span class="text-gray-400">{{ $t('Optionen und Lizensen') }}</span>
		</h2>

		<section
			class="bg-white rounded-md shadow-md border border-gray-300 px-5 py-4 mb-10"
		>
			<div>
				<label
					for="locale"
					class="block text-sm font-medium text-gray-700"
				>
					{{ $t('Sprache') }}
				</label>
				<div class="mt-1 relative rounded-md shadow-sm">
					<select
						v-model="locale"
						name="locale"
						id="locale"
						class="focus:ring-blue-600 focus:border-blue-600 block w-full py-2 px-4 bg-gray-100 border-gray-300 rounded-md"
					>
						<option value="de">{{ $t('Deutsch') }}</option>
						<option value="en">{{ $t('English') }}</option>
					</select>
				</div>
			</div>
		</section>
	</div>
</template>
<script type="text/javascript">
export default {
	data(vm) {
		return {
			locale: vm.$root.$i18n.locale,
		};
	},
	watch: {
		locale() {
			this.$root.$i18n.locale = this.locale;
		},
	},
};
</script>
