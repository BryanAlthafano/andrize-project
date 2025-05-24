class HeroSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="about-hero-section-container">
            <div class="box">
                <div class="title-container">
                    <p class="title">About AndRize</p>
                </div>
                <div class="description-container">
                    <p class="description">We built AndRize to fix the chaos of outsourcing—whether you're managing freelancers or paying too much for agencies.</p>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('hero-section', HeroSection)
