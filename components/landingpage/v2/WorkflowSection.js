class WorkflowtSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.initSwiper()
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

    new Swiper('.workflow-v2-card-wrapper', {
      loop: false,

      // pagination
      // pagination: {
      //   el: '.swiper-pagination'
      // },

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
        },
        slideChange: function () {
          self.updateNavButtons(this)
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
                            <video class="post-video" controls muted>
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
