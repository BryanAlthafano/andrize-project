class WorkflowSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.attachEvents()

    // handle resize for re-render component
    this._handleResize = this._handleResize.bind(this)
    window.addEventListener('resize', this._handleResize)
  }

  disconnectedCallback () {
    window.removeEventListener('resize', this._handleResize)
    window.removeEventListener('scroll', this._scrollHandler)

    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
      this._resizeObserver = null
    }
  }

  render () {
    this.innerHTML = this.getTemplate()
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

  attachEvents () {
    // handle video element
    this.attachEventVideos()

    // handle height of video (desktop)
    this.attachEventHeightOfRightSide()

    // handle autoplay/pause video on scroll
    this.attachScrollEventForVideos()
  }

  attachEventVideos () {
    const items = this.querySelectorAll('.item-container')
    const videos = this.querySelectorAll('.left-side video')

    items.forEach(item => {
      item.addEventListener('click', () => {
        // delete 'active' class from all items
        items.forEach(i => i.classList.remove('active'))
        item.classList.add('active')

        // get class name (post-video, hire-video, etc.)
        const targetClass = [...item.classList].find(cls =>
          cls.endsWith('-video')
        )

        // show relevant videos, hide others
        videos.forEach(video => {
          const videoClass = [...video.classList].find(cls =>
            cls.endsWith('-video')
          )
          if (videoClass === targetClass) {
            video.style.display = 'block'
          } else {
            video.pause()
            video.style.display = 'none'
          }
        })
        if (this._handleScroll) {
          this._handleScroll()
        }
      })
    })

    // hide all videos first, then show default video (from .active)
    videos.forEach(video => (video.style.display = 'none'))
    const activeVideoClass = [
      ...this.querySelector('.item-container.active').classList
    ].find(cls => cls.endsWith('-video'))
    const activeVideo = this.querySelector(`.left-side .${activeVideoClass}`)
    if (activeVideo) activeVideo.style.display = 'block'
    this.attachEventHeightOfRightSide()
  }

  attachEventHeightOfRightSide () {
    const rightSide = this.querySelector('.right-side')
    const leftSide = this.querySelector('.left-side')

    // cleanup observer lama
    if (this._resizeObserver) {
      this._resizeObserver.disconnect()
    }

    if (rightSide && leftSide) {
      this._resizeObserver = new ResizeObserver(() => {
        leftSide.style.height = `${rightSide.offsetHeight}px`
      })
      this._resizeObserver.observe(rightSide)
    }
  }

  attachScrollEventForVideos () {
    this._handleScroll = () => {
      const videos = this.querySelectorAll(
        'video:not([style*="display: none"])'
      )

      videos.forEach(video => {
        const rect = video.getBoundingClientRect()
        const visibleHeight =
          Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0)
        const visibleRatio = visibleHeight / rect.height

        // play when 80% of video is visible
        if (visibleRatio >= 0.8) {
          if (video.paused) {
            console.log('play')
            video.play().catch(() => {})
          }
        } else {
          if (!video.paused) {
            console.log('paused')
            video.pause()
          }
        }
      })
    }

    window.addEventListener('scroll', this._handleScroll)
    this._handleScroll() // Run on first mount
  }

  getTemplate () {
    return `
        <section class="workflow-container spacing-beween-section">
            <div class="heading-container">
                <p>How It Works</p>
            </div>
            <div class="content">
                <div class="left-side">
                    <video class="post-video" controls muted playsInline>
                        <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <video class="hire-video" controls muted playsInline>
                        <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <video class="vision-video" controls muted playsInline>
                        <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="right-side">
                    <div class="item-container active post-video">
                        <div class="title">Post Your Project</div>
                        <div class="description">Tell us what you need—AI, software, content, or marketing. It takes 5 minutes.</div>
                        <video class="mobile-1" controls muted playsInline>
                            <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="item-container hire-video">
                        <div class="title">Hire a Manager</div>
                        <div class="description">Get custom proposals. Chat, compare, and hire the best fit.</div>
                        <video class="mobile-2" controls muted playsInline>
                            <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="item-container vision-video">
                        <div class="title">Your vision delivered</div>
                        <div class="description">Your project manager builds a freelance team and delivers your vision.</div>
                        <video class="mobile-3" controls muted playsInline>
                            <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('workflow-section', WorkflowSection)
