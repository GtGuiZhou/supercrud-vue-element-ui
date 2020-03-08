<template>
    <div v-loading="loading">
        <div style="text-align: center">爬虫访问简况</div>
        <div ref="chart"  :style="chartStyle">
        </div>
    </div>
</template>

<script>
    import {Chart} from '@antv/g2'
    import {number_to_simple_chinese} from "../../../common/common";
    export default {
        name: "CrawlerChart",
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
            chartStyle () {
                let style = {}
                if(this.width) style.width = this.width
                if(this.height) style.height = this.height
                return style
            }
        },
        async created() {
            let data = await this.$http.get('/admin/api-access-record/crawler')
            this.loading  = false
            let sum = 0
            data.forEach(item => sum += item.count)
            window.console.log(sum)
            data = data.map(item => {
                item.percent = item.count / sum
                item.label = item.crawler === 'yes'?'爬虫':'正常'
                return item
            })
            this.chart = new Chart({
                container: this.$refs.chart,
                autoFit: true,
            });

            let chart = this.chart
            chart.coordinate('theta', {
                radius: 0.75,
                innerRadius: 0.6,
            });

            chart.tooltip({
                showTitle: false,
                showMarkers: false,
                itemTpl: '<li class="g2-tooltip-list-item"><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>',
            });

            // 辅助文本
            chart
                .annotation()
                .text({
                    position: ['50%', '50%'],
                    content: '总访问量',
                    style: {
                        fontSize: 14,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetY: -20,
                })
                .text({
                    position: ['50%', '50%'],
                    content: number_to_simple_chinese(sum) + '次',
                    style: {
                        fontSize: 20,
                        fill: '#8c8c8c',
                        textAlign: 'center',
                    },
                    offsetY: 20,
                })


            chart.data(data);

            chart.scale('percent', {
                formatter: (val) => {
                    val = (val * 100).toFixed(2) + '%';
                    return val;
                },
            });

            chart.tooltip({
                showTitle: false,
                showMarkers: false,
            });

            chart
                .interval()
                .adjust('stack')
                .position('percent')
                .color('label')
                .label('percent',  (percent) => {
                    return {
                        content: (data) => {
                            return `${data.label}: ${(percent * 100).toFixed(2)}%`;
                        },
                    };
                })
                .tooltip('label*percent', (item, percent) => {
                    percent = percent * 100 + '%';
                    return {
                        name: item,
                        value: percent,
                    };
                });

            chart.interaction('element-active');
            chart.render();

        },
        methods: {}
    }
</script>

<style scoped>

</style>