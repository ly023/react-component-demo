import ScrollbarDemo from '../demos/ScrollbarDemo'
import FileSaverDemo from '../demos/FileSaverDemo'
import AreaSelectDemo from '../demos/AreaSelectDemo'

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
    }
]
