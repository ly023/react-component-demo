import React, {useState, useCallback} from 'react'
import PropTypes from 'prop-types'
import {LoadingOutlined} from '@ant-design/icons'
import {getCOSVideoCover, genVideoCover} from '../../utils'

import styles from './index.less'

function VideoCover(props) {
    const {url, videoSize, cls, mask, onClick, onLoad} = props

    const [coverUrl, setCoverUrl] = useState(getCOSVideoCover(url))
    const [coverLoading, setCoverLoading] = useState(false)
    const [useSnapshot] = useState(true)
    const [useCanvasCover, setUseCanvasCover] = useState(false)

    const handleError = useCallback(() => {
        if (useSnapshot && useCanvasCover) {
           return
        }
        setCoverLoading(true)
        genVideoCover(url, (imageUrl) => {
            setCoverLoading(false)
            setUseCanvasCover(true)
            setCoverUrl(imageUrl)
        })
    }, [url, useSnapshot, useCanvasCover])

    const handleLoad = useCallback(() => {
        onLoad()
    }, [onLoad])

    const handleClick = useCallback(() => {
        if (url) {
            onClick(url)
        }
    }, [url, onClick])

    return (
        <div className={`${styles.video} ${cls}`} style={videoSize}>
            <div
                onClick={url ? handleClick : null}
                className={styles.mask}
            >
                {mask || (
                    <div className={`${styles.icon} ${url ? '' : styles.disabled}`}/>
                )}
            </div>
            {coverLoading ? (
                <div className={styles.loading}>
                    <LoadingOutlined style={{fontSize: 30}}/>
                </div>
            ) : (
                <img src={coverUrl} onError={handleError} onLoad={handleLoad} className={styles.cover} alt=""/>
            )}
        </div>
    )
}

VideoCover.propTypes = {
    url: PropTypes.string.isRequired,
    videoSize: PropTypes.object,
    onLoad: PropTypes.func,
    onClick: PropTypes.func,
    cls: PropTypes.string,
}

VideoCover.defaultProps = {
    onLoad(){},
    onClick() {},
    cls: '',
}

export default VideoCover
