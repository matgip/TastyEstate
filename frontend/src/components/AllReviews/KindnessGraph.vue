<template>
  <div>
    <apexchart type="bar" height="200" width="300" :options="chartOptions" :series="series" />
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    series: [
      {
        data: [60, 20, 5, 5, 5],
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
        categories: ["매우 친절", "친절", "보통", "불친절", "매우 불친절"],
        labels: {
          show: false,
        },
      },
      title: {
        text: "친절함",
      },
      colors: ["#4DD0E1"],
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
  }),
};
</script>

<style></style>
