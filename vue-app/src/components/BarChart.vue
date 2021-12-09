<template>
    <BarChart :chart-data="chartData" :options="options" />
</template>

<script>
import { computed } from 'vue';
import { BarChart } from 'vue-chart-3';
import { Chart, BarElement, BarController, CategoryScale, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, BarController, CategoryScale, Tooltip, Legend);

export default {
    name: 'bar-chart',
    components: {
        BarChart,
    },
    props: {
        data: {
            type:Array,
            required: true,
        },
        values: {
            type: Array,
            required: true,
        },
        labels: {
            type: Array,
            required: true,
        },
    },
    setup(props) {
        const colors = ['#66c2a5', '#fc8d62', '#8da0cb', '#e78ac3', '#a6d854']
        const chartData = computed(() => {
            const data = { labels: props.label, datasets: [] };
            props.values.forEach((val, index) => {
                data.datasets.push({
                    label: props.labels[index],
                    data: val,
                    backgroundColor: colors[index],
                })
            })
            return data;
        });

        return {
            chartData,
            options: {
                responsive: true,
            }
        }
    },
}
</script>
