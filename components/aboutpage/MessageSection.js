class MessageSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.attachEvents()
  }

  // function for change page and scroll to element
  scrollToSection (id, page) {
    const currentPage = window.location.pathname.split('/').pop()
    const el = id ? document.getElementById(id) : null

    if (currentPage === page || currentPage === '' || currentPage === '/') {
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      } else if (id) {
        setTimeout(() => {
          const elRetry = document.getElementById(id)
          if (elRetry) {
            elRetry.scrollIntoView({ behavior: 'smooth' })
          }
        }, 500)
      }
    } else {
      const url = id ? `${page}?scrollTo=${id}` : `${page}`
      window.location.href = url
    }
  }

  // get custom attribute for scroll to element
  attachEvents () {
    this.querySelectorAll('[data-scroll-to]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const id = link.getAttribute('data-scroll-to')
        const page = link.getAttribute('data-page')
        this.scrollToSection(id, page)
      })
    })
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="about-message-section-container spacing-beween-section">
            <div class="content"> 
                <div class="icon-container">
                    <img class="icon" alt="icon" src="assets/images/favicon.svg"/>
                </div>
                <div class="content-container">
                    <div class="content-top">
                        <div class="title-container">
                            <p class="title">Where We Are Now</p>
                        </div>
                        <div class="description-container">
                            <p class="description">We’re in early access—working with select clients and managers to shape the future of digital delivery.</p>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div class="button-container">
                            <button class="message-post-button primary-dark-button-with-effect">
                                <span class="button-title">Post a Project</span>
                                <span class="icon-circle">➝</span>
                            </button>
                            <button class="message-post-button-mobile primary-light-btn">Post a Project</button>
                            <button class="signup-button" data-page="join.html" data-scroll-to="">Sign Up Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('message-section', MessageSection)
