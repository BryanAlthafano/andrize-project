class WorkflowtSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.initSwiper()
    this.attachEvents()

    // handle resize for re-render component
    // this._handleResize = this._handleResize.bind(this)
    // window.addEventListener('resize', this._handleResize)
  }

  disconnectedCallback () {
    window.removeEventListener('resize', this._handleResize)
    window.removeEventListener('scroll', this._scrollHandler)

    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  }

  initData () {
    this.workflowList = [
      {
        id: 1,
        description: 'Post Your Project',
        url: 'video-1-v2'
      },
      {
        id: 2,
        description: 'Get Proposals',
        url: 'video-2-v2'
      },
      {
        id: 3,
        description: 'Pick, Fund & Launch',
        url: 'video-3-v2'
      }
    ]
  }

  // init swiper js
  initSwiper () {
    const self = this

    this._swiper = new Swiper('.workflow-v2-card-wrapper', {
      loop: false,

      mousewheel: false,
      grabCursor: true,

      observer: true,
      observeParents: true,

      // responsive
      breakpoints: {
        0: {
          slidesPerView: 'auto',
          spaceBetween: 20
        },
        750: {
          slidesPerView: 'auto',
          spaceBetween: 20
        }
      },

      // navigation
      navigation: {
        nextEl: '.workflow-v2-next-button',
        prevEl: '.workflow-v2-prev-button'
      },

      on: {
        init: function () {
          self.updateNavButtons(this)

          // autoplay video
          if (self._handleScroll) self._handleScroll()
        },
        slideChange: function () {
          self.updateNavButtons(this)

          // autoplay video
          if (self._handleScroll) self._handleScroll()
        },
        transitionEnd: function () {
          // autoplay video
          if (self._handleScroll) self._handleScroll()
        }
      }
    })
  }

  // function for update navigation buttons
  updateNavButtons (swiper) {
    const prevButton = document.querySelector('.workflow-v2-prev-button')
    const nextButton = document.querySelector('.workflow-v2-next-button')
    const lastIndex = swiper.slides.length - swiper.params.slidesPerView

    if (swiper.activeIndex <= 0) {
      prevButton.classList.add('disabled')
    } else {
      prevButton.classList.remove('disabled')
    }

    if (swiper.activeIndex >= lastIndex) {
      nextButton.classList.add('disabled')
    } else {
      nextButton.classList.remove('disabled')
    }
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // handle autoplay/pause video on scroll
    this.attachScrollEventForVideos()
  }

  attachScrollEventForVideos () {
    this._handleScroll = () => {
      const videos = this.querySelectorAll(
        'video:not([style*="display: none"])'
      )

      videos.forEach(video => {
        const rect = video.getBoundingClientRect()

        // calculate the height
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const heightRatio = visibleHeight / rect.height

        // calculate the width
        const visibleWidth =
          Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0)
        const widthRatio = visibleWidth / rect.width

        if (heightRatio >= 0.9 && widthRatio >= 0.9) {
          if (video.paused) {
            // console.log('play', video)
            video.play().catch(() => {})
          }
        } else {
          if (!video.paused) {
            // console.log('paused', video)
            video.pause()
          }
        }
      })
    }

    window.addEventListener('scroll', this._handleScroll)
    this._handleScroll() // Run on first mount
  }

  _handleResize () {
    clearTimeout(this._resizeTimeout)
    this._resizeTimeout = setTimeout(() => {
      // 1. save time all video
      const times = {}
      this.querySelectorAll('video').forEach(video => {
        const key = video.className // use class for key
        times[key] = {
          currentTime: video.currentTime,
          wasPlaying: !video.paused
        }
      })

      // 2. re-Render
      this.render()
      this.attachEvents()

      // Re-init swiper & update
      if (this._swiper) this._swiper.update()

      // 3. Restore
      this.querySelectorAll('video').forEach(video => {
        const key = video.className
        const saved = times[key]
        if (saved) {
          video.currentTime = saved.currentTime
          if (saved.wasPlaying) {
            video.play().catch(() => {})
          }
        }
      })
    }, 200)
  }

  getTemplate () {
    return `
        <section class="workflow-v2-wrap spacing-beween-section">
          <div class="workflow-v2-container">
            <div class="heading-container">
                <p class="title">How It Works</p>
            </div>
    
            <div class="carousel-container swiper">
                <div class="workflow-v2-card-wrapper">
                  <div class="carousel-track swiper-wrapper">
                    ${this.workflowList
                      .map((workflow, index) => {
                        return `
                      <div class="card swiper-slide" data-key="${
                        workflow?.id
                      }"> 
                        <div class="video-container">
                            <video class="post-video" controls muted playsInline>
                                <source src="assets/videos/${
                                  workflow?.url
                                }.mp4" type="video/mp4">
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div class="content-container">
                            <p class="text">${index + 1}. ${
                          workflow?.description
                        }</p>
                        </div> 
                    </div> `
                      })
                      .join('')}
                  </div>
                </div>

                <div class="carousel-controls">
                    <div class="navigation-container">
                        <div>
                          <button class="workflow-v2-prev-button">➝</button>
                        </div>
                        <div>
                          <button class="workflow-v2-next-button">➝</button>
                        </div>
                    </div> 
                </div>
            </div>
          </div>
        </section>
    `
  }
}

customElements.define('workflow-section', WorkflowtSection)
