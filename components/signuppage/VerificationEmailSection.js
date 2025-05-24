class VerificationEmailSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.attachEvents()
  }

  initData () {
    this.otp = ''
  }

  getPostProjectData () {
    const data = localStorage.getItem('post_project_data')
    return JSON.parse(data)
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // function to handle otp input
    this.attachEventOtpInput()

    // function to handle verify email button
    this.attachEventVerifyEmailButton()
  }

  attachEventOtpInput () {
    const inputs = this.querySelectorAll('.otp-input')

    inputs.forEach((input, index) => {
      input.addEventListener('input', e => {
        const value = e.target.value
        if (value.length > 1) {
          // when user paste number
          this.handlePaste(value, inputs)
          return
        }

        // move to next input when value is exist
        if (value && index < inputs.length - 1) {
          inputs[index + 1].focus()
        }

        this.updateOtp(inputs)
      })

      input.addEventListener('keydown', e => {
        // Backspace: when empty input, move to previous input
        if (e.key === 'Backspace' && !e.target.value && index > 0) {
          inputs[index - 1].focus()
        }
      })

      input.addEventListener('paste', e => {
        e.preventDefault()
        const paste = e.clipboardData.getData('text').replace(/\D/g, '')
        this.handlePaste(paste, inputs)
      })
    })
  }

  attachEventVerifyEmailButton () {
    const btnElement = this.querySelector('.verify-email-button')
    btnElement.addEventListener('click', () => {
      // when user logged in
      const localData = { ...this.getPostProjectData(), isLogged: true }
      // save to localStorage
      localStorage.setItem('post_project_data', JSON.stringify(localData))

      // redirect to post project to continue the step
      window.location.href = 'post-project.html'
    })
  }

  updateOtp (inputs) {
    this.otp = Array.from(inputs)
      .map(input => input.value)
      .join('')
    console.log('OTP:', this.otp)
  }

  handlePaste (paste, inputs) {
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = paste[i] || ''
    }
    this.updateOtp(inputs)

    // focus on the last filled input
    const nextIndex =
      paste.length < inputs.length ? paste.length : inputs.length - 1
    inputs[nextIndex].focus()
  }

  getTemplate () {
    return `
        <section class="signup-verification-email-section-container">
            <div class="container">
                <div class="heading-container">
                    <p class="heading">Confirm your email</p>
                </div>
                <div class="gradient-border">
                    <div class="box">
                        <div class="content">
                            <div class="title-container">
                                <p class="title">We’ve sent a confirmation to email Youremail@gmail.com</p>
                            </div>
                            <div class="description-container">
                                <p class="description">Please check your inbox and enter the code below</p>
                            </div>
                        </div>

                        <div class="otp-input-container">
                            <input class="otp-input" type="text" inputmode="numeric" maxlength="1" />
                            <input class="otp-input" type="text" inputmode="numeric" maxlength="1" />
                            <input class="otp-input" type="text" inputmode="numeric" maxlength="1" />
                            <input class="otp-input" type="text" inputmode="numeric" maxlength="1" />
                            <input class="otp-input" type="text" inputmode="numeric" maxlength="1" />
                            <input class="otp-input" type="text" inputmode="numeric" maxlength="1" />
                        </div>

                        <div class="bottom-container">
                            <div class="button-container">
                                <button class="verify-email-button primary-light-btn">Verify Email</button>
                            </div>
                            <div class="message-container">
                                <p class="message">Didn't receive the code <span class="color">Resend</span></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('verification-email-section', VerificationEmailSection)
