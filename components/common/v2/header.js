class CustomHeader extends HTMLElement {
  static get observedAttributes () {
    return ['theme']
  }

  connectedCallback () {
    this.render()
    this.attachEvents()
  }

  get headerTheme () {
    // get attribute for custom header theme
    return this.getAttribute('theme') || 'light'
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // init scroll event
    this.attachEventScrollToElement()

    // function button menu sidebar
    this.attachEventMenuSidebarButton()

    // function button post project
    this.attachEventPostProjectButton()
  }

  attachEventScrollToElement () {
    // get custom attribute for scroll to element and menu button logic
    this.querySelectorAll('[data-scroll-to]').forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault()
        const id = link.getAttribute('data-scroll-to')
        const page = link.getAttribute('data-page')
        this.scrollToSection(id, page)
      })
    })
  }

  attachEventMenuSidebarButton () {
    const menuBtn = this.querySelector('.menu-button')
    const sidebar = this.querySelector('.mobile-sidebar')

    menuBtn.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('active')
      menuBtn.classList.toggle('active', isOpen)
    })
  }

  attachEventPostProjectButton () {
    const postBtn = this.querySelector('.post-project-button')

    postBtn.addEventListener('click', () => {
      window.location.href = 'post-project.html'
    })
  }

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

  getTemplate () {
    return `
      <header class="header-v2-container ${
        this.headerTheme === 'dark' ? 'header-container-dark' : ''
      }">
        <div class="left-side">
          <div class="logo-container">
            <picture class="logo-picture">
              <source media="(max-width: 750px)" srcset="${
                this.headerTheme === 'dark'
                  ? 'assets/images/logo-mobile-dark.svg'
                  : 'assets/images/logo-mobile.svg'
              }">
              <img
                class="logo-img"
                src="${
                  this.headerTheme === 'dark'
                    ? 'assets/images/logo-desktop-dark.svg'
                    : 'assets/images/logo-desktop.svg'
                }"
                alt="Logo"
              />
            </picture>
          </div>
          <div class="menu-list-container">
            <ul class="menu">
              <li><a href="#" data-page="index.html" data-scroll-to="workflowId">How It Works</a></li>
              <li><a href="#" data-page="project-list.html" data-scroll-to="">Project Showcase</a></li>
            </ul>
          </div>
        </div>
        <div class="right-side">          
          <button
           class="header-post-project-button post-project-button ${
             this.headerTheme === 'dark'
               ? 'primary-dark-btn'
               : 'primary-light-btn'
           }">
            Post Project
          </button>
          <button class="user-button ${
            this.headerTheme === 'dark' ? 'circle-dark-btn' : 'circle-light-btn'
          }">
            ${
              this.headerTheme === 'dark'
                ? `<img class="user-button-img" src="assets/icons/user-dark-icon.svg" alt="user-button-img">`
                : `<img class="user-button-img" src="assets/icons/user-icon-v2.svg" alt="user-button-img">`
            }
          </button>
          <button class="menu-button ${
            this.headerTheme === 'dark' ? 'circle-dark-btn' : 'circle-light-btn'
          }">
            ${
              this.headerTheme === 'dark'
                ? `<img class="menu-button-icon" src="assets/icons/menu-dark-icon.svg" alt="menu-button-img">`
                : `<img class="menu-button-icon" src="assets/icons/menu-icon-v2.svg" alt="menu-button-img">`
            }
            <img class="close-button-icon" src="assets/icons/close-icon-v2.svg" alt="close-button-img"> 
          </button> 
        </div> 
      </header>

      <!-- Mobile Sidebar -->
      <div class="mobile-sidebar ${
        this.headerTheme === 'dark' ? 'mobile-sidebar-dark' : ''
      }"> 
        <div class="mobile-sidebar-container">
          <ul class="sidebar-menu-list">
              <li><a href="#" data-page="index.html" data-scroll-to="workflowId">How It Works</a></li>
              <li><a href="#" data-page="contact.html" data-scroll-to="ourContactId">Contact Us</a></li>
              <li><a href="#" data-page="about.html" data-scroll-to="">About Us</a></li>
          </ul>
          <button class="login-button" data-page="join.html" data-scroll-to="">
            Log In / Sign Up
          </button>
        </div>
      </div>
    `
  }
}

customElements.define('custom-header', CustomHeader)
