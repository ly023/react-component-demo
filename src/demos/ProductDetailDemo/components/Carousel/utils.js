const cosDomains = ['myqcloud.com']

export function isCOSUrl(url = '') {
    return cosDomains.findIndex((domain) => url.indexOf(domain) > -1) > -1
}

export function getOriginalUrl(url) {
    if (url) {
        return url.split('?')[0]
    }
    return url
}

export function getCOSThumbnail(url, width = 400, height) {
    if (!height) {
        height = width
    }
    if (url) {
        if (!isCOSUrl(url)) {
            return url
        }
        const picUrl = getOriginalUrl(url)

        return `${picUrl}?imageMogr2/thumbnail/${width}x${height}`
    }
    return url
}

export function getCOSVideoCover(name = '') {
    if (name) {
        if (!isCOSUrl(name)) {
            return name
        }

        const index = name.lastIndexOf('.')
        if (index === -1) {
            return name
        }
        return `${name.slice(0, name.lastIndexOf('.'))}_snapshotByOffset_10_0.jpg`
    }

    return name
}

/**
 * canvas获取视频封面
 */
export function genVideoCover(url, callback, second = 1) {
    const video = document.createElement('video')
    video.setAttribute('crossorigin', 'anonymous')
    // 取视频第n秒
    video.addEventListener('loadeddata', function () {
        this.currentTime = second
    })
    video.addEventListener('seeked', function () {
        const imageUrl = canvasToDataUrl(video)
        callback && callback(imageUrl)
    })
    video.addEventListener('error', function () {
        callback && callback()
    })
    video.src = url
}

export function canvasToDataUrl(video, isThumbnail) {
    const canvas = document.createElement('canvas')
    canvas.height = video.videoHeight
    canvas.width = video.videoWidth
    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    // 设置图片质量，缩略图取0.35
    const quality = isThumbnail ? 0.35 : 0.75
    return canvas.toDataURL('image/jpeg', quality)
}
