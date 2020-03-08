<template>
    <div v-loading="loading">
        <div style="text-align: center">访问系统分布简况</div>
        <div ref="chart" :style="chartStyle">
        </div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "OsChart",
        props: {
            width: {
                type: String,
                default: '',
            },
            height: {
                type: String,
                default: '',
            }
        },
        data() {
            return {
                loading: true,
                data: [],
                chart: null
            }
        },
        computed: {
            chartStyle() {
                let style = {}
                if (this.width) style.width = this.width
                if (this.height) style.height = this.height
                return style
            }
        },
        async created() {
            let data = await this.$http.get('/admin/api-access-record/os')
            this.loading = false
            this.chart = new Chart({
                container: this.$refs.chart,
                autoFit: true,
            });

            let chart = this.chart
            chart.data(data);

            chart.scale('sales', {
                nice: true,
            });

            chart.tooltip({
                showMarkers: false
            });
            chart.interaction('active-region');

            chart.interval().position('os*count').label('count',{
                content: (obj) => {
                    return number_to_simple_chinese(obj.count) + '次'
                }
            });

            chart.render();

        },
        methods: {}
    }
</script>

<style scoped>

</style>