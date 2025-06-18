class HeroSection extends HTMLElement {
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
        e.preventDefault()
        const id = link.getAttribute('data-scroll-to')
        const page = link.getAttribute('data-page')
        this.scrollToSection(id, page)
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
        <section class="hero-container">
            <div class="left-side">
                <div class="gradient-border">
                    <div class="left-side-container">
                        <div class="text-content">
                            <p class="title">Stop Wasting Time and Money <span class="title-primary-color">on Mismanaged Projects</span></p>
                            <p class="description">
                                Hire project managers who lead freelance teams and deliver your project — on time and on budget
                            </p>
                        </div>
                        <div class="button-container">
                            <button class="post-project-btn primary-dark-button-with-effect" style="min-width: 250px">
                                <span class="button-title">Post your project now</span>
                                <span class="icon-circle">➝</span>
                            </button>
                            <button class="tutorial-button" data-page="index.html" data-scroll-to="workflowId">See How It Works</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-side"> 
                <img alt="img" src="assets/images/hero-img.jpg" class="right-side-img"/>
            </div>
        </section>
    `
  }
}

customElements.define('hero-section', HeroSection)
