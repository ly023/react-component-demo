/**
 * 商城商品详情轮播图（视频+图片）
 */
import React from 'react'
import Carousel from './components/Carousel'

function ProductDetailDemo() {
    const images = [
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/3d4471e85f5c60e4fd4ccb7de78a1732.jpg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/ad668e7e6ea45b5f144a2a79c46ce1aa.jpg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/1aa8b60a7473ae92d201fae0da59102d.jpg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/df7ee88f16e47aa68870c96e221e868b.jpg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/361bf1aa088734a851c6e4d1db8c0641.png',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/201/149a6502ec62f6a44fc6c4c544a63d24.png',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/95cf71f3ea4c0e6a97bf5559636a3a21.jpeg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/d359e29939b9b67f369bf75dbbdd1a54.png',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/46f4541877bd1f349a456d2197c0d063.jpeg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/08c27722890e1e29d3162d44158d9c58.jpg',
        'https://crm-new-test-1256249764.picsh.myqcloud.com/3/26/057106bf32bdfabc508a47a0b8058ba3.png',
        'https://crm-new-prod-1256249764.picsh.myqcloud.com/1/4178/35a4d4c925baa8567927a357acc50b17.jpg',
    ]

    const videos = [
        'https://crm-new-test-1256249764.cos.ap-shanghai.myqcloud.com/3/26/fe209784349afbad57acac657ef4570c.mp4',
        'https://crm-new-test-1256249764.cos.ap-shanghai.myqcloud.com/3/424/35207a0bb8a274e2ca07201d39c97be3.mp4',
    ]

    return <Carousel images={images} videos={videos}/>
}

export default ProductDetailDemo
