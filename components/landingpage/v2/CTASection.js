class CTASection extends HTMLElement {
  connectedCallback() {
    this.render();
    this.attachEvents();
  }

  attachEvents() {
    // function for post project button
    this.attachEventPostProjectButton();
  }

  attachEventPostProjectButton() {
    const postBtn = this.querySelector('.cta-post-project-button');

    postBtn.addEventListener('click', () => {
      window.location.href = 'post-project.html';
    });
  }

  render() {
    this.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return `
          <section class="cta-v2-wrap padding-each-section spacing-beween-section">
              <div class="cta-v2-container">
                <div class="text-container">
                    <p class="text">Hire a manager to build your team and <span class="highlight">get it done.</span></p>
                </div>
                <div class="button-container">
                    <button
                        class="cta-post-project-button post-project-button primary-dark-btn">
                        Post Your Project
                        <img alt="arrow-right-black-icon" src="assets/icons/arrow-right-black.svg" class="arrow-right-black-icon"/>
                    </button>
                </div>
              </div>
          </section>
      `;
  }
}

customElements.define('cta-section', CTASection);
