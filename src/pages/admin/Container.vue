<template>
    <full-screen>
        <el-container style="width: 100%;height: 100%">
            <el-header class="header">
                <div class="title"><i class="el-icon-cold-drink"></i>SuperCrud</div>
            </el-header>
            <el-container>
                <el-aside width="200px" class="aside" style="border-right: solid 1px #e6e6e6;">
                    <el-menu style="border: 0">
                        <template v-for="(menu,key) in menuList">
                            <el-submenu :index="key + ''" v-if="menu.sub_menu.length > 0" :key="key">
                                <template slot="title">
                                    <i :class="menu.icon" v-if="menu.icon"></i>
                                    <span slot="title">{{menu.name}}</span>
                                </template>
                                <el-menu-item v-for="(subMenu,subKey) in menu.sub_menu" :index="key + '-' + subKey"
                                              :key="key-subKey" @click="$router.push(subMenu.url)">
                                    <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                                    <span slot="title">{{subMenu.name}}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item :index="key + ''" :key="key" v-else @click="$router.push(menu.url)">
                                <i :class="menu.icon" v-if="menu.icon"></i>
                                {{menu.name}}
                            </el-menu-item>
                        </template>
                    </el-menu>
                </el-aside>


                <el-main class="main">
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </full-screen>
</template>

<script>
    import FullScreen from "../../components/FullScreen";

    export default {
        name: "Container",
        components: {FullScreen},
        data() {
            return {
                menuList: [
                    {'icon': 'el-icon-setting', 'name': '系统配置', url: '/admin/sysconfig', sub_menu: []},
                    {'icon': 'el-icon-user-solid', 'name': '管理员管理', url: '/admin/admin', sub_menu: []},
                    {'icon': 'el-icon-user', 'name': '用户管理', url: '/admin/user', sub_menu: []},
                    {'icon': 'el-icon-document', 'name': '用户币种记录', url: '/admin/user_coin_record', sub_menu: []},
                    {'icon': 'el-icon-postcard', 'name': '实名认证', url: '/admin/user_real_verify', sub_menu: []},
                    {'icon': 'el-icon-s-promotion', 'name': '项目管理', url: '/admin/item', sub_menu: []},
                    {'icon': 'el-icon-s-order', 'name': '项目订单', url: '/admin/item_order', sub_menu: []},
                    {'icon': 'el-icon-coin', 'name': '币种管理', url: '/admin/coin', sub_menu: []},
                    {'icon': 'el-icon-add-location', 'name': '充值管理', url: '/admin/user_invest', sub_menu: []},
                    {'icon': 'el-icon-delete-location', 'name': '提现管理', url: '/admin/atm', sub_menu: []},
                    {'icon': 'el-icon-message-solid', 'name': '公告管理', url: '/admin/notice', sub_menu: []},
                ]
            }
        },
        methods: {}
    }
</script>

<style scoped>
    .header{
        border-bottom: 1px solid #e6e6e6;
    }

    .header .title{
        float: left;
        padding: 10px;
        font-weight: bold;
        font-size: 20px;
    }

    .main{
        padding: 0;
    }
</style>
