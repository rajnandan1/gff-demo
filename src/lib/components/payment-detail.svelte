<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Label } from "$lib/components/ui/label";
	import { Checkbox } from "$lib/components/ui/checkbox/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import cards from "$lib/data/card.json?raw";
	import nb from "$lib/data/nb.json?raw";
	import wallet from "$lib/data/wallet.json?raw";
	import emi from "$lib/data/emi.json?raw";
	import paylater from "$lib/data/paylater.json?raw";

	let currentModes = [];

	function selectMode(method) {
		Object.keys(paymentMethods).forEach((key) => {
			paymentMethods[key].selected = false;
		});
		paymentMethods[method].selected = true;
		currentModes = paymentMethods[method].modes;
	}

	let paymentMethods = {
		cards: {
			display: "Cards",
			selected: true,
			modes: JSON.parse(cards)
		},
		upi: {
			display: "UPI",
			selected: false,
			modes: [
				{
					display: "Collect",
					selected: true
				},
				{
					display: "Intent",
					selected: true
				}
			]
		},
		netbanking: {
			display: "Netbanking",
			selected: false,
			modes: JSON.parse(nb)
		},
		wallets: {
			display: "Wallets",
			selected: false,
			modes: JSON.parse(wallet)
		},
		emi: {
			display: "EMI",
			selected: false,
			modes: JSON.parse(emi)
		},
		paylater: {
			display: "Pay Later",
			selected: false,
			modes: JSON.parse(paylater)
		}
	};
	currentModes = paymentMethods.cards.modes;
</script>

<Card.Root>
	<Card.Header class="border-b">
		<Card.Title>Add Payment Method</Card.Title>
		<Card.Description
			>Unselect all Payment methods that is not supported for Razorpay. Know more why we need
			this detail.</Card.Description
		>
	</Card.Header>
	<Card.Content class=" pt-6">
		<div class="grid grid-cols-6">
			<div class="col-span-2 border-r pr-6">
				{#each Object.keys(paymentMethods) as method}
					<div class="items-top mb-1 flex space-x-2">
						<Button
							variant={paymentMethods[method].selected ? "secondary" : "ghost"}
							class="w-full justify-start"
							on:click={(e) => {
								selectMode(method);
							}}
						>
							{paymentMethods[method].display}
						</Button>
					</div>
				{/each}
			</div>
			<div class="col-span-4 max-h-[500px] overflow-y-auto">
				<div class="grid grid-cols-2 gap-2 pl-6">
					{#each currentModes as mode}
						{#if mode.modes !== undefined}
							<div class="col-span-2 mb-2 flex items-center space-x-2">
								<Checkbox bind:checked={mode.selected} />
								<Label class="text-">{mode.display}</Label>
							</div>
							<div class="col-span-2 mb-4 grid grid-cols-2 gap-2 pl-6">
								{#each mode.modes as submode}
									<div
										class="col-span-1 overflow-hidden text-ellipsis whitespace-nowrap"
									>
										<Checkbox
											id={submode.display}
											bind:checked={submode.selected}
										/>
										<Label
											id="{submode.display}-label"
											for={submode.display}
											class="text-ellipsis text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
											>{submode.display}</Label
										>
									</div>
								{/each}
							</div>
						{:else}
							<div class="col-span-1 overflow-hidden text-ellipsis whitespace-nowrap">
								<Checkbox id={mode.display} bind:checked={mode.selected} />
								<Label
									id="{mode.display}-label"
									for={mode.display}
									class="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
									>{mode.display}</Label
								>
							</div>
						{/if}
					{/each}
				</div>
			</div>
		</div>
	</Card.Content>
	<Card.Footer>
		<Button type="submit" class="w-full rounded">Enable Selected Payment Methods</Button>
	</Card.Footer>
</Card.Root>
