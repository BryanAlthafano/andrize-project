class Step4Section extends HTMLElement {
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
    this.isAllowEdit = true
    this.category_list = [
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
      project_budget: '',
      project_completion_date: '',
      project_description: '',
      ...this.getPostProjectData(),
      step: 5
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

    // input change: project budget
    this.attachEventProjectBudget()

    // input change: project date
    this.attachEventProjectDate()

    // input change: project description
    this.attachEventProjectDescription()

    // input change: project attachments
    this.attachEventProjectFiles()

    // button next
    this.attachEventNextButton()

    // button prev
    this.attachEventPrevButton()

    // tooltip
    this.attachEventTooltip()
  }

  attachEventEditButton () {
    // we cancel using this function
    const editButtonElement = this.querySelector('.edit-button')

    // edit button click event
    editButtonElement.addEventListener('click', () => {
      this.isAllowEdit = !this.isAllowEdit
      this.render()
      this.attachEvents()
    })

    // <div
    //     class="edit-button ${this.isAllowEdit ? 'active' : ''}">
    //     ${
    //       this.isAllowEdit
    //         ? '<div class="close-icon-class">✕</div>'
    //         : '<img alt="edit-icon" src="assets/icons/edit-icon.svg" class="edit-icon-class" />'
    //     }
    // </div>
  }

  attachEventProjectTitle () {
    const input = this.querySelector('.project-title-input')
    input.addEventListener('input', e => {
      this.formData.project_title = e.target.value

      // validation
      this.handleErrorMessage('title')
    })
  }

  attachEventProjectCategory () {
    const selectElement = this.querySelector('.project-category-input')
    const iconElement = this.querySelector('.chevron-icon-class')
    selectElement.addEventListener('change', e => {
      this.formData.project_cateagory = e.target.value
      iconElement.classList.remove('open')
    })

    // custom icon
    selectElement.addEventListener('focus', () => {
      iconElement.classList.add('open')
    })
    selectElement.addEventListener('blur', () => {
      iconElement.classList.remove('open')
    })

    // validation
    this.handleErrorMessage('category')
  }

  attachEventProjectBudget () {
    const budgetInput = this.querySelector('.project-budget-input')
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

      // validation
      this.handleErrorMessage('budget')
    })
  }

  attachEventProjectDate () {
    const dateInput = this.querySelector('.project-date-input')
    dateInput.addEventListener('input', e => {
      this.formData.project_completion_date = e.target.value

      // validation
      this.handleErrorMessage('date')
    })
  }

  attachEventProjectDescription () {
    const input = this.querySelector('.project-description-input')
    input.addEventListener('input', e => {
      this.formData.project_description = e.target.value

      // validation
      this.handleErrorMessage('description')
    })
  }

  attachEventProjectFiles () {
    const dropArea = this.querySelector('#dropArea')
    const fileInput = this.querySelector('#fileInput')

    // click open the file
    dropArea.addEventListener('click', () => fileInput.click())

    // input file manually
    fileInput.addEventListener('change', e => {
      this.handleFiles(e.target.files)
    })

    // drag over
    dropArea.addEventListener('dragover', e => {
      e.preventDefault()
      dropArea.classList.add('dragover')
    })

    // drag leave
    dropArea.addEventListener('dragleave', () => {
      dropArea.classList.remove('dragover')
    })

    // drop file
    dropArea.addEventListener('drop', e => {
      e.preventDefault()
      dropArea.classList.remove('dragover')
      this.handleFiles(e.dataTransfer.files)
    })

    this.renderFileList()
  }

  attachEventNextButton () {
    const nextBtn = this.querySelector('.next-step-btn')
    nextBtn.addEventListener('click', () => {
      nextBtn.classList.add('clicked')
      setTimeout(() => nextBtn.classList.remove('clicked'), 150)

      // validation
      const titleValid = this.handleErrorMessage('title')
      const categoryValid = this.handleErrorMessage('category')
      const budgetValid = this.handleErrorMessage('budget')
      const dateValid = this.handleErrorMessage('date')
      const descriptionValid = this.handleErrorMessage('description')
      if (
        titleValid === false ||
        categoryValid === false ||
        budgetValid === false ||
        dateValid === false ||
        descriptionValid === false
      ) {
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
        JSON.stringify({ ...this.getPostProjectData(), step: 4 })
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

  attachEventTooltip () {
    const messageElement = this.querySelector('.message-class')
    const informationElement = this.querySelector('.information-container')
    messageElement.addEventListener('click', () => {
      informationElement.click()
    })

    tippy('#informationId', {
      allowHTML: true,
      placement: 'bottom-start',
      trigger: 'click',
      content: `Examples of effective descriptions <br/>Examples of effective descriptions <br/>Examples of effective descriptions <br/>Examples of effective descriptions <br/>`
    })
  }

  handleFiles = async files => {
    const fileList = this.querySelector('#uploadedFilesContainer')
    const existingFiles = this.formData.project_attachments
    const newFiles = Array.from(files)

    const uniqueMap = new Map(existingFiles.map(f => [f.name, f]))

    for (const file of newFiles) {
      if (uniqueMap.size >= 5) {
        alert('Maximum 5 attachments are allowed.')
        break
      }

      if (!uniqueMap.has(file.name)) {
        try {
          const uploaded = await this.uploadFileWithProgress(file, fileList)
          uniqueMap.set(file.name, {
            id: uploaded.id,
            name: uploaded.name,
            size: uploaded.size
          })
        } catch (err) {
          console.error(err)
        }
      }
    }

    this.formData.project_attachments = Array.from(uniqueMap.values())
    this.renderFileList()
  }

  renderFileList = () => {
    const fileList = this.querySelector('#uploadedFilesContainer')
    fileList.innerHTML = ''

    this.formData.project_attachments.forEach((file, index) => {
      const fileEl = document.createElement('div')
      fileEl.className = 'file-box'

      // shorten the file name if it's too long
      const originalName = file.name
      const maxLength = 10
      const shortName =
        originalName.length > maxLength
          ? originalName.slice(0, maxLength) + '...'
          : originalName

      const sizeInKB = (file.size / 1024).toFixed(1)

      // render file name, size, and a delete (✕) button
      fileEl.innerHTML = `
      <p class="text">${shortName}</p> <span class="file-size">${sizeInKB} KB</span>
      <button class="delete-file-btn" title="Delete file">✕</button>
    `

      // delete the file when ✕ button is clicked
      fileEl.querySelector('.delete-file-btn').addEventListener('click', () => {
        // remove file from the array by index
        this.formData.project_attachments.splice(index, 1)
        // re-render the updated file list
        this.renderFileList()
      })

      fileList.appendChild(fileEl)
    })
  }

  uploadFileWithProgress = (file, container) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()
      formData.append('file', file)

      // create file-box element
      const fileBox = document.createElement('div')
      fileBox.className = 'file-box uploading'

      const sizeInKB = (file.size / 1024).toFixed(1)
      const shortName =
        file.name.length > 10 ? file.name.slice(0, 10) + '...' : file.name

      fileBox.innerHTML = ` 
      <p class="text">${shortName}</p> <span class="file-size">${sizeInKB} KB</span> 
      <div class="progress-bar">
        <div class="progress-fill" style="width: 0%"></div>
      </div>
    `
      container.appendChild(fileBox)

      // Update progress fill
      xhr.upload.addEventListener('progress', e => {
        if (e.lengthComputable) {
          const percent = (e.loaded / e.total) * 100
          const fill = fileBox.querySelector('.progress-fill')
          fill.style.width = `${percent}%`
        }
      })

      xhr.onload = () => {
        if (xhr.status === 200) {
          fileBox.querySelector('.progress-bar').remove()

          // add delete button once done
          const deleteBtn = document.createElement('button')
          deleteBtn.className = 'delete-file-btn'
          deleteBtn.title = 'Delete file'
          deleteBtn.textContent = '✕'
          deleteBtn.addEventListener('click', () => {
            const index = this.formData.project_attachments.findIndex(
              f => f.name === file.name
            )
            if (index !== -1) {
              this.formData.project_attachments.splice(index, 1)
              this.renderFileList()
            }
          })

          fileBox.appendChild(deleteBtn)
          resolve(JSON.parse(xhr.responseText))
        } else {
          fileBox.querySelector('.progress-fill').style.backgroundColor = 'red'
          reject(new Error('Upload failed'))
        }
      }

      xhr.onerror = () => {
        fileBox.querySelector('.progress-fill').style.backgroundColor = 'red'
        reject(new Error('Network error'))
      }

      xhr.open('POST', 'http://localhost/andRize-project/php/upload.php')
      xhr.send(formData)
    })
  }

  getTodayDate () {
    const today = new Date()
    const year = today.getFullYear()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  handleErrorMessage (key) {
    if (key === 'title') {
      // handle input title error
      const titleError = this.querySelector('.title-error')
      if (this.formData.project_title.trim() === '') {
        titleError.style.display = 'block'
        return false
      } else {
        titleError.style.display = 'none'
      }
    }

    if (key === 'category') {
      // handle project category error
      const categoryError = this.querySelector('.category-error')
      if (this.formData.project_cateagory === '') {
        categoryError.style.display = 'block'
        return false
      } else {
        categoryError.style.display = 'none'
      }
    }

    if (key === 'budget') {
      // handle input budget error
      const budgetError = this.querySelector('.budget-error')
      if (this.formData.project_budget.trim() === '') {
        budgetError.style.display = 'block'
        return false
      } else {
        budgetError.style.display = 'none'
      }
    }

    if (key === 'date') {
      // handle project date error
      const dateError = this.querySelector('.date-error')
      if (this.formData.project_completion_date === '') {
        dateError.style.display = 'block'
        return false
      } else {
        dateError.style.display = 'none'
      }
    }

    if (key === 'description') {
      // handle input description error
      const descriptionError = this.querySelector('.description-error')
      if (this.formData.project_description.trim() === '') {
        descriptionError.style.display = 'block'
        return false
      } else {
        descriptionError.style.display = 'none'
      }
    }
  }

  getTemplate () {
    return `
        <section class="step4-section-container">
            <div class="gradient-border">
                <div class="box">
                    <div class="top-container">
                        <div class="form-group">
                            <label>Project Title</label> 
                            <input 
                                ${this.isAllowEdit ? '' : 'disabled'} 
                                class="project-title-input ${
                                  this.isAllowEdit ? '' : 'disabled'
                                }" 
                                type="text" placeholder="(e.g. Build a responsive website)" required 
                                value="${this.formData.project_title}" /> 
                            <div class="error-message title-error" style="display: none;">Please enter a project title to continue.</div>
                        </div>
                        <div class="form-second-container">
                            <div class="form-group second ${
                              this.isAllowEdit ? '' : 'disabled'
                            }">
                                <label class="second project-category-input-class">Category</label>
                                <div class="project-category-input-wrapper">
                                    <select 
                                        ${this.isAllowEdit ? '' : 'disabled'} 
                                        id="categoryInputId" 
                                        class="project-category-input" 
                                        placeholder="choose category" 
                                        tabindex="-1"
                                        required>
                                            ${this.category_list
                                              .map((category, index) => {
                                                const selected =
                                                  category ===
                                                  this.formData
                                                    .project_cateagory
                                                    ? 'selected'
                                                    : ''
                                                return `<option data-key="${index}" value="${category}" ${selected}>${category}</option>`
                                              })
                                              .join('')}
                                    </select>
                                    <div class="chevron-icon ${
                                      this.isAllowEdit ? 'active' : ''
                                    }">
                                        <img alt="chev-icon" src="assets/icons/chevron-down-icon.svg" class="chevron-icon-class" />
                                    </div>
                                </div>
                                <div class="error-message category-error" style="display: none;">Please choose a project category to continue.</div>
                            </div>
                            
                            <div class="form-group second 
                            ${this.isAllowEdit ? '' : 'disabled'}">
                                <label class="second">Budget</label>
                                <div class="project-budget-input-wrapper">
                                    <input 
                                    ${this.isAllowEdit ? '' : 'disabled'}
                                    class="project-budget-input" 
                                    type="number" 
                                    placeholder="(e.g. $1000)" 
                                    required 
                                    value="${this.formData.project_budget}"/>
                                    <span class="prefix">$</span>
                                    <div class="usd-icon ${
                                      this.isAllowEdit ? 'active' : ''
                                    }">
                                        <img alt="chev-icon" src="assets/icons/usd-icon.svg" class="usd-icon-class" />
                                    </div>
                                </div>
                                <div class="error-message budget-error" style="position: absolute; bottom: -21px; display: none;">Please enter a budget to continue.</div>
                            </div>

                            <div class="form-group second 
                            ${this.isAllowEdit ? '' : 'disabled'}">
                                <label class="second">Completion Date</label> 
                                <div class="date-picker-wrapper">
                                    <input 
                                    ${this.isAllowEdit ? '' : 'disabled'}
                                    class="project-date-input" 
                                    type="date" 
                                    placeholder="DD/MM/YYYY" 
                                    required 
                                    value="${
                                      this.formData.project_completion_date
                                    }" 
                                    min="${this.getTodayDate()}"
                                    onkeydown="return false;"
                                    tabindex="-1"
                                    />
                                    <div class="date-icon ${
                                      this.isAllowEdit ? 'active' : ''
                                    }">
                                        <img alt="date-icon" src="assets/icons/date-picker-icon.svg">
                                    </div>
                                </div>
                                <div class="error-message date-error" style="position: absolute; bottom: -21px; display: none;">Please choose a date to continue.</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Write a comprehensive project description to set goals for your project.</label> 
                            <textarea 
                            ${this.isAllowEdit ? '' : 'disabled'}
                            rows="5" 
                            placeholder="Enter project description" 
                            required
                            class="project-description-input ${
                              this.isAllowEdit ? '' : 'disabled'
                            }"                            
                            >${this.formData.project_description}</textarea>
                            <div class="error-message description-error" style="display: none;">Please enter a description to continue.</div>
                            <div class="message-container">
                                <div id="informationId" class="information-container">
                                    <p class="information">?</p>
                                </div>
                                <p class="message message-class">Examples of effective descriptions</p>
                            </div>
                        </div>

                        <div class="form-group">
                            <label>Attachments</label> 
                            <div class="attachments-container" id="dropArea">
                                <input type="file" id="fileInput" style="display:none" multiple />
                                <p class="title">
                                    Drag or <span class="color">Upload</span> files here
                                </p>
                                <p class="description">Maximum 5 attachments are allowed.</p> 

                            </div>
                            <div class="uploaded-files" id="uploadedFilesContainer"></div> 
                        </div>

                    </div>
                    <div class="bottom-container">
                        <button class="prev-step-btn active">➝</button>
                        <button class="primary-light-btn next-step-btn">Post Project</button>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step4-section', Step4Section)
