class WorkTypeSection extends HTMLElement {
  connectedCallback () {
    this.target_users = [
      {
        id: 1,
        title: 'Become a Project Manager',
        description: 'Join AndRize to lead digital projects and build freelance teams.',
        button_title: 'Sign up as manager',
        icon_src: 'assets/icons/about-project-manager-icon.svg'
      },
      {
        id: 2,
        title: 'Join as a creator',
        description: 'Get hired for top freelance projects by expert managers.',
        button_title: 'Sign up as creator',
        icon_src: 'assets/icons/about-creator-icon.svg'
      }
    ]
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="contact-work-type-section-container spacing-beween-section">
            <div class="heading-container">
                <p class="heading">Looking to Work With Us?</p>
            </div>
            <div class="content-container">
                ${this.target_users
                  .map(user => {
                    return `
                    <div class="box" data-key="${user?.id}">
                        <div class="icon-container">
                            <div class="icon-box">
                                <img class="icon" alt="icon" src="${user?.icon_src}"/>
                            </div>
                        </div>
                        <div class="content">
                            <div class="title-container">
                                <p class="title">${user?.title}</p>
                            </div>
                            <div class="description-container">
                                <p class="description">${user?.description}</p>
                            </div>
                            <div class="button-container">
                                <button class="signup-button primary-light-btn">${user?.button_title}</button>
                            </div>
                        </div>
                    </div>`
                  })
                  .join('')}
                
            </div>
        </section>
    `
  }
}

customElements.define('work-type-section', WorkTypeSection)
