<script lang="ts">
type Props = {
	html: string;
	containerClass?: string;
};

let { html, containerClass = "wix-site-content" }: Props = $props();
</script>

<div class={containerClass}>
{@html html}
</div>
