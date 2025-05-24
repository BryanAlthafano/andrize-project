import './VerificationEmailSection.js'

class Step1Section extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.attachEvents()
  }

  initData () {
    this.isActiveVerification = false;
    this.isWithEmail = false
    this.isShowPassword = false
    this.formData = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // function login with email
    this.attachEventWithEmailButton()

    // input change: firstname
    this.attachEventInputFirstname()

    // input change: lastname
    this.attachEventInputLastname()

    // input change: email
    this.attachEventInputEmail()

    // input change: password
    this.attachEventInputPassword()

    // function for password toggle
    this.attachEventPasswordToggle()

    // function for signup button
    this.attachEventSignupButton()
  }

  attachEventWithEmailButton () {
    const emailBtn = this.querySelector('.email-button')
    emailBtn.addEventListener('click', () => {
      this.isWithEmail = !this.isWithEmail
      this.render()
      this.attachEvents()
    })
  }

  attachEventInputFirstname () {
    const inputElement = this.querySelector('.firstname-input')
    inputElement.addEventListener('input', e => {
      this.formData.firstname = e.target.value
    })
  }

  attachEventInputLastname () {
    const inputElement = this.querySelector('.lastname-input')
    inputElement.addEventListener('input', e => {
      this.formData.lastname = e.target.value
    })
  }

  attachEventInputEmail () {
    const inputElement = this.querySelector('.email-input')
    inputElement.addEventListener('input', e => {
      this.formData.email = e.target.value
    })
  }

  attachEventInputPassword () {
    const inputElement = this.querySelector('.password-input')
    inputElement.addEventListener('input', e => {
      this.formData.password = e.target.value
    })
  }

  attachEventPasswordToggle () {
    const toggleBtn = this.querySelector('.toggle-icon')
    toggleBtn.addEventListener('click', () => {
      this.isShowPassword = !this.isShowPassword
      this.render()
      this.attachEvents()
    })
  }

  attachEventSignupButton() {
    const signupBtn = this.querySelector('.signup-button')
    signupBtn.addEventListener('click', () => {
      this.isActiveVerification = !this.isActiveVerification
      this.render()
    })

  }

  getTemplate () {
    return `
        <section class="signup-step1-section-container">
            ${this.isActiveVerification ? '<verification-email-section></verification-email-section>' : ''}

            <div class="container ${this.isActiveVerification ? 'hide' : ''}">
                <div class="heading-container">
                    <p class="heading">One Last Step — Sign Up</p>
                </div>
                <div class="gradient-border"> 
                    <div class="box">
                        <div class="login-option-container">
                            <div class="login-card google-card">
                                <img alt="icon" class="icon" src="assets/icons/google-icon.svg"/>
                                <p class="login-text">Continue with Google</p>
                            </div>
                            <div class="login-card linkedin-card">
                                <img alt="icon" class="icon" src="assets/icons/linkedin-icon.svg"/>
                                <p class="login-text">Continue with Linkedin</p>
                            </div>
                            <div class="login-card microsoft-card">
                                <img alt="icon" class="icon" src="assets/icons/microsoft-icon.svg"/>
                                <p class="login-text">Continue with Microsoft</p>
                            </div>
                        </div>

                        <div class="divider-container">
                            <div class="divider"></div>
                            <p class="divider-text">OR</p>
                        </div>

                        <div 
                        class="button-container 
                        ${this.isWithEmail ? 'hide' : ''}">
                            <button class="email-button">Continue with email</button>
                        </div>

                        <div 
                        class="form-container 
                        ${this.isWithEmail ? '' : 'hide'}">
                            <div class="form-name-container">
                                <div class="form-group">
                                    <label>First name</label> 
                                    <input 
                                    class="firstname-input" 
                                    type="text" 
                                    placeholder="Enter your first name" 
                                    required 
                                    value="${this.formData.firstname}" />
                                </div>
                                <div class="form-group">
                                    <label>Last name</label> 
                                    <input 
                                    class="lastname-input" 
                                    type="text" 
                                    placeholder="Enter your Last name" 
                                    required 
                                    value="${this.formData.lastname}" />
                                </div>
                            </div>

                            <div class="form-group">
                                <label>Email</label> 
                                <input 
                                class="email-input" 
                                type="email" 
                                placeholder="Enter your email" 
                                required 
                                value="${this.formData.email}" />
                            </div>

                            <div class="form-group">
                                <label>Password</label> 
                                <div class="password-input-wrapper">
                                    <input 
                                    class="password-input" 
                                    type="${
                                      this.isShowPassword ? 'text' : 'password'
                                    }" 
                                    placeholder="Enter a password" 
                                    required 
                                    value="${this.formData.password}" />
                                    <div class="toggle-icon">
                                        <svg class="eye-icon ${
                                          this.isShowPassword ? '' : 'hide'
                                        }" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D0D38" class="bi bi-eye" viewBox="0 0 16 16">
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                                        </svg>
                                    
                                        <svg class="eye-off-icon ${
                                          this.isShowPassword ? 'hide' : ''
                                        }" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0D0D38" class="bi bi-eye-slash" viewBox="0 0 16 16">
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
                                            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>

                            <div class="signup-button-container">
                                <button class="signup-button primary-light-btn">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step1-section', Step1Section)
