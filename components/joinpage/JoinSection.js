class JoinSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="join-section-container">
            <div class="box">
                <div class="top-container">
                    <div class="logo-container">
                        <img
                            class="logo-img"
                            src="assets/images/logo-desktop.svg"
                            alt="Logo"
                        />
                    </div>
                    <div class="title-container">
                        <p class="title">Join as a Project Manager <br/> or a Creator</p>
                    </div>
                </div>
                <div class="bottom-container">
                    <div class="card-container">
                        <div class="card">
                            <div class="icon-container">
                                <img
                                    class="icon-img"
                                    src="assets/icons/signup-project-manager-icon.svg"
                                    alt="icon"
                                />
                            </div>
                            <div class="content-container">
                                <div class="content">
                                    <p class="title">Project Manger</p>
                                    <p class="description">I'm a project manager, looking for work</p>
                                </div>
                                <div class="button-container">
                                    <img
                                        class="arrow-icon"
                                        src="assets/icons/arrow-right-icon.svg"
                                        alt="arrow-icon"
                                    />
                                </div>
                            </div>
                        </div>

                        <div class="card">
                            <div class="icon-container">
                                <img
                                    class="icon-img"
                                    src="assets/icons/signup-creator-icon.svg"
                                    alt="icon"
                                />
                            </div>
                            <div class="content-container">
                                <div class="content">
                                    <p class="title">Creator</p>
                                    <p class="description">I'm a creator, looking for work</p>
                                </div>
                                <div class="button-container">
                                    <img
                                        class="arrow-icon"
                                        src="assets/icons/arrow-right-icon.svg"
                                        alt="arrow-icon"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="description-container">
                        <p class="description">Already have an account? <span class="color">Log in</span></p>
                    </div>
                </div>                
            </div>
        </section>
    `
  }
}

customElements.define('join-section', JoinSection)
