class BelieveSection extends HTMLElement {
  connectedCallback () {
    this.believe_content = [
      {
        id: 1,
        title: 'Simplicity <br/> leads to better results'
      },
      {
        id: 2,
        title: 'People deserve to be paid fairly and fast'
      },
      {
        id: 3,
        title: 'Great projects start with great leadership'
      }
    ]
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="about-believe-section-container spacing-beween-section">
            <div class="heading-container">
                <p class="heading">What We Believe</p>
            </div>
            <div class="content-container">
                ${this.believe_content
                  .map((user, index) => {
                    return `
                    <div class="gradient-border" data-key="${user?.id}">
                        <div class="box">
                            <div class="number-container">
                                <div class="number-box">
                                    <p class="number">0${index + 1}</p>
                                </div>
                            </div>
                            <div class="content">
                                <div class="title-container">
                                    <p class="title">${user?.title}</p>
                                </div>
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

customElements.define('believe-section', BelieveSection)
