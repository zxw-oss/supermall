import Vue from 'vue'
import VueRouter from 'vue-router'

// 组件懒加载
const Home = () =>
    import ('../views/home/Home.vue')

const Category = () =>
    import ('../views/category/Category.vue')

const Shoppingcard = () =>
    import ('../views/shoppingcard/Shoppingcard.vue')

const Profile = () =>
    import ('../views/profile/Profile.vue')

//引入商品详情的组件
const Detail = () =>
    import ('../views/detail/Detail.vue')



Vue.use(VueRouter)

const routes = [
    // 配置路由关系
    { path: '', redirect: '/home' },
    { path: '/home', component: Home },
    { path: '/category', component: Category },


    { path: '/shoppingcard', component: Shoppingcard },
    { path: '/profile', component: Profile },
    { path: '/detail/:iid', component: Detail },
]

const router = new VueRouter({
    routes,
    mode: 'history'
})

export default router