<script lang="ts">
	export let icon: string;
	export let innerClass = '';
</script>

<div class="{icon} {innerClass}" />

<style lang="postcss">
	.slide-bck-center:active {
		-webkit-animation: slide-bck-center 0.45s cubic-bezier(0.47, 0, 0.745, 0.715) both;
		animation: slide-bck-center 0.45s cubic-bezier(0.47, 0, 0.745, 0.715) both;
	}

	@-webkit-keyframes slide-bck-center {
		0% {
			-webkit-transform: translateZ(0);
			transform: translateZ(0);
		}
		100% {
			-webkit-transform: translateZ(-400px);
			transform: translateZ(-400px);
		}
	}
	@keyframes slide-bck-center {
		0% {
			-webkit-transform: translateZ(0);
			transform: translateZ(0);
		}
		100% {
			-webkit-transform: translateZ(-400px);
			transform: translateZ(-400px);
		}
	}
</style>
