<script>
	import { onMount } from "svelte";
	import { colors, chartStyleFont, getRandomInt } from "$lib/tools/chart";
	import { ChevronDown, Lightbulb } from "lucide-svelte";

	let labels = ["UPI", "Net Banking", "Cards", "Wallets"];
	export let pgs;
	let isReady = false;

	let totalTransactionCount = 0;
	let totalTransactionAmount = 0;
	let avgTransactionAmount = 0;
	let upiSum = 0;
	let lowestVolume = 0;
	let dataSeries = [];

	function getGMVDataFor30Days() {
		let data = [];
		for (let i = 0; i < labels.length; i++) {
			const element = labels[i];
			let obj = {
				name: element,
				data: []
			};
			for (let j = 0; j < 7; j++) {
				//get a random number between 0 and 9
				let random = getRandomInt(999, 3999) * pgs.length;
				if (element == "UPI") {
					random = getRandomInt(4999, 9999) * pgs.length;
				}
				obj.data.push(random);
			}

			data.push(obj);
		}
		return data;
	}
	function getLast30Days() {
		let date = new Date();
		let last30Days = [];
		for (let i = 0; i < 7; i++) {
			let formattedDate = date.toISOString().split("T")[0]; // Format date as yyyy-mm-dd
			last30Days.push(formattedDate);
			date.setDate(date.getDate() - 1);
		}
		return last30Days;
	}

	let chart;
	function renderChart() {
		dataSeries = getGMVDataFor30Days();
		let dateSeries = getLast30Days();

		totalTransactionCount = getRandomInt(199, 999) * pgs.length;
		totalTransactionAmount = dataSeries.reduce(
			(a, b) => a + b.data.reduce((c, d) => c + d, 0),
			0
		);
		avgTransactionAmount = totalTransactionAmount / totalTransactionCount;

		upiSum = dataSeries[0].data.reduce((a, b) => a + b, 0);

		//get lowest volume data
		lowestVolume = dataSeries[getRandomInt(1, 3)].data.reduce((a, b) => a + b, 0);

		let options = {
			series: dataSeries,
			chart: {
				type: "bar",
				height: 350,
				stacked: true,
				toolbar: {
					show: false
				},
				zoom: {
					enabled: false
				}
			},
			plotOptions: {
				bar: {
					horizontal: false,
					borderRadius: 4,
					borderRadiusApplication: "end", // 'around', 'end'
					borderRadiusWhenStacked: "last", // 'all', 'last'
					dataLabels: {
						total: {
							enabled: false,
							style: { ...chartStyleFont }
						}
					}
				}
			},
			xaxis: {
				type: "datetime",
				categories: dateSeries,
				labels: {
					style: { ...chartStyleFont, fontSize: "10px" }
				}
			},
			legend: {
				position: "top",
				offsetY: 40,
				horizontalAlign: "right",
				offsetX: 15,
				offsetY: 0,
				...chartStyleFont,
				fontSize: "10px",
				fontWeight: 500
			},
			fill: {
				opacity: 1
			},
			colors: colors,
			grid: {
				show: true,
				borderColor: "#dedede",
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
			yaxis: {
				labels: {
					formatter: function (value) {
						return "₹" + (value / 100000).toFixed(2) + "L";
					},
					style: { ...chartStyleFont, fontSize: "10px" }
				},
				title: {
					text: "GMV",
					style: {
						fontSize: "10px",
						fontFamily: "Montserrat, sans-serif",
						fontWeight: 500
					}
				}
			},
			dataLabels: {
				enabled: false
			},
			tooltip: {
				y: {
					formatter: function (val) {
						return (
							"₹" +
							(val / 100000).toFixed(2) +
							"L, " +
							`${parseInt((val / totalTransactionAmount) * totalTransactionCount)} Txns`
						);
					}
				}
			}
		};

		chart = new ApexCharts(document.getElementById("gmvchart"), options);
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
					<h3 class="font-medium">Total no. of txns</h3>
					<p class="mt-2">
						<span class="font-semibold text-slate-700">
							{totalTransactionCount.toLocaleString()}
						</span>
					</p>
				</div>
				<div class="col-span-1 text-center text-xs text-gray-500">
					<h3 class="font-medium">Total Volume</h3>
					<p class="mt-2">
						<span class="font-semibold text-slate-700"
							>₹{totalTransactionAmount.toLocaleString()}</span
						>
					</p>
				</div>
				<div class="col-span-1 text-right text-xs text-gray-500">
					<h3 class="font-medium">Avg Order Value</h3>
					<p class="mt-2">
						<span class="font-semibold text-slate-700"
							>₹{avgTransactionAmount.toFixed(2).toLocaleString()}</span
						>
					</p>
				</div>
			</div>
			<div id="gmvchart"></div>
			<div class="my-4 grid grid-cols-4 gap-2 px-8">
				{#each dataSeries as ser, i}
					<div class="col-span-1 text-xs text-gray-500">
						<h3 class="font-medium">
							<span
								class="mr-1 inline-block h-[12px] w-[12px]"
								style="background-color: {colors[i]}"
							></span>
							{ser.name}
						</h3>
						<p class="mt-2">
							<span class="pl-4 font-semibold text-slate-700">
								{(
									(ser.data.reduce((a, b) => a + b, 0) / totalTransactionAmount) *
									100
								).toFixed(2)}%
							</span> (AVG)
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
							Transaction Insights
						</span>
					</p>
				</div>
			</div>
			<div class="my-4 grid grid-cols-4 gap-2 border-b px-6 py-4 pb-8">
				<div class="col-span-4 text-xs text-gray-500">
					<h3 class="font-medium">Highest Volume On</h3>
					<p class="mt-3">
						<span class="inline-block text-sm font-semibold text-slate-700"> UPI </span>
					</p>
					<p class="mt-3">
						<span class="inline-block text-slate-700"> Count: </span>
						<span class="inline-block pl-1 font-semibold text-slate-700">
							{getRandomInt(
								parseInt(totalTransactionCount / 2),
								parseInt(totalTransactionCount / 1.5)
							).toLocaleString()}
						</span>
						<span class="inline-block pl-4 text-slate-700"> Volume: </span>
						<span class="inline-block pl-1 font-semibold text-slate-700"
							>₹{upiSum.toLocaleString()}
						</span>
					</p>
				</div>
			</div>
			{#if dataSeries.length > 0}
				<div class="my-4 grid grid-cols-4 gap-2 border-b px-6 py-4 pb-8">
					<div class="col-span-4 text-xs text-gray-500">
						<h3 class="font-medium">Lowest Volume On</h3>
						<p class="mt-3">
							<span class="inline-block text-sm font-semibold text-slate-700">
								{dataSeries[getRandomInt(1, 3)].name}
							</span>
						</p>
						<p class="mt-3">
							<span class="inline-block text-slate-700"> Count: </span>
							<span class="inline-block pl-1 font-semibold text-slate-700">
								{getRandomInt(
									parseInt(totalTransactionCount / 8),
									parseInt(totalTransactionCount / 12)
								).toLocaleString()}
							</span>
							<span class="inline-block pl-4 text-slate-700"> Volume: </span>
							<span class="inline-block pl-1 font-semibold text-slate-700">
								₹{lowestVolume.toLocaleString()}
							</span>
						</p>
					</div>
				</div>
			{/if}
			<div class="my-4 grid grid-cols-4 gap-2 border-b px-6 py-4 pb-8">
				<div class="col-span-4 text-xs text-gray-500">
					<h3 class="font-medium">Most Transacted PG</h3>
					<p class="mt-3">
						<span class="inline-block text-sm font-semibold text-slate-700">
							{pgs[getRandomInt(0, pgs.length - 1)].display}
						</span>
					</p>
					<p class="mt-3">
						<span class="inline-block text-slate-700"> Count: </span>
						<span class="inline-block pl-1 font-semibold text-slate-700">
							{getRandomInt(
								parseInt(totalTransactionCount / 4),
								parseInt(totalTransactionCount / 3)
							).toLocaleString()}
						</span>
						<span class="inline-block pl-4 text-slate-700"> Volume: </span>
						<span class="inline-block pl-1 font-semibold text-slate-700">
							{getRandomInt(
								parseInt(totalTransactionAmount / 3),
								parseInt(totalTransactionAmount / 2)
							).toLocaleString()}
						</span>
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
