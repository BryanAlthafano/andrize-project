class ProjectListSection extends HTMLElement {
  connectedCallback () {
    this.initData()
    this.render()
    this.attachEvents()
  }

  initData () {
    this.projectList = [
      {
        id: 1,
        title: 'Ad Video Series for Premium Furniture Brand',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-1'
      },
      {
        id: 2,
        title: 'Social Media Campaign for AK Global Dent',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-2'
      },
      {
        id: 3,
        title: 'Emotive Video Ad for Kidzee Preschool',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-3'
      },
      {
        id: 4,
        title: 'Emotive Video Ad for Kidzee Preschool',
        description:
          'A set of short, visually stunning videos created to elevate the brand presence of a premium furniture retailer.',
        niche: 'Digital Marketing',
        budget: '950',
        duration: '1.5 Week',
        people: '2',
        people_description: 'Tech Manager, Designer, Full-Stack Dev, QA',
        url: 'project-cover-4'
      }
    ]
    ;(this.categories = [
      {
        id: 1,
        title: 'All'
      },
      {
        id: 2,
        title: 'Digital Marketing'
      },
      {
        id: 3,
        title: 'Video & Animation'
      },
      {
        id: 4,
        title: 'Web & App Development'
      },
      {
        id: 5,
        title: 'AI & Automation'
      }
    ]),
      (this.selectedCategory = 1)
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
    // handle tooltip
    this.attachEventTooltip()

    // handle category
    this.attachEventCategory()
  }

  attachEventTooltip () {
    this.querySelectorAll('.information-container').forEach(el => {
      tippy(el, {
        allowHTML: true,
        placement: 'bottom',
        trigger: 'click',
        content: el.dataset.tooltip
      })
    })
  }

  attachEventCategory () {
    this.querySelectorAll('.category').forEach(el => {
      el.addEventListener('click', () => {
        const isActive = el.classList.contains('active')

        // if already active, do nothing
        if (isActive) return

        // remove active from all categories
        this.querySelectorAll('.category.active').forEach(openEl => {
          openEl.classList.remove('active')
        })

        // set the clicked element as active
        el.classList.add('active')
      })
    })
  }

  getTemplate () {
    return `
        <section class="project-list-v2-section-container padding-each-section">
        <div class="filter-list">
            ${this.categories
              .map(category => {
                return `
                <div 
                class="category ${
                  category?.id === this.selectedCategory ? 'active' : ''
                }" 
                data-key="${category?.id}">${category?.title}</div>`
              })
              .join('')}
        </div>
        <div class="card-list">
        ${this.projectList
          .map(project => {
            return `
            <project-card
            class="card"
            data-key="${project?.id}"
            niche="${project?.niche}"
            title="${project?.title}"
            description="${project?.description}"
            budget="${project?.budget}"
            duration="${project?.duration}"
            people="${project?.people}"
            peopleDescription="${project?.people_description}"
            coverUrl="${project?.url}"></project-card>`
          })
          .join('')}
        </div>

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
