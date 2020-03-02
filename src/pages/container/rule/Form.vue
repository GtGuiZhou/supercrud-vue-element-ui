<template>
    <el-form>
        <el-form-item label="父级" prop="pid">
            <br>
            <div style="height: 150px;overflow-y: auto">

                <el-tree @node-click="clickRoleNode" default-expand-all node-key="id" :data="menuList" :props="{children:'children',label:'name'}" >
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
        <el-form-item label="排序" prop="order">
            <el-input v-model="form.order"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
            <br>
            <div class="icon-box">
                <i :class="form.icon"></i>
            </div>
            <icon-list style="width: 100%;height: 200px;overflow-y: auto" @select="icon => {form.icon = icon}"></icon-list>
        </el-form-item>
        <el-form-item>
            <div style="text-align: center">
                <el-button type="primary" :loading="submitLoading" @click="submit">提 交</el-button>
            </div>
        </el-form-item>
    </el-form>
</template>

<script>
    import IconList from "../../../components/IconList";
    import FormMixin from '../../../mixin/admin/form'
    let rootRule =  {
        id: 0,
        name: '根规则',
    }
    export default {
        name: "RuleForm",
        mixins:[FormMixin],
        components: {IconList},
        data() {
            return {
                rootRule: rootRule,
                menuList: [],
                form: {
                    pid: 0,
                    name: '',
                    rule: '',
                    icon: '',
                    is_menu: 'yes',
                    order:0
                }
            }
        },
        mounted() {
            this.refreshMenu()
        },
        created() {
        },
        computed: {},
        methods: {
            clickRoleNode(node){
                this.form.pid = node.id
            },

            setPid(pid){
                this.form.pid = pid
                return this
            },
            refreshMenu(){
                this.$http.get('/admin/menu').then(
                    res => {
                        rootRule.children = res
                        this.menuList = [rootRule]
                    }
                )
            }
        }
    }
</script>

<style scoped>
    .icon-box {
        padding: 8px;
        border: 1px solid #DCDFE6;
        width: 30px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
        font-size: 1.2rem;
        margin: 8px 0;
    }

    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
    }
</style>