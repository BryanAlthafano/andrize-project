class StepDoneSection extends HTMLElement {
  connectedCallback () {
    this.render()
    this.attachEvents()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // done button
    this.attachEventDoneButton()
  }

  attachEventDoneButton () {
    const doneBtn = this.querySelector('.home-button')
    doneBtn.addEventListener('click', () => {
      // clear localStorage
      localStorage.removeItem('post_project_data')
      // route to homepage
      window.location.href = 'index.html'
    })
  }

  getTemplate () {
    return `
        <section class="step-done-section-container">
            <div class="box">
                <div class="heading-container">
                    <p class="heading">Your project has been posted</p>
                </div>
                <div class="icon-container">
                    <div class="box-icon">
                        <img alt="icon" src="assets/icons/smile-icon.svg" class="icon"/>
                    </div> 
                </div>
                <div class="description-container">
                    <p class="description">We’ll send you a few proposals from vetted project managers within 24 hours.</p>
                </div>
                <div class="button-container">
                    <button class="home-button primary-light-btn">Back to Home</button>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step-done-section', StepDoneSection)
