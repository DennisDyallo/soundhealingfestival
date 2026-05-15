<script lang="ts">
import type { Snippet } from "svelte";

type Props = {
	children?: Snippet;
	title: string;
	description?: string;
};

let { children, title, description }: Props = $props();
</script>

<article class="sg-card">
<h2>{title}</h2>
{#if description}
<p class="sg-muted">{description}</p>
{/if}
{@render children?.()}
</article>

<style>
.sg-card {
background: var(--sg-color-surface);
border-radius: var(--sg-border-radius-md);
box-shadow: var(--sg-shadow-sm);
padding: var(--sg-space-5);
}

.sg-card h2 {
margin: 0 0 var(--sg-space-3);
}

.sg-muted {
color: var(--sg-color-muted);
margin: 0;
}
</style>
