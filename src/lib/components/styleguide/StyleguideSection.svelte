<script lang="ts">
import type { Snippet } from "svelte";

type SectionVariant = "header" | "grid";

type Props = {
	children?: Snippet;
	title?: string;
	description?: string;
	variant?: SectionVariant;
};

let { children, title, description, variant = "header" }: Props = $props();
</script>

<section class={`sg-section sg-section-${variant}`}>
{#if title}
{#if variant === "header"}
<h1>{title}</h1>
{:else}
<h2>{title}</h2>
{/if}
{/if}
{#if description}
<p class="sg-muted">{description}</p>
{/if}
{@render children?.()}
</section>

<style>
.sg-section-header {
max-width: 900px;
margin: 0 auto var(--sg-space-6);
}

.sg-section-header h1 {
margin: 0 0 var(--sg-space-3);
}

.sg-section-header p {
margin: 0;
}

.sg-section-grid {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
gap: var(--sg-space-5);
max-width: 900px;
margin: 0 auto;
}

.sg-muted {
color: var(--sg-color-muted);
}
</style>
