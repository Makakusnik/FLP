<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import {
		CategoryScale,
		Chart,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		Title,
		Tooltip,
		type ChartData,
		type Point,
		Filler
	} from 'chart.js';

	type ChartLineType = ChartData<'line', (number | Point)[], number | string>;

	export let currencyData: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
	const options = {
		plugins: {
			legend: {
				display: false
			}
		},
		elements: {
			point: {
				radius: 0,
				pointStyle: 'rect',
				hitRadius: 0
			}
		},
		scales: {
			y: {
				display: false
			},
			x: {
				display: false
			}
		},
		responsive: true
	};
	const data: ChartLineType = {
		labels: [0, 0, 0, 0, 0, 0, 0, 0, 0],
		datasets: [
			{
				type: 'line',
				clip: false,
				indexAxis: 'x',
				order: 0,
				stack: '1',
				data: currencyData,

				borderCapStyle: 'round',
				backgroundColor: function (ctx) {
					const data = ctx.chart.data.datasets[0].data;
					const firstPoint = data[0] as number;
					const lastPoint = data[data.length - 1] as number;

					if (firstPoint < lastPoint) {
						return '#34d3994F';
					} else if (firstPoint === lastPoint) {
						return '#facc154F';
					}
					return '#fb71854F';
				},
				borderColor: function (ctx) {
					const data = ctx.chart.data.datasets[0].data;
					const firstPoint = data[0] as number;
					const lastPoint = data[data.length - 1] as number;

					if (firstPoint < lastPoint) {
						return '#34d399';
					} else if (firstPoint === lastPoint) {
						return '#facc15';
					}
					return '#fb7185';
				},

				borderJoinStyle: 'round',
				borderWidth: 2,
				fill: true,
				tension: 0.5,
				showLine: true
			}
		]
	};

	Chart.register(
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler
	);
</script>

<Line class="h-8" {data} {options} />
