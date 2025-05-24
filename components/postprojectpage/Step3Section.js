class Step3Section extends HTMLElement {
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
      project_description: '',
      project_attachments: [],
      ...this.getPostProjectData(),
      step: 4,
      isLogged: false
    }
  }

  render () {
    this.innerHTML = this.getTemplate()
  }

  attachEvents () {
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

  attachEventProjectDescription () {
    const input = this.querySelector('.project-description-input')
    input.addEventListener('input', e => {
      this.formData.project_description = e.target.value
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

      if (this.formData.project_description.trim() === '') {
        alert('Please enter a project description.')
        return
      }

      // save to localStorage
      localStorage.setItem(
        'post_project_data',
        JSON.stringify({ ...this.formData, project_attachments: [] })
      )

      // check if user is logged in
      if (this.formData.isLogged) {
        // to detect if localstorage updated
        this.dispatchEvent(
          new CustomEvent('post-project-data-updated', {
            bubbles: true,
            detail: 'next'
          })
        )
      } else {
        window.location.href = 'signup.html'
      }
    })
  }

  attachEventPrevButton () {
    const prevBtn = this.querySelector('.prev-step-btn')
    prevBtn.addEventListener('click', () => {
      localStorage.setItem(
        'post_project_data',
        JSON.stringify({ ...this.getPostProjectData(), step: 3 })
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
       informationElement.click();
    })

    tippy('#informationId', {
      allowHTML: true,
      placement: 'bottom-start',
      trigger: 'click',
      content: `Examples of effective descriptions <br/>Examples of effective descriptions <br/>Examples of effective descriptions <br/>Examples of effective descriptions <br/>`
    })
  }

  handleFiles = files => {
    const existingFiles = this.formData.project_attachments
    const newFiles = Array.from(files)

    // combine existing and new files
    const combined = [...existingFiles, ...newFiles]

    const uniqueMap = new Map()

    // ensure unique files based on file name
    combined.forEach(file => {
      if (!uniqueMap.has(file.name)) {
        uniqueMap.set(file.name, file)
      }
    })

    // limit to a maximum of 5 unique files
    const uniqueFiles = Array.from(uniqueMap.values()).slice(0, 5)

    if (uniqueFiles.length > 5) {
      alert('Maximum 5 attachments are allowed.')
    }

    // save to formData and re-render file list
    this.formData.project_attachments = uniqueFiles
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
      ${shortName} <span class="file-size">${sizeInKB} KB</span>
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

  getTemplate () {
    return `
        <section class="step3-section-container">
            <div class="gradient-border">
                <div class="box">
                    <div class="top-container">
                        <div class="form-group">
                            <label>Write a comprehensive project description to set goals for your project.</label>
                            <textarea class="project-description-input" rows="5" placeholder="Enter project description" required>${this.formData.project_description}</textarea>
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
                        <button class="primary-light-btn next-step-btn">Next step</button>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step3-section', Step3Section)
