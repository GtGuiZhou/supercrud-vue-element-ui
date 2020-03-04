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
            {name:'role',path:'/admin/role',component: _import('container/role/Index'),label: '角色管理',menu: true,parent: "root"},
            {name:'admin',path:'/admin/admin',component: _import('container/admin/Index'),label: '管理员管理',menu: true,parent: "root"},
            {name:'welcome',path:'/admin/welcome',component: _import('container/Welcome'),label: '欢迎'},
            {name:'crud',path:'/admin/crud',component: _import('container/Crud')},
            {name:'test',path:'/admin/test',component: _import('container/Test')},
        ]
    },
    {name: 'index',redirect: '/admin','path':'/'},
    sortRouter('login','login','Login'),
    sortRouter('*','404','404')
]
