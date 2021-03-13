import ChineseInput from '../demos/ChineseInput'
import useEventListener from '../demos/UseEventListener'
// import ScrollbarDemo from '../demos/ScrollbarDemo'
import FileSaverDemo from '../demos/FileSaverDemo'
import AreaSelectDemo from '../demos/AreaSelectDemo'
import ReactIntlDemo from '../demos/ReactIntlDemo'
import ProductDetailDemo from '../demos/ProductDetailDemo'
import RangeDemo from '../demos/RangeDemo'
import FlopAnimationDemo from '../demos/FlopAnimationDemo'
import CustomDateRange from '../demos/CustomDateRange'

export default [
    {
        path: '/chinese-input',
        name: '中文输入搜索',
        component: ChineseInput,
    },
    {
        path: '/custom-date-range',
        name: '自定义日期范围选择',
        component: CustomDateRange,
    },
    {
        path: '/use-event-listener',
        name: 'useEventListener',
        component: useEventListener
    },
    // {
    //     path: '/custom-scrollbar',
    //     name: '自定义滚动条 demo',
    //     component: ScrollbarDemo,
    // },
    {
        path: '/file-saver',
        name: 'fileSaver文件下载 demo',
        component: FileSaverDemo
    },
    {
        path: '/area-select',
        name: '地区选择 demo',
        component: AreaSelectDemo
    },
    {
        path: '/react-intl',
        name: '国际化 demo',
        component: ReactIntlDemo
    },
    {
        path: '/react-swiper-magnifier',
        name: '商品轮播放大镜',
        component: ProductDetailDemo
    },
    {
        path: '/react-range',
        name: 'range demo',
        component: RangeDemo,
    },
    {
        path: '/react-flop',
        name: '翻牌动画',
        component: FlopAnimationDemo,
    },
]
