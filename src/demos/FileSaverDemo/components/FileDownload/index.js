import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {saveAs} from 'file-saver'

export default class FileDownload extends Component {
    static propTypes = {
        url: PropTypes.string,
        name: PropTypes.string,
        allowDownload: PropTypes.bool,
        onBeforeDownload: PropTypes.func,
        onAfterDownload: PropTypes.func,
        onError: PropTypes.func,
    }

    static defaultProps = {}

    constructor(props) {
        super(props)
        this.state = {}
    }

    download = (url, name) => {
        if (this.props.allowDownload && url) {
            const {onBeforeDownload, onAfterDownload, onError} = this.props
            onBeforeDownload && onBeforeDownload()
            this.getBlob(url)
                .then((blob) => {
                    saveAs(blob, name)
                })
                .catch(() => {
                    onError && onError()
                })
                .finally(() => {
                    onAfterDownload && onAfterDownload()
                })
        }
    }

    getBlob = (url) =>
        new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('GET', url, true)
            xhr.responseType = 'blob'
            xhr.onload = () => {
                if (xhr.status === 200) {
                    resolve(xhr.response)
                } else {
                    reject()
                }
            }
            xhr.ontimeout = () => {
                reject()
            }
            xhr.onerror = () => {
                reject()
            }
            xhr.send()
        })

    render() {
        const {children, url, name} = this.props
        const onlyChildren = React.Children.only(children)

        return React.cloneElement(onlyChildren, {
            onClick: () => this.download(url, name),
        })
    }
}
