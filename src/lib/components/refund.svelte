<script>
	import { onMount } from 'svelte';
	import { colors3, chartStyleFont, getRandomInt } from '$lib/tools/chart';
	import { ChevronDown, Lightbulb } from 'lucide-svelte';

	export let pgs;
	let labels = ['Refund Done', 'Refund Pending', 'Refund Cancelled', 'Refund Failed'];
	let colors = colors3;
	let chart;
	let isReady = false;
	let options;
	let refundData = {
		totalCount: 0,
		totalSum: 0
	};
	let successRefundCount = 0;
	let totalSum = 0;
	let completeSeries = [];

	//write a function that returns an array of 4 random numbers, the first number is defined and the sum of all four  number should be equal to 100

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
		refundData = {
			totalCount: getRandomInt(100, 999) * pgs.length,
			totalSum: getRandomInt(1000, 9999) * pgs.length
		};
		// Replace 20 with your predefined first number

		successRefundCount = getRandomInt(911, 939) / 10;
		let numbers = generateNumbers(successRefundCount);

		let dataSeries = [
			numbers[0] * refundData.totalCount,
			numbers[1] * refundData.totalCount,
			numbers[2] * refundData.totalCount,
			numbers[3] * refundData.totalCount
		];

		totalSum = dataSeries.reduce((a, b) => a + b, 0);
		completeSeries = labels.map((label, i) => {
			return {
				name: label,
				avg: ((dataSeries[i] / totalSum) * 100).toFixed(2),
				data: dataSeries[i]
			};
		});
		options = {
			series: dataSeries,
			labels: labels,
			colors: colors,
			chart: {
				type: 'donut',
				height: 420
			},
			legend: {
				show: false,
				position: 'bottom'
			},
			dataLabels: {
				enabled: true,
				style: { ...chartStyleFont, colors: ['#444'] },
				dropShadow: {
					enabled: false
				}
			},
			plotOptions: {
				pie: {
					dataLabels: {
						offset: 45,
						minAngleToShowLabel: 30
					}
				}
			},
			stroke: {
				width: 0
			},
			tooltip: {
				enabled: true,
				fillSeriesColor: true,
				style: { ...chartStyleFont },
				custom: function ({ series, seriesIndex, dataPointIndex, w }) {
					let sum = series.reduce((a, b) => a + b, 0);
					let percentage = ((series[seriesIndex] / sum) * 100).toFixed(2);
					return `  
				<div style="font-size:12px;">
					<p style="margin-bottom:5px;font-weight:500;text-align:center">AUG 2024</p>
					<span style="background-color:${w.config.colors[seriesIndex]};width:12px;height:12px;display:inline-block"></span> 
					${w.config.labels[seriesIndex]}
					<span style="margin-left:5px;font-weight:600">${percentage}%</span>
					<span style="margin-left:5px;font-weight:600">₹${parseFloat(series[seriesIndex].toFixed(2)).toLocaleString()}</span>
				</div>
				`;
				}
			},
			title: {
				text: `₹ ${totalSum.toLocaleString()}`,
				align: 'center',
				floating: true,
				offsetY: 165,
				style: { ...chartStyleFont, fontSize: '18px' }
			},
			subtitle: {
				text: `Total Refund Initiated`,
				align: 'center',
				floating: true,
				offsetY: 185,
				style: { ...chartStyleFont, fontSize: '14px', color: '#999' }
			}
		};
		chart = new ApexCharts(document.querySelector('#refundchart'), options);
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

<div class="mb-6 mt-2 grid grid-cols-1 gap-2 px-4">
	<div class="col-span-1 text-xs text-gray-500">
		<h3 class="font-medium">
			Total Refund Initiated on {pgs[getRandomInt(0, pgs.length - 1)].display}
		</h3>
		<p class="mt-2">
			<span class="font-semibold text-slate-700">
				{refundData.totalCount.toLocaleString()}

				Transactions refunded amounting to ₹{totalSum.toLocaleString()}
			</span>
		</p>
	</div>
</div>
<div id="refundchart"></div>
<div class="my-4 grid grid-cols-4 gap-2 px-8">
	{#each completeSeries as ser, i}
		<div class="col-span-1 text-xs text-gray-500">
			<h3 class="font-medium">
				<span class="mr-1 inline-block h-[12px] w-[12px]" style="background-color: {colors[i]}"
				></span>
				{ser.name}
			</h3>
			<p class="mt-2">
				<span class="inline-block pl-4 font-semibold text-slate-700">
					₹{ser.data.toFixed(2).toLocaleString()} ({ser.avg}%)
				</span>
			</p>
		</div>
	{/each}
</div>
