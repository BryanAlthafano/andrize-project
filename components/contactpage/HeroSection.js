class HeroSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="contact-hero-section-container">
            <div class="box">
                <div class="title-container">
                    <p class="title">Start a Project. Join the Team. Or Just Say Hello.</p>
                </div>
                <div class="description-container">
                    <p class="description">Reach out to us or explore your next step with AndRize</p>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('hero-section', HeroSection)
