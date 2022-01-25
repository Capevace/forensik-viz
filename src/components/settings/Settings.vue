<template>
	<div class="mx-auto max-w-4xl">
		<h2 class="mb-8 text-2xl font-medium">
			<span class="block">{{ $t('Einstellungen') }}</span>
			<span class="text-gray-400">{{ $t('Optionen und Lizensen') }}</span>
		</h2>

		<section
			class="mb-10 rounded-md border border-gray-300 bg-white px-5 py-4 shadow-md"
		>
			<div>
				<label
					for="locale"
					class="block text-sm font-medium text-gray-700"
				>
					{{ $t('Sprache') }}
				</label>
				<div class="relative mt-1 rounded-md shadow-sm">
					<select
						v-model="locale"
						name="locale"
						id="locale"
						class="block w-full rounded-md border-gray-300 bg-gray-100 py-2 px-4 focus:border-blue-600 focus:ring-blue-600"
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
