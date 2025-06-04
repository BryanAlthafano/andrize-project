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
      const descriptionValid = this.handleErrorMessage('description')
      if (descriptionValid === false) {
        return
      }

      // save to localStorage
      const attachmentsMeta = this.formData.project_attachments.map(f => ({
        name: f.name,
        size: f.size
      }))

      localStorage.setItem(
        'post_project_data',
        JSON.stringify({
          ...this.formData,
          project_attachments: attachmentsMeta
        })
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

  handleErrorMessage (key) {
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
        <section class="step3-section-container">
            <div class="gradient-border">
                <div class="box">
                    <div class="top-container">
                        <div class="form-group">
                            <label>Write a comprehensive project description to set goals for your project.</label>
                            <textarea class="project-description-input" rows="5" placeholder="Enter project description" required>${this.formData.project_description}</textarea>
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
                        <button class="primary-light-btn next-step-btn">Next step</button>
                    </div>
                </div>
            </div>
        </section>
    `
  }
}

customElements.define('step3-section', Step3Section)
