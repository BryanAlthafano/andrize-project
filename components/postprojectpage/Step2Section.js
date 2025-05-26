class Step2Section extends HTMLElement {
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
    // parse data from local storage
    this.formData = {
      project_budget: '',
      project_completion_date: '',
      ...this.getPostProjectData(),
      step: 3
    }
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // input change: project budget
    this.attachEventProjectBudget()

    // input change: project date
    this.attachEventProjectDate()

    // button next
    this.attachEventNextButton()

    // button prev
    this.attachEventPrevButton()
  }

  attachEventProjectBudget () {
    const budgetInput = this.querySelector('.budget-input')
    const dollarPrefix = this.querySelector('.prefix')

    // handle icon dollar
    if (this.formData.project_budget === '') {
      dollarPrefix.classList.add('hide')
      budgetInput.classList.remove('add-prefix')
    } else {
      dollarPrefix.classList.remove('hide')
      budgetInput.classList.add('add-prefix')
    }

    budgetInput.addEventListener('input', e => {
      this.formData.project_budget = e.target.value

      // handle icon dollar
      if (this.formData.project_budget === '') {
        dollarPrefix.classList.add('hide')
        budgetInput.classList.remove('add-prefix')
      } else {
        dollarPrefix.classList.remove('hide')
        budgetInput.classList.add('add-prefix')
      }
    })
  }

  attachEventProjectDate () {
    const dateInput = this.querySelector('.project-date-input')
    dateInput.addEventListener('input', e => {
      this.formData.project_completion_date = e.target.value
      this.render()
      this.attachEvents()
    })
  }

  attachEventNextButton () {
    const nextBtn = this.querySelector('.next-step-btn')
    nextBtn.addEventListener('click', () => {
      nextBtn.classList.add('clicked')
      setTimeout(() => nextBtn.classList.remove('clicked'), 150)

      if (this.formData.project_budget.trim() === '') {
        alert('Please enter a budget.')
        return
      } else if (this.formData.project_completion_date === '') {
        alert('Please enter a completion date.')
        return
      }

      // save to localStorage
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

  attachEventPrevButton () {
    const prevBtn = this.querySelector('.prev-step-btn')
    prevBtn.addEventListener('click', () => {
      localStorage.setItem(
        'post_project_data',
        JSON.stringify({ ...this.getPostProjectData(), step: 1 })
      )

      // to detect if localstorage updated
      this.dispatchEvent(
        new CustomEvent('post-project-data-updated', {
          bubbles: true,
          detail: 'prev'
        })
      )
    })
  }

  formatDate (dateStr) {
    if (!dateStr) return ''
    const date = new Date(dateStr)
    const day = String(date.getDate()).padStart(2, '0')
    const month = date.toLocaleString('en-US', { month: 'short' })
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
  }

  getTodayDate () {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  getTemplate () {
    return `
        <section class="step2-section-container">
            <div class="gradient-border">
                <div class="box">
                    <div class="top-container">
                        <div class="form-group">
                            <label>Enter your budget</label>
                            <div class="budget-input-wrapper">
                                <span class="prefix">$</span>
                                <input class="budget-input project-budget-input" type="number" placeholder="(e.g. $1000)" required value="${
                                  this.formData.project_budget
                                }" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Select desired completion date</label> 
                            <div class="date-picker-wrapper">
                                <input 
                                class="project-date-input ${
                                  this.formData.project_completion_date !== ''
                                    ? 'active'
                                    : ''
                                }" 
                                type="date" 
                                placeholder="DD/MM/YYYY" 
                                required 
                                value="${this.formData.project_completion_date}"
                                min="${this.getTodayDate()}"
                                onkeydown="return false;"
                                />

                                <div class="date-display ${
                                  this.formData.project_completion_date !== ''
                                    ? 'active'
                                    : ''
                                }">
                                ${
                                  this.formData.project_completion_date === ''
                                    ? 'DD/MM/YYYY'
                                    : this.formatDate(
                                        this.formData.project_completion_date
                                      )
                                }
                                </div>
                                <div class="date-icon">
                                    <img alt="date-icon" src="assets/icons/date-picker-icon.svg">
                                </div>
                            </div> 
                        </div>
                    </div>
                    <div class="bottom-container">
                        <button class="prev-step-btn active">➝</button>
                        <button class="primary-light-btn next-step-btn">Next step</button>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step2-section', Step2Section)
