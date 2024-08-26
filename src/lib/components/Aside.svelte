<script>
	import { TrendingUp, Sparkles, DoorOpen, Scale } from "lucide-svelte";
	import { base } from "$app/paths";
	import { page } from "$app/stores";

	let currentPath = "";
	$: {
		currentPath = $page.url.pathname;
	}
</script>

<div class="p-4">
	<img src="{base}/flowwb.svg" class="w-32" alt="" srcset="" />
</div>
<nav class="mt-6">
	<a
		href="{base}/home/insights"
		class="{currentPath.endsWith('/insights')
			? 'aside-sel'
			: ''} block px-4 py-2 text-sm font-medium text-slate-600"
	>
		<Sparkles class="left-2 top-[14px] inline-block h-4 text-slate-600" />
		Insights AI
	</a>
	<a
		href="{base}/home/gateways"
		class="{currentPath.endsWith('/gateways')
			? 'aside-sel'
			: ''} block px-4 py-2 text-sm font-medium text-slate-600"
	>
		<DoorOpen class="left-2 top-[14px] inline-block h-4 text-slate-600" />
		Gateways
	</a>
	<a
		href="{base}/home/rules"
		class="{currentPath.endsWith('/rules')
			? 'aside-sel'
			: ''} block px-4 py-2 text-sm font-medium text-slate-600"
	>
		<Scale class="left-2 top-[14px] inline-block h-4 text-slate-600" />
		<span class="inline-block"> Configurations </span>
	</a>
</nav>
