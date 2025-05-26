class WorkflowSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.attachEvents()

    // handle resize screen
    window.addEventListener(
      'resize',
      this.attachEventHeightOfRightSide.bind(this)
    )
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // handle video element
    this.attachEventVideos()

    // handle height of video (desktop)
    this.attachEventHeightOfRightSide()
  }

  attachEventVideos () {
    const items = this.querySelectorAll('.item-container')
    const videos = this.querySelectorAll('.left-side video')

    items.forEach(item => {
      item.addEventListener('mouseenter', () => {
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
          video.style.display = videoClass === targetClass ? 'block' : 'none'
        })
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
    if (rightSide && leftSide) {
      const observer = new ResizeObserver(() => {
        leftSide.style.height = `${rightSide.offsetHeight}px`
      })
      observer.observe(rightSide)
    }
  }

  getTemplate () {
    return `
        <section class="workflow-container spacing-beween-section">
            <div class="heading-container">
                <p>How It Works</p>
            </div>
            <div class="content">
                <div class="left-side">
                    <video class="post-video" controls autoplay muted>
                        <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <video class="hire-video" controls autoplay muted>
                        <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <video class="vision-video" controls autoplay muted>
                        <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div class="right-side">
                    <div class="item-container active post-video">
                        <div class="title">Post Your Project</div>
                        <div class="description">Tell us what you need—AI, software, content, or marketing. It takes 5 minutes.</div>
                        <video class="mobile-1" controls autoplay muted>
                            <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="item-container hire-video">
                        <div class="title">Hire a Manager</div>
                        <div class="description">Get custom proposals. Chat, compare, and hire the best fit.</div>
                        <video class="mobile-2" controls autoplay muted>
                            <source src="assets/videos/how-it-works-1.mp4" type="video/mp4">
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div class="item-container vision-video">
                        <div class="title">Your vision delivered</div>
                        <div class="description">Your project manager builds a freelance team and delivers your vision.</div>
                        <video class="mobile-3" controls autoplay muted>
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
