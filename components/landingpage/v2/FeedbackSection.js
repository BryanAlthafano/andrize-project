class FeedbackSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.initSwiper()
  }

  initData () {
    this.testimonials = [
      {
        id: 1,
        quote:
          '“It felt like I hired a mini agency on demand—without the headache.”',
        author: 'Jane Mehta',
        role: 'Founder, HealthByte',
        author_photo_profile: 'photo-profile-1'
      },
      {
        id: 2,
        quote: '“One manager pulled in the right team and delivered fast.”',
        author: 'Ankit Rao',
        role: 'Growth Lead, LoopLabs',
        author_photo_profile: 'photo-profile-2'
      },
      {
        id: 3,
        quote:
          '“I didn’t need to search for freelancers or coordinate anything. The manager just got it—and delivered better than expected.”',
        author: 'Rohan Malhotra',
        role: 'Marketing Head, QuickTask App',
        author_photo_profile: 'photo-profile-3'
      }
    ]
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.feedback-v2-card-wrapper', {
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
          spaceBetween: 12
        },
        750: {
          slidesPerView: 'auto',
          spaceBetween: 28
        }
      },

      // navigation
      navigation: {
        nextEl: '.feedback-v2-next-button',
        prevEl: '.feedback-v2-prev-button'
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
    const prevButton = document.querySelector('.feedback-v2-prev-button')
    const nextButton = document.querySelector('.feedback-v2-next-button')
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
        <section class="feedback-v2-wrap spacing-beween-section">
          <div class="feedback-v2-container">
            <div class="heading-container">
                <p class="title">Testimonials</p>
            </div>
    
            <div class="carousel-container swiper">
                <div class="feedback-v2-card-wrapper">
                  <div class="carousel-track swiper-wrapper">
                    ${this.testimonials
                      .map(testi => {
                        return `
                      <div class="card swiper-slide" data-key="${testi?.id}">
                        <div class="top-container">
                            <div>
                                <img
                                    class="quote-item-icon"
                                    src="assets/icons/quote-icon.svg"
                                    alt="quote-item-icon"
                                />
                            </div>
                        <p class="text">${testi?.quote}</p>
                        </div>
                        <div class="author-container">
                          <div class="photo-profile">
                            <img
                              class='photo-profile'
                              src='assets/images/${testi?.author_photo_profile}.svg'
                              alt='photo-profile'
                            />
                          </div>
                          <div class='user-container'>
                            <p class='name'>${testi?.author}</p>
                            <p class='role'>${testi?.role}</p>
                          </div>
                        </div>
                    </div> `
                      })
                      .join('')}
                  </div>
                </div>

                <div class="carousel-controls">
                    <div class="navigation-container">
                        <div>
                          <button class="feedback-v2-prev-button">➝</button>
                        </div>
                        <div>
                          <button class="feedback-v2-next-button">➝</button>
                        </div>
                    </div> 
                </div>
            </div>
          </div>
        </section>
    `
  }
}

customElements.define('feedback-section', FeedbackSection)
