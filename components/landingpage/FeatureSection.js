class FeatureSection extends HTMLElement {
  static get observedAttributes () {
    return [
      'title',
      'description',
      'button-title',
      'button-badge',
      'with-button-badge'
    ]
  }
  connectedCallback () {
    this.render()
  }

  // get custom attribute
  get title () {
    return (
      this.getAttribute('title') || 'Expert Project Managers at Your Service'
    )
  }
  get description () {
    return (
      this.getAttribute('description') ||
      'Skip the chaos — AndRize connects you with trusted project managers who take care of everything:'
    )
  }
  get buttonTitle () {
    return this.getAttribute('button-title') || 'Talk to a manager now'
  }
  get buttonBadge () {
    return this.getAttribute('button-badge') || ''
  }
  get withButtonBadge () {
    return this.getAttribute('with-button-badge') || false
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="feature-container spacing-beween-section">
            <div class="box">
                <div class="left-side">
                    <p class="logo">AndRize</p>
                    <p class="title">${this.title}</p>
                    <p class="description">
                        ${this.description}
                    </p>
                    <div class="button-container">
                        <button class="primary-button-with-effect">
                            <div>
                                <span class="button-title">
                                ${this.buttonTitle}
                                </span>
                                ${
                                  this.withButtonBadge
                                    ? `<span class="button-badge">${this.buttonBadge}</span>`
                                    : ''
                                }
                            </div>
                            <span class="icon-circle">➝</span>
                        </button>
                    </div>
                </div>
                <div class="right-side">
                    <div class="feature-item">
                        <div class="feature-item-icon-container">
                            <img
                                class="feature-item-icon"
                                src="assets/icons/telescope-icon.svg"
                                alt="feature-item-icon"
                            />
                        </div>
                        <p class="feature-item-title">Hiring the right people for the job</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-item-icon-container">
                            <img
                                class="feature-item-icon"
                                src="assets/icons/setting-icon.svg"
                                alt="feature-item-icon"
                            />
                        </div>
                        <p class="feature-item-title">Managing freelancers and their workflow</p>
                    </div>
                    <div class="feature-item">
                        <div class="feature-item-icon-container">
                            <img
                                class="feature-item-icon"
                                src="assets/icons/box-icon.svg"
                                alt="feature-item-icon"
                            />
                        </div>
                        <p class="feature-item-title">Delivering your project with full quality and accountability</p>
                    </div>
                    <div class="button-container-mobile">
                        <button class="primary-button-with-effect">
                            <div>
                                <span class="button-title">
                                ${this.buttonTitle}
                                </span>
                                ${
                                  this.withButtonBadge
                                    ? `<span class="button-badge">${this.buttonBadge}</span>`
                                    : ''
                                }
                            </div>
                            <span class="icon-circle">➝</span>
                        </button>
                    </div>
                </div>
            </div> 
        </section>
    `
  }
}

customElements.define('feature-section', FeatureSection)
