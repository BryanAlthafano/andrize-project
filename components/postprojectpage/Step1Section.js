class Step1Section extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.attachEvents()
  }

  getPostProjectData () {
    const data = localStorage.getItem('post_project_data')
    return JSON.parse(data)
  }

  initData () {
    this.option_list = [
      'Video Production',
      'Web Development',
      'Digital Marketing',
      'Branding / Design',
      'Al or Automation',
      'Other'
    ]

    // parse data from local storage
    this.formData = {
      project_title: '',
      project_cateagory: '',
      ...this.getPostProjectData(),
      step: 2
    }
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // input change: project title
    this.attachEventProjectTitle()

    // input change: project category
    this.attachEventProjectCategory()

    // button next
    this.attachEventNextButton()
  }

  attachEventProjectTitle () {
    const input = this.querySelector('.project-title-input')
    input.addEventListener('input', e => {
      this.formData.project_title = e.target.value
    })
  }

  attachEventProjectCategory () {
    const options = this.querySelectorAll('.option')
    options.forEach(el => {
      el.addEventListener('click', () => {
        this.formData.project_cateagory = el.textContent
        this.render()
        this.attachEvents() // re-attach after re-render
      })
    })
  }

  attachEventNextButton () {
    const nextBtn = this.querySelector('.next-step-btn')
    nextBtn.addEventListener('click', () => {
      nextBtn.classList.add('clicked')
      setTimeout(() => nextBtn.classList.remove('clicked'), 150)

      if (this.formData.project_title.trim() === '') {
        alert('Please enter a project title.')
        return
      } else if (this.formData.project_cateagory === '') {
        alert('Please select a project category.')
        return
      }

      // save to localStorage
      console.log('this.formData 1', this.formData)
      localStorage.setItem('post_project_data', JSON.stringify(this.formData))

      // to detect if localstorage updated
      this.dispatchEvent(
        new CustomEvent('post-project-data-updated', {
          bubbles: true,
          detail: 'next'
        })
      )
    })
  }

  getTemplate () {
    return `
        <section class="step1-section-container">
            <div class="gradient-border">
                <div class="box">
                    <div class="top-container">
                        <div class="form-group">
                            <label>Project Title</label>
                            <input class="project-title-input" type="text" placeholder="(e.g. Build a responsive website)" required value="${
                              this.formData.project_title
                            }" />
                        </div>
                        <div class="form-group">
                            <label>Choose project category</label>
                            <div class="option-list-container">
                                ${this.option_list
                                  .map((option, index) => {
                                    return `
                                    <div class="option ${
                                      this.formData?.project_cateagory ===
                                      option
                                        ? 'active'
                                        : ''
                                    }" data-key="${index}">${option}</div>
                                    `
                                  })
                                  .join('')}
                            </div>
                        </div>
                    </div>
                    <div class="bottom-container">
                        <button class="primary-light-btn next-step-btn">Next step</button>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step1-section', Step1Section)
