class ProductExcellenceSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="product-excellence-container spacing-beween-section">
            <div class="left-side"> 
                <div class="heading-container">
                  <p>Why Clients Choose 
                      <span class="color">AndRize</span>
                  </p>
                </div> 
            </div>
            <div class="right-side">
              <div class="item-container-wrapper">
                <div class="heading-container">
                  <p>Why Clients Choose 
                      <span class="color">AndRize</span>
                  </p>
                </div> 
                <div class="item-container">
                  <div class="number-container">
                    <p class="number">01</p>
                  </div>
                  <div class="item-content">
                    <p class="title">Save Time</p>
                    <p class="description">Your manager handles everything while you focus on growth.</p>
                    <div class="icon-container">
                      <img
                        class="product-item-icon"
                        src="assets/icons/clock-icon.svg"
                        alt="product-item-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="item-container-wrapper">
                <div class="item-container">
                  <div class="number-container">
                    <p class="number">02</p>
                  </div>
                  <div class="item-content">
                    <p class="title">Control Your Budget</p>
                    <p class="description">No hidden costs—managers keep things on track and transparent.</p>
                    <div class="icon-container">
                      <img
                        class="product-item-icon"
                        src="assets/icons/clock-icon.svg"
                        alt="product-item-icon"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="item-container-wrapper">
                <div class="item-container">
                  <div class="number-container">
                    <p class="number">03</p>
                  </div>
                  <div class="item-content">
                    <p class="title">Better Results</p>
                    <p class="description">Vetted talent. Managed delivery. Higher quality outcomes.</p>
                    <div class="icon-container">
                      <img
                        class="product-item-icon"
                        src="assets/icons/result-icon.svg"
                        alt="product-item-icon"
                      />
                    </div>
                  </div>
                </div>
              </div> 
            </div>
        </section>
    `
  }
}

customElements.define('product-excellence-section', ProductExcellenceSection)
