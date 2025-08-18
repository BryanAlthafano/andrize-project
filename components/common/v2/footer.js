class CustomFooter extends HTMLElement {
  static get observedAttributes () {
    return ['with-margin-top']
  }

  connectedCallback () {
    this.render()
    this.attachEvents()
  }

  // get attribute for custom margin top
  get withMarginTop () {
    return this.getAttribute('with-margin-top') || ''
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
      } else {
        window.location.href = page
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
        <footer class="footer-v2-wrap padding-each-section ${
          this.withMarginTop !== '' ? 'spacing-beween-section' : ''
        }">
            <div class="footer-v2-container">
              <div class="footer-container-top">
                <div class="left-side">
                    <img 
                    class="logo" 
                    src="assets/images/logo-desktop.svg" 
                    alt="logo">
                    
                    <p class="text">Hire expert project managers to assemble your team and deliver your next big idea.</p>
                </div>
                <div class="right-side">
                    <div class="service-container">
                        <p class="heading">Quick Links</p>
                        <ul class="service-list">
                            <li><a href="#" data-page="index.html" data-scroll-to="workflowId">How It Works</a></li>
                            <li><a href="#" data-page="project-list.html" data-scroll-to="">Project Showcase</a></li> 
                            <li><a href="#" data-page="about.html" data-scroll-to="">About us </a></li>
                            <li><a href="#" data-page="contact.html" data-scroll-to="ourContactId">Contact us</a></li>
                        </ul>
                    </div>
                    <div class="contact-container">
                        <p class="heading">Contact</p>
                        <ul class="contact-list">
                            <li>business@andrize.com</li>
                            <li>+91 92580 86206</li>
                            <li>Help center</li> 
                            <li><a href="#" data-page="index.html" data-scroll-to="workflowId">Tutorials</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer-container-bottom">
                <div class="left-side">
                    <ul class="left-side-container">
                        <li>Copyright © 2025 AndRize / All rights reserved.</li>
                    </ul>
                </div>
            </div>
            </div>
        </footer>
    `
  }
}

customElements.define('custom-footer', CustomFooter)
