class FeatureSection2 extends HTMLElement { 
  connectedCallback () {
    this.render()
  } 

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="feature-2-container spacing-beween-section">
            <div class="box">
                <div class="left-side">
                    <p class="title">Ready to Outsource Without the Headache?</p>
                    <div class="button-container">
                        <button class="primary-button-with-effect">
                            <span class="button-title">Post Your Project Now</span>
                            <span class="icon-circle">➝</span>
                        </button>
                    </div>
                    <p class="description">
                        Beta access: Only 50 more projects accepted this month.
                    </p>
                </div>
                <div class="right-side">
                    <div class="feature-item">
                        <div class="feature-item-icon-container">
                            <img
                                class="feature-item-icon"
                                src="assets/icons/clock-2-icon.svg"
                                alt="feature-item-icon"
                            />
                        </div>
                        <p class="feature-item-title">We'll find the right manager for you in under 24 hours</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-item-icon-container">
                            <img
                                class="feature-item-icon"
                                src="assets/icons/contract-icon.svg"
                                alt="feature-item-icon"
                            />
                        </div>
                        <p class="feature-item-title">No contracts, no obligations — just results</p>
                    </div>
                    <div class="button-container-mobile">
                        <button class="primary-button-with-effect">
                            <span class="button-title">Post Your Project Now</span>
                            <span class="icon-circle">➝</span>
                        </button>
                    </div>
                    <div class="description-mobile">
                        <p class="description">
                            Beta access: Only 50 more projects accepted this month.
                        </p>
                    </div>
                </div>
            </div> 
        </section>
    `
  }
}

customElements.define('feature-section-2', FeatureSection2)
