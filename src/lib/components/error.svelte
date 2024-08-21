<script>
	import { onMount } from 'svelte';
	import { colors4, chartStyleFont, getRandomInt } from '$lib/tools/chart';
	import { ChevronDown, Lightbulb } from 'lucide-svelte';

	export let pgs;
	let totalFailedTransactions = 0;
	let totalFailedGMV = 0;
	let chart;
	let isReady = false;

	let options;
	let series = [];

	function generateNumbers(firstNumber) {
		let remaining = 100 - firstNumber;
		let numbers = [firstNumber];

		for (let i = 0; i < 2; i++) {
			let random = Math.random() * remaining;
			remaining -= random;
			numbers.push(random);
		}

		numbers.push(remaining); // The last number is whatever is remaining to reach 100
		return numbers;
	}

	function renderChart() {
		totalFailedTransactions = getRandomInt(500, 5000) * pgs.length;
		totalFailedGMV =
			getRandomInt(19 * totalFailedTransactions, 19 * totalFailedTransactions) * pgs.length;

		let numberFirst = getRandomInt(511, 779) / 10;
		let numbers = generateNumbers(numberFirst);
		series = [
			{
				name: 'Bank Declined Transactions',
				data: [parseInt((totalFailedTransactions * numbers[0]) / 100)]
			},
			{
				name: 'User Declined Transactions',
				data: [parseInt((totalFailedTransactions * numbers[1]) / 100)]
			},
			{
				name: 'Wrong Instrument Details',
				data: [parseInt((totalFailedTransactions * numbers[2]) / 100)]
			},
			{
				name: 'Technical Error',
				data: [parseInt((totalFailedTransactions * numbers[3]) / 100)]
			}
		];

		//sort series by data[0] value
		series = series.sort((a, b) => b.data[0] - a.data[0]);

		options = {
			series: series,
			chart: {
				type: 'bar',
				height: 90,
				stacked: true,
				offsetX: -8,
				stackType: '100%',
				toolbar: {
					show: false
				}
			},
			plotOptions: {
				bar: {
					horizontal: true,
					borderRadius: 0,

					barHeight: '100%',
					dataLabels: {
						total: {
							enabled: false,
							offsetX: 0,
							style: {
								fontSize: '13px',
								fontWeight: 900
							}
						}
					}
				}
			},
			stroke: {
				width: 0,
				colors: ['#fff']
			},
			xaxis: {
				categories: ['Aug 2024'],
				labels: {
					show: false,
					formatter: function (val) {
						return val + 'K';
					}
				},
				show: false,
				axisBorder: {
					show: false
				},
				axisTicks: {
					show: false
				}
			},
			yaxis: {
				show: false,
				axisBorder: {
					show: false
				}
			},
			grid: {
				show: false,
				padding: {
					left: 0,
					right: 0
				}
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return val;
					}
				}
			},
			fill: {
				opacity: 1
			},
			legend: {
				show: false
			},
			colors: colors4
		};
		chart = new ApexCharts(document.querySelector('#errorchart'), options);
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

<div class="my-1 grid grid-cols-4 gap-2 px-6">
	<div class="col-span-2 text-xs text-gray-500">
		<h3 class="text-xs font-medium text-gray-500">Total Failed Transactions</h3>
		<p class="mt-3">
			<span class="inline-block pl-1 font-semibold text-slate-700">
				{totalFailedTransactions.toLocaleString()}
			</span>
		</p>
	</div>
	<div class="col-span-2 text-xs text-gray-500">
		<h3 class="text-xs font-medium text-gray-500">Total Volume Lost</h3>
		<p class="mt-3">
			<span class="inline-block pl-1 font-semibold text-slate-700">
				₹{totalFailedGMV.toLocaleString()}
			</span>
		</p>
	</div>
</div>

<div id="errorchart" class="px-2"></div>

{#if series.length > 0}
	<div class="my-4 grid grid-cols-4 gap-2 px-6">
		{#each series as ser, i}
			<div class="col-span-4 mb-6 text-xs text-gray-500">
				<h3 class="text-xs font-medium text-gray-500">
					<span class="mr-1 inline-block h-[12px] w-[12px]" style="background-color: {colors4[i]}"
					></span>
					{ser.name}
				</h3>
				<p class="mt-3">
					<span class="inline-block text-slate-700"> Transaction Count: </span>
					<span class="inline-block pl-1 font-semibold text-slate-700">
						{ser.data[0].toLocaleString()}
					</span>
					<span class="inline-block pl-4 text-slate-700"> Volume Lost: </span>
					<span class="inline-block pl-1 font-semibold text-slate-700">
						₹{parseFloat(
							((ser.data[0] / totalFailedTransactions) * totalFailedGMV).toFixed()
						).toLocaleString()}
					</span>
				</p>
			</div>
		{/each}
	</div>
{/if}
