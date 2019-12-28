import ChineseInput from '../demos/ChineseInput'
import useEventListener from '../demos/UseEventListener'
// import ScrollbarDemo from '../demos/ScrollbarDemo'
import FileSaverDemo from '../demos/FileSaverDemo'
import AreaSelectDemo from '../demos/AreaSelectDemo'
import ReactIntlDemo from '../demos/ReactIntlDemo'

export default [
    {
        path: '/chinese-input',
        name: '中文输入搜索',
        component: ChineseInput
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
]
