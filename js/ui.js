/**
 * EBook - UI Management
 * Handles all UI updates and interactions
 */

const UI = {
  // Modal stack to manage modal hierarchy
  modalStack: [],

  // ============================================
  // MODAL MANAGEMENT
  // ============================================

  openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Close the current active modal (if any) without removing from stack
    const currentActive = document.querySelector('.modal.active');
    if (currentActive) {
      currentActive.classList.remove('active');
    }

    // Add to stack and show
    if (!this.modalStack.includes(modalId)) {
      this.modalStack.push(modalId);
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    // Remove from stack
    this.modalStack = this.modalStack.filter(id => id !== modalId);
    modal.classList.remove('active');

    // Show the previous modal if exists
    if (this.modalStack.length > 0) {
      const previousModalId = this.modalStack[this.modalStack.length - 1];
      const previousModal = document.getElementById(previousModalId);
      if (previousModal) {
        previousModal.classList.add('active');
      }
    } else {
      // No more modals, allow scrolling
      document.body.style.overflow = 'auto';
    }
  },

  closeAllModals() {
    while (this.modalStack.length > 0) {
      const modalId = this.modalStack.pop();
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('active');
      }
    }
    document.body.style.overflow = 'auto';
  },

  // ============================================
  // TOAST NOTIFICATIONS
  // ============================================

  showToast(message, type = 'success', duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.className = `toast show ${type}`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, duration);
  },

  // ============================================
  // DASHBOARD UPDATES
  // ============================================

  updateDashboard() {
    const totalCredit = document.getElementById('totalCredit');
    const totalDebit = document.getElementById('totalDebit');
    const creditCount = document.getElementById('creditCount');
    const debitCount = document.getElementById('debitCount');

    if (totalCredit) totalCredit.textContent = this.formatCurrency(DB.getTotalCredit());
    if (totalDebit) totalDebit.textContent = this.formatCurrency(DB.getTotalDebit());
    if (creditCount) creditCount.textContent = t('peopleCount', { count: DB.getCreditCount() });
    if (debitCount) debitCount.textContent = t('peopleCount', { count: DB.getDebitCount() });

    this.updateRecentTransactions();
    this.updatePeopleList();
  },

  updateRecentTransactions() {
    const list = document.getElementById('recentTransactionsList');
    if (!list) return;

    const transactions = DB.getRecentTransactions(5);
    const people = DB.getPeople();

    if (transactions.length === 0) {
      list.innerHTML = `<p class="empty-state">${t('noTransactionsYet')}</p>`;
      return;
    }

    list.innerHTML = transactions.map(tr => {
      const person = people.find(p => p.id === tr.personId);
      const typeIcon = tr.type === 'credit' ? '🟢' : '🔴';
      const typeLabel = tr.type === 'credit' ? t('creditLabel') : t('debitLabel');

      return `
        <div class="list-item ${tr.type}" onclick="APP.editTransaction('${tr.id}')">
          <div class="list-item-content">
            <div class="list-item-title">${person?.name || t('unknown')}</div>
            <div class="list-item-meta">
              ${typeLabel} • ${t('category' + tr.category.charAt(0).toUpperCase() + tr.category.slice(1))} • ${this.formatDate(tr.date)}
            </div>
          </div>
          <div class="list-item-value">${this.formatCurrency(tr.amount)}</div>
        </div>
      `;
    }).join('');
  },

  isSearchActive: true,

  updatePeopleList() {
    const list = document.getElementById('peopleList');
    if (!list) return;

    const people = DB.getPeople() || [];
    const searchInput = document.getElementById('searchPeople');
    const searchQuery = (searchInput?.value || '').trim();

    // Always show people (isSearchActive is now true by default)
    // Removed the restricted display logic that required a search query or active search button

    let filtered = people;
    if (searchQuery.length > 0) {
      filtered = DB.searchPeople(searchQuery);
    }

    if (!filtered || filtered.length === 0) {
      list.innerHTML = `<p class="empty-state">${t('noPeopleFound')}</p>`;
      return;
    }

    list.innerHTML = filtered.map(person => {
      const balance = DB.getPersonBalance(person.id);
      const netBalance = balance.net;
      const type = netBalance > 0 ? 'credit' : netBalance < 0 ? 'debit' : 'settled';

      return `
        <div class="list-item ${type}" onclick="PersonView.openPersonTransactionView('${person.id}')">
          <div class="list-item-content">
            <div class="list-item-title">${person.name}</div>
            <div class="list-item-meta">
              ${person.phone || 'N/A'}
            </div>
          </div>
          <div class="list-item-value">${this.formatCurrency(Math.abs(netBalance))}
            <button class="list-item-btn" onclick="event.stopPropagation(); APP.editPerson('${person.id}')" title="Edit Person">✏️</button>
          </div>
        </div>
      `;
    }).join('');
  },

  // ============================================
  // TRANSACTIONS MANAGEMENT
  // ============================================

  updateTransactionsList() {
    const list = document.getElementById('transactionsList');
    if (!list) return;

    const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

    let transactions = activeFilter === 'all'
      ? DB.getTransactions()
      : DB.getTransactionsByType(activeFilter) || DB.getTransactionsByStatus(activeFilter) || [];

    transactions = transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    if (transactions.length === 0) {
      list.innerHTML = `<p class="empty-state">${t('noTransactionsYet')}</p>`;
      return;
    }

    const people = DB.getPeople();

    list.innerHTML = transactions.map(tr => {
      const person = people.find(p => p.id === tr.personId);
      const typeLabel = tr.type === 'credit' ? t('creditLabel') : t('debitLabel');
      const statusLabel = tr.status === 'settled' ? t('settledLabel') : t('statusOpen');

      return `
        <div class="list-item ${tr.type}">
          <div class="list-item-content">
            <div class="list-item-title">${person?.name || t('unknown')}</div>
            <div class="list-item-meta">
              ${typeLabel} • ${t('category' + tr.category.charAt(0).toUpperCase() + tr.category.slice(1))} • ${this.formatDate(tr.date)} • ${statusLabel}
            </div>
          </div>
          <div class="list-item-value">${this.formatCurrency(tr.amount)}</div>
          <div class="list-item-actions">
            <button class="list-item-btn" onclick="APP.editTransaction('${tr.id}')" title="Edit">✏️</button>
            <button class="list-item-btn" onclick="APP.deleteTransaction('${tr.id}')" title="Delete">🗑️</button>
          </div>
        </div>
      `;
    }).join('');
  },

  // ============================================
  // REPORTS
  // ============================================

  updateReports() {
    const reportCredit = document.getElementById('reportCredit');
    const reportDebit = document.getElementById('reportDebit');
    const statsList = document.getElementById('peopleStats');

    if (reportCredit) reportCredit.textContent = this.formatCurrency(DB.getTotalCredit());
    if (reportDebit) reportDebit.textContent = this.formatCurrency(DB.getTotalDebit());

    if (!statsList) return;

    const stats = DB.getPeopleStats();

    if (stats.length === 0) {
      statsList.innerHTML = `<p class="empty-state">${t('noTransactionsYet')}</p>`;
      return;
    }

    statsList.innerHTML = stats
      .sort((a, b) => Math.abs(b.net) - Math.abs(a.net))
      .slice(0, 15)
      .map(stat => {
        const typeLabel = stat.net > 0 ? 'Owes You' : 'You Owe';
        const color = stat.net > 0 ? '#10B981' : '#EF4444';

        return `
          <div class="list-item ${stat.net > 0 ? 'credit' : 'debit'}">
            <div class="list-item-content">
              <div class="list-item-title">${stat.name}</div>
              <div class="list-item-meta">
                ${stat.transactionCount} transactions
              </div>
            </div>
            <div class="list-item-value">${this.formatCurrency(Math.abs(stat.net))}</div>
          </div>
        `;
      }).join('');
  },

  updatePersonSelect() {
    const select = document.getElementById('transactionPerson');
    if (!select) return;

    const people = DB.getPeople();

    select.innerHTML = `<option value="">${t('selectOrAddPersonOption')}</option>` +
      people.map(p => `<option value="${p.id}">${p.name}</option>`).join('');
  },

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================

  formatCurrency(value) {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(value || 0);
  },

  formatDate(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-IN');
  },

  formatDateTime(dateString) {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('en-IN');
  }
};

// Export to window for global access (onclick handlers)
window.UI = UI;


// ============================================
// PERSON TRANSACTION VIEW (Chat Style)
// ============================================

const PersonView = {
  currentPersonId: null,
  sortField: 'date',
  sortAscending: false,

  openPersonTransactionView(personId) {
    this.currentPersonId = personId;
    this.updatePersonTransactionHeader(personId);
    this.renderPersonTransactions(personId);
    UI.openModal('personTransactionModal');
  },

  updatePersonTransactionHeader(personId) {
    const person = DB.getPeople().find(p => p.id === personId);
    if (!person) return;

    const balance = DB.getPersonBalance(personId);
    const nameEl = document.getElementById('personTransactionName');
    const balanceEl = document.getElementById('personTransactionBalance');

    if (nameEl) nameEl.textContent = person.name;

    const netBalance = balance.net;
    let balanceAmount = '';
    let balanceLabel = '';
    let balanceClass = '';

    if (netBalance > 0) {
      balanceAmount = UI.formatCurrency(netBalance);
      balanceLabel = t('creditLabel');
      balanceClass = 'credit-balance';
    } else if (netBalance < 0) {
      balanceAmount = UI.formatCurrency(Math.abs(netBalance));
      balanceLabel = t('debitLabel');
      balanceClass = 'debit-balance';
    } else {
      balanceAmount = UI.formatCurrency(0);
      balanceLabel = t('settledLabel');
      balanceClass = 'settled-balance';
    }

    if (balanceEl) {
      balanceEl.innerHTML = `<span class="balance-amount">${balanceAmount} <span class="balance-label">${balanceLabel}</span></span>`;
      balanceEl.className = `balance-badge ${balanceClass}`;
    }
  },

  renderPersonTransactions(personId) {
    const chatArea = document.getElementById('transactionChatArea');
    const transactions = DB.getTransactionsByPerson(personId) || [];

    if (transactions.length === 0) {
      chatArea.innerHTML = `<p class="empty-state">${t('noTransactionsWithPerson')}</p>`;
      return;
    }

    // Sort transactions dynamically
    transactions.sort((a, b) => {
      let valA, valB;

      switch (this.sortField) {
        case 'amount':
          valA = Number(a.amount) || 0;
          valB = Number(b.amount) || 0;
          break;
        case 'category':
          valA = (a.category || '').toLowerCase();
          valB = (b.category || '').toLowerCase();
          break;
        case 'status':
          valA = (a.status || '').toLowerCase();
          valB = (b.status || '').toLowerCase();
          break;
        case 'date':
        default:
          valA = new Date(a.date).getTime();
          valB = new Date(b.date).getTime();
          break;
      }

      let comparison = 0;
      if (valA < valB) {
        comparison = -1;
      } else if (valA > valB) {
        comparison = 1;
      } else {
        // Identical values, use stable tie-breaker
        comparison = (a.createdAt || a.id || '').localeCompare(b.createdAt || b.id || '');
      }

      // Respect the sorting direction
      return this.sortAscending ? comparison : -comparison;
    });

    const sortOrderBtn = document.getElementById('sortOrderBtn');
    if (sortOrderBtn) {
      sortOrderBtn.textContent = this.sortAscending ? '🔼' : '🔽';
    }

    if (transactions.length === 0) {
      chatArea.innerHTML = `<p class="empty-state">${t('noTransactionsYet')}</p>`;
      return;
    }

    chatArea.innerHTML = transactions.map((tr, index) => {
      const categoryEmoji = this.getCategoryEmoji(tr.category);
      const typeLabel = tr.type === 'credit' ? t('creditLabel') : t('debitLabel');
      const typeIcon = tr.type === 'credit' ? '🟢' : '🔴';
      const statusLabel = tr.status === 'settled' ? t('settledLabel') : t('statusOpen');
      const categoryName = t('category' + tr.category.charAt(0).toUpperCase() + tr.category.slice(1));

      return `
        <div class="receipt-item ${tr.type}">
          <div class="receipt-type-section">${typeIcon} ${typeLabel.toUpperCase()}</div>
          <div class="receipt-type-status">${t('sortStatus')}: ${statusLabel}</div>
          
          <div class="receipt-amount">${UI.formatCurrency(tr.amount)}</div>
          <div class="receipt-date">${UI.formatDate(tr.date)}</div>
          
          <div class="receipt-category">${categoryEmoji} ${categoryName.toUpperCase()}</div>
          <div class="receipt-actions">
            <button class="receipt-btn" onclick="APP.deleteTransaction('${tr.id}')" title="Delete">🗑️</button>
            <button class="receipt-btn" onclick="APP.editTransaction('${tr.id}')" title="Edit">✏️</button>
            <button class="receipt-btn" onclick="APP.shareTransactionToWhatsApp('${tr.id}')" title="Share">💬</button>
          </div>
          
          ${tr.notes ? `<div class="receipt-notes">📌 ${tr.notes}</div>` : ''}
        </div>
      `;
    }).join('');

  },

  generateLedgerText(personId) {
    const person = DB.getPeople().find(p => p.id === personId);
    const balance = DB.getPersonBalance(personId);
    const transactions = DB.getTransactionsByPerson(personId) || [];
    const settings = DB.getSettings();
    const yourName = settings?.yourName || 'EBook';

    if (!person) return '';

    const today = new Date().toISOString().split('T')[0];

    let text = `${t('ledgerStatementHeader')}\n\n`;

    text += `${t('ledgerFrom')} ${yourName}\n`;
    text += `${t('ledgerTo')} ${person.name}\n`;

    if (person.phone) {
      text += `${t('ledgerPhone')} ${person.phone}\n`;
    }

    text += `${t('ledgerDate')} ${UI.formatDate(today)}\n\n`;

    text += `${t('ledgerSummary')}\n`;

    const creditTotal = transactions
      .filter(tr => tr.type === 'credit' && tr.status === 'open')
      .reduce((sum, tr) => sum + tr.amount, 0);

    const debitTotal = transactions
      .filter(tr => tr.type === 'debit' && tr.status === 'open')
      .reduce((sum, tr) => sum + tr.amount, 0);

    text += `${t('ledgerCreditDue')} ${UI.formatCurrency(creditTotal)}\n`;
    text += `${t('ledgerDebitOwe')} ${UI.formatCurrency(debitTotal)}\n\n`;

    text += `${t('ledgerNetBalance')} ${UI.formatCurrency(Math.abs(balance.net))}\n`;

    if (balance.net > 0) {
      text += `➡️ ${person.name} ${t('ledgerOwesYou')}\n`;
    }
    else if (balance.net < 0) {
      text += `➡️ ${t('ledgerYouOwe')} ${person.name} ${t('ledgerThisAmount')}\n`;
    }
    else {
      text += `✅ ${t('ledgerAccountSettled')}\n`;
    }

    text += `\n${t('ledgerDetailedTransactions')}\n`;

    transactions
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .forEach(tr => {

        const icon = tr.type === 'credit' ? '🟢' : '🔴';
        const typeText = tr.type === 'credit'
          ? t('creditLabel')
          : t('debitLabel');

        const settled = tr.status === 'settled'
          ? ` (${t('settledLabel')})`
          : '';

        const categoryKey = 'category' + tr.category.charAt(0).toUpperCase() + tr.category.slice(1);
        const categoryLabel = t(categoryKey);

        text += `${icon} ${typeText}: ${UI.formatCurrency(tr.amount)} (${categoryLabel} - ${UI.formatDate(tr.date)})${settled}\n`;

        if (tr.notes) {
          text += `   📝 ${t('ledgerNote')} ${tr.notes}\n`;
        }
      });

    text += `\n──────────────\n`;
    text += `📱 ${t('ledgerGeneratedWith')}\n`;
    text += `🌐 ${t('ledgerCreditDebitManager')}`;

    return text;
  },

  getCategoryEmoji(category) {
    const emojiMap = {
      'retail': '🛒',
      'service': '🔧',
      'payment': '💳',
      'loan': '💰',
      'expense': '💸',
      'general': '📝',
      'other': '🔹'
    };
    return emojiMap[category] || '🔹';
  },

  setSortField(field) {
    this.sortField = field;
    if (this.currentPersonId) {
      this.renderPersonTransactions(this.currentPersonId);
    }
  },

  toggleSortDirection() {
    this.sortAscending = !this.sortAscending;
    if (this.currentPersonId) {
      this.renderPersonTransactions(this.currentPersonId);
    }
  }
};

// Export to window for global access (onclick handlers)
window.PersonView = PersonView;

