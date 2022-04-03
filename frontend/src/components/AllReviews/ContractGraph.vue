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
        data: [70, 30],
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
        categories: ["여기서 계약했어요", "여기서 계약 안했어요"],
        labels: {
          show: false,
        },
      },
      title: {
        text: "계약률",
      },
      colors: ["#81C784"],
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
