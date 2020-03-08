基于element-ui写的后台管理

### 路由和菜单的关系
#### 参数说明
- menu: 表明这是一个菜单路由，这个路由就会出现在菜单栏上
- label: 出现在菜单上的名称
- parent: 他的上一级菜单,依据是定义路由的name属性,根节点为root
#### 举例
`{name:'role',path:'/admin/role',component: _import('container/role/Index'),label: '角色管理',menu: true,parent: "root"}`

### 权限管理
有两种方式实现
方式一
在组件上使用`v-auth`指令鉴权,例如`v-auth="['put-admin/admin/<id>/password']"`,[]中的规则,当前登录管理员必须都拥有,如果没有该组件会被移除,比起方法二来方法一要简洁一点。
方式二
在组件上使用`v-if="$auth(rule)"`的方式鉴权,例如`v-if="$auth(['put-admin/admin/<id>/password'])"`,[]中的规则,当前登录管理员必须都拥有,如果没有$auth会返回false。
这种方式主要解决有些组件使用`v-auth`指令无法移除的问题,例如el-table-column



### crud模板
```vue
<template>
    <div>
        <sp-crud-template ref="crud" :url="url" :form="form"> //ref是为了方便访问里面的东西
            <template v-slot:table> 
                <el-table-column></el-table-column> // 表格列
            </template>
            <template v-slot:form="{sForm}"> // sForm是要提交的数据，你可以v-model="sForm.xxField"
                <el-form-item ></el-form-item> // 表单项目
            </template>
        </sp-crud-template>
    </div>
</template>

<script>
    // 导入crud模板，注意路径
    import SpCrudTemplate from "../../../components/SpCrudTemplate";
    export default {
        name: "Index",
        components: {SpCrudTemplate},
        data() {
            return {
                url: '', // 请求后端的url,restfull风格
                form: { // 新增的时候使用这个表单作为默认数据

                }
            }
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped>

</style>
```