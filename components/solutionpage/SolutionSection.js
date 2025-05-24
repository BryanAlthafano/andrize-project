class SolutionSection extends HTMLElement {
  connectedCallback () {
    this.active_tab = 'client'
    this.tabs = [
      { id: 1, title: 'For Clients', key: 'client' },
      { id: 2, title: 'For Project Managers', key: 'project_manager' },
      { id: 3, title: 'For Creators', key: 'creator' }
    ]
    this.tabs_layout = [
      {
        id: 1,
        key: 'client',
        description:
          'Let your project manager take care of the chaos while you stay focused on your business.',
        contents: [
          {
            id: 1,
            title: 'Stay focused',
            description:
              'Project managers handle hiring, deadlines, and delivery.'
          },
          {
            id: 2,
            title: 'Milestone-Based Payments',
            description: 'Only pay when you approve the work No surprises.'
          },
          {
            id: 3,
            title: 'All Project Types',
            description:
              'From AI apps to video production—your manager builds the right team.'
          }
        ]
      },
      {
        id: 2,
        key: 'project_manager',
        description:
          'Lead high-quality jobs with built-in tools, your chosen team, and real earning potential.',
        contents: [
          {
            id: 1,
            title: 'Hire Instantly',
            description: 'Access vetted freelancers with no platform fees.'
          },
          {
            id: 2,
            title: 'Earn the Margin',
            description:
              'Quote the client. After a 5% AndRize fee and creator payouts, the rest is yours.'
          },
          {
            id: 3,
            title: 'Manage with Ease',
            description: 'Run projects, teams, and payments all in one place.'
          }
        ]
      },
      {
        id: 3,
        key: 'creator',
        description:
          'Skip bidding wars. Work with great managers on meaningful jobs—and get paid fast.',
        contents: [
          {
            id: 1,
            title: 'No More Bidding',
            description:
              'Managers bring you into paid jobs. No chasing clients.'
          },
          {
            id: 2,
            title: 'Fair, Fast Payments',
            description:
              'Get paid as soon as milestones are approved — no hidden cuts.'
          },
          {
            id: 3,
            title: 'Level Up',
            description:
              'Build your portfolio, meet new managers, and grow your freelance career.'
          }
        ]
      }
    ]
    this.render()
    this.initSwiper()
    this.attachEvents()
  }

  // get active layout
  get activeLayout () {
    return this.tabs_layout.find(layout => layout.key === this.active_tab)
  }

  attachEvents () {
    // handle change tab
    const tabElements = this.querySelectorAll('.tab')
    tabElements.forEach(tabEl => {
      tabEl.addEventListener('click', () => {
        const key = tabEl.dataset.key
        this.handleChangeTab(key)
      })
    })
  }

  handleChangeTab (key) {
    this.active_tab = key
    this.render()
    this.initSwiper()
    this.attachEvents()
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.solution-card-wrapper', {
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
        1024: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      },

      // navigation
      navigation: {
        nextEl: '.next-button-solution',
        prevEl: '.prev-button-solution'
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
    const prevButton = document.querySelector('.prev-button-solution')
    const nextButton = document.querySelector('.next-button-solution')

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
      <section class="solution-section-container spacing-beween-section">
        <div class="heading-container">
          <p class="heading">Solutions For Everyone</p>
        </div>
        <div class="tabs-container">
            <div class="gradient-border">
                <div class="tabs">
                    ${this.tabs
                      .map(tab => {
                        return `
                            <div
                                class="tab ${
                                  this.active_tab === tab?.key ? 'active' : ''
                                }" 
                                data-key="${tab?.key}">
                                    <p class="title">${tab?.title}</p>
                            </div>
                    `
                      })
                      .join('')}
                </div>
            </div>
        </div>
        <div class="tabs-layout">
            <div class="description-container">
                <p class="description">${this.activeLayout?.description}</p>
            </div>
            <div class="solution-carousel-container swiper" id="solution-carousel">
                <div class="solution-card-wrapper">
                    <div class="swiper-wrapper">
                        ${this.activeLayout?.contents
                          .map(layout => {
                            return `
                            <div data-key="${layout?.key}" class="solution-card swiper-slide">
                                <div class="title-container">
                                    <p class="title">${layout?.title}</p>
                                </div>
                                <div class="description-container">
                                    <p class="description">${layout?.description}</p>
                                </div>
                            </div>
                            `
                          })
                          .join('')}
                    </div>        
                </div>
            </div>
            <div class="carousel-controls">
                <div class="navigation-container">
                    <button class="prev-button-solution">➝</button>
                    <button class="next-button-solution">➝</button>
                </div> 
            </div>
        </div> 
      </section> 
    `
  }
}

customElements.define('solution-section', SolutionSection)
