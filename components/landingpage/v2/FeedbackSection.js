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
          '“ I want to firstly thank team for displaying the packages so clearly that even a layman can understand. I have gone through multiple websites, but Mystery Monks website was clear about the video types and packages. Regarding the project, the first video draft was not satisfactory; however, the final version is good after many design suggestions from me. I would rate 4.0 for this project. I want to thank especially Pallavi, Creative Director, for all her efforts in this project. My sincere thanks to each and everyone involved in this project. “',
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

    new Swiper('.card-wrapper', {
      loop: false,

      // pagination
      // pagination: {
      //   el: '.swiper-pagination'
      // },

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
        <section class="feedback-v2-wrap spacing-beween-section">
          <div class="feedback-v2-container">
            <div class="heading-container">
                <p class="title">Testimonials</p>
            </div>
    
            <div class="carousel-container swiper">
                <div class="card-wrapper">
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
                          <button class="prev-button">➝</button>
                        </div>
                        <div>
                          <button class="next-button">➝</button>
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
