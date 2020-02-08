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


export default [
    {
        name:'admin-app',
        component:_import('Container'),
        path: '/admin',
        redirect: '/admin/welcome',
        children: [
            {name:'rule',path:'/admin/rule',component: _import('container/rule/Index')},
            {name:'role',path:'/admin/role',component: _import('container/role/Index')},
            {name:'admin',path:'/admin/admin',component: _import('container/admin/Index')},
            {name:'welcome',path:'/admin/welcome',component: _import('container/Welcome')},
            {name:'crud',path:'/admin/crud',component: _import('container/Crud')},
            {name:'test',path:'/admin/test',component: _import('container/Test')},
        ]
    },
    sortRouter('login','login','Login'),
    sortRouter('*','404','404')
]
