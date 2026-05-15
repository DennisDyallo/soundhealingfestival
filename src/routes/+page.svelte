<script lang="ts">
import GeneratedHtmlContent from "$lib/components/content/GeneratedHtmlContent.svelte";
import type { PageData } from "./$types";

let { data }: { data: PageData } = $props();
</script>

<GeneratedHtmlContent html={data.pageHtml} />
