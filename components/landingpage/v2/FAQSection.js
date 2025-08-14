class FAQSection extends HTMLElement {
  connectedCallback() {
    this.initData();
    this.render();
    this.attachEvents();
  }

  initData() {
    this.selectedFaq = 1;
    this.faq_list = [
      {
        id: 1,
        title: 'Is it free to post a project?',
        content:
          'Yes! Posting a project is completely free. You only pay once you hire a project manager and approve their proposal.',
      },
      {
        id: 2,
        title: 'Is there any platform fee?',
        content:
          'Yes — AndRize charges a flat 5% platform fee, added only when you hire a project manager. No hidden commissions or extra charges. You always approve the budget upfront.',
      },
      {
        id: 3,
        title: 'What kind of projects can I post?',
        content:
          'Anything from videos, websites, apps, and branding — to marketing campaigns, pitch decks, and AI tools. If freelancers can do it, AndRize can manage it.',
      },
      {
        id: 4,
        title: 'Who are the project managers?',
        content:
          'Vetted experts with proven experience in managing creative and technical projects. They pitch for your project, and you choose who to hire.',
      },
      {
        id: 5,
        title: 'How does payment work?',
        content:
          'Payments are held in escrow and released only when you approve deliverables or milestones. Total transparency and control.',
      },
      {
        id: 6,
        title: 'Is my idea protected?',
        content:
          'Yes. All project managers and creators on AndRize sign a confidentiality agreement (NDA) before starting work.',
      },
      {
        id: 7,
        title: 'What happens if something goes wrong?',
        content:
          'We step in with dispute resolution to mediate and make things right, fairly and fast.',
      },
    ];
  }

  attachEvents() {
    // handle selected item (faqs)
    this.handleSelectedFaq();
  }

  handleSelectedFaq() {
    this.querySelectorAll('.collapse-header').forEach((el) => {
      el.addEventListener('click', () => {
        const content = el.nextElementSibling;
        const icon = el.querySelector('.collapse-icon');
        const isOpen = content.classList.contains('show');

        // close all item
        this.querySelectorAll('.collapse-content.show').forEach((openEl) => {
          openEl.classList.remove('show');
          const openIcon =
            openEl.previousElementSibling.querySelector('.collapse-icon');
          if (openIcon) openIcon.textContent = '+';
        });

        // if previously closed, then open
        if (!isOpen) {
          content.classList.add('show');
          if (icon) icon.textContent = '-';
        }
      });
    });
  }

  render() {
    this.innerHTML = this.getTemplate();
  }

  getTemplate() {
    return `
          <section class="faq-v2-wrap padding-each-section spacing-beween-section">
              <div class="faq-v2-container">
                <div class="left-side">
                    <p class="title">Frequently Asked Questions</p>
                </div>
                <div class="right-side">
                    ${this.faq_list
                      .map((faq) => {
                        return `
                        <div class="collapse-item" data-key="${faq?.id}">
                            <div class="collapse-header" data-key="${faq?.id}">
                                <div class="collapse-title">${faq?.title}</div>
                                <div class="collapse-icon">
                                    ${this.selectedFaq === faq?.id ? '-' : '+'}
                                </div>
                            </div>
                        <div class="collapse-content ${
                          this.selectedFaq === faq?.id ? 'show' : ''
                        }">
                          <p>${faq?.content}</p>
                        </div>
                    </div>`;
                      })
                      .join('')}                    
                </div>
              </div>
          </section>
      `;
  }
}

customElements.define('faq-section', FAQSection);
