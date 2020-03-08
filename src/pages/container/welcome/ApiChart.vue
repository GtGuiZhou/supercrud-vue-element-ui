<template>
    <div v-loading="loading">
        <div style="text-align: center">Api访问简况</div>
        <div ref="chart" :style="chartStyle">
        </div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "ApiChart",
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
            let data = await this.$http.get('/admin/api-access-record/api')
            this.loading = false
            data = data.map(item => {
                item.count = number_to_simple_chinese(item.count)
                item.avg = parseFloat(item.avg).toFixed(2)
                return item
            })
            this.chart = new Chart({
                container: this.$refs.chart,
                autoFit: true,
            });

            let chart = this.chart
            chart.data(data);
            chart.axis('avg', {
                label: {
                    formatter: (val) => {
                        return val + 'ms';
                    },
                },
            })
            chart.coordinate().transpose();
            chart.tooltip({
                showMarkers: false
            });
            chart.interaction('active-region');
            chart.interval().position('api*avg').label('avg', {
                style: {
                    fill: '#8d8d8d',
                },
                content: (obj) => {
                    return obj.avg + 'ms';
                },
                offset: 10,
            })
            chart.render();

        },
        methods: {}
    }
</script>

<style scoped>

</style>