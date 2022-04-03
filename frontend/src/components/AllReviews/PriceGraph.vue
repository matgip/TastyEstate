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
        data: [20, 50, 10, 10, 10],
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
        categories: ["10% 이상 비쌈", "5~10% 더 비쌈", "평균 가격", "5~10% 더 쌈", "10% 이상 쌈"],
        labels: {
          show: false,
        },
      },
      title: {
        text: "가격",
      },
      colors: ["#BA68C8"],
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
