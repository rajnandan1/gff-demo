<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select';
	import { mypgstore } from '$lib/stores.js';
	import { goto } from '$app/navigation';
	import { base } from '$app/paths';


	let email = '';
	let phone = '';
	let company = '';
	let favoritePGs = [];

	let pgs = [
		{
			logo: 'cf.png',
			name: 'cf',
			selected: false,
			display: 'Cashfree'
		},
		{
			logo: 'payu.png',
			name: 'payu',
			selected: false,
			display: 'Payu'
		},
		{
			logo: 'stripe.png',
			name: 'stripe',
			selected: false,
			display: 'Stripe'
		},
		{
			logo: 'rzp.png',
			name: 'rzp',
			selected: false,
			display: 'Razorpay'
		},
		{
			logo: 'tpsl.png',
			name: 'tpsl',
			selected: false,
			display: 'Techprocess'
		},
		{
			logo: 'ccavenue.png',
			name: 'ccavenue',
			selected: false,
			display: 'CCAVENUE'
		},
		{
			logo: 'paytm.png',
			name: 'paytm',
			selected: false,
			display: 'Paytm'
		},
		{
			logo: 'phonepe.png',
			name: 'phonepe',
			selected: false,
			display: 'PhonePe'
		},
		{
			logo: 'atom.png',
			name: 'atom',
			selected: false,
			display: 'Atom'
		},
		{
			logo: 'lyra.png',
			name: 'lyra',
			selected: false,
			display: 'Lyra'
		}
	];
	function formSubmit() {
		$mypgstore = favoritePGs;
		goto(base+'/home/insights');
	}
</script>

<div class="flex h-svh overflow-hidden bg-white">
	<div class="basis-2/5">
		<div class="flex items-center justify-center py-12">
			<div class="mx-auto grid w-[350px] gap-6">
				<div class="grid gap-2 text-center">
					<img src="flowlogo.svg" class="  mx-auto inline" alt="" />
					<h1 class="text-3xl font-bold">Flowwise Demo</h1>
					<p class="text-balance text-muted-foreground">
						Enter details to experience the power of Flowwise
					</p>
				</div>
				<form on:submit|preventDefault={formSubmit}>
					<div class="grid gap-4">
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								class="rounded"
								bind:value={email}
								required
							/>
						</div>
						<div class="grid gap-2">
							<Label for="phone">Phone Number</Label>
							<Input
								id="phone"
								type="text"
								bind:value={phone}
								placeholder="8474090589"
								class="rounded"
								required
							/>
						</div>
						<div class="grid gap-2">
							<Label for="company">Company</Label>
							<Input
								id="company"
								type="text"
								bind:value={company}
								class="rounded"
								placeholder="Acme Corp"
								required
							/>
						</div>
						<div class="grid gap-2">
							<Label for="gt">Gateways</Label>
							<Select.Root
								id="gt"
								portal={null}
								items={pgs}
								multiple={true}
								bind:selected={favoritePGs}
							>
								<Select.Trigger class="rounded">
									<Select.Value placeholder="Select your gateways" />
								</Select.Trigger>
								<Select.Content class="w-full rounded">
									<Select.Group>
										<Select.Label>Gateway</Select.Label>
										{#each pgs as pg}
											<Select.Item value={pg.name} label={pg.display}>
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
						<Button type="submit" class="w-full rounded">Start Demo</Button>
					</div>
				</form>
			</div>
		</div>
	</div>
	<div class="relative basis-3/5 bg-[#130951]">
		<div class="">
			<h2 class="mt-24 px-12 text-2xl font-medium text-white">
				Boost Success Rates by as much as 10%,<br /> save 5% on transaction costs today!
			</h2>
		</div>
		<div class="my-12 grid grid-cols-12 gap-4 px-12 text-white">
			<div class="col-span-2 text-center">
				<img
					src="https://flowwise.com/wp-content/uploads/2023/12/1686552932.svg"
					alt=""
					srcset=""
					class="m-0 inline-block h-16"
				/>
				<h3 class="text-sm font-medium">Expertise at your fingertips</h3>
			</div>
			<div class="col-span-2 text-center">
				<img
					src="https://flowwise.com/wp-content/uploads/2023/12/1686552936.svg"
					alt=""
					srcset=""
					class="m-0 inline-block h-16"
				/>
				<h3 class="text-sm font-medium">20% Growth in Revenue</h3>
			</div>
			<div class="col-span-2 text-center">
				<img
					src="https://flowwise.com/wp-content/uploads/2023/12/1686552924.svg"
					alt=""
					srcset=""
					class="m-0 inline-block h-16"
				/>
				<h3 class="text-sm font-medium">Cloud Native Orchestration</h3>
			</div>
			<div class="col-span-2 text-center">
				<img
					src="https://flowwise.com/wp-content/uploads/2023/12/1686552935.svg"
					alt=""
					srcset=""
					class="m-0 inline-block h-16"
				/>
				<h3 class="text-sm font-medium">Completely Customisable</h3>
			</div>
		</div>
		<div class="my-12 grid grid-cols-12 gap-4 px-12 text-white">
			<div class="col-span-3 rounded-sm bg-[#312866] px-6 py-4">
				<h3 class="text-normal font-medium">10%</h3>
				<p class="mt-2 text-xs">Higher Success Rate</p>
			</div>
			<div class="col-span-3 rounded-sm bg-[#312866] px-6 py-4">
				<h3 class="text-normal font-medium">10%</h3>
				<p class="mt-2 text-xs">Lower MDR</p>
			</div>
			<div class="col-span-3 rounded-sm bg-[#312866] px-6 py-4">
				<h3 class="text-normal font-medium">5%</h3>
				<p class="mt-2 text-xs">Save On</p>
			</div>
		</div>
		<div class="absolute -bottom-4 left-0 right-0 w-full">
			<img
				src="https://i0.wp.com/flowwise.com/wp-content/uploads/2023/12/The-only-integration-youll-ever-need.png?w=1063&ssl=1"
				alt=""
				class="w-5/12"
			/>
		</div>
		<div class="absolute bottom-0 right-0">
			<img src="wave.svg" alt="" srcset="" class="w-[400px]" />
		</div>
		<div class="absolute bottom-0 right-0">
			<img src="rocket.svg" alt="" class="w-[400px]" srcset="" />
		</div>
	</div>
</div>

<style>
</style>
