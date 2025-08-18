class CTASection extends HTMLElement {
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

  attachEvents () {
    // function for post project button
    this.attachEventPostProjectButton()
  }

  attachEventPostProjectButton () {
    const postBtn = this.querySelector('.cta-post-project-button')

    postBtn.addEventListener('click', () => {
      window.location.href = 'post-project.html'
    })
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
          <section class="cta-v2-wrap padding-each-section ${
            this.withMarginTop !== '' ? 'spacing-beween-section' : ''
          }">
              <div class="cta-v2-container">
                <div class="text-container">
                    <p class="text">Hire a manager to build your team and <span class="highlight">get it done.</span></p>
                </div>
                <div class="button-container">
                    <button
                        class="cta-post-project-button post-project-button primary-dark-btn">
                        Post Your Project
                        <img alt="arrow-right-black-icon" src="assets/icons/arrow-right-black.svg" class="arrow-right-black-icon"/>
                    </button>
                </div>
              </div>
          </section>
      `
  }
}

customElements.define('cta-section', CTASection)
