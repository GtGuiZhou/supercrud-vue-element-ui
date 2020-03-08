<template>
    <div>
        <sp-card>
            <div id="container"></div>
        </sp-card>
        <el-table :data="loginRecord" border height="500px">
            <el-table-column label="ip" prop="ip"></el-table-column>
            <el-table-column label="地址" prop="address"></el-table-column>
            <el-table-column label="登录时间" prop="create_time"></el-table-column>
        </el-table>
    </div>
</template>

<script>
    import moment from 'moment'
    import SpCard from "../../../components/SpCard";
    import {Chart} from '@antv/g2'
    import {array_group_count} from "../../../common/common";

    export default {
        name: "LoginRecord",
        components: {SpCard},
        data() {
            return {
                loginRecord: []
            }
        },
        computed: {},
        created() {
            this.$http.get('/admin/login-record').then(
                res => {
                    this.loginRecord = res
                    this.initChart()
                }
            )
        },
        methods: {

            initChart() {
                const chart = new Chart({
                    container: 'container',
                    autoFit: true,
                    height: 170,
                });
                let data = this.loginRecord.map(item => {
                    item.create_time = moment(item.create_time).format('YYYY-MM-DD')
                    return item
                })
                data = array_group_count(data, 'create_time')

                data = data.map(item => {
                    return {'日期': item.create_time, '登录次数': item.count}
                })

                chart.data(data);

                chart.tooltip({
                    showCrosshairs: true,
                    shared: true,
                });

                chart.axis('登录次数', {
                    label: {
                        formatter: (val) => {
                            return val + '次';
                        },
                    },
                });

                chart.area().position('日期*登录次数');
                chart.line().position('日期*登录次数');

                chart.render();

            }
        }
    }
</script>

<style scoped>

</style>