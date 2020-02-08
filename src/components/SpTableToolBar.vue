<template>
    <div>
        <div class="between" style="flex-wrap: wrap;">
            <div>
                <el-button plain icon="el-icon-refresh" @click="refresh"></el-button>
                <el-button type="primary" plain @click="insertRow" v-if="isAuth('insert')"
                           icon="el-icon-circle-plus">
                    新增
                </el-button>
                <el-button type="danger" plain @click="deleteSelection" :disabled="selection.length < 1"
                           icon="el-icon-delete-solid"
                           v-if="isAuth('delete')">删除选中
                </el-button>
            </div>
            <div>
                <el-input style="width: 250px" v-model="searchContent" placeholder="请输入搜索内容"></el-input>
                <el-button type="success" plain icon="el-icon-search">搜索</el-button>
                <el-button type="warning" plain icon="el-icon-s-operation" @click="toggleFilter">筛选</el-button>
                <el-button type="info" icon="el-icon-more" @click="visualMore = true"></el-button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SpTableToolBar",
        data() {
            return {}
        },
        computed: {},
        methods: {
            refresh(){

            }
        }
    }
</script>

<style scoped>

</style>