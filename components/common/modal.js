class ModalSection extends HTMLElement {
  static get observedAttributes () {
    return [
      'type',
      'customTitle',
      'customContent',
      'customButtonTitle',
      'withIcon'
    ]
  }

  connectedCallback () {
    // freeze element
    document.body.classList.add('modal-open')

    this.render()
    this.attachEvents()
  }

  disconnectedCallback () {
    // delete freeze element
    document.body.classList.remove('modal-open')
  }

  // custom attribute
  get modalType () {
    return this.getAttribute('type') || 'success'
  }
  get modalTitle () {
    return this.getAttribute('customTitle') || ''
  }
  get modalContent () {
    return (
      this.getAttribute('customContent') ||
      'We have received your enquiry. <br/>One of our team members shall get in touch with you shortly.'
    )
  }
  get modalButtonTitle () {
    return this.getAttribute('customButtonTitle') || 'Go back'
  }
  get modalWithIcon () {
    return this.getAttribute('withIcon') || 'true'
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // handle button
    this.attachEventModalButton()
  }

  attachEventModalButton () {
    const modalBtn = this.querySelector('.modal-btn')
    modalBtn.addEventListener('click', () => {
      // to detect parent if modal closed
      this.dispatchEvent(
        new CustomEvent('modal-closed', {
          bubbles: true,
          detail: 'closed'
        })
      )
    })
  }

  getTemplate () {
    return `
        <div class="modal-container">
            <div class="box ${this.modalType}">
                <div class="icon-container ${this.modalWithIcon === 'true' ? '' : 'hide'}">
                    <img 
                    alt="icon" 
                    src="assets/icons/${
                      this.modalType === 'success'
                        ? 'success-icon'
                        : 'error-icon'
                    }.svg"
                    class="icon">
                </div>
                <div class="content">
                    <div class="title-container">
                      <p class="title ${this.modalType}">${this.modalTitle}</p>
                    </div>
                    <div class="description-container">
                      <p class="description">${this.modalContent}</p>
                    </div>
                </div>
                <div class="button-container">
                    <button class="modal-btn">${this.modalButtonTitle}</button>
                </div>
            </div>
        </div>
    `
  }
}

customElements.define('modal-section', ModalSection)
