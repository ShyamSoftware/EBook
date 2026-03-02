/**
 * ebook - Credit & Debit Account Database
 * Handles LocalStorage operations for account management
 */

const DB = {
  // Storage keys
  KEYS: {
    PEOPLE: 'ebook_people',
    TRANSACTIONS: 'ebook_transactions',
    SETTINGS: 'ebook_settings'
  },

  // Initialize database
  init() {
    if (!this.getSettings()) {
      this.setSettings({
        yourName: '',
        yourPhone: '',
        yourEmail: ''
      });
    }
    console.log('Database initialized');
  },

  // ============================================
  // SETTINGS OPERATIONS
  // ============================================

  getSettings() {
    return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS)) || null;
  },

  setSettings(settings) {
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
  },

  // ============================================
  // PEOPLE OPERATIONS
  // ============================================

  getPeople() {
    return JSON.parse(localStorage.getItem(this.KEYS.PEOPLE)) || [];
  },

  getPerson(id) {
    const people = this.getPeople();
    return people.find(p => p.id === id);
  },

  addPerson(person) {
    const people = this.getPeople();
    person.id = Date.now().toString();
    person.createdAt = new Date().toISOString();
    person.updatedAt = new Date().toISOString();
    people.push(person);
    localStorage.setItem(this.KEYS.PEOPLE, JSON.stringify(people));
    return person;
  },

  updatePerson(id, updates) {
    const people = this.getPeople();
    const index = people.findIndex(p => p.id === id);
    if (index !== -1) {
      people[index] = {
        ...people[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.KEYS.PEOPLE, JSON.stringify(people));
      return people[index];
    }
    return null;
  },

  deletePerson(id) {
    // 1. Delete the person
    const people = this.getPeople();
    const filteredPeople = people.filter(p => p.id !== id);
    localStorage.setItem(this.KEYS.PEOPLE, JSON.stringify(filteredPeople));

    // 2. Delete all transactions associated with this person (cascading delete)
    const transactions = this.getTransactions();
    const filteredTransactions = transactions.filter(t => t.personId !== id);
    localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(filteredTransactions));
  },

  searchPeople(query) {
    const people = this.getPeople();
    const q = query.toLowerCase();
    return people.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.phone?.includes(q) ||
      p.email?.toLowerCase().includes(q)
    );
  },

  // ============================================
  // TRANSACTION OPERATIONS
  // ============================================

  getTransactions() {
    return JSON.parse(localStorage.getItem(this.KEYS.TRANSACTIONS)) || [];
  },

  getTransaction(id) {
    const transactions = this.getTransactions();
    return transactions.find(t => t.id === id);
  },

  addTransaction(transaction) {
    const transactions = this.getTransactions();
    transaction.id = Date.now().toString();
    transaction.createdAt = new Date().toISOString();
    transactions.push(transaction);
    localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(transactions));
    return transaction;
  },

  updateTransaction(id, updates) {
    const transactions = this.getTransactions();
    const index = transactions.findIndex(t => t.id === id);
    if (index !== -1) {
      transactions[index] = {
        ...transactions[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(transactions));
      return transactions[index];
    }
    return null;
  },

  deleteTransaction(id) {
    const transactions = this.getTransactions();
    const filtered = transactions.filter(t => t.id !== id);
    localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(filtered));
  },

  clearTransactionsByPerson(personId) {
    console.log('[DB] clearTransactionsByPerson called with:', personId, '(' + typeof personId + ')');
    try {
      const transactions = this.getTransactions();
      console.log('[DB] Total transactions before:', transactions.length);

      const filtered = transactions.filter(t => {
        const match = String(t.personId) !== String(personId);
        // Log the first few comparisons to check types
        return match;
      });

      console.log('[DB] Total transactions after filtering:', filtered.length);
      console.log('[DB] Transactions removed:', transactions.length - filtered.length);

      localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(filtered));
      console.log('[DB] localStorage updated successfully');
      return true;
    } catch (e) {
      console.error('[DB] Error clearing transactions:', e);
      return false;
    }
  },

  // ============================================
  // TRANSACTION QUERIES
  // ============================================

  getTransactionsByType(type) {
    const transactions = this.getTransactions();
    return transactions.filter(t => t.type === type);
  },

  getTransactionsByPerson(personId) {
    const transactions = this.getTransactions();
    return transactions.filter(t => t.personId === personId);
  },

  getTransactionsByStatus(status) {
    const transactions = this.getTransactions();
    return transactions.filter(t => t.status === status);
  },

  getRecentTransactions(limit = 10) {
    const transactions = this.getTransactions();
    return transactions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, limit);
  },

  // ============================================
  // ANALYTICS & CALCULATIONS
  // ============================================

  getTotalCredit() {
    const transactions = this.getTransactions();
    return transactions
      .filter(t => t.type === 'credit' && t.status !== 'settled')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  },

  getTotalDebit() {
    const transactions = this.getTransactions();
    return transactions
      .filter(t => t.type === 'debit' && t.status !== 'settled')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  },

  getTotalSettled() {
    const transactions = this.getTransactions();
    return transactions
      .filter(t => t.status === 'settled')
      .reduce((sum, t) => sum + (t.amount || 0), 0);
  },

  getCreditCount() {
    const transactions = this.getTransactionsByType('credit');
    const people = new Set(transactions.map(t => t.personId));
    return people.size;
  },

  getDebitCount() {
    const transactions = this.getTransactionsByType('debit');
    const people = new Set(transactions.map(t => t.personId));
    return people.size;
  },

  // Person balances
  getPersonBalance(personId) {
    const transactions = this.getTransactionsByPerson(personId);

    const creditAmount = transactions
      .filter(t => t.type === 'credit' && t.status !== 'settled')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    const debitAmount = transactions
      .filter(t => t.type === 'debit' && t.status !== 'settled')
      .reduce((sum, t) => sum + (t.amount || 0), 0);

    return {
      credit: creditAmount,
      debit: debitAmount,
      net: creditAmount - debitAmount // positive = they owe you, negative = you owe them
    };
  },

  getPeopleStats() {
    const people = this.getPeople();
    const transactions = this.getTransactions();

    return people.map(person => {
      const personTransactions = transactions.filter(t => t.personId === person.id);
      const balance = this.getPersonBalance(person.id);

      return {
        ...person,
        credit: balance.credit,
        debit: balance.debit,
        net: balance.net,
        transactionCount: personTransactions.length,
        lastTransaction: personTransactions.length > 0
          ? personTransactions.sort((a, b) => new Date(b.date) - new Date(a.date))[0].date
          : null
      };
    }).filter(p => p.transactionCount > 0);
  },

  // ============================================
  // DATA EXPORT/IMPORT
  // ============================================

  exportData() {
    return {
      people: this.getPeople(),
      transactions: this.getTransactions(),
      settings: this.getSettings(),
      exportedAt: new Date().toISOString()
    };
  },

  exportAsJSON() {
    return JSON.stringify(this.exportData(), null, 2);
  },

  exportAsCSV() {
    const transactions = this.getTransactions();
    const people = this.getPeople();

    let csv = 'ebook - Credit & Debit Report\n';
    csv += 'Generated: ' + new Date().toLocaleString() + '\n\n';

    csv += 'TRANSACTIONS:\n';
    csv += 'Date,Person,Type,Amount,Category,Status,Notes\n';
    transactions.forEach(tr => {
      const person = people.find(p => p.id === tr.personId);
      csv += `"${tr.date}","${person?.name || 'Unknown'}","${tr.type}","${tr.amount}","${tr.category}","${tr.status}","${tr.notes || ''}"\n`;
    });

    csv += '\n\nPEOPLE SUMMARY:\n';
    csv += 'Name,Phone,Total Credit,Total Debit,Net Balance\n';
    this.getPeopleStats().forEach(stat => {
      csv += `"${stat.name}","${stat.phone || ''}","${stat.credit}","${stat.debit}","${stat.net}"\n`;
    });

    return csv;
  },

  importData(jsonData) {
    try {
      const data = JSON.parse(jsonData);
      if (data.people) localStorage.setItem(this.KEYS.PEOPLE, JSON.stringify(data.people));
      if (data.transactions) localStorage.setItem(this.KEYS.TRANSACTIONS, JSON.stringify(data.transactions));
      if (data.settings) localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(data.settings));
      return true;
    } catch (error) {
      console.error('Import error:', error);
      return false;
    }
  },

  createBackup() {
    const timestamp = new Date();
    const timestampStr = timestamp.toLocaleString('en-IN');
    const backup = {
      id: 'backup_' + Date.now(),
      timestamp: timestampStr,
      date: timestamp.toISOString().split('T')[0],
      time: timestamp.toLocaleTimeString('en-IN'),
      data: this.exportAsJSON(),
      size: (new Blob([this.exportAsJSON()]).size / 1024).toFixed(2)
    };
    const backups = this.getBackups() || [];
    backups.unshift(backup);
    if (backups.length > 10) backups.pop();
    localStorage.setItem('ebook_backups', JSON.stringify(backups));

    // Update last backup timestamp in settings
    const settings = this.getSettings() || {};
    settings.lastBackup = timestampStr;
    this.setSettings(settings);

    return backup;
  },

  getBackups() {
    return JSON.parse(localStorage.getItem('ebook_backups')) || [];
  },

  getBackupById(backupId) {
    return this.getBackups().find(b => b.id === backupId);
  },

  restoreBackup(backupId) {
    const backup = this.getBackupById(backupId);
    if (!backup) return false;
    try {
      this.importData(backup.data);
      return true;
    } catch (error) {
      return false;
    }
  },

  deleteBackup(backupId) {
    const backups = this.getBackups().filter(b => b.id !== backupId);
    localStorage.setItem('ebook_backups', JSON.stringify(backups));
  },

  clearAllBackups() {
    localStorage.removeItem('ebook_backups');
  },

  clearAllData() {
    localStorage.removeItem(this.KEYS.PEOPLE);
    localStorage.removeItem(this.KEYS.TRANSACTIONS);
  }
};

// Initialize database on load
DB.init();
