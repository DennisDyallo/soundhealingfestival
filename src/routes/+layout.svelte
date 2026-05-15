<script lang="ts">
import { seo } from "$lib/content/seo";

let { children } = $props();
const scriptCloseTag = "<" + "/script>";
const structuredDataTags = seo.structuredData
	.map(
		(schema) =>
			`<script type="application/ld+json">${JSON.stringify(schema).replaceAll(scriptCloseTag, "<\\/script>")}${scriptCloseTag}`,
	)
	.join("");
</script>

<svelte:head>
	<link rel="stylesheet" href="/design-tokens.css" />
	<link rel="stylesheet" href="/wix.css" />
	<title>{seo.title}</title>
	{#if seo.description}
		<meta name="description" content={seo.description} />
	{/if}
	{#if seo.canonical}
		<link rel="canonical" href={seo.canonical} />
	{/if}
	{#if seo.favicon}
		<link rel="icon" href={seo.favicon} />
	{/if}
	{#if seo.appleTouchIcon}
		<link rel="apple-touch-icon" href={seo.appleTouchIcon} />
	{/if}
	{#if seo.ogTitle}
		<meta property="og:title" content={seo.ogTitle} />
	{/if}
	{#if seo.ogDescription}
		<meta property="og:description" content={seo.ogDescription} />
	{/if}
	{#if seo.ogImage}
		<meta property="og:image" content={seo.ogImage} />
	{/if}
	{#if seo.ogUrl}
		<meta property="og:url" content={seo.ogUrl} />
	{/if}
	{#if seo.ogSiteName}
		<meta property="og:site_name" content={seo.ogSiteName} />
	{/if}
	{#if seo.ogType}
		<meta property="og:type" content={seo.ogType} />
	{/if}
	{#if seo.ogImageWidth}
		<meta property="og:image:width" content={seo.ogImageWidth} />
	{/if}
	{#if seo.ogImageHeight}
		<meta property="og:image:height" content={seo.ogImageHeight} />
	{/if}
	{#if seo.twitterCard}
		<meta name="twitter:card" content={seo.twitterCard} />
	{/if}
	{#if seo.twitterTitle}
		<meta name="twitter:title" content={seo.twitterTitle} />
	{/if}
	{#if seo.twitterDescription}
		<meta name="twitter:description" content={seo.twitterDescription} />
	{/if}
	{#if seo.twitterImage}
		<meta name="twitter:image" content={seo.twitterImage} />
	{/if}
	{@html structuredDataTags}
</svelte:head>

{@render children()}
