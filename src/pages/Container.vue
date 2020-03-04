<template>
    <full-screen>
        <el-container style="width: 100%;height: 100%">
            <el-header class="header between">
                <router-link to="/admin/welcome" class="title"><i class="el-icon-cold-drink"></i>SuperCrud</router-link>
                <div class="toolbar">
                    <!--                    全屏-->
                    <i class="el-icon-full-screen" @click="toggleFullScreen"></i>
                    <!--                    日志-->
                    <i class="el-icon-tickets"></i>
                    <el-dropdown style="cursor: pointer">
                        <div>
                            你好， {{$store.state.admin.username}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <router-link to="/admin/auth"><span >个人中心</span></router-link>
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <span @click="logout">退出登录</span>
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container style="position: relative">
                <el-aside width="200px" class="aside" style="border-right: solid 1px #e6e6e6;">
                    <el-menu :default-active="$route.path" style="border: 0">
                        <template v-for="menu in menuList">
                            <el-submenu :index="menu.path" v-if="menu.children && menu.children.length > 0"
                                        :key="menu.path">
                                <template slot="title">
                                    <i :class="menu.icon" v-if="menu.icon"></i>
                                    <span>{{menu.label}}</span>
                                </template>
                                <el-menu-item v-for="subMenu in menu.children" :index="subMenu.path"
                                              :key="subMenu.path" @click="$router.push(subMenu.path)">
                                    <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                                    <span>{{subMenu.label}}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item :index="menu.path" :key="menu.path" v-else
                                          @click="$router.push(menu.path)">
                                <i :class="menu.icon" v-if="menu.icon"></i>
                                {{menu.label}}
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
    import FullScreen from "../components/FullScreen";
    import router from '../router/router'
    import {array_to_tree} from "../common/common";

    export default {
        name: "Container",
        components: {FullScreen},
        data() {
            return {
                adminMenu: [],
            }
        },
        computed: {
             menuList() {
                let root = router.find(item => item.name === 'admin-app')
                let menu = []
                try {
                    menu = root.children.filter(node => {
                        return this.$store.state.admin.root === 'yes' || this.adminMenu.find(item => item.path === node.path)
                    })
                    menu = array_to_tree(menu, 'root', 'name', 'parent')
                }catch (e) {
                    window.console.log(e)
                }
                return menu
            }
        },
        async mounted() {
            this.haveMenu = await this.$http.get('/admin/menu')
        },
        methods: {
            async logout() {
                await this.$http.put('/admin/logout')
                this.$router.replace('/login')
            },
            toggleFullScreen() {
                if (!document.fullscreenElement &&
                    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
                    if (document.documentElement.requestFullscreen) {
                        document.documentElement.requestFullscreen();
                    } else if (document.documentElement.msRequestFullscreen) {
                        document.documentElement.msRequestFullscreen();
                    } else if (document.documentElement.mozRequestFullScreen) {
                        document.documentElement.mozRequestFullScreen();
                    } else if (document.documentElement.webkitRequestFullscreen) {
                        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
                    }
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen();
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }
                }
            }

        }
    }
</script>

<style scoped>
    .header {
        border-bottom: 1px solid #e6e6e6;
    }

    .header .title {
        color: black;
        padding: 10px;
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
    }

    .header .toolbar {
        padding: 10px;
    }

    .header .toolbar i {
        cursor: pointer;
        padding: 0 10px;
        font-weight: bold;
    }


    .main {
        position: absolute;
        left: 200px;
        bottom: 0;
        right: 0;
        top: 0;
        padding: 10px;
    }
</style>
