<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, onUnmounted } from 'vue'

const chartDom = ref<HTMLDivElement | null>(null)
let myChart: echarts.ECharts | null = null
const statMap = {
    Architecture: 80,
    Frontend: 90,
    Backend: 70,
    Collaboration: 65,
    Optimisation: 50,
    Débug: 45,
}

onMounted(() => {
    initChart()
})

onUnmounted(() => {
    if (myChart) {
        myChart.dispose()
    }
})

function initChart() {
    if (!chartDom.value) return

    myChart = echarts.init(chartDom.value)

    const option = {
        tooltip: {
            trigger: 'item',
        },
        radar: {
            indicator: Object.keys(statMap).map((name) => ({ name, max: 100 })),
            axisName: {
                color: 'black',
                fontSize: 16,
            },
            axisLine: {
                lineStyle: {
                    color: 'white',
                    width: 3,
                },
            },
            splitLine: {
                show: false,
            },
            splitArea: {
                show: true,
                areaStyle: {
                    color: '#dbdbd9',
                },
            },
        },
        series: [
            {
                name: 'Statistiques',
                type: 'radar',
                data: [
                    {
                        value: Object.values(statMap),
                        areaStyle: {
                            color: '#9899e8',
                        },
                        itemStyle: {
                            color: 'transparent',
                        },
                        label: {
                            show: true,
                            color: 'black',
                            fontSize: 14,
                        },
                    },
                ],
            },
        ],
    }

    myChart.setOption(option)
}
</script>

<template>
    <div ref="chartDom" class="h-full w-full"></div>
</template>
