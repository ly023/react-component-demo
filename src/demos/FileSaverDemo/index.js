/**
 * FileSaver下载文件
 */
import React from 'react'
import FileDownload from './components/FileDownload'

export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
        }
    }

    beforeDownload = () => {
        this.setState({loading: true})
    }

    afterDownload = () => {
        this.setState({loading: false})
    }

    render() {
        const {loading} = this.state
        const url = 'https://crm-new-test-1256249764.picsh.myqcloud.com/3/20/822acd99dd57f5ac30be15e9d009c2ea.jpg'
        const name = '自定义文件名'

        return (
            <div>
                <FileDownload
                    url={url}
                    name={name}
                    onBeforeDownload={this.beforeDownload}
                    onAfterDownload={this.afterDownload}
                    allowDownload={!loading}
                >
                    {
                        loading ? <span>加载中</span> : <button>点击下载资源文件（前提：资源允许xhr跨域下载）</button>
                    }
                </FileDownload>
            </div>
        )
    }
}
