<template>
  <div>
    <apexchart ref="barChart" type="bar" height="200" width="300" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    colors: {
      default: () => {
        return [];
      },
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      series: [
        {
          data: this.data,
        },
      ],
      chartOptions: {
        chart: {
          type: "bar",
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: this.categories,
          labels: {
            show: false,
          },
        },
        yaxis: {
          reversed: true,
        },
        title: {
          text: this.title,
        },
        colors: this.colors,
        tooltip: {
          y: {
            formatter: (val) => {
              return val + "%";
            },
            title: {
              formatter: (seriesName) => {
                return seriesName.split(" ")[1];
              },
            },
          },
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val + "%";
          },
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          },
        },
      },
    };
  },
};
</script>
