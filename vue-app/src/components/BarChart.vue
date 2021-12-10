<template>
    <BarChart :chart-data="chartData" :options="options" />
</template>

<script>
import { computed, toRefs } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, BarElement, BarController, LinearScale, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, BarController, LinearScale, CategoryScale, Tooltip, Legend);

export default {
    name: 'bar-chart',
    components: {
        BarChart,
    },
    props: {
        values: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const { values } = toRefs(props);
        const colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854']
        const chartData = computed(() => {
            const data = { labels: Object.keys(values.value), datasets: [{  data: Object.values(values.value), backgroundColor: colors }] };
            return data;
        });

        return {
            chartData,
            options: {
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        }
    },
}
</script>
