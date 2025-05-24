class ServiceSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="our-service-container spacing-beween-section">
            <div class="heading-container">
                <p class="title">Your Project, <span class="color">Your Protection</span></p>
            </div>
            <div class="content">
                 <div class="box">
                    <p class="title">Escrow Protection</p>
                    <div class="divider"></div>
                    <p class="description">Funds released only when <br/> you approve each milestone <br/> or deliverable.</p>
                 </div>
                 <div class="box">
                    <p class="title">Confidentiality NDA</p>
                    <div class="divider"></div>
                    <p class="description">NDA signed by both manager and team. <br/> Your ideas are protected.</p>
                 </div>
                 <div class="box">
                    <p class="title">Dispute Resolution</p>
                    <div class="divider"></div>
                    <p class="description">Fair mediation from our team to resolve any issue quickly.</p>
                 </div>
            </div>
        </section>
    `
  }
}

customElements.define('service-section', ServiceSection)
