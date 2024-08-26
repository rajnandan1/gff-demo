<script>
	import * as Card from "$lib/components/ui/card";
	import * as Popover from "$lib/components/ui/popover";
	import { ChevronDown, SquarePlus } from "lucide-svelte";
	import { Button } from "$lib/components/ui/button";
	import { Input } from "$lib/components/ui/input";
	import configurations from "$lib/data/configurations.json?raw";
	import rightSideMapRaw from "$lib/data/rightSideMap.json?raw";
	import { base } from "$app/paths";
	import { Label } from "$lib/components/ui/label";
	import { getRandomInt } from "$lib/tools/chart";
	import { onMount } from "svelte";

	let leftSide = [
		"Order Amount",
		"Order Currency",
		"Payment Method",
		"Card Country",
		"Card Bin",
		"Card Type",
		"Card Brand",
		"Card Issuer",
		"Wallet Provider",
		"UPI Mode",
		"GMV in a Day",
		"GMV in a Week",
		"GMV in a Month",
		"User ID",
		"User State",
		"User Defined Field"
	];
	let andOr = ["AND", "OR"];
	let operators = [
		"is",
		"is not",
		"contains",
		"does not contain",
		"starts with",
		"ends with",
		"is greater than",
		"is less than",
		"is between",
		"is not between"
	];
	let rightSideMap = JSON.parse(rightSideMapRaw);
	let routingTypes = [
		"Success Rate Based Routing",
		"Volume  Based Routing",
		"Volume + Success Rate Based Routing"
	];
	let rules = [];
	let isReady = false;

	let allConfigs = JSON.parse(configurations);
	allConfigs = allConfigs.map(function (elem) {
		elem.volume = 0;
		return elem;
	});
	let routing = routingTypes[getRandomInt(0, routingTypes.length - 1)];
	let configs = [];

	function appendToGateways(config) {
		if (!configs.includes(config)) {
			configs = [...configs, config];
		} else {
			configs = configs.filter((cn) => cn !== config);
		}
		let total = configs.length;
		configs = configs.map((cn) => {
			cn.volume = (100 / total).toFixed(2) + "%";
			return cn;
		});
	}

	export let ruleName = "GFF Transaction Routing";
	export let randomGt = [0, 2];
	export let randomRules = [0, 1];
	export let priority = 1;

	$: {
		if (isReady) {
			rules = [];
			configs = [];
			routing = routingTypes[getRandomInt(0, routingTypes.length - 1)];
			for (let i = 0; i < randomGt.length; i++) {
				appendToGateways(allConfigs[randomGt[i]]);
			}
			for (let i = 0; i < randomRules.length; i++) {
				addNewRule(randomRules[i]);
			}
		}
	}

	onMount(() => {
		for (let i = 0; i < randomGt.length; i++) {
			appendToGateways(allConfigs[randomGt[i]]);
		}
		for (let i = 0; i < randomRules.length; i++) {
			addNewRule(randomRules[i]);
		}
		isReady = true;
	});

	function addNewRule(randInt) {
		if (randInt == -1) {
			randInt = getRandomInt(0, leftSide.length - 1);
		}
		//if rule exists then return

		let lt = leftSide[randInt];
		if (rules.length == 0) {
			rules = [
				{
					leftSide: lt,
					operator: "is",
					rightSide: rightSideMap[lt],
					type: "text"
				}
			];
		} else {
			rules = [
				...rules,
				{
					value: randInt % 2 == 0 ? "AND" : "OR",
					type: "cond"
				},
				{
					leftSide: lt,
					operator: "is",
					rightSide: rightSideMap[lt],
					type: "text"
				}
			];
		}
	}
</script>

<Card.Root>
	<Card.Header class="border-b">
		<div class="grid grid-cols-2">
			<div class="col-span-1">
				<div class="flex w-full max-w-sm flex-col gap-1.5">
					<Input
						type="text"
						id="r1name"
						placeholder="Rule Name"
						class="border-none pl-0 text-lg font-medium focus:border-none focus:ring-0 focus-visible:ring-0 active:ring-0"
						bind:value={ruleName}
					/>
				</div>
			</div>
			<div class="col-span-1 pt-1 text-right">
				<Card.Title tag="h6" class="text-md font-medium text-gray-500"
					>Priority #{priority + 1}</Card.Title
				>
			</div>
		</div>
	</Card.Header>
	<Card.Content class="pt-2">
		<div class="flex flex-wrap text-sm font-medium leading-8">
			<div class="font-medium">When</div>
			{#each rules as rule}
				{#if rule.type === "text"}
					<div class="px-1">
						<Popover.Root>
							<Popover.Trigger class="text-sm font-medium text-indigo-500">
								{rule.leftSide}
								<ChevronDown class="-ml-1 inline" size="16" />
							</Popover.Trigger>
							<Popover.Content class="w-fit p-1">
								<ul>
									{#each leftSide as side}
										<li class="text-sm font-medium">
											<Button
												class="w-full justify-start"
												variant="ghost"
												on:click={() => {
													rule.leftSide = side;
													rule.rightSide = rightSideMap[side];
												}}>{side}</Button
											>
										</li>
									{/each}
								</ul>
							</Popover.Content>
						</Popover.Root>
					</div>
					<div class="px-1">
						<Popover.Root>
							<Popover.Trigger class="font-medium text-pink-500">
								{rule.operator}
								<ChevronDown class="-ml-1 inline" size="16" />
							</Popover.Trigger>
							<Popover.Content class="w-fit p-1">
								<ul>
									{#each operators as operator}
										<li class="text-sm font-medium">
											<Button
												class="w-full justify-start"
												variant="ghost"
												on:click={() => (rule.operator = operator)}
												>{operator}</Button
											>
										</li>
									{/each}
								</ul>
							</Popover.Content>
						</Popover.Root>
					</div>
					<div class="px-1">
						<Popover.Root>
							<Popover.Trigger class="font-medium text-cyan-500">
								{rule.rightSide.value}
								<ChevronDown class="-ml-1 inline" size="16" />
							</Popover.Trigger>
							<Popover.Content class="w-fit p-1">
								{#if rule.rightSide.type === "number"}
									<Input
										type="number"
										placeholder="enter value"
										bind:value={rule.rightSide.value}
										class="max-w-xs"
									/>
								{:else if rule.rightSide.type === "text"}
									<Input
										type="text"
										placeholder="enter value"
										bind:value={rule.rightSide.value}
										class="max-w-xs"
									/>
								{:else if rule.rightSide.type === "select"}
									<ul>
										{#each rule.rightSide.options as option}
											<li class="text-sm font-medium">
												<Button
													class="w-full justify-start"
													variant="ghost"
													on:click={() => (rule.rightSide.value = option)}
													>{option}</Button
												>
											</li>
										{/each}
									</ul>
								{/if}
							</Popover.Content>
						</Popover.Root>
					</div>
				{:else if rule.type === "cond"}
					<div class="px-1 {rule.value}">
						<Popover.Root>
							<Popover.Trigger class="font-medium text-lime-500">
								{rule.value}
								<ChevronDown class="-ml-1 inline" size="16" />
							</Popover.Trigger>
							<Popover.Content class="w-fit p-1">
								<ul>
									{#each andOr as operator}
										<li class="text-sm font-medium">
											<Button
												class="w-full justify-start"
												variant="ghost"
												on:click={() => (rule.value = operator)}
												>{operator}</Button
											>
										</li>
									{/each}
								</ul>
							</Popover.Content>
						</Popover.Root>
					</div>
				{/if}
			{/each}
			<div>
				<Button
					variant="ghost"
					class="h-8 w-8 "
					size="icon"
					on:click={(e) => {
						addNewRule(-1);
					}}
				>
					<SquarePlus class="h-4 w-4" />
				</Button>
			</div>
			<div class="w-full"></div>
			<div class="">then do</div>
			<div class="px-1">
				<Popover.Root>
					<Popover.Trigger class="font-medium text-purple-500">
						{routing}
						<ChevronDown class="-ml-1 inline" size="16" />
					</Popover.Trigger>
					<Popover.Content class="w-fit p-1">
						<ul>
							{#each routingTypes as type}
								<li class="text-sm font-medium">
									<Button
										class="w-full justify-start"
										variant="ghost"
										on:click={() => (routing = type)}>{type}</Button
									>
								</li>
							{/each}
						</ul>
					</Popover.Content>
				</Popover.Root>
			</div>
			<div>between</div>
			<div class="w-full px-1">
				<Popover.Root>
					<Popover.Trigger class="font-medium text-rose-500">
						{#each configs as selConf}
							<span class="mr-2">
								<img
									class="mr-1 inline-block h-6 rounded-sm border p-1"
									src="{base}/{selConf.gatewayLogo}"
									alt={selConf.gateway}
								/>
								{selConf.gatewayId}
								{#if routing == "Volume  Based Routing" || routing == "Volume + Success Rate Based Routing"}
									with
									<Input
										type="text"
										class="inline-block h-8 w-16 border-none p-1 text-slate-600 focus:border-none focus:ring-0 focus-visible:shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 active:ring-0"
										placeholder="10"
										bind:value={selConf.volume}
										on:click={(e) => {
											e.stopPropagation();
										}}
									/>
									volume
								{/if}
							</span>
						{/each}
						<ChevronDown class="-ml-1 inline" size="16" />
					</Popover.Trigger>
					<Popover.Content class="w-fit p-1">
						<ul>
							{#each allConfigs as cn}
								<li class="text-sm font-medium">
									<Button
										class="w-full justify-start text-xs"
										variant="ghost"
										on:click={(e) => {
											appendToGateways(cn);
										}}
									>
										<img
											class="mr-1 inline-block h-6 rounded-sm border p-1"
											src="{base}/{cn.gatewayLogo}"
											alt={cn.gateway}
										/>
										{cn.gatewayId}
									</Button>
								</li>
							{/each}
						</ul>
					</Popover.Content>
				</Popover.Root>
			</div>
		</div>
	</Card.Content>
</Card.Root>

<style>
	.OR {
		width: 100%;
	}
</style>
