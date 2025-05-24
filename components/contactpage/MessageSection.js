class MessageSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return ` 
        <section class="contact-message-section-container spacing-beween-section">
            <div class="content">
                <div class="icon-container">
                    <img class="icon" alt="icon" src="assets/images/favicon.svg"/>
                </div>
                <div class="content-container">
                    <div class="content-top">
                        <div class="title-container">
                            <p class="title">Need help with a digital project?</p>
                        </div>
                        <div class="description-container">
                            <p class="description">Get matched with a vetted project manager who builds the team and delivers it for you</p>
                        </div>
                    </div>
                    <div class="content-bottom">
                        <div class="button-container">
                            <button class="message-post-button primary-dark-button-with-effect">
                                <span class="button-title">Post a Project</span>
                                <span class="icon-circle">➝</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('message-section', MessageSection)
