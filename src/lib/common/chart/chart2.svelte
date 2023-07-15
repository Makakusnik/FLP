<script lang="ts">
	import { Line } from 'svelte-chartjs';
	import { data } from './data2.ts';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler
	} from 'chart.js';

	ChartJS.register(
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

<Line {data} options={{ responsive: true, fill: { target: 50, above: 'rgba(255, 0, 0, 0.3)' } }} />
