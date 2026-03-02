// Translation dictionary
const translations = {
    en: {
        // Navigation
        companyName: "E-Book & Expense Manager",
        companySubtitle: "Credit & Expense Manager",
        settingsTitle: "⚙️ Settings",

        // Dashboard Stats
        moneyDueToMe: "Money Due To Me",
        moneyIOwe: "Money I Owe",
        peopleCount: "{count} people",

        // Actions
        addPersonBtn: "➕ Add Person",
        syncContactsBtn: "📱 Sync Contacts",
        searchPlaceholder: "Search person...",
        searchBtn: "🔍 Search",
        lastBackup: "✅ Last backup: {time}",
        justNow: "just now",

        // Empty states
        noPeopleAdded: "No people added yet. Add one to get started!",
        noTransactionsYet: "No transactions yet",
        noTransactionsWithPerson: "No transactions with this person yet.",
        noPeopleFound: "No people found matching your search.",

        // Person Transaction Modal
        sortDate: "Date",
        sortAmount: "Amount",
        sortCategory: "Category",
        sortStatus: "Status",
        addCreditBtn: "➕ Credit",
        addDebitBtn: "➖ Debit",
        shareWhatsAppBtn: "💬 Share Ledger",
        editPersonBtn: "✏️ Edit",
        clearAllBtn: "🧹 Clear All",

        // Add Person Modal
        addPersonTitle: "Add Person",
        editPersonTitle: "Edit Person",
        personNameLabel: "Person Name *",
        personNamePlaceholder: "Name or Business",
        personPhoneLabel: "Phone Number",
        personPhonePlaceholder: "Mobile number",
        personEmailLabel: "Email",
        personAddressLabel: "Address",
        personAddressPlaceholder: "Address or location",
        selectLanguageLabel: "Language",
        cancelBtn: "Cancel",
        savePersonBtn: "Save Person",
        deletePersonBtn: "Delete Person",

        // Transaction Modal
        addTransactionTitle: "Add Transaction",
        selectPersonLabel: "Person *",
        selectPersonOption: "-- Select Person --",
        selectOrAddPersonOption: "-- Select or Add Person --",
        addNewPersonBtn: "+ Add New Person",
        dateLabel: "Date *",
        amountLabel: "Amount *",
        categoryLabel: "Category",
        categoryGeneral: "General",
        categoryRetail: "Retail Sales",
        categoryService: "Service",
        categoryPayment: "Payment",
        categoryLoan: "Loan",
        categoryExpense: "Expense",
        categoryOther: "Other",
        statusLabel: "Status",
        statusOpen: "Open",
        statusSettled: "Settled ✓",
        notesLabel: "Notes (optional)",
        notesPlaceholder: "Add any description...",
        saveBtn: "Save",

        // Settings Modal
        settingsHeader: "Settings ⚙️",
        yourProfileHeader: "👤 Your Profile",
        businessNameLabel: "Business/Name",
        businessNamePlaceholder: "Your name or business",
        yourPhoneLabel: "Your Phone",
        yourPhonePlaceholder: "Your contact number",
        yourEmailLabel: "Your Email",
        yourEmailPlaceholder: "Your email",
        resetBtn: "Reset",
        saveProfileBtn: "Save Profile",
        backupSectionHeader: "💾 Backup & Data Management",
        backupSectionHint: "💡 Backups are automatically created. Restore from any backup using the date below.",
        googleDriveBtn: "☁️ Share / Save to Google Drive",
        manualBackupBtn: "💾 Create Local Backup",
        exportJsonBtn: "📥 Export as JSON",
        exportCsvBtn: "📊 Export as CSV",
        backupStatusPrefix: "✅ Last backup: ",
        backupHistoryHeader: "📋 Backup History (Date-Wise)",
        noBackupsYet: "No backups yet. Create one now!",
        dangerZoneHeader: "🗑️ Danger Zone",
        dangerZoneHint: "⚠️ These actions cannot be undone!",
        deleteDataBtn: "Delete ALL Data Permanently",

        // JS Messages & Dynamic Text
        unknown: "Unknown",
        creditLabel: "Credit",
        debitLabel: "Debit",
        settledLabel: "Settled",
        toastPersonRequired: "Person name is required",
        toastPersonUpdated: "Person updated successfully",
        toastPersonAdded: "Person added successfully",
        toastPersonDeleted: "Person deleted",
        confirmDeletePerson: "Are you sure? This will delete the person AND all their transaction records permanently.",
        toastContactSyncNotAvailable: "Contact sync not available on this device/browser",
        toastContactsAdded: "Added {count} contact(s) from phone",
        toastNoContacts: "No new contacts to add",
        toastBackupCreated: "Backup created successfully! ✅",
        toastBackupShared: "Backup shared successfully! ☁️",
        toastSaveToDrive: "Save the downloaded file to Google Drive",
        confirmRestoreBackup: "Restore from this backup? Current data will be replaced.",
        toastBackupRestored: "Backup restored successfully",
        toastBackupRestoreFailed: "Failed to restore backup",
        confirmDeleteBackup: "Delete this backup?",
        toastBackupDeleted: "Backup deleted",
        addCreditHeader: "🟢 Add Credit",
        addDebitHeader: "🔴 Add Debit",
        editCreditHeader: "🟢 Edit Credit",
        editDebitHeader: "🔴 Edit Debit",
        toastSelectPerson: "Please select a person",
        toastValidAmount: "Please enter a valid amount",
        toastTransactionUpdated: "Transaction updated successfully",
        toastTransactionAdded: "Transaction added successfully",
        confirmDeleteTransaction: "Delete this transaction?",
        toastTransactionDeleted: "Transaction deleted",
        toastSettingsSaved: "Settings saved successfully",
        confirmResetData: "Are you absolutely sure? This will delete ALL data including people and transactions. This action CANNOT be undone.",
        toastDataReset: "All data has been reset",
        confirmClearAll: "Are you sure? This will delete ALL transactions for this person. This action cannot be undone!",
        toastTransactionsCleared: "Member ledger cleared successfully",
        creditMoneyTheyOweYou: "CREDIT • Money they owe you",
        debitMoneyYouOweThem: "DEBIT • Money you owe them",
        saveCreditBtn: "Save Credit",
        saveDebitBtn: "Save Debit",
        whatsappAppOpening: "💬 Opening WhatsApp app...",
        whatsappWebOpening: "💬 Opening WhatsApp Web...",
        ledgerStatementHeader: "*LEDGER STATEMENT*",
        ledgerFrom: "*From:*",
        ledgerTo: "*To:*",
        ledgerPhone: "*Phone:*",
        ledgerDate: "*Date:*",
        ledgerSummary: "*TRANSACTION SUMMARY*",
        ledgerCreditDue: "🟢 CREDIT (Money Due To Me):",
        ledgerDebitOwe: "🔴 DEBIT (Money I Owe):",
        ledgerNetBalance: "💰 *NET BALANCE:*",
        ledgerOwesYou: "owes you this amount",
        ledgerYouOwe: "You owe",
        ledgerThisAmount: "this amount",
        ledgerAccountSettled: "(Account settled - balanced)",
        ledgerDetailedTransactions: "*DETAILED TRANSACTIONS*",
        ledgerNote: "Note:",
        ledgerGeneratedWith: "Generated with EBook App by Shyam Software",
        ledgerCreditDebitManager: "https://shyamsoftware.com",
        poweredBy: "Powered by",
        visitWebsite: "Visit Website",
        transactionCreditOwe: "(Amount receivable)",
        transactionDebitOwe: "(Amount payable)",
        transactionAmountLabel: "*Amount:*",
        transactionDateLabel: "*Date:*",
        transactionCategoryLabel: "*Category:*",
        transactionStatusLabel: "*Status:*",
        transactionPendingLabel: "PENDING",
        transactionNoteLabel: "*Note:*",

        // Months
        jan: "Jan", feb: "Feb", mar: "Mar", apr: "Apr", may: "May", jun: "Jun",
        jul: "Jul", aug: "Aug", sep: "Sep", oct: "Oct", nov: "Nov", dec: "Dec"
    },
    gu: {
        companyName: "ઈ-બુક અને ખર્ચ મેનેજર",
        companySubtitle: "જમા અને ખર્ચ મેનેજર",
        settingsTitle: "⚙️ સેટિંગ્સ",
        moneyDueToMe: "મારે લેવાના નીકળતા રૂપિયા",
        moneyIOwe: "મારે આપવાના થતા રૂપિયા",
        peopleCount: "{count} લોકો",
        addPersonBtn: "➕ વ્યક્તિ ઉમેરો",
        syncContactsBtn: "📱 સંપર્કો સિંક કરો",
        searchPlaceholder: "વ્યક્તિ શોધો...",
        searchBtn: "🔍 શોધો",
        lastBackup: "✅ છેલ્લો બેકઅપ: {time}",
        justNow: "હમણાં જ",
        noPeopleAdded: "હજી કોઈ વ્યક્તિ ઉમેરાઈ નથી. શરૂ કરવા માટે એક ઉમેરો!",
        noTransactionsYet: "કોઈ લેવડદેવડ નથી",
        noTransactionsWithPerson: "આ વ્યક્તિ સાથે અત્યાર સુધી કોઈ લેન્ડ-દેન્ડ નથી.",
        noPeopleFound: "તમારી શોધ સાથે કોઈ વ્યક્તિ મેળ ખાતી નથી.",
        sortDate: "તારીખ",
        sortAmount: "રકમ",
        sortCategory: "શ્રેણી",
        sortStatus: "સ્થિતિ",
        addCreditBtn: "➕ જમા કરો",
        addDebitBtn: "➖ ઉધાર કરો",
        shareWhatsAppBtn: "💬 શેર કરો",
        editPersonBtn: "✏️ ફેરફાર કરો",
        clearAllBtn: "🧹 બધું સાફ કરો",
        addPersonTitle: "વ્યક્તિ ઉમેરો",
        editPersonTitle: "વ્યક્તિમાં ફેરફાર કરો",
        personNameLabel: "વ્યક્તિનું નામ *",
        personNamePlaceholder: "નામ અથવા વ્યવસાય",
        personPhoneLabel: "ફોન નંબર",
        personPhonePlaceholder: "મોબાઇલ નંબર",
        personEmailLabel: "ઈમેલ",
        personAddressLabel: "સરનામું",
        personAddressPlaceholder: "સરનામું અથવા સ્થાન",
        selectLanguageLabel: "ભાષા",
        cancelBtn: "રદ કરો",
        savePersonBtn: "વ્યક્તિ સાચવો",
        deletePersonBtn: "વ્યક્તિ કાઢી નાખો",
        addTransactionTitle: "લેવડદેવડ ઉમેરો",
        selectPersonLabel: "વ્યક્તિ *",
        selectPersonOption: "-- વ્યક્તિ પસંદ કરો --",
        selectOrAddPersonOption: "-- પસંદ કરો અથવા ઉમેરો --",
        addNewPersonBtn: "+ નવી વ્યક્તિ ઉમેરો",
        dateLabel: "તારીખ *",
        amountLabel: "રકમ *",
        categoryLabel: "શ્રેણી",
        categoryGeneral: "સામાન્ય",
        categoryRetail: "છૂટક વેચાણ",
        categoryService: "સેવા",
        categoryPayment: "ચુકવણી",
        categoryLoan: "લોન",
        categoryExpense: "ખર્ચ",
        categoryOther: "અન્ય",
        statusLabel: "સ્થિતિ",
        statusOpen: "ચાલુ",
        statusSettled: "ચૂકતે થઈ ગયું ✓",
        notesLabel: "નોંધ (વૈકલ્પિક)",
        notesPlaceholder: "કોઈપણ વર્ણન ઉમેરો...",
        saveBtn: "સાચવો",
        settingsHeader: "સેટિંગ્સ ⚙️",
        yourProfileHeader: "👤 તમારી પ્રોફાઇલ",
        businessNameLabel: "વ્યવસાય/નામ",
        businessNamePlaceholder: "તમારું નામ અથવા વ્યવસાય",
        yourPhoneLabel: "તમારો ફોન",
        yourPhonePlaceholder: "તમારો સંપર્ક નંબર",
        yourEmailLabel: "તમારો ઈમેલ",
        yourEmailPlaceholder: "તમારો ઈમેલ",
        resetBtn: "રીસેટ",
        saveProfileBtn: "પ્રોફાઇલ સાચવો",
        backupSectionHeader: "💾 બેકઅપ અને ડેટા મેનેજમેન્ટ",
        backupSectionHint: "💡 બેકઅપ આપમેળે બને છે. નીચેની તારીખનો ઉપયોગ કરીને કોઈપણ બેકઅપમાંથી રિસ્ટોર કરો.",
        googleDriveBtn: "☁️ શેર કરો / ગૂગલ ડ્રાઇવ પર સાચવો",
        manualBackupBtn: "💾 લોકલ બેકઅપ બનાવો",
        exportJsonBtn: "📥 JSON તરીકે નિકાસ કરો",
        exportCsvBtn: "📊 CSV તરીકે નિકાસ કરો",
        backupStatusPrefix: "✅ છેલ્લો બેકઅપ: ",
        backupHistoryHeader: "📋 બેકઅપ ઇતિહાસ (તારીખ મુજબ)",
        noBackupsYet: "કોઈ બેકઅપ નથી. હમણાં એક બનાવો!",
        dangerZoneHeader: "🗑️ ભયજનક વિસ્તાર",
        dangerZoneHint: "⚠️ આ ક્રિયાઓ બદલી શકાતી નથી!",
        deleteDataBtn: "બધો ડેટા કાયમ માટે કાઢી નાખો",
        unknown: "અજ્ઞાત",
        creditLabel: "જમા",
        debitLabel: "ઉધાર",
        settledLabel: "ચૂકવી દીધેલ",
        toastPersonRequired: "વ્યક્તિનું નામ ફરજિયાત છે",
        toastPersonUpdated: "વ્યક્તિની માહિતી સફળતાપૂર્વક અપડેટ થઈ",
        toastPersonAdded: "વ્યક્તિ સફળતાપૂર્વક ઉમેરાઈ",
        toastPersonDeleted: "વ્યક્તિ કાઢી નાખવામાં આવી",
        confirmDeletePerson: "શું તમને ખાતરી છે? આ વ્યક્તિ અને તેમના તમામ વ્યવહારના રેકોર્ડ્સ કાયમ માટે કાઢી નાખવામાં આવશે.",
        toastContactSyncNotAvailable: "આ ઉપકરણ/બ્રાઉઝર પર સંપર્ક સિંક ઉપલબ્ધ નથી",
        toastContactsAdded: "ફોનમાંથી {count} સંપર્ક ઉમેરાયા",
        toastNoContacts: "ઉમેરવા માટે કોઈ નવા સંપર્કો નથી",
        toastBackupCreated: "બેકઅપ સફળતાપૂર્વક બન્યું! ✅",
        toastBackupShared: "બેકઅપ સફળતાપૂર્વક શેર થયું! ☁️",
        toastSaveToDrive: "ડાઉનલોડ કરેલ ફાઇલ ગૂગલ ડ્રાઇવમાં સાચવો",
        confirmRestoreBackup: "આ બેકઅપમાંથી રિસ્ટોર કરવું છે? વર્તમાન ડેટા બદલાઈ જશે.",
        toastBackupRestored: "બેકઅપ સફળતાપૂર્વક રિસ્ટોર થયું",
        toastBackupRestoreFailed: "બેકઅપ રિસ્ટોર કરવામાં નિષ્ફળ",
        confirmDeleteBackup: "આ બેકઅપ કાઢી નાખવું છે?",
        toastBackupDeleted: "બેકઅપ કાઢી નાખવામાં આવ્યું",
        addCreditHeader: "🟢 જમા ઉમેરો",
        addDebitHeader: "🔴 ઉધાર ઉમેરો",
        editCreditHeader: "🟢 જમા સંપાદિત કરો",
        editDebitHeader: "🔴 ઉધાર સંપાદિત કરો",
        toastSelectPerson: "કૃપા કરીને વ્યક્તિ પસંદ કરો",
        toastValidAmount: "કૃપા કરીને સાચી રકમ દાખલ કરો",
        toastTransactionUpdated: "વ્યવહાર સફળતાપૂર્વક અપડેટ થયો",
        toastTransactionAdded: "વ્યવહાર સફળતાપૂર્વક ઉમેરાયો",
        confirmDeleteTransaction: "આ વ્યવહાર કાઢી નાખવો છે?",
        toastTransactionDeleted: "વ્યવહાર કાઢી નાખવામાં આવ્યો",
        toastSettingsSaved: "સેટિંગ્સ સફળતાપૂર્વક સાચવવામાં આવી",
        confirmResetData: "શું તમને સંપૂર્ણ ખાતરી છે? આ તમામ ડેટા, વ્યક્તિઓ અને વ્યવહારો સહિત કાઢી નાખશે. આ ક્રિયા બદલી શકાતી નથી.",
        toastDataReset: "બધો ડેટા રીસેટ થઈ ગયો છે",
        confirmClearAll: "શું તમને ખાતરી છે? આ વ્યક્તિના તમામ વ્યવહાર કાઢી નાખવામાં આવશે. આ ક્રિયા બદલી શકાતી નથી!",
        toastTransactionsCleared: "સભ્યની લેઝર સફળતાપૂર્વક સાફ કરવામાં આવી",
        creditMoneyTheyOweYou: "જમા • તેઓએ તમને આપવાના છે તેવા પૈસા",
        debitMoneyYouOweThem: "ઉધાર • તમારે તેમને આપવાના છે તેવા પૈસા",
        saveCreditBtn: "જમા સાચવો",
        saveDebitBtn: "ઉધાર સાચવો",
        whatsappAppOpening: "💬 વોટ્સએપ એપ ખુલી રહી છે...",
        whatsappWebOpening: "💬 વોટ્સએપ વેબ ખુલી રહ્યું છે...",
        ledgerStatementHeader: "*ખાતાવહી સ્ટેટમેન્ટ*",
        ledgerFrom: "*તરફથી:*",
        ledgerTo: "*પ્રતિ:*",
        ledgerPhone: "*ફોન:*",
        ledgerDate: "*તારીખ:*",
        ledgerSummary: "*વ્યવહાર સારાંશ*",
        ledgerCreditDue: "🟢 જમા (મારે લેવાના નીકળતા રૂપિયા):",
        ledgerDebitOwe: "🔴 ઉધાર (મારે આપવાના થતા રૂપિયા):",
        ledgerNetBalance: "💰 *ચોખ્ખું બેલેન્સ:*",
        ledgerOwesYou: "તમને આટલા રૂપિયા આપવાના બાકી છે",
        ledgerYouOwe: "તમારે આપવાના છે",
        ledgerThisAmount: "આટલી રકમ",
        ledgerAccountSettled: "(ખાતું ચૂકતે - બેલેન્સ)",
        ledgerDetailedTransactions: "*વિગતવાર વ્યવહારો*",
        ledgerNote: "નોંધ:",
        ledgerGeneratedWith: "શ્યામ સોફ્ટવેર (Shyam Software) દ્વારા ઈ-બુક એપ",
        ledgerCreditDebitManager: "https://shyamsoftware.com",
        poweredBy: "દ્વારા સંચાલિત",
        visitWebsite: "વેબસાઇટની મુલાકાત લો",
        transactionCreditOwe: "(તમને મળવાની બાકી રકમ)",
        transactionDebitOwe: "(તમારી આપવાની બાકી રકમ)",
        transactionAmountLabel: "*રકમ:*",
        transactionDateLabel: "*તારીખ:*",
        transactionCategoryLabel: "*શ્રેણી:*",
        transactionStatusLabel: "*સ્થિતિ:*",
        transactionPendingLabel: "બાકી",
        transactionNoteLabel: "*નોંધ:*",

        // Months
        jan: "જાન્યુઆરી", feb: "ફેબ્રુઆરી", mar: "માર્ચ", apr: "એપ્રિલ", may: "મે", jun: "જૂન",
        jul: "જુલાઈ", aug: "ઓગસ્ટ", sep: "સપ્ટેમ્બર", oct: "ઓક્ટોબર", nov: "નવેમ્બર", dec: "ડિસેમ્બર"
    },
    hi: {
        companyName: "ई-बुक और व्यय प्रबंधक",
        companySubtitle: "क्रेडिट और एक्सपेंस मैनेजर",
        settingsTitle: "⚙️ सेटिंग्स",
        moneyDueToMe: "पैसे जो मुझे मिलने हैं",
        moneyIOwe: "पैसे जो मुझे देने हैं",
        peopleCount: "{count} लोग",
        addPersonBtn: "➕ व्यक्ति जोड़ें",
        syncContactsBtn: "📱 संपर्क सिंक करें",
        searchPlaceholder: "व्यक्ति खोजें...",
        searchBtn: "🔍 खोजें",
        lastBackup: "✅ अंतिम बैकअप: {time}",
        justNow: "अभी-अभी",
        noPeopleAdded: "अभी तक कोई व्यक्ति नहीं जोड़ा गया। शुरू करने के लिए एक जोड़ें!",
        noTransactionsYet: "अभी तक कोई लेन-देन नहीं",
        noTransactionsWithPerson: "इस व्यक्ति के साथ अभी तक कोई लेन-देन नहीं।",
        noPeopleFound: "आपकी खोज से मेल खाने वाला कोई व्यक्ति नहीं मिला।",
        sortDate: "तारीख",
        sortAmount: "रकम",
        sortCategory: "श्रेणी",
        sortStatus: "स्थिति",
        addCreditBtn: "➕ जमा करें",
        addDebitBtn: "➖ नामे करें",
        shareWhatsAppBtn: "💬 બહીખાતા साझा करें",
        editPersonBtn: "✏️ संपादित करें",
        clearAllBtn: "🧹 सब साफ करें",
        addPersonTitle: "व्यक्ति जोड़ें",
        editPersonTitle: "व्यक्ति को संपादित करें",
        personNameLabel: "व्यक्ति का नाम *",
        personNamePlaceholder: "नाम या व्यवसाय",
        personPhoneLabel: "फ़ोन नंबर",
        personPhonePlaceholder: "मोबाइल नंबर",
        personEmailLabel: "ईमेल",
        personAddressLabel: "पता",
        personAddressPlaceholder: "पता या स्थान",
        selectLanguageLabel: "भाषा",
        cancelBtn: "रद्द करें",
        savePersonBtn: "व्यक्ति सहेजें",
        deletePersonBtn: "व्यक्ति हटाएं",
        addTransactionTitle: "लेन-देन जोड़ें",
        selectPersonLabel: "व्यक्ति *",
        selectPersonOption: "-- व्यक्ति चुनें --",
        selectOrAddPersonOption: "-- चुनें या जोड़ें --",
        addNewPersonBtn: "+ नया व्यक्ति जोड़ें",
        dateLabel: "तारीख *",
        amountLabel: "रकम *",
        categoryLabel: "श्रेणी",
        categoryGeneral: "सामान्य",
        categoryRetail: "खुदरा बिक्री",
        categoryService: "सेवा",
        categoryPayment: "भुगतान",
        categoryLoan: "ऋण",
        categoryExpense: "खर्च",
        categoryOther: "अन्य",
        statusLabel: "स्थिति",
        statusOpen: "खुला है",
        statusSettled: "चुकाया गया ✓",
        notesLabel: "नोट्स (वैकल्पिक)",
        notesPlaceholder: "कोई विवरण जोड़ें...",
        saveBtn: "सहेजें",
        settingsHeader: "सेटिंग्स ⚙️",
        yourProfileHeader: "👤 आपकी प्रोफ़ाइल",
        businessNameLabel: "व्यवसाय/नाम",
        businessNamePlaceholder: "आपका नाम या व्यवसाय",
        yourPhoneLabel: "आपका फ़ोन",
        yourPhonePlaceholder: "आपका संपर्क नंबर",
        yourEmailLabel: "आपका ईमेल",
        yourEmailPlaceholder: "आपका ईमेल",
        resetBtn: "रीसेट",
        saveProfileBtn: "प्रोफाइल सहेजें",
        backupSectionHeader: "💾 बैकअप और डेटा प्रबंधन",
        backupSectionHint: "💡 बैकअप स्वतः बनाए जाते हैं। नीचे दी गई तिथि का उपयोग करके किसी भी बैकअप से पुनर्स्थापित करें।",
        googleDriveBtn: "☁️ साझा करें / Google ड्राइव में सहेजें",
        manualBackupBtn: "💾 स्थानीय बैकअप बनाएं",
        exportJsonBtn: "📥 JSON के रूप में निर्यात करें",
        exportCsvBtn: "📊 CSV के रूप में निर्यात करें",
        backupStatusPrefix: "✅ अंतिम बैकअप: ",
        backupHistoryHeader: "📋 बैकअप इतिहास (तारीख के अनुसार)",
        noBackupsYet: "अभी तक कोई बैकअप नहीं। अभी एक बनाएं!",
        dangerZoneHeader: "🗑️ खतरनाक क्षेत्र",
        dangerZoneHint: "⚠️ इन क्रियाओं को पूर्ववत नहीं किया जा सकता!",
        deleteDataBtn: "सभी डेटा स्थायी रूप से हटाएं",
        unknown: "अज्ञात",
        creditLabel: "क्रेडिट (जमा)",
        debitLabel: "डेबिट (नामे)",
        settledLabel: "खाता चुकता हो गया",
        toastPersonRequired: "व्यक्ति का नाम आवश्यक है",
        toastPersonUpdated: "व्यक्ति को सफलतापूर्वक अपडेट किया गया",
        toastPersonAdded: "व्यक्ति सफलतापूर्वक जोड़ा गया",
        toastPersonDeleted: "व्यक्ति को हटा दिया गया",
        confirmDeletePerson: "क्या आप वाकई ऐसा करना चाहते हैं? इससे व्यक्ति और उनके सभी लेन-देन रिकॉर्ड स्थायी रूप से हटा दिए जाएंगे।",
        toastContactSyncNotAvailable: "इस डिवाइस/ब्राउज़र पर संपर्क सिंक उपलब्ध नहीं है",
        toastContactsAdded: "फ़ोन से {count} संपर्क जोड़े गए",
        toastNoContacts: "कोई नया संपर्क जोड़ने के लिए नहीं है",
        toastBackupCreated: "बैकअप सफलतापूर्वक बनाया गया! ✅",
        toastBackupShared: "बैकअप सफलतापूर्वक साझा किया गया! ☁️",
        toastSaveToDrive: "डाउनलोड की गई फ़ाइल को Google ड्राइव में सहेजें",
        confirmRestoreBackup: "इस बैकअप से पुनर्स्थापित करें? वर्तमान डेटा बदल दिया जाएगा।",
        toastBackupRestored: "बैकअप सफलतापूर्वक पुनर्स्थापित किया गया",
        toastBackupRestoreFailed: "बैकअप पुनर्स्थापित करने में विफल",
        confirmDeleteBackup: "क्या इस बैकअप को हटा दें?",
        toastBackupDeleted: "बैकअप हटा दिया गया",
        addCreditHeader: "🟢 जमा जोड़ें",
        addDebitHeader: "🔴 नामे जोड़ें",
        editCreditHeader: "🟢 जमा संपादित करें",
        editDebitHeader: "🔴 नामे संपादित करें",
        toastSelectPerson: "कृपया किसी व्यक्ति का चयन करें",
        toastValidAmount: "कृपया एक वैध राशि दर्ज करें",
        toastTransactionUpdated: "लेन-देन सफलतापूर्वक अपडेट किया गया",
        toastTransactionAdded: "लेन-देन सफलतापूर्वक जोड़ा गया",
        confirmDeleteTransaction: "क्या इस लेन-देन को हटा दें?",
        toastTransactionDeleted: "लेन-देन हटा दिया गया",
        toastSettingsSaved: "सेटिंग्स सफलतापूर्वक सहेजी गईं",
        confirmResetData: "क्या आप पूर्णतः आश्वस्त हैं? यह लोगों और लेन-देन सहित सभी डेटा हटा देगा। इस क्रिया को पूर्ववत नहीं किया जा सकता है।",
        toastDataReset: "सभी डेटा रीसेट कर दिया गया है",
        confirmClearAll: "क्या आप वाकई? इससे इस व्यक्ति के सभी लेन-देन स्थायी रूप से हटा दिए जाएंगे।",
        toastTransactionsCleared: "सदस्य खाता सफलतापूर्वक साफ़ किया गया",
        creditMoneyTheyOweYou: "क्रेडिट • पैसे जो उन्हें आपको देने हैं",
        debitMoneyYouOweThem: "डेबिट • पैसे जो आपको उन्हें देने हैं",
        saveCreditBtn: "क्रेडिट सहेजें",
        saveDebitBtn: "डेबिट सहेजें",
        whatsappAppOpening: "💬 व्हाट्सएप ऐप खुल रहा है...",
        whatsappWebOpening: "💬 व्हाट्सएप वेब खुल रहा है...",
        ledgerStatementHeader: "*बहीखाता विवरण*",
        ledgerFrom: "*प्रेषक:*",
        ledgerTo: "*प्राप्तकर्ता:*",
        ledgerPhone: "*फ़ोन:*",
        ledgerDate: "*तारीख:*",
        ledgerSummary: "*लेन-देन सारांश*",
        ledgerCreditDue: "🟢 क्रेडिट (पैसे जो मुझे मिलने हैं):",
        ledgerDebitOwe: "🔴 डेबिट (पैसे जो मुझे देने हैं):",
        ledgerNetBalance: "💰 *शुद्ध शेष (बैलेंस):*",
        ledgerOwesYou: "आपको यह राशि देने हैं",
        ledgerYouOwe: "आपको",
        ledgerThisAmount: "इतनी राशि देनी है",
        ledgerAccountSettled: "(खाता चुकता - संतुलित)",
        ledgerDetailedTransactions: "*विस्तृत लेन-देन*",
        ledgerNote: "नोट:",
        ledgerGeneratedWith: "श्याम सॉफ्टवेयर (Shyam Software) द्वारा ई-बुक ऐप",
        ledgerCreditDebitManager: "https://shyamsoftware.com",
        poweredBy: "द्वारा संचालित",
        visitWebsite: "वेबसाइट पर जाएं",
        transactionCreditOwe: "(आपको मिलने वाले पैसे)",
        transactionDebitOwe: "(आपको देने वाले पैसे)",
        transactionAmountLabel: "*रकम:*",
        transactionDateLabel: "*तारीख:*",
        transactionCategoryLabel: "*श्रेणी:*",
        transactionStatusLabel: "*स्थिति:*",
        transactionPendingLabel: "लंबित",
        transactionNoteLabel: "*नोट:*",

        // Months
        jan: "जनवरी", feb: "फ़रवरी", mar: "मार्च", apr: "अप्रैल", may: "मई", jun: "जून",
        jul: "जुलाई", aug: "अगस्त", sep: "सितंबर", oct: "अक्टूबर", nov: "नवंबर", dec: "दिसंबर"
    }
};

let currentLanguage = localStorage.getItem('appLanguage') || 'en';

function setLanguage(lang) {
    if (translations[lang]) {
        currentLanguage = lang;
        localStorage.setItem('appLanguage', lang);
        updateDOMTranslations();

        // Dispatch an event so other parts of the app can react
        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }
}

function t(key, params = {}) {
    let text = translations[currentLanguage][key] || translations['en'][key] || key;

    // Replace parameters
    for (const [k, v] of Object.entries(params)) {
        text = text.replace(`{${k}}`, v);
    }

    return text;
}

function updateDOMTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translatedText = t(key);

        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            if (el.hasAttribute('placeholder')) {
                el.setAttribute('placeholder', translatedText);
            } else if (el.type === 'submit' || el.type === 'button') {
                el.value = translatedText;
            }
        } else if (el.tagName === 'OPTION') {
            el.textContent = translatedText;
        } else {
            // Don't override innerHTML if it contains complex nested elements that aren't purely text
            if (el.children.length === 0 || (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE)) {
                el.textContent = translatedText;
            } else {
                // Find text nodes that are direct children and replace their text
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
                        // Check if the original text was replaced once
                        node.nodeValue = translatedText; // This might be too naive for mixed content, handle specific layouts via JS rendering if needed.
                    }
                });
            }
        }
    });

    // Re-render JS dynamic parts if APP/UI are ready
    if (window.UI) {
        if (typeof window.UI.updateDashboard === 'function') window.UI.updateDashboard();
        if (typeof window.UI.updatePersonSelect === 'function') window.UI.updatePersonSelect();
        if (typeof window.PersonView !== 'undefined' && window.PersonView.currentPersonId) {
            window.PersonView.updatePersonTransactionHeader(window.PersonView.currentPersonId);
            window.PersonView.renderPersonTransactions(window.PersonView.currentPersonId);
        }
    }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    // Set initial dropdown value if it exists
    const langSelect = document.getElementById('languageSelector');
    if (langSelect) {
        langSelect.value = currentLanguage;
        langSelect.addEventListener('change', (e) => {
            setLanguage(e.target.value);
        });
    }

    updateDOMTranslations();
});

window.t = t;
window.setLanguage = setLanguage;
window.currentLanguage = currentLanguage;
