<template>
	<div id="app" class="flex flex-col">
		<router-view />
	</div>
</template>
<script type="text/javascript">
export default {
	metaInfo() {
	    const name = this.$store.state.setup.projectName;
	    return {
			titleTemplate: () => (
				name !== 'Forensik Viz' ? `${name} - Forensik Viz` : 'Forensik Viz'
			)
	    }
	  }
}
</script>