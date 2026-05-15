<script lang="ts">
import StyleguideButton from "$lib/components/styleguide/StyleguideButton.svelte";
import StyleguideCard from "$lib/components/styleguide/StyleguideCard.svelte";
import StyleguideSection from "$lib/components/styleguide/StyleguideSection.svelte";
</script>

<svelte:head>
<title>Project Styleguide | Sound Healing Festival Stockholm</title>
</svelte:head>

<main class="sg-root">
<StyleguideSection
variant="header"
title="Project Styleguide"
description="This page is the shared visual sandbox for developers, designers, and agents."
/>

<StyleguideSection variant="grid">
<StyleguideCard
title="Typography"
description="Use the tokenized stack for body and interface text to keep rendering consistent."
/>

<StyleguideCard title="Buttons">
<div class="sg-button-row">
<StyleguideButton>Primary action</StyleguideButton>
<StyleguideButton variant="secondary">Secondary action</StyleguideButton>
</div>
</StyleguideCard>

<StyleguideCard title="Spacing">
<div class="sg-spacing-stack">
<div class="sg-spacing-block sg-spacing-3">space-3</div>
<div class="sg-spacing-block sg-spacing-4">space-4</div>
<div class="sg-spacing-block sg-spacing-5">space-5</div>
</div>
</StyleguideCard>
</StyleguideSection>
</main>

<style>
.sg-root {
font-family: var(--sg-font-sans);
background: var(--sg-color-bg);
color: var(--sg-color-text);
min-height: 100vh;
padding: var(--sg-space-6);
}

.sg-button-row {
display: flex;
gap: var(--sg-space-3);
flex-wrap: wrap;
}

.sg-spacing-stack {
display: grid;
gap: var(--sg-space-3);
}

.sg-spacing-block {
background: #f1f1f1;
border-radius: var(--sg-border-radius-sm);
padding-inline: var(--sg-space-4);
display: grid;
align-items: center;
}

.sg-spacing-3 {
height: calc(var(--sg-space-3) * 3);
}

.sg-spacing-4 {
height: calc(var(--sg-space-4) * 3);
}

.sg-spacing-5 {
height: calc(var(--sg-space-5) * 2);
}
</style>
