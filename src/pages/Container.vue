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
                            你好， {{adminUsername}}<i class="el-icon-arrow-down el-icon--right"></i>
                        </div>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item ><span @click="logout">退出登录</span></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-container style="position: relative">
                <el-aside width="200px" class="aside" style="border-right: solid 1px #e6e6e6;">
                    <el-menu :default-active="$route.path.slice(1,$route.path.length)" style="border: 0">
                        <template v-for="menu in menuList">
                            <el-submenu :index="menu.rule" v-if="menu.children.length > 0" :key="menu.rule">
                                <template slot="title">
                                    <i :class="menu.icon" v-if="menu.icon"></i>
                                    <span>{{menu.name}}</span>
                                </template>
                                <el-menu-item v-for="subMenu in menu.children" :index="subMenu.rule"
                                              :key="subMenu.rule" @click="$router.push('/' + subMenu.rule)">
                                    <i :class="subMenu.icon" v-if="subMenu.icon"></i>
                                    <span >{{subMenu.name}}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item :index="menu.rule" :key="menu.rule" v-else @click="$router.push('/' + menu.rule)">
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
    import FullScreen from "../components/FullScreen";
    import Vue from 'vue'
    export default {
        name: "Container",
        components: {FullScreen},
        data() {
            return {
                adminUsername: '',
                menuList: [],
            }
        },

        created() {
            Vue.prototype.$refreshMenu = this.refreshMenu
        },

        mounted() {
            let adminUsername = localStorage.getItem('adminUsername')
            if (adminUsername) this.adminUsername = adminUsername
            this.refreshMenu()
        },

        methods: {
            refreshMenu(){
              this.$http.get('/admin/menu').then(
                  res => {
                      this.menuList = res
                  }
              )
            },

            async logout(){
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
        background-color: #e6e6e6;
        padding: 0;
        position: absolute;
        left: 200px;
        bottom: 0;
        right: 0;
        top: 0;
    }
</style>
