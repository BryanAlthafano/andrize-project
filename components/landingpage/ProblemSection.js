class ProblemSection extends HTMLElement {
  connectedCallback () {
    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="problem-container spacing-beween-section">
            <div class="heading-container">
                <p class="heading">Frustrated with your current outsourcing approach?</p>
            </div>
            <div class="content">
                <div class="box-container">
                    <div class="left-side">
                        <div class="icon-container">
                            <img class="icon" src="assets/icons/time-icon.svg" alt="time-icon">
                        </div>
                        <div class="title-container">
                            <p class="title">Wasted Time</p>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="description-container">
                            <p class="description">Managing freelancers takes your focus away from your core business.</p>
                        </div>                        
                    </div>
                </div>
                <div class="box-container">
                    <div class="left-side">
                        <div class="icon-container">
                            <img class="icon" src="assets/icons/budget-icon.svg" alt="budget-icon">
                        </div>
                        <div class="title-container">
                            <p class="title">Budget Overruns</p>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="description-container">
                            <p class="description">Freelancers often underestimate costs — your budget keeps stretching.</p>
                        </div>                        
                    </div>
                </div>
                <div class="box-container">
                    <div class="left-side">
                        <div class="icon-container">
                            <img class="icon" src="assets/icons/deadline-icon.svg" alt="deadline-icon">
                        </div>
                        <div class="title-container">
                            <p class="title">Missed Deadlines</p>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="description-container">
                            <p class="description">Lack of oversight causes constant delays and missed launch dates.</p>
                        </div>                        
                    </div>
                </div>
                <div class="box-container">
                    <div class="left-side">
                        <div class="icon-container">
                            <img class="icon" src="assets/icons/quality-icon.svg" alt="quality-icon">
                        </div>
                        <div class="title-container">
                            <p class="title">Poor Quality</p>
                        </div>
                    </div>
                    <div class="right-side">
                        <div class="description-container">
                            <p class="description">No quality checks mean inconsistent and sometimes unusable work.</p>
                        </div>                        
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('problem-section', ProblemSection)
