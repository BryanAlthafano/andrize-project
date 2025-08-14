class ProductExcellenceSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
  }

  initData () {
    this.product_excellence_list = [
      {
        id: 1,
        title: 'Hire One Expert, Not Five Freelancers',
        description:
          'Your project manager assembles and leads the right team for you.',
        vector: 'product-excellence-vector-1'
      },
      {
        id: 2,
        title: 'No Timelines or Revisions to Chase',
        description:
          'Skip the follow-ups. Your manager handles scope, deadlines, and delivery.',
        vector: 'product-excellence-vector-2'
      },
      {
        id: 3,
        title: 'Just 5% Platform Fee',
        description:
          'No bloat, no hidden fees — elite freelance talent at honest pricing.',
        vector: 'product-excellence-vector-3'
      }
    ]
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="product-excellence-v2-wrap padding-each-section spacing-beween-section">
            <div class="product-excellence-v2-container">
              <div class="title-container">
                <p class="title">Why AndRize Over <span class="highlight">Marketplaces or Agencies?</span></p>
              </div>
              <div class="card-list">
                  ${this.product_excellence_list
                    .map(product => {
                      return `
                      <div class="card-container">
                          <img alt="product-excellence-vector-1" src="assets/images/${product?.vector}.svg" class="product-excellence-vector"/>
                        <div class="card-content" data-key="${product?.id}">
                          <p class="title">${product?.title}</p>
                          <p class="description">${product?.description}</p>
                        </div>
                      </div>`
                    })
                    .join('')}
              </div>
            </div>
        </section>
    `
  }
}

customElements.define('product-excellence-section', ProductExcellenceSection)
