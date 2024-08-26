<script>
	import * as Sheet from "$lib/components/ui/sheet";
	import * as Tabs from "$lib/components/ui/tabs";
	import * as Card from "$lib/components/ui/card";
	import GatewayDetails from "$lib/components/gateway-details.svelte";
	import PaymentDetail from "$lib/components/payment-detail.svelte";
	import * as Table from "$lib/components/ui/table";
	import { base } from "$app/paths";
	import { Label } from "$lib/components/ui/label";
	import { Switch } from "$lib/components/ui/switch";
	import { Input } from "$lib/components/ui/input";
	import { Button } from "$lib/components/ui/button";
	import { Settings, CheckCheck, Route, RouteOff } from "lucide-svelte";
	import { getRandomInt } from "$lib/tools/chart";
	import * as Tooltip from "$lib/components/ui/tooltip";
	import { Badge } from "$lib/components/ui/badge";

	let open = false;

	let pgData = [
		{
			createdAt: "22nd Aug 2024",
			gateway: "Cashfree",
			gatewayLogo: "cf.png",
			gatewayId: "Cashfree Test account 1848",
			env: "Sandbox",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: true
		},
		{
			createdAt: "14th Aug 2024",
			gateway: "Phonepe",
			gatewayLogo: "phonepe.png",
			gatewayId: "Phonepe UPI Test",
			env: "Sandbox",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: true
		},
		{
			createdAt: "22nd Aug 2024",
			gateway: "Cashfree",
			gatewayLogo: "cf.png",
			gatewayId: "😊 Cashfree Active account",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: true
		},
		{
			createdAt: "18th Aug 2024",
			gateway: "Payu",
			gatewayLogo: "payu.png",
			gatewayId: ">₹10,000 Per Order",
			env: "Sandbox",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: false
		},
		{
			createdAt: "9th Aug 2024",
			gateway: "Stripe",
			gatewayLogo: "stripe.png",
			gatewayId: "USD,EUR account",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: false
		},
		{
			createdAt: "18th Aug 2024",
			gateway: "Payu",
			gatewayLogo: "payu.png",
			gatewayId: "Main payu",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: true
		},
		{
			createdAt: "18th Aug 2024",
			gateway: "Paytm",
			gatewayLogo: "paytm.png",
			gatewayId: "TPV paytm",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: true
		},
		{
			createdAt: "15th Aug 2024",
			gateway: "Razorpay",
			gatewayLogo: "rzp.png",
			gatewayId: "razorpay new account",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: false,
			verified: true
		},
		{
			createdAt: "12th Aug 2024",
			gateway: "CCAVENUE",
			gatewayLogo: "ccavenue.png",
			gatewayId: "CCAVENUE ES account",
			env: "Sandbox",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: false
		},
		{
			createdAt: "9th Aug 2024",
			gateway: "Stripe",
			gatewayLogo: "stripe.png",
			gatewayId: "Stripe EU account",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true,
			verified: false
		},
		{
			createdAt: "14th Aug 2024",
			gateway: "Razorpay",
			gatewayLogo: "rzp.png",
			gatewayId: "Rzp temp account",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true
		},
		{
			createdAt: "14th Aug 2024",
			gateway: "tpsl",
			gatewayLogo: "tpsl.png",
			gatewayId: "TPSL Netbanking Only",
			env: "Production",
			successRate: getRandomInt(60, 88) + "%",
			active: true
		}
	];
</script>

<div id="header" class="sticky top-0 z-50 w-full border-b p-4 pb-0 pt-4 backdrop-blur">
	<h1 class="text-3xl font-semibold">
		<span
			class="bg-gradient-to-l from-purple-500 via-blue-500 to-indigo-500 bg-clip-text text-transparent"
		>
			Payment Gateways
		</span>
	</h1>
	<p class="mb-4 text-sm text-neutral-500">
		Add Payment Gateways here via which you want to route the payments.
	</p>
</div>

<div class="p-4">
	<Card.Root>
		<Card.Header>
			<div class="grid grid-cols-2">
				<div>
					<Input type="text" placeholder="search for a gateway" class="max-w-xs" />
				</div>
				<div>
					<Button
						class="float-right"
						on:click={() => {
							open = true;
						}}
					>
						Add New Gateway
					</Button>
				</div>
			</div>
		</Card.Header>
		<Card.Content class="px-0">
			<Table.Root>
				<Table.Caption>Payment Gateways configured at flowwise</Table.Caption>
				<Table.Header>
					<Table.Row>
						<Table.Head>Gateway</Table.Head>
						<Table.Head>Reference Name</Table.Head>
						<Table.Head>Creation Date</Table.Head>
						<!-- <Table.Head>Environment</Table.Head> -->
						<Table.Head>Success Rate</Table.Head>
						<Table.Head class="text-center">Status</Table.Head>
						<Table.Head></Table.Head>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each pgData as pg}
						<Table.Row class={!pg.active ? "strike-through opacity-55" : ""}>
							<Table.Cell class="text-sm font-semibold"
								><img
									src="{base}/{pg.gatewayLogo}"
									alt={pg.gateway}
									class="inline-block h-6 rounded-sm border p-1"
								/></Table.Cell
							>
							<Table.Cell class="text-sm">
								{#if pg.env == "Sandbox"}
									<Tooltip.Root>
										<Tooltip.Trigger>
											<RouteOff class="inline h-4 text-gray-300" />
										</Tooltip.Trigger>
										<Tooltip.Content class="text-xs font-medium">
											Sandbox
										</Tooltip.Content>
									</Tooltip.Root>
								{:else}
									<Tooltip.Root>
										<Tooltip.Trigger>
											<Route class="inline h-4 text-green-300" />
										</Tooltip.Trigger>
										<Tooltip.Content class="text-xs font-medium">
											Production
										</Tooltip.Content>
									</Tooltip.Root>
								{/if}

								{pg.gatewayId}
							</Table.Cell>
							<Table.Cell class="text-sm">{pg.createdAt}</Table.Cell>
							<!-- {#if pg.env == "Sandbox"}
								<Table.Cell class="text-sm  font-medium uppercase text-yellow-500"
									>{pg.env}</Table.Cell
								>
							{:else}
								<Table.Cell class="text-sm font-medium uppercase text-blue-500"
									>{pg.env}</Table.Cell
								>
							{/if} -->
							<Table.Cell class="text-sm">{pg.successRate}</Table.Cell>
							<Table.Cell class="text-center  uppercase">
								{#if pg.verified}
									<Tooltip.Root>
										<Tooltip.Trigger>
											<CheckCheck class="h-4 text-green-500" />
										</Tooltip.Trigger>
										<Tooltip.Content class="text-xs font-medium"
											>Verified</Tooltip.Content
										>
									</Tooltip.Root>
								{:else}
									<Button
										variant="outline"
										size="sm"
										class="p-2 text-xs uppercase">Verify</Button
									>
								{/if}
							</Table.Cell>
							<Table.Cell class="text-left text-sm">
								<div class="flex items-center space-x-2">
									<Switch id="a{pg.gatewayId}" bind:checked={pg.active} />

									<Button
										variant="ghost"
										size="icon"
										class="h-8 w-8"
										on:click={() => {
											open = true;
										}}
									>
										<Settings class="h-4" />
									</Button>
								</div>
							</Table.Cell>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		</Card.Content>
	</Card.Root>
</div>

<Sheet.Root bind:open>
	<Sheet.Content class="w-3xl sm:w-4xl lg:w-3xl max-w-3xl md:max-w-4xl lg:max-w-3xl">
		<Sheet.Header>
			<Sheet.Title>Configure a Gateway</Sheet.Title>
		</Sheet.Header>
		<div class="my-4 grid grid-cols-1">
			<Tabs.Root value="account" class="w-full">
				<Tabs.List class="w-full justify-start">
					<Tabs.Trigger value="account">Add Gateway Details</Tabs.Trigger>
					<Tabs.Trigger value="password">Add Payment Methods</Tabs.Trigger>
				</Tabs.List>
				<Tabs.Content value="account">
					<GatewayDetails />
				</Tabs.Content>
				<Tabs.Content value="password">
					<PaymentDetail />
				</Tabs.Content>
			</Tabs.Root>
		</div>
	</Sheet.Content>
</Sheet.Root>
