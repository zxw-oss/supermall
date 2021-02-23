import { debounce } from './utils/utils';
import BackTop from 'components/content/backTop/BackTop.vue'
export const itemListenerMixin = {
    data() {
        return {
            itemImgListener: null,
            newRefresh: null
        }
    },
    mounted() {
        // 防抖的操作
        this.newRefresh = debounce(this.$refs.scroll.refresh, 100)

        this.itemImgListener = () => {
            this.newRefresh()
        }
        this.$bus.$on('itemImageLoad', this.itemImgListener)
            // console.log('我是混入的内容');
    }
}

export const backTopMixin = {
    components: {
        BackTop
    },
    data() {
        return {
            isShowBackTop: false
        }
    },
    methods: {
        backClick() {
            // 获取滚动的组件对象   在调用组件对象里的scroll属性  在吊scrollTo

            // 这样写太麻烦 不容易阅读  去返回顶部的组件内封装一下
            // this.$refs.scroll.scroll.scrollTo(0,0,500)

            // 直接获取组件调用组件里的scrollTo的方法
            this.$refs.scroll.scrollTo(0, 0, 500)

        }
    }
}