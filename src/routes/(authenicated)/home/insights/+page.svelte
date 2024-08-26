<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import SRCHART from "$lib/components/srchart.svelte";
	import Fee from "$lib/components/fee.svelte";
	import GMV from "$lib/components/gmv.svelte";
	import Settlement from "$lib/components/settlement.svelte";
	import Refund from "$lib/components/refund.svelte";
	import Error from "$lib/components/error.svelte";
	import Loader from "$lib/components/loader.svelte";
	import Summarize from "$lib/components/summarize.svelte";
	import { Checkbox } from "$lib/components/ui/checkbox";
	import { Label } from "$lib/components/ui/label";
	import { onMount } from "svelte";
	import { Button } from "$lib/components/ui/button";
	import { mypgstore } from "$lib/stores.js";
	import { getRandomInt } from "$lib/tools/chart";

	import {
		TrendingUp,
		WandSparkles,
		Sparkles,
		Percent,
		ChartNoAxesColumn,
		HandCoins,
		Undo2,
		FileWarning
	} from "lucide-svelte";

	let pgs = [
		{
			logo: "cf.png",
			name: "cf",
			selected: false,
			display: "Cashfree"
		},
		{
			logo: "payu.png",
			name: "payu",
			selected: false,
			display: "Payu"
		},
		{
			logo: "stripe.png",
			name: "stripe",
			selected: false,
			display: "Stripe"
		},
		{
			logo: "rzp.png",
			name: "rzp",
			selected: false,
			display: "Razorpay"
		},
		{
			logo: "tpsl.png",
			name: "tpsl",
			selected: false,
			display: "Techprocess"
		},
		{
			logo: "ccavenue.png",
			name: "ccavenue",
			selected: false,
			display: "CCAVENUE"
		},
		{
			logo: "paytm.png",
			name: "paytm",
			selected: false,
			display: "Paytm"
		},
		{
			logo: "phonepe.png",
			name: "phonepe",
			selected: false,
			display: "PhonePe"
		},
		{
			logo: "atom.png",
			name: "atom",
			selected: false,
			display: "Atom"
		},
		{
			logo: "lyra.png",
			name: "lyra",
			selected: false,
			display: "Lyra"
		}
	];
	let mypgs = $mypgstore;
	let showLoader = false;
	pgs = pgs.map((pg) => {
		let pgd = mypgs.find((mypg) => mypg.value === pg.name);

		if (pgd) {
			pg.selected = true;
		}
		return pg;
	});

	//implement wait using setTimeout as promise
	function wait(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}

	async function selectPG(i) {
		showLoader = true;
		await wait(getRandomInt(2000, 4000));
		showLoader = false;
		mypgs = pgs.filter((pg) => pg.selected);
	}
	onMount(() => {
		selectPG();
	});
</script>

<div id="header" class="  z-50 w-full p-4 pb-0 pt-4 backdrop-blur">
	<h1 class="text-3xl font-semibold">
		<span
			class="bg-gradient-to-l from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
		>
			Insights AI
		</span>
	</h1>
	<p class="mb-0 text-sm text-neutral-500">
		Welcome to the Insights AI page. Discover Insights on the gateways you have using Insights
		AI.
	</p>
</div>

<div id="header" class="sticky top-0 z-40 mb-4 w-full border-b p-4 pb-0 pt-4 backdrop-blur">
	<div class="grid grid-cols-12 gap-4">
		<div class="col-span-10">
			<div class="my-4 flex flex-nowrap gap-4 overflow-x-auto pb-4">
				{#each pgs as pg, i}
					<Checkbox
						id={pg.name}
						class="h-4 w-4 "
						bind:checked={pg.selected}
						aria-labelledby="terms-{pg.name}"
					/>
					<Label
						id="terms-{pg.name}"
						for={pg.name}
						class="-ml-3 mr-2 cursor-pointer text-sm font-medium leading-5 text-slate-700 transition-all duration-75 active:scale-95 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
					>
						{pg.display}
					</Label>
				{/each}
			</div>
		</div>
		<div class="col-span-2 pt-[7px]">
			<Button class="relative w-full" on:click={selectPG}>
				<Sparkles class="absolute left-2 inline h-4 text-yellow-500" />
				Generate Insights
			</Button>
		</div>
	</div>
</div>

{#if mypgs.filter((pg) => pg.selected).length > 0}
	<Summarize pgs={mypgs} />
	<div class="grid grid-cols-7 items-stretch gap-4 px-4">
		<div class="col-span-4 flex flex-col">
			<Card.Root class="flex-1">
				<Card.Header class="border-b">
					<Card.Title class="text-sm font-medium text-slate-700">
						<TrendingUp class="inline h-4 text-purple-500" />
						Success Rate
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-2 pt-4">
					<SRCHART pgs={mypgs} />
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-3 flex flex-col">
			<Card.Root class="flex-1">
				<Card.Header class="border-b">
					<Card.Title class="text-sm font-medium">
						<Percent class="inline h-4 text-purple-500" />
						Fee Distribution
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-2 pt-4">
					<Fee pgs={mypgs} />
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-7">
			<Card.Root>
				<Card.Header class="border-b">
					<Card.Title class="text-sm font-medium">
						<ChartNoAxesColumn class="inline h-4 text-purple-500" />
						Transaction Details
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-2 py-0 pr-0">
					<GMV pgs={mypgs} />
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-7">
			<Card.Root>
				<Card.Header class="border-b">
					<Card.Title class="text-sm font-medium">
						<HandCoins class="inline h-4 text-purple-500" />
						Settlement Details
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-2 py-0 pr-0">
					<Settlement pgs={mypgs} />
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-4 flex flex-col">
			<Card.Root class="flex-1">
				<Card.Header class="border-b">
					<Card.Title class="text-sm font-medium">
						<Undo2 class="inline h-4 text-purple-500" />
						Refund Insights
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-2 pt-4">
					<Refund pgs={mypgs} />
				</Card.Content>
			</Card.Root>
		</div>
		<div class="col-span-3 flex flex-col">
			<Card.Root class="flex-1">
				<Card.Header class="border-b">
					<Card.Title class="text-sm font-medium">
						<FileWarning class="inline h-4 text-purple-500" />
						Error Insights
					</Card.Title>
				</Card.Header>
				<Card.Content class="px-0 pt-4">
					<Error pgs={mypgs} />
				</Card.Content>
			</Card.Root>
		</div>
	</div>
{/if}
{#if showLoader}
	<div class="fixed left-0 top-0 z-50 h-svh w-svw bg-blue-100 bg-opacity-5 backdrop-blur">
		<div class="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
			<Loader class="" />
		</div>
	</div>
{/if}

<!-- HTML !-->

<style>
	.button-2 {
		border-radius: 24px;
		border-width: 1px;
		background-color: #fff;
		border-color: #eee;
		color: #333333;
		cursor: pointer;
		display: inline-block;
		font-size: 14px;
		font-weight: 500;
		line-height: 20px;
		list-style: none;
		margin: 0;
		padding: 8px 8px;
		text-align: center !important;
		transition: all 200ms;
		vertical-align: baseline;
		white-space: nowrap;
		user-select: none;
		-webkit-user-select: none;
		touch-action: manipulation;
		box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;
	}
	.button-2.bordered {
		border-color: #6146e9;
		background-color: #fff;
	}
	.button-2 img {
		margin: 0 auto;
	}
</style>
