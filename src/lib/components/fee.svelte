<script>
	import { onMount } from 'svelte';
	import { colors, chartStyleFont, getRandomInt } from '$lib/tools/chart';
	import { ChevronDown, Lightbulb } from 'lucide-svelte';

	let labels = ['UPI', 'Net Banking', 'Cards', 'Wallets'];
	let isReady = false;
	export let pgs;
	let chart;
	let totalSum = 0;
	let completeSeries = [];

	function renderChart() {
		let dataSeries = [
			getRandomInt(10000, 29999) * pgs.length,
			getRandomInt(10000, 29999) * pgs.length,
			getRandomInt(10000, 29999) * pgs.length,
			getRandomInt(10000, 29999) * pgs.length
		];

		totalSum = dataSeries.reduce((a, b) => a + b, 0);
		completeSeries = labels.map((label, i) => {
			return {
				name: label,
				avg: ((dataSeries[i] / totalSum) * 100).toFixed(2),
				data: dataSeries[i]
			};
		});
		let options = {
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
					<span style="margin-left:5px;font-weight:600">₹${series[seriesIndex].toLocaleString()}</span>
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
				text: `Total MDR for Aug`,
				align: 'center',
				floating: true,
				offsetY: 185,
				style: { ...chartStyleFont, fontSize: '14px', color: '#999' }
			}
		};
		chart = new ApexCharts(document.querySelector('#feechart'), options);
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
		<h3 class="font-medium">Total MDR on {pgs[getRandomInt(0, pgs.length - 1)].display}</h3>
		<p class="mt-2">
			<span class="font-semibold text-slate-700">₹{totalSum.toLocaleString()}</span>
		</p>
	</div>
</div>
<div id="feechart"></div>
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
					₹{parseFloat(ser.data.toFixed(2)).toLocaleString()} ({ser.avg}%)
				</span>
			</p>
		</div>
	{/each}
</div>
<div class="px-4">
	<p class="relative rounded-md border border-yellow-200 bg-yellow-50 p-4 pl-10">
		<Lightbulb class="absolute left-2 top-4 text-yellow-700" />
		<span class="text-sm font-semibold text-yellow-700"> AI Insight </span>
		<br />
		<span class="text-xs">
			Merchants using FlowWise can decrease their MDR cost by > 10% by routing through the lowest
			cost gateway.
		</span>
	</p>
</div>
