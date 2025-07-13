<template>
  <div>
    <h1>固定幅400pxのスライダー</h1>
    <ClientOnly>
      <Swiper
  :modules="[Autoplay]"
  :loop="true"
  :looped-slides="slides.length + 2"
  :autoplay="{ delay: 1000, disableOnInteraction: false }"
  :slides-per-view="'auto'"
  :centered-slides="true"
  space-between="40"
  class="mySwiper"
>   <SwiperSlide
        v-for="(slide, index) in slides"
        :key="index"
        style="width: 400px"
      >
        <img :src="slide.image" :alt="slide.alt" />
      </SwiperSlide>
    </Swiper>
  </ClientOnly>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'

const slides = [
  { image: '/images/slider/slider1.webp', alt: 'スライド1' },
  { image: '/images/slider/slider2.webp', alt: 'スライド2' },
  { image: '/images/slider/slider3.webp', alt: 'スライド3' },
  { image: '/images/slider/slider4.webp', alt: 'スライド4' },
  { image: '/images/slider/slider5.webp', alt: 'スライド6' },
  { image: '/images/slider/slider6.webp', alt: 'スライド6' },
]
</script>

<style scoped>
.mySwiper {
  width: 100%;
  overflow: hidden;
  margin: 40px auto;
}

img {
  width: 400px;
  height: auto;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
}

/* swiper-wrapper に直接スタイルを適用する */
:deep(.swiper-wrapper) {
  justify-content: center;
}

:deep(.swiper-wrapper) {
  justify-content: center;
}

:deep(.swiper-slide:last-child) {
  margin-right: 0 !important;
}
</style>