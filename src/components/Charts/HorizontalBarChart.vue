<script>
import { HorizontalBar } from "vue-chartjs";
export default {
  extends: HorizontalBar,
  props: {
    datacollection: Object,
    height: Number
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
          position: "bottom"
        }
      }
    };
  },
  mounted() {
    this.renderChart(this.datacollection, this.options);
  }
};
</script>
