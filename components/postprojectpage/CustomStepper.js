class CustomStepper extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.listenForChildUpdates()
  }

  getPostProjectData () {
    const data = localStorage.getItem('post_project_data')
    return JSON.parse(data)
  }

  initData () {
    this.heading_list = [
      'What do you need done?',
      'Choose your budget and timeline',
      'Describe your project',
      'Review Your Project Before Posting'
    ]

    this.post_project = {
      step: 1,
      ...this.getPostProjectData()
    }
  }

  listenForChildUpdates () {
    this.addEventListener('post-project-data-updated', e => {
      if (e.detail === 'next') {
        // handle next step
        this.updateStepperUI('next')
      } else {
        // handle prev step
        this.updateStepperUI('prev')
      }
      this.render()
    })
  }

  updateStepperUI (key) {
    const currentStep = this.post_project?.step
    if (key === 'next') {
      this.post_project = {
        ...this.post_project,
        step: currentStep + 1
      }
    } else {
      this.post_project = {
        ...this.post_project,
        step: currentStep - 1
      }
    }

    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="custom-stepper-container">
            <div class="heading-container ${
              this.post_project?.step > 4 ? 'hide' : ''
            }">
                <p class="heading">${
                  this.heading_list[this.post_project?.step - 1]
                }</p>
            </div>
            <div class="stepper ${this.post_project?.step > 4 ? 'hide' : ''}">
                <div class="step-circle ${
                  this.post_project?.step >= 1 ? 'active' : ''
                } ${this.post_project?.step > 2 ? 'hide' : ''}">1</div>
                <div class="step-line ${
                  this.post_project?.step > 2 ? 'hide' : ''
                }">
                    <div class="step-progress ${
                      this.post_project?.step > 1
                        ? 'done'
                        : this.post_project?.step == 1
                        ? 'active'
                        : ''
                    }"></div>
                </div>

                <div class="step-circle ${
                  this.post_project?.step >= 2 ? 'active' : ''
                }">2</div>
                <div class="step-line">
                    <div class="step-progress ${
                      this.post_project?.step > 2
                        ? 'done'
                        : this.post_project?.step == 2
                        ? 'active'
                        : ''
                    }"></div>
                </div>

                <div class="step-circle ${
                  this.post_project?.step >= 3 ? 'active' : ''
                }">3</div>
                <div class="step-line ${
                  this.post_project?.step <= 2 ? 'hide' : ''
                }">
                    <div class="step-progress ${
                      this.post_project?.step > 3
                        ? 'done'
                        : this.post_project?.step == 3
                        ? 'active'
                        : ''
                    }"></div>
                </div>

                <div class="step-circle ${
                  this.post_project?.step === 4 ? 'active' : ''
                } ${this.post_project?.step <= 2 ? 'hide' : ''}">4</div>
            </div>

            <div class="content">
                ${
                  this.post_project?.step === 1
                    ? '<step1-section></step1-section>'
                    : this.post_project?.step === 2
                    ? '<step2-section></step2-section>'
                    : this.post_project?.step === 3
                    ? '<step3-section></step3-section>'
                    : this.post_project?.step === 4
                    ? '<step4-section></step4-section>'
                    : this.post_project?.step === 5
                    ? '<step-done-section></step-done-section>'
                    : ''
                }
            </div>
        </section>
    `
  }
}

customElements.define('custom-stepper', CustomStepper)
