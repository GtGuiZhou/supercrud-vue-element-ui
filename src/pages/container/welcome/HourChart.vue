<template>
    <div v-loading="loading">
        <div style="text-align: center">24小时访问分布</div>
        <div ref="chart"  :style="chartStyle">
        </div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "HourChart",
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
                data: [],
                chart: null,
                loading: true
            }
        },
        computed: {
          chartStyle () {
              let style = {}
              if(this.width) style.width = this.width
              if(this.height) style.height = this.height
              return style
          }
        },
        async mounted() {
            let res = await this.$http.get('/admin/api-access-record/hour')
            this.loading = false
            this.chart = new Chart({
                container: this.$refs.chart,
                autoFit: true,
            });
            let data = res.today.map(item => {
                item.type = '今日'
                return item
            }).concat(res.all.map(item => {
                item.type = '总体'
                return item
            }))
            // 计算平均每天访问量
            res.all.forEach(item => {
                item = {...item}
                item.type = '平均'
                item.count = parseFloat(item.count / res.diff_days).toFixed(2)
                data.push(item)
            })

            let chart = this.chart
            chart.data(data);
            chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            chart.axis('hour', {
                label: {
                    formatter: (val) => {
                        return val + '时';
                    },
                },
            });
            chart.axis('count', {
                label: {
                    formatter: (val) => {
                        return number_to_simple_chinese(val) + '次';
                    },
                },
            });
            chart.area().position('hour*count').color('type')
            chart.line().position('hour*count').color('type')

            chart.render();

        },
        methods: {}
    }
</script>

<style scoped>

</style>