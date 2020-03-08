<template>
    <welcome-container >
        <el-row :gutter="10" v-if="$auth(['get-admin/api-access-record/os','get-admin/api-access-record/api',
                'get-admin/api-access-record/ua','get-admin/api-access-record/device',
                'get-admin/api-access-record/crawler','get-admin/api-access-record/ip',
                'get-admin/api-access-record/week','get-admin/api-access-record/hour'
                ])">
            <el-col :span="8">
                <sp-card>
                    <crawler-chart height="300px"></crawler-chart>
                </sp-card>
            </el-col>
            <el-col :span="16">
                <sp-card >
                    <hour-chart height="300px"></hour-chart>
                </sp-card>
            </el-col>

            <el-col :span="12">
                <sp-card><api-chart height="300px"></api-chart></sp-card>
            </el-col>
            <el-col :span="12">
                <sp-card><os-chart height="300px"></os-chart></sp-card>
            </el-col>


            <el-col :span="12">
                <sp-card><ip-chart height="300px"></ip-chart></sp-card>
            </el-col>
            <el-col :span="12">
                <sp-card><device-chart height="300px"></device-chart></sp-card>
            </el-col>

            <el-col :span="24">
                <sp-card>
                    <week-chart height="300px"></week-chart>
                </sp-card>
            </el-col>
        </el-row>
    </welcome-container>
</template>

<script>

    import CrawlerChart from "./CrawlerChart";
    import SpCard from "../../../components/SpCard";
    import WelcomeContainer from "./WelcomeContainer";
    import HourChart from "./HourChart";
    import WeekChart from "./WeekChart";
    import ApiTable from "./ApiTable";
    import IpTable from "./IpTable";
    import ApiChart from "./ApiChart";
    import IpChart from "./IpChart";
    import OsChart from "./OsChart";
    import DeviceChart from "./DeviceChart";

    export default {
        name: "Welcome",
        components: {
            DeviceChart,
            OsChart,
            IpChart, ApiChart, IpTable, ApiTable, WeekChart, HourChart, WelcomeContainer, SpCard, CrawlerChart},
        data() {
            return {
                apiAccessRecord: []
            }
        },
        created() {
            window.console.log(this.$auth(['get-admin/api-access-record/os','get-admin/api-access-record/api',
                'get-admin/api-access-record/ua','get-admin/api-access-record/device',
                'get-admin/api-access-record/crawler','get-admin/api-access-record/ip',
                'get-admin/api-access-record/week','get-admin/api-access-record/hour'
            ]))
        },
        methods: {
            refreshApiAccessRecord() {
                this.$http.get('/admin/api-access-record').then(
                    res => {
                        this.apiAccessRecord = res
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .welcome {
        color: black;
        font-size: 64px;
    }

    .author {
        color: gray;
    }

    .background{
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
