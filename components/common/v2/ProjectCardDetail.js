class ProjectCardDetail extends HTMLElement {
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
  }

  disconnectedCallback () {
    if (this.modalEl) {
      this.modalEl.remove()
      this.modalEl = null
    }
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

  initData () {
    this.modalEl = null
  }

  render () {
    // create modal element
    this.modalEl = document.createElement('div')
    this.modalEl.className = 'project-card-detail-container'
    this.modalEl.innerHTML = this.getTemplate()

    // add to body
    document.body.appendChild(this.modalEl)
  }

  attachEvents () {
    // handle tooltip
    this.attachEventTooltip()

    // handle close button
    this.attachEventCloseButton()

    // handle click outside
    this.attachEventOverlay()
  }

  attachEventTooltip () {
    this.modalEl.querySelectorAll('.info-icon-2').forEach(el => {
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

  attachEventCloseButton () {
    const modalBtn = this.modalEl.querySelector('.close-btn')
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

  attachEventOverlay () {
    // klik click -> close
    this.modalEl.addEventListener('click', e => {
      if (e.target === this.modalEl) {
        this.dispatchEvent(
          new CustomEvent('modal-closed', {
            bubbles: true,
            detail: 'closed'
          })
        )
      }
    })
  }

  getTemplate () {
    return ` 
    <div class="box">
      <div class="box-scroll-area">
          <div class="top-container">
            <div class="top-content">
              <div class="top">
                <div class="header">
                  <p class="title">${this.title}</p>
                  <div class="close-btn-container">
                    <button class="close-btn"> 
                      <img alt="project-detail-close-icon" class="project-detail-close-icon" src="assets/icons/project-detail-close-icon.svg">
                    </button>
                  </div>
                </div>

                <div class="cover-container">
                  <img alt="cover" class="cover-card" loading="lazy" src="assets/images/${this.coverUrl}.jpg">
                  <div class="cover-content">
                      <div class="niche-container">
                          <p class="niche">${this.niche}</p>
                      </div>
                  </div>
                </div> 
            </div>

            <div class="info-container">
                        <div class="info-box">
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
                        <div class="info-box">
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
                        <div class="info-box">
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
                                    class="icon info-icon-2"
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
            <div class="bottom-content">
                <p class="title">Project Overview</p>
                <p class="description">${this.description}</p>
            </div>
          </div>
          <div class="bottom-container">
            <div class="top">
              <video class="project-detail-video" controls muted playsInline>
                  <source src="assets/videos/${this.videoUrl}.mp4" type="video/mp4">
                  Your browser does not support the video tag.
              </video>
            </div>
            <div class="bottom">
              <p class="title">About Mystery Monks</p>
              <p class="description">${this.detailDescription}</p>
            </div>
          </div>
      </div> 
    </div>
    `
  }
}

customElements.define('project-card-detail', ProjectCardDetail)
