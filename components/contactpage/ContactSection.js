class ContactSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.attachEvents()
    this.listenForChildUpdates()
  }

  initData () {
    this.isActiveModal = false
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // button submit
    this.attachEventSubmitButton()
  }

  listenForChildUpdates () {
    this.addEventListener('modal-closed', e => {
      if (e.detail === 'closed') {
        this.isActiveModal = false
      }
      this.render()
      this.attachEvents()
    })
  }

  attachEventSubmitButton () {
    const submitBtn = this.querySelector('.submit-button')
    submitBtn.addEventListener('click', () => {
      // success modal
      this.isActiveModal = true
      this.render()
    })
  }

  getTemplate () {
    return `
        <section class="contact-section-container spacing-beween-section">
            ${this.isActiveModal ? '<modal-section customTitle=""></modal-section>' : ''}
            <div class="left-side">
                <div class="gradient-border">
                    <div class="box">
                        <div class="content-top">
                            <div class="title-container">
                                <p class="title">Company Info</p>
                            </div>
                            <div class="description-container">
                                <p class="description">Have a question or need help? <br/> We're here to assist you.</p>
                            </div>
                        </div>
                        <div class="content-bottom">
                            <div class="top-side">
                                <p class="title">Reach us</p>
                                <p class="description">If you have any questions, please contact us using the details below or use the contact form.</p>
                            </div>
                            <div class="bottom-side">
                                <div class="email-container">
                                    <div class="icon-container">
                                        <img class="icon" alt="icon" src="assets/icons/email-icon.svg"/>
                                    </div>
                                    <p class="email">hello@andrize.com</p>
                                </div>
                                <div class="location-container">
                                    <div class="icon-container">
                                        <img class="icon" alt="icon" src="assets/icons/location-icon.svg"/>
                                    </div>
                                    <p class="location">AndRize Pvt Ltd 123 Startup Lane, New Delhi, India</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="right-side">
                <div class="box">
                    <p class="title">General Enquiries</p>
                    <div class="field-container">
                        <div class="name-container">
                            <div class="form-group">
                                <label>Your first name</label>
                                <input type="text" placeholder="Enter your first name" required />
                            </div>
                            <div class="form-group">
                                <label>Your last name</label>
                                <input type="text" placeholder="Enter your last name" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Your email</label>
                            <input type="email" placeholder="Enter your email" required />
                        </div>
                        <div class="form-group">
                            <label>Your phone number</label>
                            <div class="phone-input">
                                <select>
                                    <option value="+1" style="background-color: #8063D9">🇺🇸 +1</option>
                                    <option value="+62" style="background-color: #8063D9">🇮🇩 +62</option>
                                    <option value="+44" style="background-color: #8063D9">🇬🇧 +44</option>
                                </select>
                                <input type="tel" placeholder="xxxxxxxxxx" required />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Your message</label>
                            <textarea placeholder="(e.g. Attract investors)" rows="3"></textarea>
                        </div>
                    </div>
                    <div class="button-container">
                        <button class="submit-button primary-dark-btn">Send Message</button>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('contact-section', ContactSection)
