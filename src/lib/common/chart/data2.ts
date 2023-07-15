import type { ChartData, Point } from 'chart.js';

// const skipped = (ctx: ScriptableLineSegmentContext, value: any) =>
// 	ctx.p0.skip || ctx.p1.skip ? value : undefined;
// const down = (ctx: ScriptableLineSegmentContext, value: any) =>
// 	ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined;

export const data: ChartData<'line', (number | Point)[]> = {
	labels: ['6.7', '7.7', '8.7', '9.7', '10.7', '11.7', '12.7', '13.7'],
	datasets: [
		{
			// Line Styling
			backgroundColor: 'rgba(0, 100,0, 1)',
			borderCapStyle: 'round',
			borderColor: 'rgba(0, 255,0, 1)',
			borderDash: [],
			borderDashOffset: 0.0,
			borderJoinStyle: 'round',
			borderWidth: 1,

			hoverBorderCapStyle: 'round',
			hoverBackgroundColor: 'lime',
			hoverBorderColor: 'purple',
			hoverBorderDash: [],
			hoverBorderDashOffset: 0,
			hoverBorderJoinStyle: 'round',
			hoverBorderWidth: 10,

			tension: 0.5,
			showLine: true,
			spanGaps: true,

			// General
			type: 'line',
			clip: false,
			indexAxis: 'x',
			label: 'My First dataset',
			order: 0,
			stack: '1',
			xAxisID: '1',
			yAxisID: '2',

			// Point styling
			pointBorderColor: 'rgb(152, 150,150)',
			pointBackgroundColor: 'rgb(0, 0, 255)',
			pointBorderWidth: 0,
			pointRadius: 1,
			pointHitRadius: 10,
			pointRotation: 0,
			pointStyle: 'circle',

			cubicInterpolationMode: 'default',

			// Interactions
			pointHoverBackgroundColor: 'white',
			pointHoverBorderColor: 'green',
			pointHoverBorderWidth: 3,
			pointHoverRadius: 8,

			//Segment
			segment: {
				backgroundColor: '',
				borderCapStyle: 'round',
				borderDashOffset: 0,
				borderJoinStyle: 'miter',
				borderWidth: 3
			},

			data: [0, 10, -50, 1, 12, 54, 21, 21]
		}
	]
};
