class HeroSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.setRealHref()
    this.attachEvents()
  }

  isNormalClick (e) {
    return (
      e.button === 0 && // left click
      !e.ctrlKey &&
      !e.metaKey && // no ctrl/cmd
      !e.shiftKey &&
      !e.altKey // no modifier
    )
  }

  // function for change page and scroll to element
  scrollToSection (id, page) {
    const currentPage = window.location.pathname.split('/').pop()
    const el = id ? document.getElementById(id) : null

    if (currentPage === page || currentPage === '' || currentPage === '/') {
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' })
        }, 500)
      } else {
        window.location.href = page
      }
    } else {
      const url = id ? `${page}?scrollTo=${id}` : `${page}`
      window.location.href = url
    }
  }

  setRealHref () {
    this.querySelectorAll('[data-scroll-to]').forEach(link => {
      const id = link.getAttribute('data-scroll-to')
      const page = link.getAttribute('data-page')
      link.setAttribute('href', id ? `${page}?scrollTo=${id}` : page)
    })
  }

  attachEvents () {
    // function for scroll to element
    this.attachEventScrollElement()

    // function for post project button
    this.attachEventPostProjectButton()
  }

  attachEventScrollElement () {
    // get custom attribute for scroll to element
    this.querySelectorAll('[data-scroll-to]').forEach(link => {
      link.addEventListener('click', e => {
        if (this.isNormalClick(e)) {
          e.preventDefault()
          const id = link.getAttribute('data-scroll-to')
          const page = link.getAttribute('data-page')
          this.scrollToSection(id, page)
        }
      })
    })
  }

  attachEventPostProjectButton () {
    const postBtn = this.querySelector('.post-project-btn')

    postBtn.addEventListener('click', () => {
      window.location.href = 'post-project.html'
    })
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="hero-v2-wrap padding-each-section">
            <div class="hero-v2-container">
              <div class="left-side">
                <div class="top-content">
                  <div class="top-container">
                    <p class="heading">Hire top project managers to build your team and <span class="highlight">get it done</span>
                    </p>

                    <div class="image-mobile-container">
                      <img alt="hero-img-mobile-img" src="assets/images/hero-img-mobile-v2.png" class="hero-img-mobile-img" loading="lazy"/>
                    </div>

                    <p class="description">From AI tools to explainer videos, landing pages to brand campaigns—your ideas, delivered by expert-led freelance teams.</p>
                  </div>
                  <div class="button-container">
                      <button class="post-project-btn">Post Your Project — It’s Free
                        <img alt="arrow-right-white-icon" src="assets/icons/arrow-right-white.svg" class="arrow-right-white-icon"/>
                      </button>
                  </div>
                </div>

              </div>

              <div class="right-side"> 
                <img alt="right-side-img" src="assets/images/hero-img-v2.png" class="right-side-img" loading="lazy"/>
              </div>
            </div>
        </section>
    `
  }
}

customElements.define('hero-section', HeroSection)
