class TargetUserSection extends HTMLElement {
  connectedCallback () {
    this.target_users = [
      {
        id: 1,
        title: 'Clients',
        description: 'Outcomes without managing people.',
        icon_src: 'assets/icons/about-client-icon.svg'
      },
      {
        id: 2,
        title: 'Project Managers',
        description: 'Lead great projects—without hunting leads.',
        icon_src: 'assets/icons/about-project-manager-icon.svg'
      },
      {
        id: 3,
        title: 'Creators',
        description: 'Do serious work, skip the chaos.',
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
        <section class="about-target-user-section-container spacing-beween-section">
            <div class="heading-container">
                <p class="heading">Who it’s for</p>
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
                        </div>
                    </div>`
                  })
                  .join('')}
                
            </div>
        </section>
    `
  }
}

customElements.define('target-user-section', TargetUserSection)
