// 由于懒加载页面太多的话会造成webpack热更新太慢，所以开发环境不使用懒加载，只有生产环境使用懒加载
const _import = process.env.NODE_ENV === 'development'?file => require('@/pages/' + file).default:file => () => import('@/pages/' + file)

const sortRouter = (path, name = null, component = null) => {
    if (!component) {
        component = path.split('/:')[0]
    }
    if (!name) {
        name = component.replace(/\//g, "-")
    }
    return {
        name: name,
        path: '/' + path,
        component: _import(component)
    }
}


/**
 * menu: 表明这是一个菜单路由，这个路由就会出现在菜单栏上
 * label: 出现在菜单上的名称
 * parent: 他的上一级菜单,依据是定义路由的name属性,根节点为root
 */
export default [
    {
        name:'admin-app',
        component:_import('Container'),
        path: '/admin',
        redirect: '/admin/welcome',
        children: [
            {name:'config',path:'/admin/config',component: _import('container/config/Index'),label: '配置',menu: true,parent: 'root'},
            {name:'role',path:'/admin/role',component: _import('container/role/Index'),label: '角色管理',menu: true,parent: "root"},
            {name:'admin',path:'/admin/admin',component: _import('container/admin/Index'),label: '管理员管理',menu: true,parent: "root"},
            {name:'user',path:'/admin/user',component: _import('container/user/Index'),label: '用户管理',menu: true,parent: "root"},
            {name:'welcome',path:'/admin/welcome',component: _import('container/welcome/Index'),label: '欢迎'},
            {name:'auth',path:'/admin/auth',component: _import('container/auth/Index')},
        ]
    },
    {name: 'index',redirect: '/admin','path':'/'},
    sortRouter('login','login','Login'),
    sortRouter('*','404','404')
]
