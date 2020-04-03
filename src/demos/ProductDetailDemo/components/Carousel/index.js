import React, {useState, useCallback, useMemo} from 'react'
import PropTypes from 'prop-types'
import Swiper from 'react-id-swiper'
import {SideBySideMagnifier} from 'react-image-magnifiers'
import {getCOSThumbnail} from './utils'
import VideoCover from './components/video-cover'

import 'swiper/css/swiper.css'
import styles from './index.less'

// 默认大图尺寸
const defaultGallerySize = {
    width: 400,
    height: 400,
}

// 默认大图样式
const defaultGalleryStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...defaultGallerySize,
}

// 默认小图尺寸
const defaultThumbSize = {
    width: 76,
    height: 76,
}

// 默认小图样式
const defaultThumbStyle = {
    ...defaultThumbSize,
    cursor: 'pointer',
    objectFit: 'contain',
}

const largeImageZoom = 3

function Carousel(props) {
    const {images, videos, swiperProps, gallerySize, galleryStyle, thumbSize, thumbStyle} = props

    const [swiper, setSwiper] = useState(null)
    const [activeIndex, setActiveIndex] = useState(0)

    const combGalleryStyle = {
        ...defaultGalleryStyle,
        ...galleryStyle,
        ...gallerySize,
    }

    const combThumbStyle = {
        ...defaultThumbStyle,
        ...thumbStyle,
        ...thumbSize,
    }

    const combGallerySize = {
        ...defaultGallerySize,
        ...gallerySize,
    }

    const combThumbSize = {
        ...defaultThumbSize,
        ...thumbSize,
    }

    const thumbWrapperStyle = {
        width: combGalleryStyle.width
    }

    // 轮播图点击选中
    const handleThumbClick = useCallback((clickedIndex) => {
        if (swiper !== null) {
            // const {clickedIndex} = swiper
            if (typeof clickedIndex === 'number') {
                setActiveIndex(clickedIndex)
            }
        }
    }, [swiper])

    // 视频与图片缩略图
    const getThumbs = useCallback(() => {
        let videoThumbs = []
        // 视频缩略图
        if (videos.length) {
            videoThumbs = videos.map((url, index) => <VideoCover
                    key={index}
                    url={url}
                    onClick={() => handleThumbClick(index)}
                    videoSize={combThumbSize}
                    cls={`swiper-slide ${styles.thumbSlide} ${activeIndex === index ? styles.activeSlide : ''}`}
                />)
        }
        // 图片缩略图
        const imageThumbs = images.map((url, index) => {
            const realIndex = videos.length + index
            return <img
                key={realIndex}
                src={getCOSThumbnail(url, combThumbSize.width * 2, combThumbSize.height * 2)}
                onClick={() => handleThumbClick(realIndex)}
                style={combThumbStyle}
                className={`${styles.thumbSlide} ${activeIndex === realIndex ? styles.activeSlide : ''}`}
                alt=""
            />
        })
        return videoThumbs.concat(imageThumbs)
    }, [images, videos, activeIndex, handleThumbClick, combThumbStyle, combThumbSize])

    // 默认轮播图config
    const defaultSwiperProps = useMemo(() => ({
        spaceBetween: 16,
        slidesPerView: 'auto',
        slideToClickedSlide: true, // 点击slide会过渡到这个slide
        shouldSwiperUpdate: true, // 组件更新时更新Swiper
        observer: true,
        observeParents: true,
        getSwiper: setSwiper,
        on: {},
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        renderNextButton: () => <div className={`swiper-button-next ${styles.next}`}/>,
        renderPrevButton: () => <div className={`swiper-button-prev ${styles.prev}`}/>,
    }), [])

    // 轮播图config
    const combSwiperProps = {
        ...defaultSwiperProps,
        ...swiperProps,
    }

    // sides不足一行不显示前进后退按钮
    const shouldShowNavigation = useCallback(() => {
        if (swiper !== null) {
            const {size, virtualSize} = swiper
            return virtualSize > size
        }
    }, [swiper])

    // 放大镜config
    const getGalleryMagnifierProps = useCallback(() => {
        const url = images[activeIndex - videos.length]
        const {width, height} = combGallerySize
        return {
            imageSrc: getCOSThumbnail(url, width, height),
            // largeImageSrc: url,
            // todo ??? 小图或长图的情况下需要放大倍数
            largeImageSrc: getCOSThumbnail(url, width * largeImageZoom, height * largeImageZoom),
            alwaysInPlace: false,
            fillAvailableSpace: false,
            style: {
                display: 'inline-block',
            },
            overlayBox: {
                width: 100,
                height: 100
            }
        }
    }, [images, videos, activeIndex, combGallerySize])

    // 大图内容（图片或视频）
    const getGalleryContent = useCallback(() => {
        // 图片
        if(activeIndex >= videos.length) {
            return <SideBySideMagnifier {...getGalleryMagnifierProps()}/>
        }
        // 视频
        return <div style={combGalleryStyle} key={activeIndex}>
            <video
                controls="controls"
                preload="auto"
                className={styles.video}
            >
                <track kind="captions" />
                <source src={videos[activeIndex]} type="video/mp4" />
            </video>
        </div>
    }, [activeIndex, videos, getGalleryMagnifierProps, combGalleryStyle])

    return <div>
        <div style={combGalleryStyle}>
            {getGalleryContent()}
        </div>
        {
            images.length &&
            <div style={thumbWrapperStyle}
                 className={`${styles.thumbs} ${shouldShowNavigation() ? styles.showNavigation : styles.hideNavigation}`}
            >
                <Swiper {...combSwiperProps}>
                    {getThumbs()}
                </Swiper>
            </div>
        }
    </div>
}

Carousel.propTypes = {
    images: PropTypes.arrayOf(PropTypes.string),
    videos: PropTypes.arrayOf(PropTypes.string),
}

Carousel.defaultProps = {
    images: [],
    videos: [],
}

export default Carousel
