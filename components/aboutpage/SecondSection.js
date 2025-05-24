class SecondSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="about-second-section-container spacing-beween-section">
            <div class="gradient-border">
                <div class="box">
                    <div class="title-container">
                        <p class="title">Our Mission</p>
                    </div>
                    <div class="description-container">
                        <p class="description">Make digital projects effortless for clients—and more rewarding for project managers and creators.</p>
                    </div>
                </div>
            </div>
            <div class="gradient-border">
                <div class="box">
                    <div class="title-container">
                        <p class="title">Why We Exist</p>
                    </div>
                    <div class="description-container">
                        <p class="description">Agencies are expensive. Freelancers are hard to manage. Platforms gave access, not outcomes. We believed there had to be a better way.</p>
                    </div>
                </div>
            </div>
            <div class="content-container">
                <div class="left-side">
                    <div class="gradient-border">
                        <div class="box">
                            <div class="top-content">
                                <div class="title-container">
                                    <p class="title">What we’re building</p>
                                </div>
                                <div class="description-container">
                                    <p class="description">One expert project manager leads your project from start to finish—hiring creators, managing progress, and ensuring quality.</p>
                                </div>
                            </div>
                            <div class="bottom-content">
                                <div class="text-container">
                                    <p class="text">Curious how it works in detail?</p>
                                </div>
                                <div class="button-container">
                                    <button class="primary-light-btn fullwidth-button">See the full breakdown</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right-side">
                    <img class="about-second-section-img" alt="about-second-section-img" src="assets/images/about-second-section-img.png"/>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('second-section', SecondSection)
