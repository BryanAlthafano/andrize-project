class ProjectCard extends HTMLElement {
  static get observedAttributes () {
    return [
      'niche',
      'title',
      'description',
      'detailDescription',
      'budget',
      'duration',
      'people',
      'peopleDescription',
      'coverUrl',
      'videoUrl'
    ]
  }

  connectedCallback () {
    this.initData()
    this.render()
    this.attachEvents()
    this.listenForChildUpdates()
  }

  initData () {
    this.isActiveModal = false
  }

  // custom attribute
  get niche () {
    return this.getAttribute('niche') || ''
  }
  get title () {
    return this.getAttribute('title') || ''
  }
  get description () {
    return this.getAttribute('description') || ''
  }
  get detailDescription () {
    return this.getAttribute('detailDescription') || ''
  }
  get budget () {
    return this.getAttribute('budget') || ''
  }
  get duration () {
    return this.getAttribute('duration') || ''
  }
  get people () {
    return this.getAttribute('people') || ''
  }
  get peopleDescription () {
    return this.getAttribute('peopleDescription') || ''
  }
  get coverUrl () {
    return this.getAttribute('coverUrl') || ''
  }
  get videoUrl () {
    return this.getAttribute('videoUrl') || ''
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // handle button
    this.attachEventViewProjectButton()

    // handle tooltip
    this.attachEventTooltip()
  }

  attachEventTooltip () {
    this.querySelectorAll('.info-icon').forEach(el => {
      tippy(el, {
        allowHTML: true,
        placement: 'top-end',
        trigger: 'click',
        arrow: false,
        offset: [10, -18],
        hideOnClick: true,
        maxWidth: 225,
        content: this.peopleDescription
      })
    })
  }

  attachEventViewProjectButton () {
    const modalBtn = this.querySelector('.view-project')
    modalBtn.addEventListener('click', () => {
      this.isActiveModal = true
      this.render()
    })
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

  getTemplate () {
    return `        
        <div class="project-card">
            <div class="top-container">
                <img alt="cover" class="cover-card" loading="lazy" src="assets/images/${
                  this.coverUrl
                }.jpg">
                <div class="cover-content">
                    <div class="niche-container">
                        <p class="niche">${this.niche}</p>
                    </div>
                </div>
            </div>

            <div class="bottom-container">
                <div class="content-container">
                    <div class="content-top">
                        <p class="title">${this.title}</p>
                        <p class="description">${this.description}</p>
                    </div>
                    <div class="content-bottom">
                        <div class="box">
                            <div class="box-top">
                                <div class="left">
                                <div class="icon-container">
                                    <img
                                    class="icon"
                                    src="assets/icons/budget-icon-v2.svg"
                                    alt="item-icon"
                                    />
                                </div>
                                <p class="title">Budget</p>
                                </div>
                            </div>
                            <div class="box-bottom">
                                <p class="description">$${this.budget}</p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-top">
                                <div class="left">
                                <div class="icon-container">
                                <img
                                    class="icon"
                                    src="assets/icons/duration-icon-v2.svg"
                                    alt="item-icon"
                                />
                                </div>
                                <p class="title">Duration</p>
                            </div>
                            </div>
                            <div class="box-bottom">
                                <p class="description">${this.duration}</p>
                            </div>
                        </div>
                        <div class="box">
                            <div class="box-top">
                                <div class="left">
                                    <div class="icon-container">
                                    <img
                                        class="icon"
                                        src="assets/icons/team-icon-v2.svg"
                                        alt="item-icon"
                                    />
                                    </div>
                                    <p class="title">Team</p>
                                </div>

                                <div class="right">
                                <div class="icon-container">
                                <img
                                    class="icon info-icon"
                                    src="assets/icons/info-icon-v2.svg"
                                    alt="item-icon"
                                />
                                </div>
                                </div>
                            </div>
                            <div class="box-bottom">
                                <p class="description">${this.people} people</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="button-container">
                    <button class="view-project primary-dark-btn">View Project</button>
                </div>
            </div>

        </div>

        ${
          this.isActiveModal
            ? `<project-card-detail
            niche="${this.niche}"
            title="${this.title}"
            description="${this.description}"
            detailDescription="${this.detailDescription}"
            budget="${this.budget}"
            duration="${this.duration}"
            people="${this.people}"
            peopleDescription="${this.peopleDescription}"
            coverUrl="${this.coverUrl}"
            videoUrl="${this.videoUrl}" />`
            : ``
        }
    `
  }
}

customElements.define('project-card', ProjectCard)
