<script>
import { Line } from 'vue-chartjs';

export default {
	extends: Line,
	props: {
		datacollection: Object,
		height: { type: Number, default: 500 }
	},
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: false,
				legend: {
					labels: {
						usePointStyle: true
					},
					position: 'bottom'
				}
			}
		};
	},
	mounted() {
		this.renderChart(this.datacollection, this.options);
	}
};
</script>
