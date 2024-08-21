<script>
	import * as Card from '$lib/components/ui/card';
	import { getRandomInt } from '$lib/tools/chart';
	export let pgs;

	let paymentMethods = ['UPI', 'Cards', 'Netbanking', 'Wallets'];
	let errors = ['Bank Declined', 'User Declined', 'Wrong Instrument', 'Technical Error'];
	let totalCount = 0;
	let transactionData = {
		totalCount: 0,
		totalSum: 0,
		totalRefunded: 0
	};
	let mdr = 2.5;
	let successRate = 100;
	$: {
		totalCount = getRandomInt(300, 600) * pgs.length;
		paymentMethods = ['UPI', 'Cards', 'Netbanking', 'Wallets'];
		transactionData = {
			totalCount: totalCount,
			totalSum: getRandomInt(100, 999) * totalCount,
			totalRefunded: parseInt((getRandomInt(7, 15) * totalCount) / 100),
			totalRefundedSum: getRandomInt(10, 99) * totalCount
		};
		successRate = getRandomInt(6434, 8899);
		mdr = getRandomInt(8, 32) / 10;
	}
</script>

<div class="mb-4 grid grid-cols-8 items-stretch gap-4 px-4">
	<div class="col-span-4 flex flex-col">
		<Card.Root class="flex-1 overflow-hidden">
			<Card.Header class="border-b">
				<Card.Title class="text-sm font-medium">Transaction Insights</Card.Title>
			</Card.Header>
			<Card.Content class="px-2 py-4">
				<div class="flex flex-row gap-4 px-4">
					<div class="basis-1/3 border-r">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								{transactionData.totalCount.toLocaleString()}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Transaction Count </span>
					</div>
					<div class="basis-1/3 border-r">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								₹{transactionData.totalSum > 1000000
									? (transactionData.totalSum / 100000).toFixed(2) + 'L'
									: transactionData.totalSum.toLocaleString()}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Transaction Volume </span>
					</div>
					<div class="basis-1/3">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								{transactionData.totalRefunded.toLocaleString()}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Transaction Refunded </span>
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="h-16 bg-gray-100 p-4">
				<p class="text-xs leading-6">
					Highest volume of transactions was noted on {paymentMethods[getRandomInt(0, 3)]} & on gateway
					{pgs[getRandomInt(0, pgs.length - 1)].display} <br />
					Highest refunds were initiated via {pgs[getRandomInt(0, pgs.length - 1)].display}, {transactionData.totalRefunded.toLocaleString()}
					equaling ₹{transactionData.totalRefundedSum.toLocaleString()}
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-4 flex flex-col">
		<Card.Root class="flex-1 overflow-hidden">
			<Card.Header class="border-b">
				<Card.Title class="text-sm font-medium">Settlements Insights</Card.Title>
			</Card.Header>
			<Card.Content class="px-2 py-4">
				<div class="flex flex-row gap-4 px-4">
					<div class="basis-1/2 border-r">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								₹{parseInt((transactionData.totalSum * (100 - mdr)) / 100).toLocaleString()}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Total Amount Settled</span>
					</div>
					<div class="basis-1/2">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700"> {mdr}% </span>
						</h2>
						<span class="text-xs text-gray-500"> Total MDR </span>
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="h-16 bg-gray-100 p-4">
				<p class="text-xs leading-6">
					Daily Average settlement received for this month was ₹{parseInt(
						((transactionData.totalSum / 30) * (100 - mdr)) / 100
					).toLocaleString()} <br />
					Average MDR was highest on Cards on Paytm at 2.5%
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-4 flex flex-col">
		<Card.Root class="flex-1 overflow-hidden">
			<Card.Header class="border-b">
				<Card.Title class="text-sm font-medium">Success Rate Insights</Card.Title>
			</Card.Header>
			<Card.Content class="px-2 py-4">
				<div class="flex flex-row gap-4 px-4">
					<div class="basis-1/3 border-r">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								{successRate / 100}%
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Average SR across Gateways </span>
					</div>
					<div class="basis-1/3 border-r">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								{getRandomInt(40, 299)}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> SR Fluctuations </span>
					</div>
					<div class="basis-1/3">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								₹{parseInt((transactionData.totalSum / 30) * mdr).toLocaleString()}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> GMV Loss </span>
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="h-16 bg-gray-100 p-4">
				<p class="text-xs leading-6">
					{paymentMethods[getRandomInt(0, 3)]} suffered SR fluctuations for
					{getRandomInt(10, 80)} times with an average SR of less than {getRandomInt(
						successRate - 3000,
						successRate - 1500
					) / 100}% on {pgs[getRandomInt(0, pgs.length - 1)].display} gateway
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
	<div class="col-span-4 flex flex-col">
		<Card.Root class="flex-1 overflow-hidden">
			<Card.Header class="border-b">
				<Card.Title class="text-sm font-medium">Error Insights</Card.Title>
			</Card.Header>
			<Card.Content class="px-2 py-4">
				<div class="flex flex-row gap-4 px-4">
					<div class="basis-1/2 border-r">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								{parseInt(((100 - successRate / 100) / 100) * totalCount)}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Failed Transaction </span>
					</div>

					<div class="basis-1/2">
						<h2>
							<span class="inline-block text-3xl font-medium text-slate-700">
								₹{parseInt(
									((100 - successRate / 100) / 100) * transactionData.totalSum
								).toLocaleString()}
							</span>
						</h2>
						<span class="text-xs text-gray-500"> Volume Loss </span>
					</div>
				</div>
			</Card.Content>
			<Card.Footer class="h-16 bg-gray-100 p-4">
				<p class="text-xs leading-6">
					Most of the failed transactions were due to {errors[getRandomInt(0, 3)]} on {pgs[
						getRandomInt(0, pgs.length - 1)
					].display} gateway
				</p>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
