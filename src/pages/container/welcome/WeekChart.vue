<template>
    <div v-loading="loading">
        <div style="text-align: center">星期访问总分布</div>
        <div ref="chart"  :style="chartStyle">
        </div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {number_to_simple_chinese} from "../../../common/common";

    export default {
        name: "WeekChart",
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
            let data = await this.$http.get('/admin/api-access-record/week')
            this.loading = false
            this.chart = new Chart({
                container: this.$refs.chart,
                autoFit: true,
            });

            let chart = this.chart
            chart.data(data);
            chart.tooltip({
                showCrosshairs: true,
                shared: true,
            });
            const weeks = ['周日','周一','周二','周三','周四','周五','周6']
            chart.axis('week', {
                label: {
                    formatter: (val) => {
                        return weeks[val];
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
            chart.area().position('week*count');
            chart.line().position('week*count');

            chart.render();

        },
        methods: {}
    }
</script>

<style scoped>

</style>