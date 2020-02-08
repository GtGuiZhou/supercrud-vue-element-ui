<template>
    <div style="padding: 8px;">
        <div style="background-color: white;padding: 8px;">
            <div class="between" style="flex-wrap: wrap;">
                <div>
                    <el-button plain icon="el-icon-refresh" @click="refreshTable"></el-button>
                    <el-button type="primary" plain @click="insert"
                               icon="el-icon-circle-plus">
                        新增
                    </el-button>
                </div>
                <div>
                    <el-input style="width: 250px" v-model="searchContent" placeholder="请输入搜索内容"></el-input>
                    <el-button type="success" plain icon="el-icon-search" @click="search">搜索</el-button>
                </div>
            </div>
        </div>

        <!--表格-->
        <el-table
                style="margin: 10px 0;height: 450px;overflow-y: auto"
                :data="tableData"
        >
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="role.name" label="所属角色"></el-table-column>
            <el-table-column prop="create_time" label="创建时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="success" size="mini" plain @click="insert()">添加</el-button>
                        <el-button type="warning" size="mini" plain @click="update(scope.row.id,scope.row)">编 辑</el-button>
                        <el-button type="danger" size="mini" plain @click="_delete(scope.row.id)">删 除</el-button>
                    </template>
                </el-table-column>
        </el-table>

        <!--分页-->
        <div style="text-align: center;background-color: white;padding: 8px;">
            <el-pagination
                    @size-change="setPagingSize"
                    @current-change="setPagingIndex"
                    :current-page="pageIndex"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal">
            </el-pagination>
        </div>

        <el-dialog
                :title="formTitle"
                :visible.sync="visualForm"
                :append-to-body="true"
        >
            <admin-form v-if="visualForm" ref="form"></admin-form>
        </el-dialog>
    </div>
</template>

<script>
    import table from '../../../mixin/admin/table'
    import AdminForm from "./Form";

    export default {
        name: "Rule",
        components: {AdminForm},
        mixins: [table],
        data() {
            return {
                url: '/admin/childrenAdmin'
            }
        },
        methods: {

        }
    }
</script>

<style scoped>

</style>