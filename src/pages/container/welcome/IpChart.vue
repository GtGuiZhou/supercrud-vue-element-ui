<template>
    <div v-loading="loading">
        <div style="text-align: center">Ip访问简况</div>
        <div ref="chart" :style="chartStyle">
        </div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "IpChart",
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
            let data = await this.$http.get('/admin/api-access-record/ip')
            this.loading = false
            this.chart = new Chart({
                container: this.$refs.chart,
                autoFit: true,
            });

            let chart = this.chart
            chart.data(data);
            chart.axis('count', {
                label: {
                    formatter: (val) => {
                        return number_to_simple_chinese(val) + '次';
                    },
                },
            })
            chart.coordinate().transpose();
            chart.tooltip({
                showMarkers: false
            });
            chart.interaction('active-region');
            chart.interval().position('ip*count').label('count', {
                style: {
                    fill: '#8d8d8d',
                },
                content: (obj) => {
                    return number_to_simple_chinese(obj.count) + '次';
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