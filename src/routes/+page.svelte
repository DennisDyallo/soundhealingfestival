<script lang="ts">
import { onMount } from "svelte";
import GeneratedHtmlContent from "$lib/components/content/GeneratedHtmlContent.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();

onMount(() => {
	const candidates = Array.from(
		document.querySelectorAll<HTMLElement>(
			'[id^="comp-"]:not([data-motion-enter="done"])',
		),
	).filter((element) => {
		const styles = getComputedStyle(element);
		return styles.animation.includes("motion-") || styles.opacity === "0";
	});

	if (candidates.length === 0) {
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) {
					continue;
				}
				const element = entry.target as HTMLElement;
				element.setAttribute("data-motion-enter", "done");
				observer.unobserve(element);
			}
		},
		{ rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
	);

	for (const element of candidates) {
		observer.observe(element);
	}

	return () => observer.disconnect();
});
</script>

<GeneratedHtmlContent html={data.pageHtml} />
