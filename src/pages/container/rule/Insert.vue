<template>
    <el-form>
        <el-form-item label="父级" prop="pid">
            <br>
            <div style="height: 150px;overflow-y: auto">
                <el-tree  :default-expanded-keys="[rootRule.id]" node-key="id" :data="menuList" :props="{children:'children',label:'name'}" >
                    <div class="custom-tree-node"  slot-scope="{node,data}">
                        <label>{{node.label}}</label>

                        <el-radio style="float: right" :label="data.id" v-model="form.pid">选中</el-radio>
                    </div>
                </el-tree>
            </div>
        </el-form-item>
        <el-form-item label="规则名称" prop="name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="路由规则" prop="rule">
            <el-input v-model="form.rule"></el-input>
        </el-form-item>
        <el-form-item label="菜单" prop="is_menu">
            <el-radio v-model="form.is_menu" label="yes" >是</el-radio>
            <el-radio v-model="form.is_menu" label="no" >否</el-radio>
        </el-form-item>
        <el-form-item label="图标" prop="icon"></el-form-item>
        <el-form-item>
            <div style="text-align: center">
                <el-button type="primary" @click="submit">新 增</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    let rootRule =  {
        id: 0,
        name: '根规则',
    }
    export default {
        name: "InsertRule",
        data() {
            return {
                rootRule: rootRule,
                menuList: [],
                submitLoading: false,
                form: {
                    pid: this.pid,
                    name: '',
                    rule: '',
                    icon: '',
                    is_menu: 'yes'
                }
            }
        },
        mounted() {
            this.refreshMenu()
        },
        computed: {},
        methods: {
            refreshMenu(){
                this.$http.get('/admin/menu').then(
                    res => {
                        rootRule.children = res
                        this.menuList = [rootRule]
                    }
                )
            },
            setPid(pid){
                this.form.pid = pid
            },

            getForm(){
                return this.form
            },

            async submit(){
                this.$http.put('/admin/rule',this.form)
            }
        }
    }
</script>

<style scoped>


    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>