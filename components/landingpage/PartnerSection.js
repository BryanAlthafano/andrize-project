class PartnerSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="partner-container spacing-beween-section">
            <div class="heading-container">
                <p class="title">Trusted by Forward <br/> Thinking Teams</p>
            </div>
            <div class="logo-carousel-wrapper">
                <div class="logo-carousel">
                    <img
                      class="logo"
                      src="assets/images/logo-acme.svg"
                      alt="logo-icon-1"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-globex.svg"
                      alt="logo-icon-2"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-umbrella.svg"
                      alt="logo-icon-3"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-hooli.svg"
                      alt="logo-icon-4"
                    />

                    <img
                      class="logo"
                      src="assets/images/logo-acme.svg"
                      alt="logo-icon-1"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-globex.svg"
                      alt="logo-icon-2"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-umbrella.svg"
                      alt="logo-icon-3"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-hooli.svg"
                      alt="logo-icon-4"
                    />

                    <img
                      class="logo"
                      src="assets/images/logo-acme.svg"
                      alt="logo-icon-1"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-globex.svg"
                      alt="logo-icon-2"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-umbrella.svg"
                      alt="logo-icon-3"
                    />
                    <img
                      class="logo"
                      src="assets/images/logo-hooli.svg"
                      alt="logo-icon-4"
                    />
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('partner-section', PartnerSection)
