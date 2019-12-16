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
        component: require('@/pages/' + component).default
    }
}


export default [

    {
        name:'admin-app',
        component:_import('AdminApp'),
        path: '/admin',
        redirect: '/admin/welcome',
        children: [
            {
                name:'admin-container',
                component:_import('admin/Container'),
                path: '/admin/container',
                redirect: '/admin/welcome',
                children: [
                    sortRouter('admin/welcome','welcome','admin/Welcome'),
                    sortRouter('admin/crud','crud','admin/Crud')
                ]
            },
        ]
    },
    sortRouter('*','404','404')
]
