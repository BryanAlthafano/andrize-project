class ManagerListSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.initSwiper()
    this.attachEvents()
  }

  initData () {
    this.managerList = [
      {
        id: 1,
        quote: `I specialize in building scalable websites and custom web tools for growing startups and D2C brands. I've worked with teams across India, U...`,
        author: 'Dev Anthony',
        role: 'eCommerce Websites, Web Apps',
        author_photo_profile: 'photo-profile-4'
      },
      {
        id: 2,
        quote: `Directed 60+ video projects for brands like FWD Furniture, Kidzee, and LoopLabs. Expert in creating engaging explainer videos that conver...`,
        author: 'Pallavi Varma',
        role: 'Creative Director – Explainer Videos',
        author_photo_profile: 'photo-profile-5'
      },
      {
        id: 3,
        quote: `Full-stack mobile developer with 8+ years experience in React Native and Flutter. Built apps for fintech, healthcare, and e-learning...`,
        author: 'Rajesh Kumar',
        role: 'Mobile App Development',
        author_photo_profile: 'photo-profile-6'
      },
      {
        id: 4,
        quote: `10+ years in creative strategy. Led digital campaigns for lifestyle brands and e-commerce startups. Focused on storytelling that sells.`,
        author: 'Sneha Kapoor',
        role: 'Brand Strategy, Digital Campaigns',
        author_photo_profile: 'photo-profile-7'
      },
      {
        id: 5,
        quote: `Built AI-driven tools for lead generation and support automation. Expert in GPT integrations and workflow design.`,
        author: 'Amit Singh',
        role: 'AI Tools, Automation',
        author_photo_profile: 'photo-profile-8'
      },
      {
        id: 6,
        quote: `Conversion-focused designer. Created 100+ landing pages for SaaS, coaching, and product launches. Fluent in Webflow and Figma.`,
        author: 'Natasha Mehra',
        role: 'Landing Pages, Funnel Design',
        author_photo_profile: 'photo-profile-9'
      }
    ]
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.manager-list-card-wrapper', {
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
        nextEl: '.manager-list-next-button',
        prevEl: '.manager-list-prev-button'
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

  attachEvents () {
    // function button post project
    this.attachEventPostProjectButton()
  }

  attachEventPostProjectButton () {
    const postBtn = this.querySelector('.manager-list-post-btn')

    postBtn.addEventListener('click', () => {
      window.location.href = 'post-project.html'
    })
  }

  // function for update navigation buttons
  updateNavButtons (swiper) {
    const prevButton = document.querySelector('.manager-list-prev-button')
    const nextButton = document.querySelector('.manager-list-next-button')
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
        <section class="manager-list-v2-wrap spacing-beween-section">
          <div class="manager-list-v2-container">
            <div class="heading-container">
                <p class="title">Skilled Managers Available For <span class="color">Your Next Project</span></p>
            </div>
    
            <div class="carousel-container swiper">
                <div class="manager-list-card-wrapper">
                  <div class="carousel-track swiper-wrapper">
                    ${this.managerList
                      .map(manager => {
                        return `
                      <div class="card swiper-slide" data-key="${manager?.id}">
                        <div class="author-container">
                          <div class="photo-profile">
                            <img
                              class='photo-profile'
                              src='assets/images/${manager?.author_photo_profile}.svg'
                              alt='photo-profile'
                            />
                          </div>
                          <div class='user-container'>
                            <p class='name'>${manager?.author}</p>
                            <p class='role'>${manager?.role}</p>
                          </div>
                        </div>
                        <div class="bottom-container">
                            <p class="text">${manager?.quote}</p>
                        </div>
                    </div> `
                      })
                      .join('')}
                      <div class="card swiper-slide cta-container" data-key="99">
                        <div class="top-container">
                            <p class="title">Want to see more Experts?</p>
                            <p class="description">Post your project to get custom proposal from vetted project managers.</p>
                        </div>
                        <div class="bottom-container">
                            <button class="manager-list-post-btn">Post Your Project — It’s Free</button>
                        </div>
                      </div>
                  </div>
                </div>

                <div class="carousel-controls">
                    <div class="navigation-container">
                        <div>
                          <button class="manager-list-prev-button">➝</button>
                        </div>
                        <div>
                          <button class="manager-list-next-button">➝</button>
                        </div>
                    </div> 
                </div>
            </div>
          </div>
        </section>
    `
  }
}

customElements.define('manager-list-section', ManagerListSection)
