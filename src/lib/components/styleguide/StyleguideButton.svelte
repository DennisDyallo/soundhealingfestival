<script lang="ts">
import type { Snippet } from "svelte";

type ButtonVariant = "primary" | "secondary";
type ButtonType = "button" | "submit" | "reset";

type Props = {
	children?: Snippet;
	variant?: ButtonVariant;
	type?: ButtonType;
	disabled?: boolean;
};

let {
	children,
	variant = "primary",
	type = "button",
	disabled = false,
}: Props = $props();
</script>

<button type={type} class={`sg-button sg-button-${variant}`} {disabled}>
{@render children?.()}
</button>

<style>
.sg-button {
border-radius: var(--sg-border-radius-sm);
font: inherit;
padding: var(--sg-space-3) var(--sg-space-4);
border: 1px solid transparent;
cursor: pointer;
}

.sg-button-primary {
background: var(--sg-color-primary);
color: var(--sg-color-primary-contrast);
}

.sg-button-secondary {
background: var(--sg-color-surface);
color: var(--sg-color-text);
border-color: #d0d0d0;
}
</style>
