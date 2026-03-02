/**
 * E-book - Main Application
 * Handles all application logic and events
 */

const APP = {
  currentTransactionType: null,
  transactionFromPersonView: false,

  init() {
    console.log('E-Book PWA initialized');
    this.setupEventListeners();
    this.setupModalListeners();
    this.loadSettings();
    UI.updateDashboard();
    UI.updatePersonSelect();
  },

  // ============================================
  // EVENT LISTENERS SETUP
  // ============================================

  setupEventListeners() {
    // Dashboard
    document.getElementById('addPersonBtn')?.addEventListener('click', () => this.createPerson());
    document.getElementById('syncContactsBtn')?.addEventListener('click', () => this.syncContacts());

    // Person Transaction View
    document.getElementById('addCreditPersonBtn')?.addEventListener('click', () => this.addCreditFromPersonView());
    document.getElementById('addDebitPersonBtn')?.addEventListener('click', () => this.addDebitFromPersonView());
    document.getElementById('shareWhatsAppBtn')?.addEventListener('click', () => this.shareToWhatsApp());
    document.getElementById('editPersonBtn')?.addEventListener('click', () => this.editPersonFromView());
    document.getElementById('clearAllTransactionsBtn')?.addEventListener('click', () => this.clearAllTransactionsForPerson());

    // Sorting in Person View
    document.getElementById('sortPropertySelect')?.addEventListener('change', (e) => PersonView.setSortField(e.target.value));
    document.getElementById('sortOrderBtn')?.addEventListener('click', () => PersonView.toggleSortDirection());

    // Search
    document.getElementById('searchBtn')?.addEventListener('click', () => {
      UI.isSearchActive = true;
      UI.updatePeopleList();
    });
    document.getElementById('searchPeople')?.addEventListener('input', (e) => {
      // Always trigger update on input
      UI.updatePeopleList();
    });

    document.getElementById('searchPeople')?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        UI.isSearchActive = true;
        UI.updatePeopleList();
      }
    });

    // Filter buttons - Transactions
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        UI.updateTransactionsList();
      });
    });

    // Settings
    document.getElementById('settingsBtn')?.addEventListener('click', () => UI.openModal('settingsModal'));

    // Backup buttons
    document.getElementById('googleDriveBackupBtn')?.addEventListener('click', () => this.exportToGoogleDrive());
    document.getElementById('manualBackupBtn')?.addEventListener('click', () => this.createManualBackup());
    document.getElementById('exportJsonBtn2')?.addEventListener('click', () => this.exportData('json'));
    document.getElementById('exportCsvBtn2')?.addEventListener('click', () => this.exportData('csv'));
    document.getElementById('resetDataBtn2')?.addEventListener('click', () => this.confirmResetData());
  },

  setupModalListeners() {
    // Close modal buttons - Find the closest modal and close it
    document.querySelectorAll('.modal-close, .modal-close-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = e.target.closest('.modal');
        if (modal) {
          UI.closeModal(modal.id);
        }
      });
    });

    // Close on outside click (click on modal background)
    document.querySelectorAll('.modal').forEach(modal => {
      modal.addEventListener('click', (e) => {
        // Only close if clicking directly on modal background, not on modal-content
        if (e.target === modal) {
          UI.closeModal(modal.id);
        }
      });
    });

    // Person form
    document.getElementById('personForm')?.addEventListener('submit', (e) => this.savePerson(e));

    // Delete person from modal
    document.getElementById('deletePersonModalBtn')?.addEventListener('click', () => {
      const id = document.getElementById('personId').value;
      if (id) {
        this.deletePerson(id);
      }
    });

    // Transaction form
    document.getElementById('transactionForm')?.addEventListener('submit', (e) => this.saveTransaction(e));

    // Settings form
    document.getElementById('settingsForm')?.addEventListener('submit', (e) => this.saveSettings(e));

    // Quick add person in transaction modal
    document.getElementById('quickAddPersonBtn')?.addEventListener('click', () => this.quickAddPerson());
  },

  // ============================================
  // PERSON OPERATIONS
  // ============================================

  createPerson() {
    document.getElementById('personId').value = '';
    document.getElementById('personModalTitle').textContent = t('addPersonTitle');
    document.getElementById('personForm').reset();

    // Hide delete button for new person
    const deleteBtn = document.getElementById('deletePersonModalBtn');
    if (deleteBtn) deleteBtn.style.display = 'none';

    UI.openModal('personModal');
  },

  editPerson(personId) {
    const person = DB.getPerson(personId);
    if (!person) return;

    document.getElementById('personId').value = person.id;
    document.getElementById('personName').value = person.name;
    document.getElementById('personPhone').value = person.phone || '';
    document.getElementById('personEmail').value = person.email || '';
    document.getElementById('personAddress').value = person.address || '';
    document.getElementById('personModalTitle').textContent = t('editPersonTitle');

    // Show delete button for existing person
    const deleteBtn = document.getElementById('deletePersonModalBtn');
    if (deleteBtn) deleteBtn.style.display = 'block';

    UI.openModal('personModal');
  },

  savePerson(e) {
    e.preventDefault();

    const id = document.getElementById('personId').value;
    const personData = {
      name: document.getElementById('personName').value,
      phone: document.getElementById('personPhone').value,
      email: document.getElementById('personEmail').value,
      address: document.getElementById('personAddress').value
    };

    if (!personData.name) {
      UI.showToast(t('toastPersonRequired'), 'error');
      return;
    }

    if (id) {
      DB.updatePerson(id, personData);
      UI.showToast(t('toastPersonUpdated'), 'success');
    } else {
      DB.addPerson(personData);
      UI.showToast(t('toastPersonAdded'), 'success');
    }

    UI.closeModal('personModal');
    UI.updatePeopleList();
    UI.updatePersonSelect();
    UI.updateDashboard();
    UI.updateDashboard();
  },

  deletePerson(personId) {
    if (confirm(t('confirmDeletePerson'))) {
      DB.deletePerson(personId);
      UI.showToast(t('toastPersonDeleted'), 'success');

      // Close person modals if open
      UI.closeModal('personModal');
      UI.closeModal('personTransactionModal');

      UI.updatePeopleList();
      UI.updatePersonSelect();
      UI.updateDashboard();
      UI.updateDashboard();
    }
  },

  quickAddPerson() {
    document.getElementById('personId').value = '';
    document.getElementById('personName').value = '';
    document.getElementById('personPhone').value = '';
    document.getElementById('personEmail').value = '';
    document.getElementById('personAddress').value = '';
    document.getElementById('personModalTitle').textContent = t('addPersonTitle');
    UI.openModal('personModal');
  },

  // ============================================
  // CONTACT SYNC & BACKUP
  // ============================================

  syncContacts() {
    // Check if Contacts API is available (mostly on Android)
    if (!('contacts' in navigator)) {
      UI.showToast(t('toastContactSyncNotAvailable'), 'warning');
      return;
    }

    const props = ['name', 'tel'];
    navigator.contacts.select(props, { multiple: true })
      .then(contacts => {
        let added = 0;
        const existingPeople = DB.getPeople();

        contacts.forEach(contact => {
          if (contact.name) {
            const name = contact.name[0] || '';
            const phone = contact.tel?.[0] || '';

            // Check if person already exists
            const exists = existingPeople.some(p =>
              p.name.toLowerCase() === name.toLowerCase()
            );

            if (!exists) {
              DB.addPerson({
                name: name,
                phone: phone,
                email: '',
                address: ''
              });
              added++;
            }
          }
        });

        if (added > 0) {
          UI.showToast(t('toastContactsAdded', { count: added }), 'success');
          UI.updatePeopleList();
          UI.updatePersonSelect();
          UI.updateDashboard();
          UI.updateDashboard();
        } else {
          UI.showToast(t('toastNoContacts'), 'warning');
        }
      })
      .catch(err => {
        console.log('Contact selection cancelled or failed', err);
      });
  },

  createManualBackup() {
    DB.createBackup();
    this.updateBackupDisplay();
    this.updateBackupList();
    UI.showToast(t('toastBackupCreated'), 'success');
  },

  exportToGoogleDrive() {
    const backupJson = DB.exportAsJSON();
    const fileName = `Ebook-backup-${Date.now()}.json`;
    const file = new File([backupJson], fileName, { type: 'application/json' });

    // Check if the Web Share API is available and can share files
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      navigator.share({
        title: 'E-Book App Backup',
        text: 'Backup file from E-Book & Expense Manager',
        files: [file]
      })
        .then(() => {
          UI.showToast(t('toastBackupShared'), 'success');
          this.createManualBackup(); // Also save a local copy as record
        })
        .catch((error) => {
          console.error('Error sharing backup:', error);
          // Fallback or user cancel
        });
    } else {
      // Fallback: Just trigger standard download with a message
      UI.showToast(t('toastSaveToDrive'), 'info');
      this.downloadFile(backupJson, fileName, 'application/json');
      this.createManualBackup(); // Also save a local copy
    }
  },

  restoreFromBackup(backupId) {
    if (confirm(t('confirmRestoreBackup'))) {
      if (DB.restoreBackup(backupId)) {
        UI.showToast(t('toastBackupRestored'), 'success');
        UI.updateDashboard();
        UI.updateReports();
        this.updateBackupList();
      } else {
        UI.showToast(t('toastBackupRestoreFailed'), 'error');
      }
    }
  },

  updateBackupList() {
    const backupList = document.getElementById('backupList');
    if (!backupList) return;
    const backups = DB.getBackups();
    if (!backups || backups.length === 0) {
      backupList.innerHTML = `<p class="empty-state">${t('noBackupsYet')}</p>`;
      return;
    }
    backupList.innerHTML = backups.map(b => `
      <div class="backup-item">
        <div class="backup-info">
          <div>📅 ${b.date || 'N/A'} 🕐 ${b.time || 'N/A'}</div>
          <div>📄 ${b.size || '0'} KB</div>
        </div>
        <div class="backup-actions">
          <button class="backup-btn" onclick="APP.restoreFromBackup('${b.id}')">Restore</button>
          <button class="backup-btn delete-btn" onclick="APP.deleteBackup('${b.id}')">Delete</button>
        </div>
      </div>
    `).join('');
  },

  deleteBackup(backupId) {
    if (confirm(t('confirmDeleteBackup'))) {
      DB.deleteBackup(backupId);
      UI.showToast(t('toastBackupDeleted'), 'success');
      this.updateBackupList();
    }
  },

  updateBackupDisplay() {
    const settings = DB.getSettings();
    const lastBackup = settings?.lastBackup;

    if (lastBackup) {
      const backupInfo = document.getElementById('backupInfo');
      const lastBackupTime = document.getElementById('lastBackupTime');
      const lastBackupDisplay = document.getElementById('lastBackupDisplay');

      if (backupInfo && lastBackupTime) {
        backupInfo.style.display = 'block';
        lastBackupTime.textContent = lastBackup;
      }

      if (lastBackupDisplay) {
        lastBackupDisplay.textContent = lastBackup;
      }
    }
  },

  // ============================================
  // PERSON TRANSACTION VIEW OPERATIONS
  // ============================================

  addCreditFromPersonView() {
    const personId = PersonView.currentPersonId;
    const person = DB.getPeople().find(p => p.id === personId);
    if (!personId || !person) return;

    this.currentTransactionType = 'credit';
    this.transactionFromPersonView = true;

    document.getElementById('transactionId').value = '';
    document.getElementById('transactionType').value = 'credit';
    document.getElementById('transactionPersonId').value = personId;
    document.getElementById('transactionAmount').value = '';
    document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('transactionCategory').value = 'general';
    document.getElementById('transactionNotes').value = '';
    document.getElementById('transactionStatus').value = 'open';

    // Show person name instead of selection
    document.getElementById('personSelectionGroup').style.display = 'none';
    document.getElementById('personDisplayGroup').style.display = 'block';
    document.getElementById('personDisplayName').textContent = person.name;

    document.getElementById('transactionModalTitle').textContent = t('addCreditHeader');
    this.updateTransactionTypeUI('credit');
    // Open transactionModal on top of personTransactionModal
    UI.openModal('transactionModal');
  },

  addDebitFromPersonView() {
    const personId = PersonView.currentPersonId;
    const person = DB.getPeople().find(p => p.id === personId);
    if (!personId || !person) return;

    this.currentTransactionType = 'debit';
    this.transactionFromPersonView = true;

    document.getElementById('transactionId').value = '';
    document.getElementById('transactionType').value = 'debit';
    document.getElementById('transactionPersonId').value = personId;
    document.getElementById('transactionAmount').value = '';
    document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('transactionCategory').value = 'general';
    document.getElementById('transactionNotes').value = '';
    document.getElementById('transactionStatus').value = 'open';

    // Show person name instead of selection
    document.getElementById('personSelectionGroup').style.display = 'none';
    document.getElementById('personDisplayGroup').style.display = 'block';
    document.getElementById('personDisplayName').textContent = person.name;

    document.getElementById('transactionModalTitle').textContent = t('addDebitHeader');
    this.updateTransactionTypeUI('debit');
    // Open transactionModal on top of personTransactionModal
    UI.openModal('transactionModal');
  },

  editPersonFromView() {
    const personId = PersonView.currentPersonId;
    if (!personId) return;

    this.editPerson(personId);
  },

  // ============================================
  // PHONE NUMBER FORMATTER
  // ============================================

  formatPhoneForWhatsApp(phoneNumber) {
    if (!phoneNumber || typeof phoneNumber !== 'string') return '';

    // Step 1: Remove all spaces, dashes, parentheses
    let phone = phoneNumber.trim().replace(/[\s\-()]/g, '');

    // Step 2: Remove all non-digit and non-plus characters
    phone = phone.replace(/[^\d+]/g, '');

    // Step 3: Extract just the digits
    const digitsOnly = phone.replace(/\D/g, '');

    // Step 4: Handle different formats
    if (phone.includes('+')) {
      // Already has + sign
      if (phone.startsWith('+91')) {
        // Already in +91XXXXXXXXXX format
        return phone.startsWith('+91') && digitsOnly.length >= 12
          ? '+91' + digitsOnly.slice(-10)
          : '+91' + digitsOnly.slice(-10);
      } else if (phone.startsWith('+')) {
        // Has different country code, keep as is
        return phone;
      }
    }

    // Step 5: No + sign, add +91 (India) and extract last 10 digits
    if (digitsOnly.length >= 10) {
      return '+91' + digitsOnly.slice(-10);
    }

    return '';
  },

  // ============================================
  // WHATSAPP SHARING
  // ============================================

  // Detect if device is mobile
  isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      || (navigator.maxTouchPoints && navigator.maxTouchPoints > 2);
  },

  shareToWhatsApp() {
    const personId = PersonView.currentPersonId;
    if (!personId) return;

    const person = DB.getPeople().find(p => p.id === personId);
    if (!person) return;

    const ledgerText = PersonView.generateLedgerText(personId);
    const encodedText = encodeURIComponent(ledgerText);
    const isMobile = this.isMobileDevice();

    let whatsappUrl = '';

    // Check if phone number exists
    if (person.phone && person.phone.trim() !== '') {
      const formattedPhone = this.formatPhoneForWhatsApp(person.phone);

      if (formattedPhone) {
        // Phone number is valid
        if (isMobile) {
          // Mobile device → Use WhatsApp app via wa.me
          whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedText}`;
        } else {
          // Desktop → Use WhatsApp Web with phone parameter
          whatsappUrl = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedText}`;
        }
      } else {
        // Invalid phone format → Open without phone
        whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;
      }
    } else {
      // No phone number → Just open WhatsApp Web with message
      whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;
    }

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    const toastMsg = person.phone && this.formatPhoneForWhatsApp(person.phone)
      ? isMobile
        ? '💬 Opening WhatsApp app...'
        : '💬 Opening WhatsApp Web...'
      : '💬 Opening WhatsApp Web...';
    UI.showToast(toastMsg, 'success');
  },

  // Quick share individual transaction to WhatsApp
  shareTransactionToWhatsApp(transactionId) {
    const transaction = DB.getTransaction(transactionId);
    if (!transaction) return;

    const person = DB.getPeople().find(p => p.id === transaction.personId);
    if (!person) return;

    const icon = transaction.type === 'credit' ? '🟢' : '🔴';
    const typeLabel = transaction.type === 'credit' ? t('creditLabel').toUpperCase() : t('debitLabel').toUpperCase();
    const typeDesc = transaction.type === 'credit' ? t('transactionCreditOwe') : t('transactionDebitOwe');
    const categoryName = t('category' + transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1));

    let message = `*${icon} ${typeLabel}*\n`;
    message += `${t('transactionAmountLabel')} ${UI.formatCurrency(transaction.amount)}\n`;
    message += `${t('transactionDateLabel')} ${UI.formatDate(transaction.date)}\n`;
    message += `${t('transactionCategoryLabel')} ${categoryName.toUpperCase()}\n`;
    message += `${t('transactionStatusLabel')} ${transaction.status === 'settled' ? t('settledLabel').toUpperCase() : t('transactionPendingLabel')}\n`;

    if (transaction.notes) {
      message += `${t('transactionNoteLabel')} "${transaction.notes}"\n`;
    }

    message += `\n*${typeDesc}*\n`;
    message += `\n${t('ledgerGeneratedWith')}\n${t('ledgerCreditDebitManager')}`;

    const encodedMessage = encodeURIComponent(message);
    const isMobile = this.isMobileDevice();

    let whatsappUrl = '';

    // Check if phone number exists
    if (person.phone && person.phone.trim() !== '') {
      const formattedPhone = this.formatPhoneForWhatsApp(person.phone);

      if (formattedPhone) {
        // Phone number is valid
        if (isMobile) {
          // Mobile device → Use WhatsApp app via wa.me
          whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
        } else {
          // Desktop → Use WhatsApp Web with phone parameter
          whatsappUrl = `https://web.whatsapp.com/send?phone=${formattedPhone}&text=${encodedMessage}`;
        }
      } else {
        // Invalid phone format → Open without phone
        whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
      }
    } else {
      // No phone number → Just open WhatsApp Web with message
      whatsappUrl = `https://web.whatsapp.com/send?text=${encodedMessage}`;
    }

    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    const toastMsg = person.phone && this.formatPhoneForWhatsApp(person.phone)
      ? isMobile
        ? t('whatsappAppOpening')
        : t('whatsappWebOpening')
      : t('whatsappWebOpening');
    UI.showToast(toastMsg, 'success');
  },

  updateTransactionTypeUI(type) {
    const badge = document.getElementById('transactionTypeBadge');
    const btn = document.getElementById('saveTransactionBtn');

    if (type === 'credit') {
      if (badge) {
        badge.className = 'transaction-type-badge credit';
        badge.textContent = t('creditMoneyTheyOweYou');
      }
      if (btn) {
        btn.className = 'btn btn-lg credit';
        btn.textContent = t('saveCreditBtn');
      }
    } else if (type === 'debit') {
      if (badge) {
        badge.className = 'transaction-type-badge debit';
        badge.textContent = t('debitMoneyYouOweThem');
      }
      if (btn) {
        btn.className = 'btn btn-lg debit';
        btn.textContent = t('saveDebitBtn');
      }
    }
  },

  // ============================================
  // TRANSACTION OPERATIONS
  // ============================================

  createTransaction(type) {
    this.currentTransactionType = type;
    this.transactionFromPersonView = false;

    document.getElementById('transactionId').value = '';
    document.getElementById('transactionType').value = type;
    document.getElementById('transactionPersonId').value = '';
    document.getElementById('transactionAmount').value = '';
    document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
    document.getElementById('transactionCategory').value = 'general';
    document.getElementById('transactionNotes').value = '';
    document.getElementById('transactionStatus').value = 'open';

    // Show person selection dropdown (for main dashboard)
    document.getElementById('personSelectionGroup').style.display = 'block';
    document.getElementById('personDisplayGroup').style.display = 'none';
    UI.updatePersonSelect();
    document.getElementById('transactionPerson').value = '';

    const title = type === 'credit' ? t('addCreditHeader') : t('addDebitHeader');
    document.getElementById('transactionModalTitle').textContent = title;
    this.updateTransactionTypeUI(type);
    UI.openModal('transactionModal');
  },

  editTransaction(transactionId) {
    const transaction = DB.getTransaction(transactionId);
    if (!transaction) return;

    const person = DB.getPeople().find(p => p.id === transaction.personId);
    const isFromPersonView = PersonView.currentPersonId === transaction.personId;

    this.currentTransactionType = transaction.type;
    this.transactionFromPersonView = isFromPersonView;

    document.getElementById('transactionId').value = transaction.id;
    document.getElementById('transactionType').value = transaction.type;
    document.getElementById('transactionPersonId').value = transaction.personId;
    document.getElementById('transactionAmount').value = transaction.amount;
    document.getElementById('transactionDate').value = transaction.date;
    document.getElementById('transactionCategory').value = transaction.category;
    document.getElementById('transactionNotes').value = transaction.notes || '';
    document.getElementById('transactionStatus').value = transaction.status;

    if (isFromPersonView && person) {
      // Show person name instead of selection
      document.getElementById('personSelectionGroup').style.display = 'none';
      document.getElementById('personDisplayGroup').style.display = 'block';
      document.getElementById('personDisplayName').textContent = person.name;
      // Clear select to avoid validation issues
      document.getElementById('transactionPerson').value = '';
    } else {
      // Show person selection dropdown
      document.getElementById('personSelectionGroup').style.display = 'block';
      document.getElementById('personDisplayGroup').style.display = 'none';
      UI.updatePersonSelect();
      setTimeout(() => {
        document.getElementById('transactionPerson').value = transaction.personId;
      }, 50);
    }

    const title = transaction.type === 'credit' ? t('editCreditHeader') : t('editDebitHeader');
    document.getElementById('transactionModalTitle').textContent = title;
    this.updateTransactionTypeUI(transaction.type);
    UI.openModal('transactionModal');
  },

  saveTransaction(e) {
    e.preventDefault();

    // Get person ID from hidden field if in person view, otherwise from dropdown
    const personId = this.transactionFromPersonView
      ? document.getElementById('transactionPersonId').value
      : document.getElementById('transactionPerson').value;

    if (!personId) {
      UI.showToast(t('toastSelectPerson'), 'error');
      return;
    }

    const transactionData = {
      type: document.getElementById('transactionType').value,
      personId,
      amount: parseFloat(document.getElementById('transactionAmount').value),
      date: document.getElementById('transactionDate').value,
      category: document.getElementById('transactionCategory').value,
      notes: document.getElementById('transactionNotes').value,
      status: document.getElementById('transactionStatus').value
    };

    if (!transactionData.amount || transactionData.amount <= 0) {
      UI.showToast(t('toastValidAmount'), 'error');
      return;
    }

    const id = document.getElementById('transactionId').value;

    if (id) {
      DB.updateTransaction(id, transactionData);
      UI.showToast(t('toastTransactionUpdated'), 'success');
    } else {
      DB.addTransaction(transactionData);
      UI.showToast(t('toastTransactionAdded'), 'success');
    }

    UI.closeModal('transactionModal');

    // Update person view if it's in the stack
    if (this.transactionFromPersonView && PersonView.currentPersonId) {
      PersonView.updatePersonTransactionHeader(PersonView.currentPersonId);
      PersonView.renderPersonTransactions(PersonView.currentPersonId);
    }

    UI.updateTransactionsList();
    UI.updatePeopleList();
    UI.updateDashboard();
    UI.updateReports();

    UI.updateReports();
  },

  deleteTransaction(transactionId) {
    if (confirm(t('confirmDeleteTransaction'))) {
      DB.deleteTransaction(transactionId);
      UI.showToast(t('toastTransactionDeleted'), 'success');

      // Real-time update of person transaction view if open
      if (PersonView.currentPersonId) {
        const personModal = document.getElementById('personTransactionModal');
        if (personModal && personModal.classList.contains('active')) {
          PersonView.updatePersonTransactionHeader(PersonView.currentPersonId);
          PersonView.renderPersonTransactions(PersonView.currentPersonId);
        }
      }

      // Update all other views
      UI.updateTransactionsList();
      UI.updatePeopleList();
      UI.updateDashboard();
      UI.updateReports();
    }
  },

  clearAllTransactionsForPerson() {
    console.log('clearAllTransactionsForPerson triggered');
    const personId = PersonView.currentPersonId;
    console.log('Current Person ID:', personId);
    if (!personId) {
      console.warn('No personId found in PersonView.currentPersonId');
      return;
    }

    const confirmMsg = t('confirmClearAll');
    console.log('Confirmation message:', confirmMsg);
    if (confirm(confirmMsg)) {
      console.log('Confirmation accepted. Clearing transactions for person:', personId);
      const success = DB.clearTransactionsByPerson(personId);
      console.log('DB clear operation result:', success);

      if (success) {
        UI.showToast(t('toastTransactionsCleared'), 'success');

        // Refresh person view
        PersonView.updatePersonTransactionHeader(personId);
        PersonView.renderPersonTransactions(personId);

        // Update other views
        UI.updateTransactionsList();
        UI.updatePeopleList();
        UI.updateDashboard();
        UI.updateReports();
      } else {
        UI.showToast('Failed to clear transactions', 'error');
      }
    } else {
      console.log('Confirmation cancelled');
    }
  },

  // ============================================
  // SETTINGS
  // ============================================

  loadSettings() {
    const settings = DB.getSettings();
    if (settings) {
      document.getElementById('yourName').value = settings.yourName || '';
      document.getElementById('yourPhone').value = settings.yourPhone || '';
      document.getElementById('yourEmail').value = settings.yourEmail || '';

      // Update header with company name
      this.updateHeaderName(settings.yourName);
    }

    // Show backup info and history
    this.updateBackupDisplay();
    this.updateBackupList();
  },

  updateHeaderName(name) {
    const nameEl = document.getElementById('companyName');
    if (nameEl) {
      if (name) {
        nameEl.textContent = name;
      } else {
        nameEl.textContent = t('companyName');
      }
    }
  },

  saveSettings(e) {
    e.preventDefault();

    const settings = {
      yourName: document.getElementById('yourName').value,
      yourPhone: document.getElementById('yourPhone').value,
      yourEmail: document.getElementById('yourEmail').value
    };

    DB.setSettings(settings);
    this.updateHeaderName(settings.yourName);
    UI.showToast(t('toastSettingsSaved'), 'success');
    UI.closeModal('settingsModal');
  },

  // ============================================
  // REPORTS & EXPORT
  // ============================================

  exportData(format) {
    if (format === 'json') {
      const json = DB.exportAsJSON();
      this.downloadFile(json, `Ebook-backup-${Date.now()}.json`, 'application/json');
    } else if (format === 'csv') {
      const csv = DB.exportAsCSV();
      this.downloadFile(csv, `Ebook-report-${Date.now()}.csv`, 'text/csv');
    }
  },

  downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    UI.showToast('File downloaded', 'success');
  },

  confirmResetData() {
    if (confirm('⚠️ WARNING: Delete ALL data permanently!\n\nAre you absolutely sure?')) {
      if (confirm('This cannot be undone. Click OK to confirm.')) {
        DB.clearAllData();
        DB.init();
        UI.showToast('All data cleared', 'success');
        UI.updateDashboard();
        UI.updateTransactionsList();
        UI.updateReports();
      }
    }
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  APP.init();
  UI.updateTransactionsList();
  UI.updateReports();
});

// Handle keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey || e.metaKey) {
    if (e.key === 's') {
      e.preventDefault();
      const form = document.querySelector('.modal.active .form');
      if (form) form.dispatchEvent(new Event('submit'));
    }
  }
  if (e.key === 'Escape') {
    // Close only the active (top) modal
    if (UI.modalStack.length > 0) {
      const activeModalId = UI.modalStack[UI.modalStack.length - 1];
      UI.closeModal(activeModalId);
    }
  }
});


// Handle app visibility
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    console.log('App backgrounded');
  } else {
    console.log('App resumed');
    UI.updateDashboard();
    UI.updateTransactionsList();
    UI.updateReports();
  }
});
