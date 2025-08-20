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
          '“Okay, I was super stressed about getting our app done—too many moving parts! But our AndRize manager just… handled it. Like, picked the team, kept it on track, and we launched early. It’s honestly kinda unreal.”',
        author: 'Sophia Martinez',
        role: 'GrowPulse Analytics',
        author_photo_profile: 'testi-photo-profile-1'
      },
      {
        id: 2,
        quote:
          '“We got a landing page, explainer video, and ad creatives done in one go. It honestly felt like hiring a small agency, but without the layers and cost”',
        author: 'Neeraj Sinha',
        role: 'Bluefox AI',
        author_photo_profile: 'testi-photo-profile-2'
      },
      {
        id: 3,
        quote:
          '“Our wellness campaign had to feel real, not fake and salesy. I was nervous, but our manager got it right away. They ran everything, picked a great crew, and I didn’t have to babysit. Came out better than I hoped!”',
        author: 'Amara Singh',
        role: 'MindSpring Wellness',
        author_photo_profile: 'testi-photo-profile-3'
      },
      {
        id: 4,
        quote:
          '“We needed a product demo video quickly. The project manager found the right people, set the timeline, and the final result was exactly what we hoped for.”',
        author: 'Javier Torres',
        role: 'Corelia Systems',
        author_photo_profile: 'testi-photo-profile-4'
      },
      {
        id: 5,
        quote:
          '“I had this big branding idea but no time to chase people down. Our AndRize manager was like, ‘I got this,’ and they did! It looks amazing. Zero stress for me.”',
        author: 'Nia Patel',
        role: 'Brightscale Ventures',
        author_photo_profile: 'testi-photo-profile-5'
      },
      {
        id: 6,
        quote:
          '“What I liked most was having one point of contact. No chasing, no confusion — just one manager making sure everything came together. The previous agency that we worked with made us talk to different people to get our project done”',
        author: 'Ethan Kim',
        role: 'ForwardWorks',
        author_photo_profile: 'testi-photo-profile-6'
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
                              src='assets/images/${testi?.author_photo_profile}.webp'
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
