<script>
	import RuleBasic from "$lib/components/rule-basic.svelte";
	import RuleDetails from "$lib/components/rule-details.svelte";
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import { Button } from "$lib/components/ui/button";
	import { getRandomInt } from "$lib/tools/chart";
	import configurations from "$lib/data/configurations.json?raw";
	import { Input } from "$lib/components/ui/input";
	import { Sparkles } from "lucide-svelte";
	import LoaderCircle from "lucide-svelte/icons/loader-circle";

	let allConfigs = JSON.parse(configurations);
	let showLoader = false;
	let rulesAll = [
		{
			ruleName: "My Rule Basic",
			randomGt: [
				getRandomInt(0, allConfigs.length - 1),
				getRandomInt(0, allConfigs.length - 1),
				getRandomInt(0, allConfigs.length - 1)
			],
			randomRules: [0, 1, 2]
		},
		{
			ruleName: "Simple Custom Rule",
			randomGt: [
				getRandomInt(0, allConfigs.length - 1),
				getRandomInt(0, allConfigs.length - 1)
			],
			randomRules: [4, 8, 12]
		},
		{
			ruleName: "Sample logic",
			randomGt: [
				getRandomInt(0, allConfigs.length - 1),
				getRandomInt(0, allConfigs.length - 1)
			],
			randomRules: [14, 7, 12, 10]
		},
		{
			ruleName: "Cool logic",
			randomGt: [
				getRandomInt(0, allConfigs.length - 1),
				getRandomInt(0, allConfigs.length - 1)
			],
			randomRules: [3]
		}
	];
	function wait(ms) {
		return new Promise((resolve) => {
			setTimeout(resolve, ms);
		});
	}
	function shuffleArray(array) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}
	async function aiRule() {
		showLoader = true;
		await wait(getRandomInt(2000, 4000));
		showLoader = false;
		rulesAll = [
			{
				ruleName: "Flowwise AI Rule 1",
				randomGt: [
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1)
				],
				randomRules: shuffleArray([0, 1, 2, 3, 4, 5])
			},
			{
				ruleName: "Flowwise AI Rule 2",
				randomGt: [
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1),
					getRandomInt(0, allConfigs.length - 1)
				],
				randomRules: shuffleArray([6, 8, 12, 11, 10, 13, 14, 15])
			}
		];
	}
	// aiRule();
	let aiText =
		"Generate a rule based on previous 7 days volume and success rate. The success rate should be greater than 90%";
</script>

<div id="header" class="sticky top-0 z-50 w-full border-b p-4 pb-0 pt-4 backdrop-blur">
	<h1 class="text-3xl font-semibold">
		<span
			class="bg-gradient-to-l from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
		>
			Configurations
		</span>
	</h1>
	<p class="mb-4 text-sm text-neutral-500">Add Configurations to route your transactions here.</p>
</div>
<div class="p-4">
	<Card.Root class="mb-8 bg-gradient-to-r from-violet-600 to-indigo-600">
		<Card.Content class="typewriter relative p-0 pl-8">
			<Sparkles class="absolute left-4 top-5 h-6 w-6 text-yellow-200 opacity-100" />
			<Input
				rows="1"
				bind:value={aiText}
				class="h-16 border-none bg-transparent text-sm font-medium text-white focus:border-none focus:ring-0 focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
			/>
			<Button class="absolute right-4 top-3" on:click={aiRule}>
				{#if showLoader}
					<LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
				{/if}
				Use AI
			</Button>
		</Card.Content>
	</Card.Root>
	<div class="grid gap-4">
		{#each rulesAll as rule, i}
			<div>
				<RuleDetails {...rule} priority={i} />
			</div>
		{/each}
	</div>
</div>
