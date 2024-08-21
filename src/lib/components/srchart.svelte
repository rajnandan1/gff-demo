<script>
	import { onMount } from 'svelte';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { ChevronDown, Lightbulb } from 'lucide-svelte';
	export let pgs;
	let chart;
	let isReady = false;
	//write a function to generate a smooth graph data

	const seedData = [
		65, 66, 67, 68, 69, 70, 71, 67, 68, 69, 70, 70, 70, 75, 75, 75, 78, 79, 80, 75, 74, 72, 68, 66,
		65, 81, 82, 83, 84, 82, 83, 84
	].reverse();

	let colors = ['#6A6EF4', '#FFB44F', '#F99BAB', '#9BDFC4'];

	function shuffleArray(array) {
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
		return array;
	}
	function fakeLast14DayDataByPaymentMethod() {
		let paymentMethods = ['UPI', 'Net Banking', 'Cards', 'Wallets'];
		let data = [];

		for (let i = 0; i < paymentMethods.length; i++) {
			const element = paymentMethods[i];
			let obj = {
				name: element,
				data: []
			};
			let shuffledArray = shuffleArray(seedData);
			for (let j = 0; j < 30; j++) {
				//get a random number between 0 and 9
				let random =
					shuffledArray[j] +
					Math.floor(Math.random() * (i % 2 == 1 ? 5 : 15)) * (i % 2 == 0 ? 1 : -1);
				obj.data.push([new Date(new Date().setDate(new Date().getDate() - j)).getTime(), random]);
			}

			data.push(obj);
		}
		return data;
	}
	var options = {
		chart: {
			type: 'line',
			height: 400,
			zoom: {
				enabled: false
			},
			toolbar: {
				show: true,
				tools: {
					download: false
				}
			}
		},
		stroke: {
			show: true,
			curve: 'monotoneCubic',
			colors: colors,
			width: 1.4,
			dashArray: 0
		},
		series: [],
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
			min: 10,
			type: 'numeric',
			labels: {
				formatter: function (value) {
					return value + '%';
				},
				style: {
					fontSize: '10px',
					fontFamily: 'Montserrat, sans-serif',
					fontWeight: 500
				}
			},
			title: {
				text: 'Success Rate',
				style: {
					fontSize: '10px',
					fontFamily: 'Montserrat, sans-serif',
					fontWeight: 500
				}
			}
		},
		grid: {
			show: true,
			borderColor: '#dedede',
			strokeDashArray: 4,
			xaxis: {
				lines: {
					show: true
				}
			},
			yaxis: {
				lines: {
					show: true
				}
			}
		},
		colors: colors,
		legend: {
			show: true,
			position: 'top',
			horizontalAlign: 'right',
			offsetX: 15,
			offsetY: 0,
			fontSize: '10px',
			fontFamily: 'Montserrat, sans-serif',
			fontWeight: 500,
			markers: {
				width: 10,
				height: 10,
				radius: 0,
				shape: 'square'
			}
		},
		tooltip: {
			style: {
				fontSize: '10px',
				fontFamily: 'Montserrat, sans-serif',
				fontWeight: 500
			}
		}
	};
	onMount(() => {
		//renderChart();
		isReady = true;
	});
	let totalFluctuations = 0;
	let fluctuationSeries = [];
	let mostFluctuated = {
		name: '',
		totalFluctuations: 0,
		avg: 0
	};
	let lowestSRSeries = {
		name: '',
		totalFluctuations: 0,
		avg: 0
	};

	let averageSR = 0;
	let totalSRFluctuations = 0;
	//create a random number between 100000 and 40000000
	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function calculateFluctuation(data) {
		for (let i = 0; i < data.length; i++) {
			const series = data[i];
			let lastValue = series.data[0][1];
			let total = 0;
			let sum = 0;
			for (let j = 0; j < series.data.length; j++) {
				let newValue = series.data[j][1];
				sum += newValue;
				let diff = Math.abs(newValue - lastValue);
				if (diff > 5) {
					totalFluctuations += 1;
					total += 1;
				}
			}
			fluctuationSeries = [
				...fluctuationSeries,
				{ name: series.name, totalFluctuations: total, avg: sum / series.data.length }
			];
		}

		mostFluctuated = fluctuationSeries.reduce((prev, current) =>
			prev.totalFluctuations > current.totalFluctuations ? prev : current
		);
		lowestSRSeries = fluctuationSeries.reduce((prev, current) =>
			prev.avg < current.avg ? prev : current
		);

		averageSR = fluctuationSeries.reduce((a, b) => a + b.avg, 0) / fluctuationSeries.length;
		totalSRFluctuations = fluctuationSeries.reduce((a, b) => a + b.totalFluctuations, 0);
	}

	function renderChart() {
		if (!isReady) return;
		options.series = fakeLast14DayDataByPaymentMethod();

		options.annotations = {
			yaxis: []
		};
		let avgs = [];
		for (let i = 0; i < options.series.length; i++) {
			let data = options.series[i].data;
			let sum = 0;
			for (let j = 0; j < data.length; j++) {
				let d = data[j];
				sum += d[1];
			}
			let avg = sum / data.length;
			avgs.push(avg);
		}

		let totalAvgs = avgs.reduce((a, b) => a + b, 0);
		let actualAvg = totalAvgs / avgs.length;

		options.annotations.yaxis.push({
			y: actualAvg,
			borderColor: '#12094e',
			label: {
				borderColor: '#12094e',
				style: {
					color: '#fff',
					background: '#12094e'
				},
				text: `Average SR ${actualAvg.toFixed(2)}%`
			}
		});

		let dayData = [];
		for (let i = 0; i < options.series[0].data.length; i++) {
			let a =
				options.series[0].data[i][1] +
				options.series[1].data[i][1] +
				options.series[2].data[i][1] +
				options.series[3].data[i][1];
			dayData.push({
				x: options.series[0].data[i][0],
				y: a / 4
			});
		}

		//find the object with the minimum y value
		let min = dayData.reduce((prev, current) => (prev.y < current.y ? prev : current));

		options.annotations.xaxis = [
			{
				x: min.x,
				borderColor: '#12094e',
				label: {
					borderColor: '#12094e',
					style: {
						color: '#fff',
						background: '#12094e'
					},
					text: `Lowest SR ${min.y.toFixed(2)}% `
				}
			}
		];
		fluctuationSeries = [];
		calculateFluctuation(options.series);
		//destroy chart
		if (chart) {
			chart.destroy();
		}
		chart = new ApexCharts(document.querySelector('#srchart'), options);
		chart.render();
	}

	$: {
		if (isReady && pgs.length > 0) {
			if (chart) {
				chart.destroy();
			}
			renderChart();
		}
	}
</script>

<div class="mb-6 mt-2 grid grid-cols-3 gap-2 px-4">
	<div class="col-span-1 text-xs text-gray-500">
		<h3 class="font-medium">Overall Average SR</h3>
		<p class="mt-2">
			<span class="font-semibold text-slate-700">{averageSR.toFixed(2)}%</span>
		</p>
	</div>
	<div class="col-span-1 text-center text-xs text-gray-500">
		<h3 class="font-medium">SR Fluctuations</h3>
		<p class="mt-2">
			<span class="font-semibold text-slate-700">{totalSRFluctuations}</span>
		</p>
	</div>
	<div class="col-span-1 text-right text-xs text-gray-500">
		<h3 class="font-medium">GMV Loss</h3>
		<p class="mt-2">
			<span class="font-semibold text-slate-700"
				>₹ {(getRandomInt(100000, 999999) * pgs.length).toLocaleString()}</span
			>
		</p>
	</div>
</div>

<div id="srchart"></div>

<div class="my-4 grid grid-cols-4 gap-2 px-8">
	{#each fluctuationSeries as ser, i}
		<div class="col-span-1 text-xs text-gray-500">
			<h3 class="font-medium">
				<span class="mr-1 inline-block h-[12px] w-[12px]" style="background-color: {colors[i]}"
				></span>
				{ser.name}
			</h3>
			<p class="mt-2">
				<span class="pl-4 font-semibold text-slate-700">{ser.avg.toFixed(2)}%</span> (AVG)
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
			<span class="font-semibold">{mostFluctuated.name}</span> suffered SR fluctuations for
			<span class="font-semibold">{mostFluctuated.totalFluctuations}</span> times with an average SR
			of less than {parseInt(mostFluctuated.avg) - 1}%. To avoid losing customers, consider using
			multiple payment gateways.
		</span>
	</p>
</div>
