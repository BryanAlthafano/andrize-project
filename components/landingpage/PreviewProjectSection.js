class PreviewProjectSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.initSwiper()

    // tooltip configuration
    tippy('#informationId', {
      allowHTML: true,
      placement: 'bottom',
      trigger: 'click',
      content: `Led by a tech <br/>manager and involved <br/>an AI developer and <br/>a UX designer.`
    })
  }

  // init swiper js
  initSwiper () {
    const self = this

    new Swiper('.preview-card-wrapper', {
      loop: false,
      // pagination
      pagination: {
        el: '.preview-swiper-pagination'
      },
      // responsive
      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 10
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 20
        }
      },
      // navigation
      navigation: {
        nextEl: '.next-button-preview',
        prevEl: '.prev-button-preview'
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
        <section class="preview-project-container spacing-beween-section">
            <div class="heading-container">
                <div class="title-container">
                    <p class="title">What our vetted project managers <span class="color">have delivered</span></p>
                </div> 
                <div class="description-container">
                    <p class="description">See how experienced managers on AndRize led real projects from idea to launch—with the right freelance teams.</p>
                </div> 
            </div>      
            <div class="preview-carousel-container swiper" id="preview-swiper">
                <div class="preview-card-wrapper">
                <div class="carousel-track swiper-wrapper">
                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div class="heading-top">
                                <div class="title-container">
                                    <p class="title">SEO Content Campaign for D2C Brand</p>
                                </div>
                                <div class="niche-container">
                                    <p class="niche">Digital Marketing</p>
                                </div>
                            </div>
                            <div class="description-container">
                                <p class="description">Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.</p>
                            </div>
                        </div>
                        <div class="bottom-container">
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/team-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Team:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">4 people</p>
                                    <div id="informationId" class="information-container">
                                        <p class="information">?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/money2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Duration:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">1 month</p>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/budget2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Budget:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">$1,000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div class="heading-top">
                                <div class="title-container">
                                    <p class="title">SEO Content Campaign for D2C Brand</p>
                                </div>
                                <div class="niche-container">
                                    <p class="niche">Digital Marketing</p>
                                </div>
                            </div>
                            <div class="description-container">
                                <p class="description">Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.</p>
                            </div>
                        </div>
                        <div class="bottom-container">
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/team-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Team:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">4 people</p>
                                    <div id="informationId" class="information-container">
                                        <p class="information">?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/money2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Duration:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">1 month</p>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/budget2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Budget:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">$1,000</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div class="heading-top">
                                <div class="title-container">
                                    <p class="title">SEO Content Campaign for D2C Brand</p>
                                </div>
                                <div class="niche-container">
                                    <p class="niche">Digital Marketing</p>
                                </div>
                            </div>
                            <div class="description-container">
                                <p class="description">Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.</p>
                            </div>
                        </div>
                        <div class="bottom-container">
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/team-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Team:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">4 people</p>
                                    <div id="informationId" class="information-container">
                                        <p class="information">?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/money2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Duration:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">1 month</p>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/budget2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Budget:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">$1,000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div class="heading-top">
                                <div class="title-container">
                                    <p class="title">SEO Content Campaign for D2C Brand</p>
                                </div>
                                <div class="niche-container">
                                    <p class="niche">Digital Marketing</p>
                                </div>
                            </div>
                            <div class="description-container">
                                <p class="description">Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.</p>
                            </div>
                        </div>
                        <div class="bottom-container">
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/team-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Team:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">4 people</p>
                                    <div id="informationId" class="information-container">
                                        <p class="information">?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/money2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Duration:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">1 month</p>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/budget2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Budget:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">$1,000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card swiper-slide">
                        <div class="top-container">
                            <div class="heading-top">
                                <div class="title-container">
                                    <p class="title">SEO Content Campaign for D2C Brand</p>
                                </div>
                                <div class="niche-container">
                                    <p class="niche">Digital Marketing</p>
                                </div>
                            </div>
                            <div class="description-container">
                                <p class="description">Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.</p>
                            </div>
                        </div>
                        <div class="bottom-container">
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/team-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Team:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">4 people</p>
                                    <div id="informationId" class="information-container">
                                        <p class="information">?</p>
                                    </div>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/money2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Duration:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">1 month</p>
                                </div>
                            </div>
                            <div class="box-container">
                                <div class="icon-container">
                                    <div class="icon">
                                        <img
                                            class="item-icon"
                                            src="assets/icons/budget2-icon.svg"
                                            alt="item-icon"
                                        />
                                    </div>
                                </div>
                                <div class="title-container">
                                    <p class="title">Budget:</p>
                                </div>
                                <div class="description2-container">
                                    <p class="description2">$1,000</p>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
                </div>
                <div class="carousel-controls">
                    <div class="navigation-container">
                        <button class="prev-button-preview">➝</button>
                        <button class="next-button-preview">➝</button>
                    </div> 
                    <div class="preview-swiper-pagination"></div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('preview-project-section', PreviewProjectSection)
