class PreviewProjectSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.initSwiper()
    this.attachEvents()
  }

  initData () {
    this.projectList = [
      {
        id: 1,
        title: 'Ad Video Series for Premium Furniture Brand',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-1'
      },
      {
        id: 2,
        title: 'Social Media Campaign for AK Global Dent',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-2'
      },
      {
        id: 3,
        title: 'Emotive Video Ad for Kidzee Preschool',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-3'
      },
      {
        id: 4,
        title: 'Emotive Video Ad for Kidzee Preschool',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-4'
      }
    ]
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.preview-project-v2-card-wrapper', {
      loop: false,

      // pagination
      // pagination: {
      //   el: '.swiper-pagination'
      // },
      mousewheel: false,
      grabCursor: true,

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
        nextEl: '.preview-project-v2-next-button',
        prevEl: '.preview-project-v2-prev-button'
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
    const prevButton = document.querySelector('.preview-project-v2-prev-button')
    const nextButton = document.querySelector('.preview-project-v2-next-button')
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

  attachEvents () {}

  getTemplate () {
    return `
        <section class="preview-project-v2-wrap spacing-beween-section">
          <div class="preview-project-v2-container">
            <div class="heading-container">
                <p class="title">What You Can Build With <span class="color">AndRize</span></p>
            </div>
    
            <div class="carousel-container swiper">
                <div class="preview-project-v2-card-wrapper">
                  <div class="carousel-track swiper-wrapper">
                    ${this.projectList
                      .map((project, index) => {
                        return `
                        <project-card
                        class="card swiper-slide"
                        data-key="${project?.id}"
                        niche="${project?.niche}"
                        title="${project?.title}"
                        description="${project?.description}"
                        budget="${project?.budget}"
                        duration="${project?.duration}"
                        people="${project?.people}"
                        peopleDescription="${project?.people_description}"
                        coverUrl="${project?.url}"></project-card>`
                      })
                      .join('')}
                  </div>
                </div>

                <div class="carousel-controls">
                    <div class="navigation-container">
                        <div>
                          <button class="preview-project-v2-prev-button">➝</button>
                        </div>
                        <div>
                          <button class="preview-project-v2-next-button">➝</button>
                        </div>
                    </div> 
                </div>
            </div>
          </div>
        </section>
    `
  }
}

customElements.define('preview-project-section', PreviewProjectSection)
