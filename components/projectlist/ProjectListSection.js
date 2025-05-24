class ProjectListSection extends HTMLElement {
  connectedCallback () {
    this.project_list = [
      {
        id: 1,
        title: 'SEO Content Campaign for D2C Brand',
        niche: 'Digital Marketing',
        description:
          'Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.',
        team_count: 4,
        team_description: `Led by a tech <br/>manager and involved <br/>an AI developer and <br/>a UX designer.`,
        duration: '1 month',
        budget: '$1,000'
      },
      {
        id: 2,
        title: 'Explainer Video for SaaS Launch',
        niche: 'Video Production',
        description:
          'A 90-second animated explainer video showcasing the key benefits of a B2B SaaS product, created for social media and website launch.',
        team_count: 4,
        team_description: `Led by a tech <br/>manager and involved <br/>an AI developer and <br/>a UX designer.`,
        duration: '2 weeks',
        budget: '$1,200'
      },
      {
        id: 3,
        title: 'Mobile App UI for Fintech Startup',
        niche: 'Design',
        description:
          'Designed clean, intuitive UI screens for a mobile banking app focused on user onboarding, transaction flow, and dashboard features.',
        team_count: 8,
        team_description: `Led by a tech <br/>manager and involved <br/>an AI developer and <br/>a UX designer.`,
        duration: '4 weeks',
        budget: '$5,000'
      }
    ]

    // tooltip configuration
    tippy('#informationId', {
      allowHTML: true,
      placement: 'bottom',
      trigger: 'click',
      content: `Led by a tech <br/>manager and involved <br/>an AI developer and <br/>a UX designer.`
    })

    this.render()
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  getTemplate () {
    return `
        <section class="project-list-section-container spacing-beween-section">
        ${[...this.project_list, ...this.project_list]
          .map(project => {
            return `
            <div class="card">
                <div class="top-container">
                    <div class="heading-top">
                        <div class="title-container">
                            <p class="title">SEO Content Campaign for D2C Brand</p>
                        </div>
                        <div class="niche-container">
                            <p class="niche">Digital Marketing</p>
                        </div>
                    </div>
                    <div class="description-container">
                        <p class="description">Developed a content marketing strategy and delivered 20 SEO-optimized blog posts to improve organic traffic for a beauty brand.</p>
                    </div>
                </div>
                <div class="bottom-container">
                    <div class="box-container">
                        <div class="icon-container">
                            <div class="icon">
                                <img
                                    class="item-icon"
                                    src="assets/icons/team-icon.svg"
                                    alt="item-icon"
                                />
                            </div>
                        </div>
                        <div class="title-container">
                            <p class="title">Team:</p>
                        </div>
                        <div class="description2-container">
                            <p class="description2">4 people</p>
                            <div id="informationId" class="information-container">
                                <p class="information">?</p>
                            </div>
                        </div>
                    </div>
                    <div class="box-container">
                        <div class="icon-container">
                            <div class="icon">
                                <img
                                    class="item-icon"
                                    src="assets/icons/money2-icon.svg"
                                    alt="item-icon"
                                />
                            </div>
                        </div>
                        <div class="title-container">
                            <p class="title">Duration:</p>
                        </div>
                        <div class="description2-container">
                            <p class="description2">1 month</p>
                        </div>
                    </div>
                    <div class="box-container">
                        <div class="icon-container">
                            <div class="icon">
                                <img
                                    class="item-icon"
                                    src="assets/icons/budget2-icon.svg"
                                    alt="item-icon"
                                />
                            </div>
                        </div>
                        <div class="title-container">
                            <p class="title">Budget:</p>
                        </div>
                        <div class="description2-container">
                            <p class="description2">$1,000</p>
                        </div>
                    </div>
                </div>
            </div>  
        `
          })
          .join('')}

          <div class="show-more-btn-container">
            <button class="primary-light-btn show-more-btn">
                Show more projects
            </button>
          </div>
        </section>
    `
  }
}

customElements.define('project-list-section', ProjectListSection)
