<template>
    <full-screen v-loading="!$store.state.admin"     element-loading-text="初始化中请稍后">
        <full-parent v-if="$store.state.admin">
            <header class="between">
                <!--                todo: 在这里加入导航，参考https://auauz.net/system/role-->
                <router-link to="/admin/welcome" class="title"><i class="el-icon-cold-drink"></i>SuperCrud</router-link>
                <div class="toolbar">
                    <router-link to="/admin/auth">你好， {{$store.state.admin.username}}</router-link>
                    <!--                    全屏-->
                    <i class="el-icon-full-screen" @click="toggleFullScreen"></i>
                    <!--                    日志-->
                    <i class="el-icon-tickets"></i>
                    <i class="iconfont icon-tuichu" @click="logout"></i>
                </div>
            </header>
            <aside>
                <el-menu :default-active="$route.path" style="border: 0;width: 100%">
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
            </aside>

            <main>
                <router-view></router-view>
            </main>

            <footer >
                <small> Copyright © 2019-2020 GtGuiZhou. All Rights Reserved. GtGuiZhou 版权所有 </small>
            </footer>
        </full-parent>
    </full-screen>
</template>

<script>
    import FullScreen from "../components/FullScreen";
    import router from '../router/router'
    import {array_to_tree} from "../common/common";
    import SpCard from "../components/SpCard";
    import FullParent from "../components/FullParent";

    export default {
        name: "Container",
        components: {FullParent, SpCard, FullScreen},
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
                } catch (e) {
                    window.console.log(e)
                }
                return menu
            }
        },
        created() {
            // 初始化管理员
            this.$http.get('/admin').then(
                res => {
                    this.$store.commit('setAdmin', res)
                    this.$http.get('/admin/menu').then(
                        res => {
                            this.adminMenu = res
                        }
                    )
                }
            )
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
    header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 50px;
        border: 1px solid #e6e6e6;
        display: flex;
        align-items: center;
        background-color: white;
    }

    header .title {
        color: black;
        padding: 10px;
        font-weight: bold;
        font-size: 20px;
        text-decoration: none;
    }

    header .toolbar {
        padding: 10px;
    }

    header .toolbar i {
        cursor: pointer;
        padding: 0 10px;
        font-weight: bold;
    }

    aside {
        position: fixed;
        top: 50px;
        left: 0;
        bottom: 0px;
        width: 200px;
        border: 1px solid #e6e6e6;
        background-color: white;
    }


    main {
        position: fixed;
        top: 50px;
        left: 200px;
        right: 0;
        bottom: 50px;
        padding: 10px;
        background-color: white;
        border: 1px solid #e6e6e6;
        overflow-y: auto;
    }

    footer {
        z-index: -1;
        padding: 10px;
        position: fixed;
        left: 200px;
        right: 0;
        bottom: 0;
        height: 50px;
        display: flex;
        align-items: center;
        background-color: white;
        box-sizing: border-box;
        border: 1px solid #e6e6e6;
    }

    footer small {
        color: gray;
    }

    .avatar {
        width: 27px;
        height: 27px;
        line-height: 27px;
        border-radius: 20px;
    }
</style>
