<script lang="ts">
	import * as Card from "$lib/components/ui/card";
	import { Label } from "$lib/components/ui/label";
	import * as RadioGroup from "$lib/components/ui/radio-group";
	import * as Select from "$lib/components/ui/select";
	import { base } from "$app/paths";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Textarea } from "$lib/components/ui/textarea";
	import { Button } from "$lib/components/ui/button/index.js";

	let favoritePGs = [];

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
</script>

<Card.Root>
	<Card.Header>
		<Card.Title tag="h6">Add Gateway Details</Card.Title>
		<Card.Description
			>Once Gateway added, details cannot be modified further. Please provide correct details.
			To know more read doc</Card.Description
		>
	</Card.Header>
	<Card.Content class="max-w-[500px]">
		<p class="mb-4 text-xs text-gray-500">Select Gateway Environment</p>
		<div>
			<RadioGroup.Root value="production">
				<div class="mb-1 flex items-center space-x-2">
					<RadioGroup.Item value="production" id="production" />
					<Label for="production">Production</Label>
				</div>
				<div class="flex items-center space-x-2">
					<RadioGroup.Item value="sandbox" id="sandbox" />
					<Label for="sandbox">Sandbox</Label>
				</div>
			</RadioGroup.Root>
		</div>
		<div class="col-span-1 grid">
			<div class="mt-4">
				<Label for="gt" class="text-xs text-gray-500">Payment Gateway</Label>
				<Select.Root id="gt" portal={null} items={pgs} bind:selected={favoritePGs}>
					<Select.Trigger class="rounded">
						<Select.Value placeholder="Select a gateway" />
					</Select.Trigger>
					<Select.Content class="w-full rounded">
						<Select.Group>
							{#each pgs as pg}
								<Select.Item>
									<div class="flex items-center gap-2">
										<img src="{base}/{pg.logo}" alt="" class="h-3" />
										<span>{pg.display}</span>
									</div>
								</Select.Item>
							{/each}
						</Select.Group>
					</Select.Content>
				</Select.Root>
			</div>
			<div class="mt-4">
				<Label for="MID" class="text-xs text-gray-500">MID</Label>
				<Input id="MID" type="text" placeholder="client_id" class="rounded" required />
			</div>
			<div class="mt-4">
				<Label for="Secret" class="text-xs text-gray-500">Secret</Label>
				<Input id="Secret" type="password" placeholder="Secret" class="rounded" required />
			</div>
			<div class="mt-4">
				<Label for="refid" class="text-xs text-gray-500">Gateway Reference ID</Label>
				<Input
					id="refid"
					type="text"
					placeholder="Eg - CashfreeGateway_PROD"
					class="rounded"
					required
				/>
			</div>
			<div class="mt-4">
				<Label for="desc" class="text-xs text-gray-500">Gateway Reference ID</Label>
				<Textarea
					id="desc"
					type="text"
					placeholder="Eg - Cashfree Gateway PROD credentials Account 1"
					class="rounded"
					required
				/>
			</div>
		</div>
	</Card.Content>
	<Card.Footer class="max-w-[500px]">
		<Button type="submit" class="w-full rounded">Save and Go to Add Payment Methods</Button>
	</Card.Footer>
</Card.Root>
