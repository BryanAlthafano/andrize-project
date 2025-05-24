class HeroSection extends HTMLElement {
  connectedCallback () {
    this.render()
    // this.autoChangeImage() // no need this for now
  }

  // function for auto change image
  autoChangeImage () {
    const imagePaths = [
      'assets/images/solution-hero-img.png',
      'assets/images/solution-hero-img-2.png',
      'assets/images/solution-hero-img-3.png'
    ]

    let index = 0
    const imgElement = this.querySelector('.solution-hero-img')

    setInterval(() => {
      imgElement.classList.add('fade-out')

      // After the fade-out finishes, swap the image source
      setTimeout(() => {
        index = (index + 1) % imagePaths.length
        imgElement.src = imagePaths[index]

        // Slight delay, then fade back in
        setTimeout(() => imgElement.classList.remove('fade-out'), 100)
      }, 500) // Match this to the CSS transition duration 0.5s
    }, 5000) // Change image every 5s
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
      <section class="solution-hero-section-container">
        <div class="left-side">
          <div class="gradient-border">
            <div class="box">
                <div class="title-container">
                    <p class="title">How AndRize Works  One Manager, <span class="color">One Team, Less Chaos</span></p>
                </div>
                <div class="description-container">
                    <p class="description">From posting a project to final delivery, here’s what to expect.</p>
                </div>
            </div>
          </div>
        </div>
        <div class="right-side">          
            <img
                class="solution-hero-img"
                src="assets/images/solution-hero-img.png"
                alt="solution-hero-img"
              />
        </div> 
      </section> 
    `
  }
}

customElements.define('hero-section', HeroSection)
