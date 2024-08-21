<script>
	import { onMount } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, Lightbulb } from 'lucide-svelte';
	import { colors2, chartStyleFont, getRandomInt } from '$lib/tools/chart';
	export let pgs;
	let isReady = false;
	let chart;

	let gatewaysSelected = ['Cashfree', 'Payu', 'Stripe', 'Razorpay'];
	let dataSeries = [];
	let totalSettledAmount = 0;
	let totalSettlementCount = 0;
	let options;
	let mdr = 0;

	function createData() {
		let data = [];
		for (let i = 0; i < gatewaysSelected.length; i++) {
			const element = gatewaysSelected[i];
			let obj = {
				name: element,
				data: []
			};
			for (let j = 0; j < 30; j++) {
				//get a random number between 0 and 9

				let random = getRandomInt(
					9999 * (getRandomInt(1, gatewaysSelected.length) * 1.4),
					39999 * (getRandomInt(1, gatewaysSelected.length) * 1.4)
				);
				obj.data.push([new Date(new Date().setDate(new Date().getDate() - j)).getTime(), random]);
			}

			data.push(obj);
		}
		return data;
	}

	function renderChart() {
		dataSeries = createData();
		mdr = getRandomInt(50, 270) / 100;
		totalSettledAmount = dataSeries.reduce((a, b) => a + b.data.reduce((c, d) => c + d[1], 0), 0);
		totalSettlementCount = getRandomInt(11111, 99999);
		options = {
			series: dataSeries,
			chart: {
				type: 'area',
				height: 350,
				stacked: true,
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				}
			},

			colors: colors2,
			dataLabels: {
				enabled: false,
				width: 1.4
			},
			stroke: {
				curve: 'monotoneCubic',
				width: 0
			},
			fill: {
				type: 'solid',
				gradient: {
					opacityFrom: 0.6,
					opacityTo: 0.8
				}
			},
			legend: {
				position: 'top',
				offsetY: 40,
				horizontalAlign: 'right',
				offsetX: 15,
				offsetY: 0,
				...chartStyleFont,
				fontSize: '10px',
				fontWeight: 500,
				markers: {
					width: 10,
					height: 10,
					radius: 0,
					shape: 'square'
				}
			},
			xaxis: {
				type: 'datetime',
				labels: {
					style: {
						fontSize: '10px',
						fontFamily: 'Montserrat, sans-serif',
						fontWeight: 500
					}
				}
			},
			yaxis: {
				labels: {
					formatter: function (value) {
						return '₹' + (value / 100000).toFixed(2) + 'L';
					},
					style: { ...chartStyleFont, fontSize: '10px' }
				},
				title: {
					text: 'Settlement Amount',
					style: {
						fontSize: '10px',
						fontFamily: 'Montserrat, sans-serif',
						fontWeight: 500
					}
				}
			}
		};
		chart = new ApexCharts(document.querySelector('#stchart'), options);
		chart.render();
	}

	onMount(() => {
		isReady = true;
	});
	$: {
		if (isReady && pgs.length > 0) {
			if (chart) {
				chart.destroy();
			}
			renderChart();
		}
	}
</script>

<div class="grid grid-cols-7 items-stretch gap-4">
	<div class="col-span-4 flex flex-col py-0">
		<div class="flex-1">
			<div class="mb-6 mt-6 grid grid-cols-3 gap-2 px-4">
				<div class="col-span-1 text-xs text-gray-500">
					<h3 class="font-medium">Total Settled Amount</h3>
					<p class="mt-2">
						<span class="font-semibold text-slate-700">
							₹{totalSettledAmount.toLocaleString()}
						</span>
					</p>
				</div>
				<div class="col-span-1 text-center text-xs text-gray-500">
					<h3 class="font-medium">Transactions Settled</h3>
					<p class="mt-2">
						<span class="font-semibold text-slate-700">
							{totalSettlementCount.toLocaleString()}
						</span>
					</p>
				</div>
				<div class="col-span-1 text-right text-xs text-gray-500">
					<h3 class="font-medium">Unsettled Transactions</h3>
					<p class="mt-2">
						<span class="font-semibold text-slate-700">
							{parseInt(totalSettlementCount * (getRandomInt(11, 15) / 100)).toLocaleString()}
						</span>
					</p>
				</div>
			</div>
			<div id="stchart"></div>
			<div class="my-4 grid grid-cols-4 gap-2 px-8">
				{#each dataSeries as ser, i}
					<div class="col-span-1 text-xs text-gray-500">
						<h3 class="font-medium">
							<span
								class="mr-1 inline-block h-[12px] w-[12px]"
								style="background-color: {colors2[i]}"
							></span>
							{ser.name}
						</h3>
						<p class="mt-2">
							<span class="pl-4 font-semibold text-slate-700">
								₹{ser.data.reduce((acc, curr) => acc + curr[1], 0).toLocaleString()}
							</span>
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
	<div class="col-span-3 flex flex-col border-l">
		<div class="flex-1">
			<div class=" grid grid-cols-4 gap-2 border-b px-6 py-4 pt-2">
				<div class="col-span-4 text-xs text-gray-500">
					<p class="mt-3">
						<span class="inline-block text-sm font-medium text-slate-700">
							Settlement Insights
						</span>
					</p>
				</div>
			</div>
			<div class="my-4 grid grid-cols-4 gap-2 border-b px-6 py-4 pb-8">
				<div class="col-span-4 text-xs text-gray-500">
					<h3 class="font-medium">Average Settlement amount per day</h3>
					<p class="mt-3">
						<span class="inline-block text-sm font-semibold text-slate-700">
							₹{parseFloat((totalSettledAmount / 30).toFixed(2)).toLocaleString()}
							<span class="pl-2 text-xs font-normal text-gray-400"> last 30 days </span>
						</span>
					</p>
				</div>
			</div>

			<div class="my-4 grid grid-cols-4 gap-2 border-b px-6 py-4 pb-8">
				<div class="col-span-4 text-xs text-gray-500">
					<h3 class="font-medium">Average Count of Transactions Settled per day</h3>
					<p class="mt-3">
						<span class="inline-block text-sm font-semibold text-slate-700">
							{parseInt(totalSettlementCount / 30).toLocaleString()}
							<span class="pl-2 text-xs font-normal text-gray-400">
								out of {parseInt(
									(totalSettlementCount * (getRandomInt(12, 18) / 10)) / 30
								).toLocaleString()}
							</span>
						</span>
					</p>
				</div>
			</div>
			<div class="my-4 grid grid-cols-4 gap-2 border-b px-6 py-4 pb-8">
				<div class="col-span-4 text-xs text-gray-500">
					<h3 class="font-medium">Amount settled in the last 7 days</h3>
					<p class="mt-3">
						<span class="inline-block text-sm font-semibold text-slate-700">
							₹{parseFloat((totalSettledAmount / 4).toFixed(2)).toLocaleString()}
						</span>
					</p>
				</div>
			</div>
			<div class="my-4 grid grid-cols-4 gap-2 px-6 py-4 pb-8">
				<div class="col-span-4 text-xs text-gray-500">
					<h3 class="font-medium">Average MDR</h3>
					<p class="mt-3">
						<span class="inline-block text-sm font-semibold text-slate-700">
							{mdr}%
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
