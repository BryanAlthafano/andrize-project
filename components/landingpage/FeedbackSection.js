class FeedbackSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.initSwiper()
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.card-wrapper', {
      loop: false,

      // pagination
      pagination: {
        el: '.swiper-pagination'
      },

      // responsive
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        750: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },

      // navigation
      navigation: {
        nextEl: '.next-button',
        prevEl: '.prev-button'
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
    const prevButton = document.querySelector('.prev-button')
    const nextButton = document.querySelector('.next-button')

    if (swiper.isBeginning) {
      prevButton.classList.add('disabled')
    } else {
      prevButton.classList.remove('disabled')
    }

    if (swiper.isEnd) {
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
        <section class="feedback-container spacing-beween-section">
            <div class="heading-container">
                <p class="title">What Our  <span class="color">Clients Say</span></p>
            </div>             
            <div class="carousel-container swiper">
                <div class="card-wrapper">
                <div class="carousel-track swiper-wrapper">
                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div>
                                <img
                                    class="quote-item-icon"
                                    src="assets/icons/quote-icon.svg"
                                    alt="quote-item-icon"
                                />
                            </div>
                        <p class="text">AndRize felt like hiring a mini agency on demand — but faster and way more flexible. The project manager handled everything while I focused on my launch.</p>
                        </div>
                        <div class="user-container">
                            <p class="name">Jane Doe</p>
                            <p class="role">Founder, StartupX</p>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div>
                                <img
                                    class="quote-item-icon"
                                    src="assets/icons/quote-icon.svg"
                                    alt="quote-item-icon"
                                />
                            </div>
                        <p class="text">We needed a landing page, a product video, and some light copy — and our manager pulled in a great team and got it done in 2 weeks. Honestly impressed.</p>
                        </div>
                        <div class="user-container">
                            <p class="name">Lisa Wong</p>
                            <p class="role">CEO, DesignMint</p>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div>
                                <img
                                    class="quote-item-icon"
                                    src="assets/icons/quote-icon.svg"
                                    alt="quote-item-icon"
                                />
                            </div>
                        <p class="text">I didn’t have time to manage 3 freelancers. AndRize let me hire one expert who brought in the right team and owned the whole thing. Will definitely use again.</p>
                        </div>
                        <div class="user-container">
                            <p class="name">Mark Taylor</p>
                            <p class="role">CMO, MarketLeap</p>
                        </div>
                    </div>
                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div>
                                <img
                                    class="quote-item-icon"
                                    src="assets/icons/quote-icon.svg"
                                    alt="quote-item-icon"
                                />
                            </div>
                        <p class="text">This is dummy</p>
                        </div>
                        <div class="user-container">
                            <p class="name">Elon Musk</p>
                            <p class="role">CEO, X</p>
                        </div>
                    </div>
                </div>
                </div>
                <div class="carousel-controls">
                    <div class="navigation-container">
                        <button class="prev-button">➝</button>
                        <button class="next-button">➝</button>
                    </div> 
                    <div class="swiper-pagination"></div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('feedback-section', FeedbackSection)
