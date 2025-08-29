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
        title:
          'Ad Video Series for Premium Furniture Brand asdsadsa sdad sad sa dsa dsa dsa d sa dsa',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer. A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        detail_description:
          'Mystery Monks is more than just a video ad agency; we’re a platform that connects businesses with top-tier creative talent. Our carefully curated packages, managed by skilled creative directors like Pallavi Varma, ensure that each project meets the highest standards. With MM Studio, clients have the freedom to choose the creative director that best fits their vision, guaranteeing a personalized and professional video production experience.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description:
          'Tech Manager, Designer, Marketer, Developer, Animator & Scriptwriter.',
        url: 'project-cover-1',
        videoUrl: 'video-1-v2'
      },
      {
        id: 2,
        title: 'Social Media Campaign for AK Global Dent',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        detail_description:
          'Mystery Monks is more than just a video ad agency; we’re a platform that connects businesses with top-tier creative talent. Our carefully curated packages, managed by skilled creative directors like Pallavi Varma, ensure that each project meets the highest standards. With MM Studio, clients have the freedom to choose the creative director that best fits their vision, guaranteeing a personalized and professional video production experience.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description:
          'Tech Manager, Designer, Marketer, Developer, Animator & Scriptwriter.',
        url: 'project-cover-2',
        videoUrl: 'video-1-v2'
      },
      {
        id: 3,
        title: 'Emotive Video Ad for Kidzee Preschool',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        detail_description:
          'Mystery Monks is more than just a video ad agency; we’re a platform that connects businesses with top-tier creative talent. Our carefully curated packages, managed by skilled creative directors like Pallavi Varma, ensure that each project meets the highest standards. With MM Studio, clients have the freedom to choose the creative director that best fits their vision, guaranteeing a personalized and professional video production experience.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description:
          'Tech Manager, Designer, Marketer, Developer, Animator & Scriptwriter.',
        url: 'project-cover-3',
        videoUrl: 'video-1-v2'
      },
      {
        id: 4,
        title: 'Emotive Video Ad',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        detail_description:
          'Mystery Monks is more than just a video ad agency; we’re a platform that connects businesses with top-tier creative talent. Our carefully curated packages, managed by skilled creative directors like Pallavi Varma, ensure that each project meets the highest standards. With MM Studio, clients have the freedom to choose the creative director that best fits their vision, guaranteeing a personalized and professional video production experience.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description:
          'Tech Manager, Designer, Marketer, Developer, Animator & Scriptwriter.',
        url: 'project-cover-4',
        videoUrl: 'video-1-v2'
      }
    ]
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.preview-project-v2-card-wrapper', {
      loop: false,

      mousewheel: false,
      grabCursor: true,

      touchStartPreventDefault: false,
      touchMoveStopPropagation: false,

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
                      .map(project => {
                        return `
                        <project-card
                        class="card swiper-slide"
                        data-key="${project?.id}"
                        niche="${project?.niche}"
                        title="${project?.title}"
                        description="${project?.description}"
                        detailDescription="${project?.detail_description}"
                        budget="${project?.budget}"
                        duration="${project?.duration}"
                        people="${project?.people}"
                        peopleDescription="${project?.people_description}"
                        coverUrl="${project?.url}"
                        videoUrl="${project?.videoUrl}"></project-card>`
                      })
                      .join('')}
                  </div>
                </div>

                <div class="carousel-controls">
                    <div class="navigation-container">
                        <div>
                          <button class="preview-project-v2-prev-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>
                          </button>
                        </div>
                        <div>
                          <button class="preview-project-v2-next-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                            </svg>
                          </button>
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
