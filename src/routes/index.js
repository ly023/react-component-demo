import ScrollbarDemo from '../demos/ScrollbarDemo'
import FileSaverDemo from '../demos/FileSaverDemo'
import AreaSelectDemo from '../demos/AreaSelectDemo'
import ReactIntlDemo from '../demos/ReactIntlDemo'

export default [
    {
        path: '/custom-scrollbar',
        name: '自定义滚动 demo',
        component: ScrollbarDemo,
    },
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
    }
]
