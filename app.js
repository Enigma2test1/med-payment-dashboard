// State management and dashboard logic

// App State
const DEFAULT_USERS = [
  { id: "usr-1", name: "สมชาย รักสงบ (ผู้ดูแลระบบ)", username: "somchai", password: "somchai", role: "admin" },
  { id: "usr-2", name: "วันดี มีเงิน (การเงิน)", username: "wandee", password: "wandee", role: "finance" },
  { id: "usr-3", name: "สมพร พูนสุข (ผู้ดูข้อมูล)", username: "somporn", password: "somporn", role: "viewer" },
  { id: "usr-4", name: "นายอดุลย์ สุขเกษม (ผู้ดูแลระบบ)", username: "odil", password: "0966879889", role: "admin" },
  { id: "usr-5", name: "นายวงศ์วริศ ศิริกาศ (ผู้ดูข้อมูล)", username: "luka", password: "luka", role: "viewer" }
];

let state = {
  companies: [],
  bills: [],
  pos: [],
  users: [],
  currentUser: null,
  currentCycle: "2026-06", // Default cycle from spreadsheet (พ.ค. 69)
  currentTab: "medicine", // 'medicine', 'dental', 'lab'
  currentView: "payments", // 'payments', 'po'
  searchTerm: "",
  statusFilter: "all", // 'all', 'pending', 'paid'
  poSearchTerm: "",
  poStatusFilter: "all"
};

// Thai Month Names
const THAI_MONTHS_FULL = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];
const THAI_MONTHS_SHORT = [
  'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.',
  'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'
];

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initData();
  setupEventListeners();
  initTheme();
  renderApp();
});

// Initialize Data from LocalStorage or pre-load mock data
function initData() {
  try {
    const savedCompanies = localStorage.getItem("med_companies");
    const savedBills = localStorage.getItem("med_bills");
    const savedPos = localStorage.getItem("med_pos");
    const savedView = localStorage.getItem("med_current_view");
    const savedCycle = localStorage.getItem("med_current_cycle");
    const savedTab = localStorage.getItem("med_current_tab");
    const savedUsers = localStorage.getItem("med_users");
    const savedCurrentUser = localStorage.getItem("med_current_user");

    if (savedCompanies && savedBills) {
      state.companies = JSON.parse(savedCompanies);
      state.bills = JSON.parse(savedBills).filter(b => b && b.cycle && b.cycle.includes("-"));

      if (savedPos) {
        state.pos = JSON.parse(savedPos);
      } else {
        state.pos = [...DEFAULT_POS];
        localStorage.setItem("med_pos", JSON.stringify(state.pos));
      }

      // Ensure all default POs exist (for automatic import of newly added POs)
      const currentPoNumbers = new Set(state.pos.map(p => p.poNumber));
      const missingPos = DEFAULT_POS.filter(p => !currentPoNumbers.has(p.poNumber));
      if (missingPos.length > 0) {
        state.pos = [...state.pos, ...missingPos];
        localStorage.setItem("med_pos", JSON.stringify(state.pos));
      }

      // Ensure all default companies exist
      const currentCoIds = new Set(state.companies.map(c => c.id));
      const missingCompanies = DEFAULT_COMPANIES.filter(c => !currentCoIds.has(c.id));
      if (missingCompanies.length > 0) {
        state.companies = [...state.companies, ...missingCompanies];
        localStorage.setItem("med_companies", JSON.stringify(state.companies));
      }

      // Check & import Jan 69 bills
      const hasJanCycle = state.bills.some(b => b.cycle === "2026-01");
      if (!hasJanCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-01")];
      }

      // Force update Jan 69 bills to paid
      let janUpdated = false;
      state.bills = state.bills.map(b => {
        if (b.cycle === "2026-01" && (b.status !== "paid" || b.paidDate !== "2026-02-03")) {
          b.status = "paid";
          b.paidDate = "2026-02-03";
          janUpdated = true;
        }
        return b;
      });
      if (janUpdated) {
        localStorage.setItem("med_bills", JSON.stringify(state.bills));
      }

      // Check & import Feb 69 bills
      const hasFebCycle = state.bills.some(b => b.cycle === "2026-02");
      if (!hasFebCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-02")];
      }

      // Check & import Mar 69 bills
      const hasMarCycle = state.bills.some(b => b.cycle === "2026-03");
      if (!hasMarCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-03")];
      }

      // Check & import Apr 69 bills
      const hasAprCycle = state.bills.some(b => b.cycle === "2026-04");
      if (!hasAprCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-04")];
      }

      // Check & import June 69 medicine bills
      const hasJunMedCycle = state.bills.some(b => b.cycle === "2026-06" && (b.category === "medicine" || !b.category));
      if (!hasJunMedCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-06" && (b.category === "medicine" || !b.category))];
      }

      // Check & import June 69 dental bills
      const hasJunDentCycle = state.bills.some(b => b.cycle === "2026-06" && b.category === "dental");
      if (!hasJunDentCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-06" && b.category === "dental")];
      }

      // Check & import June 69 lab bills
      const hasJunLabCycle = state.bills.some(b => b.cycle === "2026-06" && b.category === "lab");
      if (!hasJunLabCycle) {
        state.bills = [...state.bills, ...DEFAULT_BILLS.filter(b => b.cycle === "2026-06" && b.category === "lab")];
      }

      // Save updated bills list
      localStorage.setItem("med_bills", JSON.stringify(state.bills));

      // Self-healing migration for missing bankName or account details from DEFAULT_COMPANIES
      let updated = false;
      state.companies = state.companies.map(co => {
        const defaultCo = DEFAULT_COMPANIES.find(d => d.id === co.id || (co.name && d.name === co.name));
        if (defaultCo) {
          let coUpdated = false;
          if (!co.name && defaultCo.name) {
            co.name = defaultCo.name;
            coUpdated = true;
          }
          if (!co.bankName && defaultCo.bankName) {
            co.bankName = defaultCo.bankName;
            coUpdated = true;
          }
          if (!co.accountNumber && defaultCo.accountNumber) {
            co.accountNumber = defaultCo.accountNumber;
            coUpdated = true;
          }
          if (co.accountNumber === "0351086012") {
            co.accountNumber = "0351096012";
            coUpdated = true;
          }
          if (!co.accountName && defaultCo.accountName) {
            co.accountName = defaultCo.accountName;
            coUpdated = true;
          }
          if (coUpdated) {
            updated = true;
          }
        }
        return co;
      });
      if (updated) {
        localStorage.setItem("med_companies", JSON.stringify(state.companies));
      }
    } else {
      // Load from mockData.js (which must be imported before app.js)
      state.companies = [...DEFAULT_COMPANIES];
      state.bills = [...DEFAULT_BILLS];
      state.pos = [...DEFAULT_POS];
      localStorage.setItem("med_companies", JSON.stringify(state.companies));
      localStorage.setItem("med_bills", JSON.stringify(state.bills));
      localStorage.setItem("med_pos", JSON.stringify(state.pos));
    }

    if (savedCycle) {
      state.currentCycle = savedCycle;
    } else {
      state.currentCycle = "2026-06";
    }

    if (savedTab) {
      state.currentTab = savedTab;
    } else {
      state.currentTab = "medicine";
    }

    if (savedView) {
      state.currentView = savedView;
    } else {
      state.currentView = "payments";
    }

    // Initialize Users list
    if (savedUsers) {
      state.users = JSON.parse(savedUsers);
      const existingUsernames = new Set(state.users.map(u => u.username));
      const missingUsers = DEFAULT_USERS.filter(u => !existingUsernames.has(u.username));
      if (missingUsers.length > 0) {
        state.users = [...state.users, ...missingUsers];
        localStorage.setItem("med_users", JSON.stringify(state.users));
      }
    } else {
      state.users = [...DEFAULT_USERS];
      localStorage.setItem("med_users", JSON.stringify(state.users));
    }

    // Initialize Active User
    if (savedCurrentUser && savedCurrentUser !== "null") {
      state.currentUser = JSON.parse(savedCurrentUser);
    } else {
      state.currentUser = null;
      localStorage.setItem("med_current_user", "null");
    }
  } catch (error) {
    console.error("Error loading data from localStorage, resetting to defaults...", error);
    state.companies = [...DEFAULT_COMPANIES];
    state.bills = [...DEFAULT_BILLS];
    state.pos = [...DEFAULT_POS];
    state.currentCycle = "2026-06";
    state.currentTab = "medicine";
    state.currentView = "payments";
    state.users = [...DEFAULT_USERS];
    state.currentUser = null;
    saveToLocalStorage();
  }
}

// Save current state to LocalStorage
function saveToLocalStorage() {
  localStorage.setItem("med_companies", JSON.stringify(state.companies));
  localStorage.setItem("med_bills", JSON.stringify(state.bills));
  localStorage.setItem("med_pos", JSON.stringify(state.pos));
  localStorage.setItem("med_current_cycle", state.currentCycle);
  localStorage.setItem("med_current_tab", state.currentTab);
  localStorage.setItem("med_current_view", state.currentView);
  localStorage.setItem("med_users", JSON.stringify(state.users));
  localStorage.setItem("med_current_user", JSON.stringify(state.currentUser));
}

// Convert Cycle String "YYYY-MM" to Thai Display Date
function formatCycleLabel(cycleStr, isFull = false) {
  if (!cycleStr) return "";
  const [yearStr, monthStr] = cycleStr.split("-");
  const year = parseInt(yearStr);
  const monthIdx = parseInt(monthStr) - 1;
  const beYear = year + 543;
  const beShortYear = beYear.toString().slice(-2);
  
  if (isFull) {
    return `25 ${THAI_MONTHS_FULL[monthIdx]} ${beYear}`;
  } else {
    return `${THAI_MONTHS_SHORT[monthIdx]} ${beShortYear}`;
  }
}

// Theme Handling
function initTheme() {
  const savedTheme = localStorage.getItem("med_theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeToggleButton(savedTheme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("med_theme", newTheme);
  updateThemeToggleButton(newTheme);
}

function updateThemeToggleButton(theme) {
  const btn = document.getElementById("themeToggleBtn");
  if (btn) {
    btn.innerHTML = theme === "dark" ? "☀️" : "🌙";
  }
}

// Format Numbers to currency format (33,883.00)
function formatCurrency(num) {
  if (num === undefined || num === null) return "0.00";
  return Number(num).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle
  const themeToggle = document.getElementById("themeToggleBtn");
  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme);
  }

  // Login Form Submission
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit);
  }

  // Logout Button
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogoutClick);
  }

  // Cycle Selector
  const cycleSelect = document.getElementById("cycleSelect");
  if (cycleSelect) {
    cycleSelect.addEventListener("change", (e) => {
      state.currentCycle = e.target.value;
      saveToLocalStorage();
      renderApp();
    });
  }

  // Search Filter
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      state.searchTerm = e.target.value.toLowerCase().trim();
      renderMainTable();
    });
  }

  // Status Filter Chips
  const filterChips = document.querySelectorAll(".filter-chip");
  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.statusFilter = chip.getAttribute("data-status");
      renderMainTable();
      renderDashboardKPIs();
    });
  });

  // View switching tabs
  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      navTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentView = tab.getAttribute("data-view");
      saveToLocalStorage();
      renderApp();
    });
  });

  // Category tabs click listener
  const tabs = document.querySelectorAll(".category-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      state.currentTab = tab.getAttribute("data-tab");
      saveToLocalStorage();
      renderApp();
    });
  });

  // PO search input listener
  const poSearchInput = document.getElementById("poSearchInput");
  if (poSearchInput) {
    poSearchInput.addEventListener("input", (e) => {
      state.poSearchTerm = e.target.value.trim().toLowerCase();
      renderPoTable();
    });
  }

  // PO status filter chips
  const poChips = document.querySelectorAll(".po-filter-chip");
  poChips.forEach(chip => {
    chip.addEventListener("click", () => {
      poChips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      state.poStatusFilter = chip.getAttribute("data-status");
      renderPoTable();
    });
  });

  // Modal Controls
  setupModal("addCompanyModal", "addCompanyBtn", "closeAddCompanyModal");
  setupModal("addBillModal", "addBillBtn", "closeAddBillModal");
  setupModal("manageDataModal", "manageDataBtn", "closeManageDataModal");
  setupModal("manageUsersModal", "manageUsersBtn", "closeManageUsersModal");
  setupModal("poDetailsModal", null, "closePoDetailsModal");
  setupModal("addPoModal", "addPoBtn", "closeAddPoModal");

  // Form Submissions
  const addCompanyForm = document.getElementById("addCompanyForm");
  if (addCompanyForm) {
    addCompanyForm.addEventListener("submit", handleAddCompany);
  }

  const addBillForm = document.getElementById("addBillForm");
  if (addBillForm) {
    addBillForm.addEventListener("submit", handleAddBill);
  }

  const addUserForm = document.getElementById("addUserForm");
  if (addUserForm) {
    addUserForm.addEventListener("submit", handleAddUser);
  }

  const addPoForm = document.getElementById("addPoForm");
  if (addPoForm) {
    addPoForm.addEventListener("submit", handleAddPoSubmit);
  }

  // Add Item Row in PO modal
  const addPoItemRowBtn = document.getElementById("addPoItemRowBtn");
  if (addPoItemRowBtn) {
    addPoItemRowBtn.addEventListener("click", () => addPoItemRow());
  }

  // Export Data
  const exportBtn = document.getElementById("exportBtn");
  if (exportBtn) {
    exportBtn.addEventListener("click", exportToExcelCSV);
  }
}

// Modal helper
function setupModal(modalId, openBtnId, closeBtnId) {
  const modal = document.getElementById(modalId);
  const openBtn = document.getElementById(openBtnId);
  const closeBtn = document.getElementById(closeBtnId);

  if (openBtn && modal) {
    openBtn.addEventListener("click", () => {
      // Dynamic populate options if needed
      if (modalId === "addBillModal") {
        populateCompanyDropdown();
        // Default cycle to current cycle in form
        document.getElementById("billCycle").value = state.currentCycle;
        // Default category to currently active tab
        document.getElementById("billCategory").value = state.currentTab === "combined" ? "medicine" : state.currentTab;
      } else if (modalId === "manageDataModal") {
        renderManageLists();
      } else if (modalId === "manageUsersModal") {
        renderUsersList();
      } else if (modalId === "addPoModal") {
        populatePoSupplierDropdown();
        const container = document.getElementById("poItemsContainer");
        if (container) {
          container.innerHTML = "";
          addPoItemRow();
        }
        document.getElementById("poDateInput").value = new Date().toISOString().split('T')[0];
        document.getElementById("poNumberInput").value = "";
        document.getElementById("poStatusSelect").value = "ส่งใบสั่งซื้อ";
        document.getElementById("poModalTitle").textContent = "สร้างใบสั่งซื้อ (PO) ใหม่";
        document.getElementById("poFormSubmitBtn").textContent = "💾 สร้างใบสั่งซื้อ";
        editingPoId = null;
      }
      modal.classList.add("active");
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.classList.remove("active");
    });
  }

  // Close modal when clicking overlay (outside content)
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }
}

// Populate Company Select dropdown for Add Bill modal
function populateCompanyDropdown() {
  const select = document.getElementById("billCompanyId");
  if (!select) return;
  select.innerHTML = '<option value="">-- เลือกบริษัท --</option>';
  
  // Sort companies alphabetically
  const sortedCompanies = [...state.companies].sort((a, b) => a.name.localeCompare(b.name, 'th'));
  
  sortedCompanies.forEach(company => {
    const opt = document.createElement("option");
    opt.value = company.id;
    opt.textContent = company.name;
    select.appendChild(opt);
  });
}

// Handle Add Company
function handleAddCompany(e) {
  e.preventDefault();
  const name = document.getElementById("coName").value.trim();
  const bankName = document.getElementById("coBankName").value.trim();
  const accountNumber = document.getElementById("coAccountNumber").value.trim();
  const accountName = document.getElementById("coAccountName").value.trim();
  const branch = document.getElementById("coBranch").value.trim();
  const feeNote = document.getElementById("coFeeNote").value.trim();

  if (!name || !bankName || !accountNumber || !accountName) {
    showToast("กรุณากรอกข้อมูลที่จำเป็นให้ครบถ้วน", "error");
    return;
  }

  const newCompany = {
    id: "co-" + Date.now(),
    name,
    bankName,
    accountNumber,
    accountName,
    branch,
    feeNote
  };

  state.companies.push(newCompany);
  saveToLocalStorage();
  document.getElementById("addCompanyForm").reset();
  document.getElementById("addCompanyModal").classList.remove("active");
  
  showToast("เพิ่มบริษัทเรียบร้อยแล้ว");
  renderApp();
}

// Handle Add Bill
function handleAddBill(e) {
  e.preventDefault();
  const companyId = document.getElementById("billCompanyId").value;
  const billNumber = document.getElementById("billNumberInput").value.trim();
  const amount = parseFloat(document.getElementById("billAmountInput").value);
  const discount = parseFloat(document.getElementById("billDiscountInput").value) || 0;
  const cycle = document.getElementById("billCycle").value;
  const status = document.getElementById("billStatusSelect").value;
  const paidDate = document.getElementById("billPaidDateInput").value || "";

  if (!companyId || !billNumber || isNaN(amount)) {
    showToast("กรุณากรอกข้อมูลบิลให้ครบถ้วน", "error");
    return;
  }

  const category = document.getElementById("billCategory").value || "medicine";

  const newBill = {
    id: "bill-" + Date.now(),
    companyId,
    billNumber,
    amount,
    discount,
    cycle,
    status,
    paidDate: status === "paid" ? (paidDate || new Date().toISOString().split('T')[0]) : "",
    category
  };

  state.bills.push(newBill);
  saveToLocalStorage();
  document.getElementById("addBillForm").reset();
  document.getElementById("addBillModal").classList.remove("active");

  showToast("เพิ่มค่าใช้จ่ายเรียบร้อยแล้ว");
  renderApp();
}

// Delete functions (accessible from management UI)
function deleteCompany(coId) {
  if (confirm("ต้องการลบบริษัทนี้หรือไม่? (ข้อมูลบิลทั้งหมดของบริษัทนี้จะถูกลบไปด้วย)")) {
    state.companies = state.companies.filter(c => c.id !== coId);
    state.bills = state.bills.filter(b => b.companyId !== coId);
    saveToLocalStorage();
    showToast("ลบบริษัทเรียบร้อยแล้ว");
    renderApp();
    renderManageLists();
  }
}

function deleteBill(billId) {
  if (confirm("ต้องการลบรายการบิลนี้หรือไม่?")) {
    state.bills = state.bills.filter(b => b.id !== billId);
    saveToLocalStorage();
    showToast("ลบรายการบิลเรียบร้อยแล้ว");
    renderApp();
    renderManageLists();
  }
}

// Render the entire app (updates all components)
function renderApp() {
  const loginOverlay = document.getElementById("loginScreenOverlay");
  const mainContainer = document.getElementById("appMainContainer");
  const profileWidget = document.getElementById("userProfileWidget");
  const profileName = document.getElementById("userProfileName");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!state.currentUser) {
    // Show Login screen, hide main app
    if (loginOverlay) loginOverlay.style.display = "flex";
    if (mainContainer) mainContainer.style.display = "none";
    if (profileWidget) profileWidget.style.display = "none";
    if (logoutBtn) logoutBtn.style.display = "none";
    return;
  }

  // Hide Login screen, show main app
  if (loginOverlay) loginOverlay.style.display = "none";
  if (mainContainer) mainContainer.style.display = "block";
  
  // Update user profile badges
  if (profileWidget) profileWidget.style.display = "inline-flex";
  if (profileName) profileName.textContent = `👤 ${state.currentUser.name}`;
  if (logoutBtn) logoutBtn.style.display = "inline-flex";

  // Update main navigation tabs active styling
  const navTabs = document.querySelectorAll(".nav-tab");
  navTabs.forEach(tab => {
    if (tab.getAttribute("data-view") === state.currentView) {
      tab.classList.add("active");
    } else {
      tab.classList.remove("active");
    }
  });

  // Toggle views
  const paymentsView = document.getElementById("paymentsView");
  const poView = document.getElementById("poView");
  
  if (state.currentView === "po") {
    if (paymentsView) paymentsView.style.display = "none";
    if (poView) poView.style.display = "block";
    
    // Hide add bill button in PO view
    const btnAddBill = document.getElementById("addBillBtn");
    if (btnAddBill) btnAddBill.style.display = "none";
    
    applyRoleRestrictions();
    renderPoApp();
  } else {
    if (paymentsView) paymentsView.style.display = "block";
    if (poView) poView.style.display = "none";
    
    // Update category tabs active styling
    const tabs = document.querySelectorAll(".category-tab");
    tabs.forEach(tab => {
      if (tab.getAttribute("data-tab") === state.currentTab) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    applyRoleRestrictions();
    renderCycleOptions();
    renderDashboardKPIs();
    renderMainTable();
    renderBankSummary();
    renderCombinedMonthlySummary();
  }
}

// Handle Login Form Submit
function handleLoginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById("loginUsername").value.trim().toLowerCase();
  const password = document.getElementById("loginPassword").value.trim();

  const user = state.users.find(u => u.username === username);
  if (!user || user.password !== password) {
    showToast("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง", "error");
    return;
  }

  state.currentUser = user;
  saveToLocalStorage();
  
  // Reset form and render app
  document.getElementById("loginForm").reset();
  renderApp();
  showToast(`ยินดีต้อนรับคุณ ${user.name}`);
}

// Handle Logout Click
function handleLogoutClick() {
  if (confirm("คุณต้องการออกจากระบบหรือไม่?")) {
    state.currentUser = null;
    saveToLocalStorage();
    renderApp();
    showToast("ออกจากระบบเรียบร้อยแล้ว");
  }
}

// Apply Role-Based Access Restrictions
function applyRoleRestrictions() {
  const role = state.currentUser ? state.currentUser.role : "viewer";

  // Get Buttons
  const btnManageUsers = document.getElementById("manageUsersBtn");
  const btnManageData = document.getElementById("manageDataBtn");
  const btnAddBill = document.getElementById("addBillBtn");
  const btnAddCompany = document.getElementById("addCompanyBtn");

  // Show/Hide buttons based on Role
  if (role === "admin") {
    if (btnManageUsers) btnManageUsers.style.display = "inline-flex";
    if (btnManageData) btnManageData.style.display = "inline-flex";
    if (btnAddBill) btnAddBill.style.display = "inline-flex";
    if (btnAddCompany) btnAddCompany.style.display = "inline-flex";
  } else if (role === "finance") {
    if (btnManageUsers) btnManageUsers.style.display = "none";
    if (btnManageData) btnManageData.style.display = "none"; // Finance cannot edit database globally
    if (btnAddBill) btnAddBill.style.display = "inline-flex";
    if (btnAddCompany) btnAddCompany.style.display = "inline-flex";
  } else {
    // Viewer
    if (btnManageUsers) btnManageUsers.style.display = "none";
    if (btnManageData) btnManageData.style.display = "none";
    if (btnAddBill) btnAddBill.style.display = "none";
    if (btnAddCompany) btnAddCompany.style.display = "none";
  }

  // Update manage modals to handle permissions
  const manageUsersModal = document.getElementById("manageUsersModal");
  if (manageUsersModal) {
    if (role !== "admin") {
      manageUsersModal.classList.remove("active");
    } else {
      if (manageUsersModal.classList.contains("active")) {
        renderUsersList();
      }
    }
  }
}

// Handle Add User
function handleAddUser(e) {
  e.preventDefault();
  const name = document.getElementById("usrName").value.trim();
  const username = document.getElementById("usrUsername").value.trim().toLowerCase();
  const role = document.getElementById("usrRole").value;

  if (!name || !username || !role) {
    showToast("กรุณากรอกข้อมูลผู้ใช้ให้ครบถ้วน", "error");
    return;
  }

  // Check if username already exists
  const exists = state.users.some(u => u.username === username);
  if (exists) {
    showToast("ชื่อผู้ใช้นี้มีในระบบแล้ว", "error");
    return;
  }

  const roleLabels = { admin: "(ผู้ดูแลระบบ)", finance: "(การเงิน)", viewer: "(ผู้ดูข้อมูล)" };
  const displayName = `${name} ${roleLabels[role] || ""}`;

  const newUser = {
    id: "usr-" + Date.now(),
    name: displayName,
    username,
    password: username, // Default password matches username
    role
  };

  state.users.push(newUser);
  saveToLocalStorage();
  document.getElementById("addUserForm").reset();
  
  showToast("เพิ่มผู้ใช้ใหม่เรียบร้อยแล้ว");
  renderUsersList();
}

// Delete User
function deleteUser(usrId) {
  const userToDelete = state.users.find(u => u.id === usrId);
  if (!userToDelete) return;

  if (state.currentUser && state.currentUser.id === usrId) {
    showToast("ไม่สามารถลบบัญชีผู้ใช้ที่คุณกำลังเข้าใช้งานอยู่ได้", "error");
    return;
  }

  if (confirm(`ต้องการลบผู้ใช้ "${userToDelete.name}" หรือไม่?`)) {
    state.users = state.users.filter(u => u.id !== usrId);
    saveToLocalStorage();
    showToast("ลบผู้ใช้เรียบร้อยแล้ว");
    renderUsersList();
  }
}

// Render Users List inside User Modal
function renderUsersList() {
  const container = document.getElementById("usersListContainer");
  if (!container) return;

  container.innerHTML = "";
  state.users.forEach(u => {
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justify = "space-between";
    div.style.alignItems = "center";
    div.style.padding = "0.5rem 0";
    div.style.borderBottom = "1px solid var(--border-glass)";

    const isSelf = state.currentUser && u.id === state.currentUser.id;
    const deleteBtn = isSelf 
      ? `<span style="font-size: 0.75rem; color: var(--text-muted); font-style: italic;">(คุณ)</span>` 
      : `<button class="action-btn action-btn-delete" onclick="deleteUser('${u.id}')">🗑️</button>`;

    div.innerHTML = `
      <div>
        <strong style="font-size: 0.85rem;">${u.name}</strong>
        <div style="font-size: 0.75rem; color: var(--text-secondary);">username: ${u.username}</div>
      </div>
      <div>
        ${deleteBtn}
      </div>
    `;
    container.appendChild(div);
  });
}

// Render cycle selections (unique cycles from bills + default template cycle)
function renderCycleOptions() {
  const cycleSelect = document.getElementById("cycleSelect");
  if (!cycleSelect) return;

  // Gather unique cycles
  let cycles = [...new Set(state.bills.map(b => b.cycle))];
  if (!cycles.includes("2026-05")) {
    cycles.push("2026-05");
  }
  
  // Also add some future/past cycles for demonstration if empty
  const defaultCycles = ["2026-04", "2026-05", "2026-06", "2026-07"];
  defaultCycles.forEach(c => {
    if (!cycles.includes(c)) cycles.push(c);
  });

  // Sort cycles descending
  cycles.sort((a, b) => b.localeCompare(a));

  cycleSelect.innerHTML = "";
  cycles.forEach(cycle => {
    const opt = document.createElement("option");
    opt.value = cycle;
    opt.textContent = `รอบจ่าย วันที่ ${formatCycleLabel(cycle, true)}`;
    if (cycle === state.currentCycle) {
      opt.selected = true;
    }
    cycleSelect.appendChild(opt);
  });
}

// Render Dashboard KPI summaries
function renderDashboardKPIs() {
  // Filters elements
  const elPending = document.getElementById("kpiPendingValue");
  const elPaid = document.getElementById("kpiPaidValue");
  const elDiscount = document.getElementById("kpiDiscountValue");
  const elTotal = document.getElementById("kpiTotalValue");

  // Get bills for current cycle and category
  const cycleBills = state.bills.filter(b => b.cycle === state.currentCycle && (state.currentTab === "combined" || (b.category || "medicine") === state.currentTab));

  let pendingSum = 0;
  let paidSum = 0;
  let discountSum = 0;
  let activeCompanies = new Set();

  cycleBills.forEach(b => {
    const netAmount = b.amount - b.discount;
    discountSum += b.discount;
    activeCompanies.add(b.companyId);

    if (b.status === "paid") {
      paidSum += netAmount;
    } else {
      pendingSum += netAmount;
    }
  });

  const grandTotal = pendingSum + paidSum;

  if (elPending) elPending.textContent = formatCurrency(pendingSum);
  if (elPaid) elPaid.textContent = formatCurrency(paidSum);
  if (elDiscount) elDiscount.textContent = formatCurrency(discountSum);
  if (elTotal) elTotal.textContent = formatCurrency(grandTotal);

  // Update total count labels if they exist
  const elActiveCompaniesCount = document.getElementById("activeCompaniesCount");
  if (elActiveCompaniesCount) {
    elActiveCompaniesCount.textContent = activeCompanies.size;
  }
}

// Render main grouped table
function renderMainTable() {
  const tbody = document.getElementById("paymentsTableBody");
  if (!tbody) return;

  const role = state.currentUser ? state.currentUser.role : "viewer";

  // Filter bills by current cycle and category
  let cycleBills = state.bills.filter(b => b.cycle === state.currentCycle && (state.currentTab === "combined" || (b.category || "medicine") === state.currentTab));

  // Apply search term
  if (state.searchTerm) {
    cycleBills = cycleBills.filter(b => {
      const co = state.companies.find(c => c.id === b.companyId);
      const coName = co ? co.name.toLowerCase() : "";
      const billNum = b.billNumber.toLowerCase();
      const bankName = co ? co.bankName.toLowerCase() : "";
      return coName.includes(state.searchTerm) || billNum.includes(state.searchTerm) || bankName.includes(state.searchTerm);
    });
  }

  // Apply status filter
  if (state.statusFilter !== "all") {
    cycleBills = cycleBills.filter(b => b.status === state.statusFilter);
  }

  // Group bills by company
  const grouped = {};
  cycleBills.forEach(bill => {
    if (!grouped[bill.companyId]) {
      grouped[bill.companyId] = [];
    }
    grouped[bill.companyId].push(bill);
  });

  tbody.innerHTML = "";

  if (Object.keys(grouped).length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="8" class="empty-state">
          <div class="empty-icon">📭</div>
          <div style="font-weight: 600; margin-top: 10px;">ไม่พบรายการจ่ายเงินในรอบนี้</div>
          <div style="font-size: 0.8rem; color: var(--text-secondary);">ลองค้นหาชื่อบริษัทอื่น หรือเปลี่ยนตัวกรอง หรือเพิ่มรายการบิลใหม่</div>
        </td>
      </tr>
    `;
    return;
  }

  // Sort companies by original template sequence or alphabetically
  // Let's sort alphabetically for clean presentation
  const sortedCompanyIds = Object.keys(grouped).sort((idA, idB) => {
    const coA = state.companies.find(c => c.id === idA);
    const coB = state.companies.find(c => c.id === idB);
    const nameA = coA ? coA.name : "";
    const nameB = coB ? coB.name : "";
    return nameA.localeCompare(nameB, 'th');
  });

  let companyIndex = 1;
  let totalNetOfAll = 0;

  sortedCompanyIds.forEach(coId => {
    const company = state.companies.find(c => c.id === coId);
    if (!company) return;

    const bills = grouped[coId];
    
    // Sort bills by bill number or amount
    bills.sort((a, b) => (a.billNumber || "").localeCompare(b.billNumber || ""));

    const totalAmount = bills.reduce((sum, b) => sum + b.amount, 0);
    const totalDiscount = bills.reduce((sum, b) => sum + b.discount, 0);
    const netPayable = totalAmount - totalDiscount;
    totalNetOfAll += netPayable;

    // Check if status is uniform. If all bills are paid, status is paid. Otherwise pending.
    const isPaid = bills.every(b => b.status === "paid");
    const displayStatus = isPaid ? "paid" : "pending";
    // Find the latest paid date
    const paidDates = bills.map(b => b.paidDate).filter(d => d);
    const displayPaidDate = paidDates.length > 0 ? paidDates[0] : "";

    // Build Account details cell
    let branchText = company.branch ? ` ${company.branch}` : "";
    let feeNoteText = company.feeNote ? `<span class="fee-note">${company.feeNote}</span>` : "";
    const accountDetailsHTML = `
      <div class="account-info">
        <span class="account-bank">${company.bankName}</span>
        <span class="account-number">${company.accountNumber}</span>
        <span class="account-holder">${company.accountName}</span>
        <span class="account-branch">${branchText}</span>
        ${feeNoteText}
      </div>
    `;

    // Render depending on single bill or multiple bills
    if (bills.length === 1) {
      const bill = bills[0];
      const row = document.createElement("tr");
      row.className = "company-single-row";

      // Status element click configuration
      const statusBadgeHTML = (role !== "viewer")
        ? `<button class="status-badge status-${displayStatus}" onclick="toggleCompanyStatus('${company.id}', '${displayStatus}')">
            ${displayStatus === "paid" ? "✅ จ่ายแล้ว" : "⏳ รอจ่าย"}
           </button>`
        : `<span class="status-badge status-${displayStatus}" style="cursor: default; opacity: 0.85;">
            ${displayStatus === "paid" ? "✅ จ่ายแล้ว" : "⏳ รอจ่าย"}
           </span>`;

      // Action buttons configurations
      let actionButtonsHTML = "";
      if (role === "admin") {
        actionButtonsHTML = `
          <div class="action-buttons">
            <button class="action-btn action-btn-edit" onclick="openEditBillModal('${bill.id}')" title="แก้ไขบิล">✏️</button>
            <button class="action-btn action-btn-delete" onclick="deleteBill('${bill.id}')" title="ลบบิล">🗑️</button>
          </div>
        `;
      } else if (role === "finance") {
        actionButtonsHTML = `
          <div class="action-buttons">
            <button class="action-btn action-btn-edit" onclick="openEditBillModal('${bill.id}')" title="แก้ไขบิล">✏️</button>
          </div>
        `;
      } else {
        actionButtonsHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">-</span>`;
      }

      const catLabels = { medicine: "💊 ยา/เวชภัณฑ์", dental: "🦷 ทันตกรรม", lab: "🧪 แล็บ" };
      const catBadge = catLabels[bill.category || "medicine"] || "";
      const catBadgeHTML = state.currentTab === "combined" 
        ? `<span class="badge-cat" style="font-size: 0.72rem; font-weight: bold; padding: 2px 6px; border-radius: 4px; background: rgba(139, 92, 246, 0.08); color: var(--accent-primary); margin-left: 6px; display: inline-block;">${catBadge}</span>`
        : "";

      row.innerHTML = `
        <td class="col-center">${companyIndex++}</td>
        <td class="company-name-cell">${company.name}</td>
        <td>${bill.billNumber}${catBadgeHTML}</td>
        <td class="col-right">${formatCurrency(bill.amount)}</td>
        <td>${accountDetailsHTML}</td>
        <td class="col-center">
          ${statusBadgeHTML}
        </td>
        <td class="col-center">
          ${displayStatus === "paid" 
            ? `<span class="transfer-date-display">${formatThaiDate(displayPaidDate)}</span>` 
            : `<span class="transfer-date-empty">-</span>`
          }
        </td>
        <td class="col-center">
          ${actionButtonsHTML}
        </td>
      `;
      tbody.appendChild(row);
    } else {
      // Multiple bills
      // First, render the individual bills
      bills.forEach((bill, idx) => {
        const row = document.createElement("tr");
        row.className = "bill-sub-row";
        
        // Only show company name, index, and bank details on the first bill row with rowspan spanning the summary row too (+ 1)
        const indexCell = idx === 0 ? `<td class="col-center" rowspan="${bills.length + 1}">${companyIndex++}</td>` : "";
        const nameCell = idx === 0 ? `<td class="company-name-cell" rowspan="${bills.length}">${company.name}</td>` : "";
        const bankCell = idx === 0 ? `<td rowspan="${bills.length + 1}">${accountDetailsHTML}</td>` : "";
        
        // Individual bill status badge
        const billStatusBadgeHTML = (role !== "viewer")
          ? `<button class="status-badge status-${bill.status}" onclick="toggleBillStatus('${bill.id}', '${bill.status}')">
              ${bill.status === "paid" ? "✅ จ่ายแล้ว" : "⏳ รอจ่าย"}
             </button>`
          : `<span class="status-badge status-${bill.status}" style="cursor: default; opacity: 0.85;">
              ${bill.status === "paid" ? "✅ จ่ายแล้ว" : "⏳ รอจ่าย"}
             </span>`;

        // Individual bill paid date
        const billPaidDateHTML = bill.status === "paid"
          ? `<span class="transfer-date-display">${formatThaiDate(bill.paidDate)}</span>`
          : `<span class="transfer-date-empty">-</span>`;

        // Individual bill actions
        let billActionButtonsHTML = "";
        if (role === "admin") {
          billActionButtonsHTML = `
            <div class="action-buttons">
              <button class="action-btn action-btn-edit" onclick="openEditBillModal('${bill.id}')" title="แก้ไขบิล">✏️</button>
              <button class="action-btn action-btn-delete" onclick="deleteBill('${bill.id}')" title="ลบบิล">🗑️</button>
            </div>
          `;
        } else if (role === "finance") {
          billActionButtonsHTML = `
            <div class="action-buttons">
              <button class="action-btn action-btn-edit" onclick="openEditBillModal('${bill.id}')" title="แก้ไขบิล">✏️</button>
            </div>
          `;
        } else {
          billActionButtonsHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">-</span>`;
        }

        const catLabels = { medicine: "💊 ยา/เวชภัณฑ์", dental: "🦷 ทันตกรรม", lab: "🧪 แล็บ" };
        const catBadgeHTMLSub = state.currentTab === "combined" 
          ? `<span class="badge-cat" style="font-size: 0.72rem; font-weight: bold; padding: 2px 6px; border-radius: 4px; background: rgba(139, 92, 246, 0.08); color: var(--accent-primary); margin-left: 6px; display: inline-block;">${catLabels[bill.category || "medicine"] || ""}</span>`
          : "";

        row.innerHTML = `
          ${indexCell}
          ${nameCell}
          <td>${bill.billNumber}${catBadgeHTMLSub}</td>
          <td class="col-right">${formatCurrency(bill.amount)}</td>
          ${bankCell}
          <td class="col-center">
            ${billStatusBadgeHTML}
          </td>
          <td class="col-center">
            ${billPaidDateHTML}
          </td>
          <td class="col-center">
            ${billActionButtonsHTML}
          </td>
        `;
        tbody.appendChild(row);
      });

      // Render the summary row for multiple bills
      const summaryRow = document.createElement("tr");
      summaryRow.className = "company-summary-row";
      
      let discountLabel = "";
      if (totalDiscount > 0) {
        // Calculate dynamic discount percentage if it was a flat rate
        const percentage = Math.round((totalDiscount / (totalAmount)) * 100);
        discountLabel = ` ลด ${percentage}% (${formatCurrency(totalDiscount)} บาท)`;
      }

      // Group-level status element click configuration (toggles all bills)
      const statusBadgeHTML = (role !== "viewer")
        ? `<button class="status-badge status-${displayStatus}" onclick="toggleCompanyStatus('${company.id}', '${displayStatus}')" title="เปลี่ยนสถานะทุกบิลของบริษัทนี้">
            ${displayStatus === "paid" ? "✅ จ่ายแล้ว" : "⏳ รอจ่าย"}
           </button>`
        : `<span class="status-badge status-${displayStatus}" style="cursor: default; opacity: 0.85;">
            ${displayStatus === "paid" ? "✅ จ่ายแล้ว" : "⏳ รอจ่าย"}
           </span>`;

      // Group-level company Actions configs
      let companyActionHTML = "";
      if (role === "admin" || role === "finance") {
        companyActionHTML = `
          <div class="action-buttons">
            <button class="action-btn action-btn-edit" onclick="openEditCompanyModal('${company.id}')" title="แก้ไขข้อมูลบริษัท">⚙️</button>
          </div>
        `;
      } else {
        companyActionHTML = `<span style="font-size: 0.8rem; color: var(--text-muted);">-</span>`;
      }

      summaryRow.innerHTML = `
        <td class="company-name-cell" style="font-style: italic;" colspan="2">รวมบิล ${company.name}${discountLabel}</td>
        <td class="col-right">${formatCurrency(netPayable)}</td>
        <td class="col-center">
          ${statusBadgeHTML}
        </td>
        <td class="col-center">
          ${displayStatus === "paid" 
            ? `<span class="transfer-date-display">${formatThaiDate(displayPaidDate)}</span>` 
            : `<span class="transfer-date-empty">-</span>`
          }
        </td>
        <td class="col-center">
          ${companyActionHTML}
        </td>
      `;
      tbody.appendChild(summaryRow);
    }
  });

  // Render Grand Total Row
  const grandRow = document.createElement("tr");
  grandRow.className = "grand-total-row";
  grandRow.innerHTML = `
    <td class="col-center"></td>
    <td colspan="2" style="text-align: right; font-weight: 700;">ยอดรวมทั้งหมด</td>
    <td class="col-right"><span class="grand-total-highlight">${formatCurrency(totalNetOfAll)}</span></td>
    <td colspan="4"></td>
  `;
  tbody.appendChild(grandRow);
}

// Convert YYYY-MM-DD to Thai display date (25 พ.ค. 2569)
function formatThaiDate(dateStr) {
  if (!dateStr || !dateStr.includes("-")) return "-";
  const parts = dateStr.split("-");
  if (parts.length < 3) return "-";
  const [year, month, day] = parts;
  const beYear = parseInt(year) + 543;
  const monthIdx = parseInt(month) - 1;
  if (isNaN(monthIdx) || monthIdx < 0 || monthIdx > 11) return "-";
  return `${parseInt(day) || ""} ${THAI_MONTHS_SHORT[monthIdx]} ${beYear}`;
}

// Toggle Payment Status of a Company (changes status of all bills of this company in current cycle)
function toggleCompanyStatus(companyId, currentStatus) {
  const newStatus = currentStatus === "paid" ? "pending" : "paid";
  const today = new Date().toISOString().split('T')[0];
  const paidDateValue = newStatus === "paid" ? today : "";

  // Apply to all bills of this company in the current cycle
  state.bills = state.bills.map(b => {
    if (b.companyId === companyId && b.cycle === state.currentCycle) {
      return {
        ...b,
        status: newStatus,
        paidDate: paidDateValue
      };
    }
    return b;
  });

  saveToLocalStorage();
  showToast(`อัปเดตสถานะการชำระเงินเรียบร้อยแล้ว`);
  renderApp();
}

// Toggle Payment Status of a Single Bill
function toggleBillStatus(billId, currentStatus) {
  const newStatus = currentStatus === "paid" ? "pending" : "paid";
  const today = new Date().toISOString().split('T')[0];
  const paidDateValue = newStatus === "paid" ? today : "";

  state.bills = state.bills.map(b => {
    if (b.id === billId) {
      return {
        ...b,
        status: newStatus,
        paidDate: paidDateValue
      };
    }
    return b;
  });

  saveToLocalStorage();
  showToast(`อัปเดตสถานะบิลเรียบร้อยแล้ว`);
  renderApp();
}

// Render Bank Transfer Summary Card
function renderBankSummary() {
  const listEl = document.getElementById("bankSummaryList");
  if (!listEl) return;

  const cycleBills = state.bills.filter(b => b.cycle === state.currentCycle && (state.currentTab === "combined" || (b.category || "medicine") === state.currentTab));
  const bankTotals = {};

  cycleBills.forEach(bill => {
    const company = state.companies.find(c => c.id === bill.companyId);
    if (!company) return;

    const bank = company.bankName || "ไม่ระบุธนาคาร";
    const netAmount = bill.amount - bill.discount;

    if (!bankTotals[bank]) {
      bankTotals[bank] = {
        amount: 0,
        count: 0
      };
    }
    bankTotals[bank].amount += netAmount;
    bankTotals[bank].count += 1;
  });

  listEl.innerHTML = "";
  
  const sortedBanks = Object.keys(bankTotals).sort((a, b) => bankTotals[b].amount - bankTotals[a].amount);
  
  if (sortedBanks.length === 0) {
    listEl.innerHTML = '<div style="font-size: 0.8rem; color: var(--text-secondary); text-align: center; padding: 10px;">ไม่มีข้อมูล</div>';
    return;
  }

  sortedBanks.forEach(bank => {
    const item = document.createElement("div");
    item.className = "bank-item";
    item.innerHTML = `
      <div class="bank-meta">
        <span class="bank-name">${bank}</span>
        <span class="bank-count">${bankTotals[bank].count} รายการ</span>
      </div>
      <span class="bank-amount">${formatCurrency(bankTotals[bank].amount)}</span>
    `;
    listEl.appendChild(item);
  });
}

// Modal Form: Open Edit Bill
let editingBillId = null;
function openEditBillModal(billId) {
  editingBillId = billId;
  const bill = state.bills.find(b => b.id === billId);
  if (!bill) return;

  populateCompanyDropdown();
  document.getElementById("billCompanyId").value = bill.companyId;
  document.getElementById("billCategory").value = bill.category || "medicine";
  document.getElementById("billNumberInput").value = bill.billNumber;
  document.getElementById("billAmountInput").value = bill.amount;
  document.getElementById("billDiscountInput").value = bill.discount;
  document.getElementById("billCycle").value = bill.cycle;
  document.getElementById("billStatusSelect").value = bill.status;
  document.getElementById("billPaidDateInput").value = bill.paidDate || "";

  // Switch submit listener to edit mode
  const form = document.getElementById("addBillForm");
  form.onsubmit = handleEditBillSubmit;

  // Change title and button text
  document.getElementById("billModalTitle").textContent = "แก้ไขรายการบิล";
  document.getElementById("billFormSubmitBtn").textContent = "บันทึกการแก้ไข";

  document.getElementById("addBillModal").classList.add("active");
}

function handleEditBillSubmit(e) {
  e.preventDefault();
  if (!editingBillId) return;

  const companyId = document.getElementById("billCompanyId").value;
  const category = document.getElementById("billCategory").value || "medicine";
  const billNumber = document.getElementById("billNumberInput").value.trim();
  const amount = parseFloat(document.getElementById("billAmountInput").value);
  const discount = parseFloat(document.getElementById("billDiscountInput").value) || 0;
  const cycle = document.getElementById("billCycle").value;
  const status = document.getElementById("billStatusSelect").value;
  const paidDate = document.getElementById("billPaidDateInput").value;

  state.bills = state.bills.map(b => {
    if (b.id === editingBillId) {
      return {
        ...b,
        companyId,
        category,
        billNumber,
        amount,
        discount,
        cycle,
        status,
        paidDate: status === "paid" ? (paidDate || new Date().toISOString().split('T')[0]) : ""
      };
    }
    return b;
  });

  saveToLocalStorage();
  document.getElementById("addBillForm").reset();
  
  // Restore form defaults
  document.getElementById("addBillForm").onsubmit = handleAddBill;
  document.getElementById("billModalTitle").textContent = "เพิ่มค่าใช้จ่าย / เลขบิล";
  document.getElementById("billFormSubmitBtn").textContent = "เพิ่มข้อมูล";
  editingBillId = null;

  document.getElementById("addBillModal").classList.remove("active");
  showToast("แก้ไขข้อมูลบิลเรียบร้อยแล้ว");
  renderApp();
}

// Modal Form: Open Edit Company
let editingCompanyId = null;
function openEditCompanyModal(coId) {
  editingCompanyId = coId;
  const company = state.companies.find(c => c.id === coId);
  if (!company) return;

  document.getElementById("coName").value = company.name;
  document.getElementById("coBankName").value = company.bankName;
  document.getElementById("coAccountNumber").value = company.accountNumber;
  document.getElementById("coAccountName").value = company.accountName;
  document.getElementById("coBranch").value = company.branch || "";
  document.getElementById("coFeeNote").value = company.feeNote || "";

  // Switch submit listener to edit mode
  const form = document.getElementById("addCompanyForm");
  form.onsubmit = handleEditCompanySubmit;

  // Change title and button text
  document.getElementById("companyModalTitle").textContent = "แก้ไขข้อมูลบริษัท";
  document.getElementById("companyFormSubmitBtn").textContent = "บันทึกการแก้ไข";

  document.getElementById("addCompanyModal").classList.add("active");
}

function handleEditCompanySubmit(e) {
  e.preventDefault();
  if (!editingCompanyId) return;

  const name = document.getElementById("coName").value.trim();
  const bankName = document.getElementById("coBankName").value.trim();
  const accountNumber = document.getElementById("coAccountNumber").value.trim();
  const accountName = document.getElementById("coAccountName").value.trim();
  const branch = document.getElementById("coBranch").value.trim();
  const feeNote = document.getElementById("coFeeNote").value.trim();

  state.companies = state.companies.map(c => {
    if (c.id === editingCompanyId) {
      return { ...c, name, bankName, accountNumber, accountName, branch, feeNote };
    }
    return c;
  });

  saveToLocalStorage();
  document.getElementById("addCompanyForm").reset();

  // Restore form defaults
  document.getElementById("addCompanyForm").onsubmit = handleAddCompany;
  document.getElementById("companyModalTitle").textContent = "เพิ่มข้อมูลบริษัท/คู่ค้า";
  document.getElementById("companyFormSubmitBtn").textContent = "บันทึกข้อมูล";
  editingCompanyId = null;

  document.getElementById("addCompanyModal").classList.remove("active");
  showToast("แก้ไขข้อมูลบริษัทเรียบร้อยแล้ว");
  renderApp();
}

// Render lists inside Manage Data Modal
function renderManageLists() {
  const coList = document.getElementById("manageCompaniesList");
  const billList = document.getElementById("manageBillsList");
  
  if (coList) {
    coList.innerHTML = "";
    // Sort companies
    const sortedCos = [...state.companies].sort((a, b) => a.name.localeCompare(b.name, 'th'));
    sortedCos.forEach(co => {
      const li = document.createElement("div");
      li.style.display = "flex";
      li.style.justify = "space-between";
      li.style.alignItems = "center";
      li.style.padding = "0.5rem 0";
      li.style.borderBottom = "1px solid var(--border-glass)";
      
      li.innerHTML = `
        <div>
          <strong style="font-size: 0.9rem;">${co.name}</strong>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">${co.bankName} - ${co.accountNumber}</div>
        </div>
        <div style="display: flex; gap: 0.25rem;">
          <button class="action-btn action-btn-edit" onclick="closeModalAndEditCompany('${co.id}')">✏️</button>
          <button class="action-btn action-btn-delete" onclick="deleteCompany('${co.id}')">🗑️</button>
        </div>
      `;
      coList.appendChild(li);
    });
  }

  if (billList) {
    billList.innerHTML = "";
    // Filter bills of current cycle and category
    const cycleBills = state.bills.filter(b => b.cycle === state.currentCycle && (state.currentTab === "combined" || (b.category || "medicine") === state.currentTab));
    cycleBills.forEach(bill => {
      const co = state.companies.find(c => c.id === bill.companyId);
      const coName = co ? co.name : "ไม่ระบุ";
      
      const li = document.createElement("div");
      li.style.display = "flex";
      li.style.justify = "space-between";
      li.style.alignItems = "center";
      li.style.padding = "0.5rem 0";
      li.style.borderBottom = "1px solid var(--border-glass)";
      
      li.innerHTML = `
        <div>
          <div style="font-size: 0.85rem; font-weight: 600;">บิล: ${bill.billNumber}</div>
          <div style="font-size: 0.75rem; color: var(--text-secondary);">${coName} | ยอด ${formatCurrency(bill.amount)}</div>
        </div>
        <div style="display: flex; gap: 0.25rem;">
          <button class="action-btn action-btn-edit" onclick="closeModalAndEditBill('${bill.id}')">✏️</button>
          <button class="action-btn action-btn-delete" onclick="deleteBill('${bill.id}')">🗑️</button>
        </div>
      `;
      billList.appendChild(li);
    });
  }
}

// Navigation helpers inside manage modal
function closeModalAndEditCompany(coId) {
  document.getElementById("manageDataModal").classList.remove("active");
  openEditCompanyModal(coId);
}

function closeModalAndEditBill(billId) {
  document.getElementById("manageDataModal").classList.remove("active");
  openEditBillModal(billId);
}

// Toast Notifications
function showToast(message, type = "success") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  container.appendChild(toast);

  // Trigger animation reflow
  setTimeout(() => {
    toast.classList.add("show");
  }, 10);

  // Auto remove
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 3000);
}

// Export data to Excel-compatible format (UTF-16LE Tab-Separated Values)
function exportToExcelCSV() {
  let tsv = "ลำดับ\tชื่อบริษัท\tเลขที่บิล\tยอดเงิน (บาท)\tส่วนลด (บาท)\tสุทธิ (บาท)\tบัญชีธนาคาร\tเลขบัญชี\tชื่อบัญชี\tสาขา\tสถานะ\tวันที่โอน\tหมายเหตุ\n";

  let cycleBills = state.bills.filter(b => b.cycle === state.currentCycle && (state.currentTab === "combined" || (b.category || "medicine") === state.currentTab));
  const grouped = {};
  cycleBills.forEach(bill => {
    if (!grouped[bill.companyId]) grouped[bill.companyId] = [];
    grouped[bill.companyId].push(bill);
  });

  let index = 1;
  let totalNet = 0;

  // Sort companies alphabetically
  const sortedCompanyIds = Object.keys(grouped).sort((idA, idB) => {
    const coA = state.companies.find(c => c.id === idA);
    const coB = state.companies.find(c => c.id === idB);
    const nameA = coA ? coA.name : "";
    const nameB = coB ? coB.name : "";
    return nameA.localeCompare(nameB, 'th');
  });

  sortedCompanyIds.forEach(coId => {
    const company = state.companies.find(c => c.id === coId);
    if (!company) return;

    const bills = grouped[coId];
    const totalAmount = bills.reduce((sum, b) => sum + b.amount, 0);
    const totalDiscount = bills.reduce((sum, b) => sum + b.discount, 0);
    const netPayable = totalAmount - totalDiscount;
    totalNet += netPayable;

    const isPaid = bills.every(b => b.status === "paid");
    const statusText = isPaid ? "จ่ายแล้ว" : "รอจ่าย";
    const paidDates = bills.map(b => b.paidDate).filter(d => d);
    const paidDateText = paidDates.length > 0 ? formatThaiDate(paidDates[0]) : "";

    bills.forEach((bill, idx) => {
      tsv += `${idx === 0 ? index : ""}\t`;
      tsv += `${company.name}\t`;
      tsv += `${bill.billNumber}\t`;
      tsv += `${bill.amount}\t`;
      tsv += `${bill.discount}\t`;
      tsv += `${bill.amount - bill.discount}\t`;
      tsv += `${company.bankName}\t`;
      tsv += `'${company.accountNumber}\t`; // Add single quote to prevent Excel scientific notation
      tsv += `${company.accountName}\t`;
      tsv += `${company.branch || ""}\t`;
      tsv += `${statusText}\t`;
      tsv += `${paidDateText}\t`;
      tsv += `${company.feeNote || ""}\n`;
    });

    index++;
  });

  tsv += `\t\tยอดรวมสุทธิ\t\t\t${totalNet}\t\t\t\t\t\t\t\n`;

  // Convert string to UTF-16LE ArrayBuffer with BOM
  const buffer = new ArrayBuffer(2 + tsv.length * 2);
  const view = new DataView(buffer);
  view.setUint16(0, 0xFEFF, true); // Little-endian BOM
  for (let i = 0; i < tsv.length; i++) {
    view.setUint16(2 + i * 2, tsv.charCodeAt(i), true);
  }

  // Download trigger
  const blob = new Blob([buffer], { type: "text/csv;charset=utf-16le;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  
  // Format Thai label
  const tabNames = { medicine: "ค่ายาเวชภัณฑ์", dental: "วัสดุทันตกรรม_วัสดุสิ้นเปลือง", lab: "ค่าเคมีภัณฑ์ห้องแลป", combined: "ยอดรวมทุกประเภท" };
  const tabLabel = tabNames[state.currentTab] || "ค่ายาเวชภัณฑ์";
  const formattedCycle = formatCycleLabel(state.currentCycle).replace(" ", "_");
  link.setAttribute("download", `รายงานยอดจ่าย${tabLabel}_รอบวันที่25_${formattedCycle}.xls`); // Use .xls to force Excel to parse tabs cleanly
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  showToast("ส่งออกข้อมูลไฟล์ Excel เรียบร้อยแล้ว");
}

// Reset entire database to defaults
function resetDatabaseToDefaults() {
  if (confirm("คุณต้องการล้างข้อมูลการแก้ไขทั้งหมด และย้อนกลับไปใช้ข้อมูลเริ่มต้นของระบบ (รวมเดือน ม.ค.69 และ พ.ค.69) หรือไม่?")) {
    localStorage.removeItem("med_companies");
    localStorage.removeItem("med_bills");
    localStorage.removeItem("med_pos");
    localStorage.removeItem("med_current_cycle");
    localStorage.removeItem("med_current_tab");
    localStorage.removeItem("med_current_view");
    localStorage.removeItem("med_users");
    localStorage.removeItem("med_current_user");
    window.location.reload();
  }
}

// Render Combined Monthly Summary at the bottom
function renderCombinedMonthlySummary() {
  const elMed = document.getElementById("summaryMedValue");
  const elDent = document.getElementById("summaryDentValue");
  const elLab = document.getElementById("summaryLabValue");
  const elGrand = document.getElementById("summaryGrandValue");

  if (!elMed || !elDent || !elLab || !elGrand) return;

  const cycleBills = state.bills.filter(b => b.cycle === state.currentCycle);

  let medSum = 0;
  let dentSum = 0;
  let labSum = 0;

  cycleBills.forEach(b => {
    const netAmount = b.amount - b.discount;
    const cat = b.category || "medicine";
    if (cat === "medicine") {
      medSum += netAmount;
    } else if (cat === "dental") {
      dentSum += netAmount;
    } else if (cat === "lab") {
      labSum += netAmount;
    }
  });

  const grandTotal = medSum + dentSum + labSum;

  elMed.textContent = `${formatCurrency(medSum)} บาท`;
  elDent.textContent = `${formatCurrency(dentSum)} บาท`;
  elLab.textContent = `${formatCurrency(labSum)} บาท`;
  elGrand.textContent = `${formatCurrency(grandTotal)} บาท`;
}

// ==========================================
// Purchase Order (PO) Module Logic
// ==========================================

function renderPoApp() {
  renderPoKPIs();
  renderPoTable();
}

function renderPoKPIs() {
  const elTotal = document.getElementById("kpiPoTotalValue");
  const elSent = document.getElementById("kpiPoSentValue");
  const elPending = document.getElementById("kpiPoPendingValue");
  const elApproved = document.getElementById("kpiPoApprovedValue");

  if (!elTotal || !elSent || !elPending || !elApproved) return;

  const total = state.pos.length;
  const sent = state.pos.filter(p => p.status === "ส่งใบสั่งซื้อ" || p.status === "รอใบเสนอราคา").length;
  const pending = state.pos.filter(p => p.status === "รออนุมัติ").length;
  const approved = state.pos.filter(p => p.status === "อนุมัติแล้ว").length;

  elTotal.textContent = total;
  elSent.textContent = sent;
  elPending.textContent = pending;
  elApproved.textContent = approved;
}

function renderPoTable() {
  const tbody = document.getElementById("poTableBody");
  if (!tbody) return;

  const role = state.currentUser ? state.currentUser.role : "viewer";

  // Filter
  let filtered = [...state.pos];
  if (state.poStatusFilter !== "all") {
    filtered = filtered.filter(p => p.status === state.poStatusFilter);
  }
  if (state.poSearchTerm) {
    filtered = filtered.filter(p => 
      p.poNumber.toLowerCase().includes(state.poSearchTerm) || 
      p.supplier.toLowerCase().includes(state.poSearchTerm)
    );
  }

  tbody.innerHTML = "";

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="7" class="empty-state" style="text-align: center; padding: 2rem;">
          <div style="font-size: 2rem;">📭</div>
          <div style="font-weight: 600; margin-top: 10px;">ไม่พบรายการใบสั่งซื้อ (PO)</div>
        </td>
      </tr>
    `;
    return;
  }

  // Sort descending by date/number
  filtered.sort((a, b) => b.date.localeCompare(a.date) || b.poNumber.localeCompare(a.poNumber));

  filtered.forEach((po, idx) => {
    const row = document.createElement("tr");

    // Status styling & toggle dropdown
    let statusHTML = "";
    if (role !== "viewer") {
      statusHTML = `
        <select class="form-control" style="font-size: 0.85rem; padding: 0.25rem 0.5rem; font-weight: 600; border-radius: 6px; width: auto; display: inline-block;" onchange="changePoStatus('${po.id}', this.value)">
          <option value="ส่งใบสั่งซื้อ" ${po.status === "ส่งใบสั่งซื้อ" ? "selected" : ""}>ส่งใบสั่งซื้อ</option>
          <option value="รอใบเสนอราคา" ${po.status === "รอใบเสนอราคา" ? "selected" : ""}>รอใบเสนอราคา</option>
          <option value="รออนุมัติ" ${po.status === "รออนุมัติ" ? "selected" : ""}>รออนุมัติ</option>
          <option value="อนุมัติแล้ว" ${po.status === "อนุมัติแล้ว" ? "selected" : ""}>อนุมัติแล้ว</option>
        </select>
      `;
    } else {
      const statusClass = {
        "ส่งใบสั่งซื้อ": "po-sent",
        "รอใบเสนอราคา": "po-quotation",
        "รออนุมัติ": "po-pending",
        "อนุมัติแล้ว": "po-approved"
      }[po.status] || "po-sent";
      statusHTML = `<span class="status-badge ${statusClass}">${po.status}</span>`;
    }

    // Actions configurations
    let actionsHTML = "";
    if (role === "admin") {
      actionsHTML = `
        <div class="action-buttons">
          <button class="action-btn action-btn-edit" onclick="openPoDetailsModal('${po.id}')" title="ดูรายละเอียด">👁️</button>
          <button class="action-btn action-btn-edit" onclick="openEditPoModal('${po.id}')" title="แก้ไข">✏️</button>
          <button class="action-btn action-btn-delete" onclick="deletePo('${po.id}')" title="ลบ">🗑️</button>
        </div>
      `;
    } else if (role === "finance") {
      actionsHTML = `
        <div class="action-buttons">
          <button class="action-btn action-btn-edit" onclick="openPoDetailsModal('${po.id}')" title="ดูรายละเอียด">👁️</button>
          <button class="action-btn action-btn-edit" onclick="openEditPoModal('${po.id}')" title="แก้ไข">✏️</button>
        </div>
      `;
    } else {
      actionsHTML = `
        <div class="action-buttons">
          <button class="action-btn action-btn-edit" onclick="openPoDetailsModal('${po.id}')" title="ดูรายละเอียด">👁️</button>
        </div>
      `;
    }

    row.innerHTML = `
      <td class="col-center">${idx + 1}</td>
      <td style="font-weight: 600; color: var(--accent-primary); cursor: pointer;" onclick="openPoDetailsModal('${po.id}')">${po.poNumber}</td>
      <td>${formatThaiDate(po.date)}</td>
      <td style="font-weight: 600;">${po.supplier}</td>
      <td class="col-center" style="font-weight: bold;">${po.items.length} รายการ</td>
      <td class="col-center">${statusHTML}</td>
      <td class="col-center">${actionsHTML}</td>
    `;
    tbody.appendChild(row);
  });
}

function changePoStatus(poId, newStatus) {
  state.pos = state.pos.map(p => {
    if (p.id === poId) {
      return { ...p, status: newStatus };
    }
    return p;
  });
  saveToLocalStorage();
  showToast("อัปเดตสถานะใบสั่งซื้อเรียบร้อยแล้ว");
  renderPoApp();
}

function populatePoSupplierDropdown() {
  const select = document.getElementById("poSupplierSelect");
  if (!select) return;
  select.innerHTML = '<option value="">-- เลือกผู้จัดจำหน่าย --</option>';

  const sorted = [...state.companies].sort((a, b) => a.name.localeCompare(b.name, 'th'));
  sorted.forEach(co => {
    const opt = document.createElement("option");
    opt.value = co.id;
    opt.textContent = co.name;
    select.appendChild(opt);
  });
}

function addPoItemRow(name = "", qty = "", unit = "") {
  const container = document.getElementById("poItemsContainer");
  if (!container) return;

  const div = document.createElement("div");
  div.className = "po-item-row";
  div.style.display = "flex";
  div.style.gap = "0.5rem";
  div.style.marginBottom = "0.5rem";
  div.style.alignItems = "center";

  div.innerHTML = `
    <input type="text" class="form-control po-item-name" style="flex: 3;" placeholder="ชื่อสินค้า / รหัสสินค้า" value="${name}" required>
    <input type="number" class="form-control po-item-qty" style="flex: 1; text-align: right;" placeholder="จำนวน" min="1" value="${qty}" required>
    <input type="text" class="form-control po-item-unit" style="flex: 1.5;" placeholder="หน่วยนับ (กระปุก, กล่อง)" value="${unit}" required>
    <button type="button" class="action-btn action-btn-delete remove-po-row-btn" style="padding: 0.4rem 0.6rem;">🗑️</button>
  `;

  div.querySelector(".remove-po-row-btn").addEventListener("click", () => {
    if (container.querySelectorAll(".po-item-row").length > 1) {
      div.remove();
    } else {
      showToast("ต้องมีรายการสินค้าอย่างน้อย 1 รายการ", "error");
    }
  });

  container.appendChild(div);
}

function openPoDetailsModal(poId) {
  const po = state.pos.find(p => p.id === poId);
  if (!po) return;

  document.getElementById("detPoNumber").textContent = po.poNumber;
  document.getElementById("detPoDate").textContent = formatThaiDate(po.date);
  document.getElementById("detPoSupplier").textContent = po.supplier;

  const statusClass = {
    "ส่งใบสั่งซื้อ": "po-sent",
    "รอใบเสนอราคา": "po-quotation",
    "รออนุมัติ": "po-pending",
    "อนุมัติแล้ว": "po-approved"
  }[po.status] || "po-sent";

  const badge = document.getElementById("detPoStatusBadge");
  badge.className = `status-badge ${statusClass}`;
  badge.textContent = po.status;

  const tbody = document.getElementById("poDetailsTableBody");
  tbody.innerHTML = "";

  po.items.forEach((item, idx) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="col-center">${idx + 1}</td>
      <td style="font-weight: 600;">${item.name}</td>
      <td class="col-right" style="font-weight: bold; color: var(--accent-primary);">${item.quantity}</td>
      <td>${item.unit}</td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("poDetailsModal").classList.add("active");
}

let editingPoId = null;
function openEditPoModal(poId) {
  const po = state.pos.find(p => p.id === poId);
  if (!po) return;

  editingPoId = poId;
  populatePoSupplierDropdown();

  document.getElementById("poNumberInput").value = po.poNumber;
  document.getElementById("poDateInput").value = po.date;

  const select = document.getElementById("poSupplierSelect");
  let found = false;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].text === po.supplier) {
      select.options[i].selected = true;
      found = true;
      break;
    }
  }
  if (!found) {
    const opt = document.createElement("option");
    opt.value = "custom";
    opt.textContent = po.supplier;
    opt.selected = true;
    select.appendChild(opt);
  }

  document.getElementById("poStatusSelect").value = po.status;

  const container = document.getElementById("poItemsContainer");
  container.innerHTML = "";
  po.items.forEach(item => {
    addPoItemRow(item.name, item.quantity, item.unit);
  });

  document.getElementById("poModalTitle").textContent = "แก้ไขใบสั่งซื้อ / Edit PO";
  document.getElementById("poFormSubmitBtn").textContent = "💾 บันทึกการแก้ไข";
  document.getElementById("addPoModal").classList.add("active");
}

function handleAddPoSubmit(e) {
  e.preventDefault();

  const poNumber = document.getElementById("poNumberInput").value.trim();
  const date = document.getElementById("poDateInput").value;
  const select = document.getElementById("poSupplierSelect");
  const supplier = select.options[select.selectedIndex].text;
  const status = document.getElementById("poStatusSelect").value;

  const rows = document.querySelectorAll("#poItemsContainer .po-item-row");
  const items = [];
  rows.forEach((row, idx) => {
    const name = row.querySelector(".po-item-name").value.trim();
    const qty = parseInt(row.querySelector(".po-item-qty").value);
    const unit = row.querySelector(".po-item-unit").value.trim();
    if (name && qty) {
      items.push({
        index: idx + 1,
        name,
        quantity: qty,
        unit
      });
    }
  });

  if (items.length === 0) {
    showToast("กรุณากรอกรายการสินค้าสั่งซื้ออย่างน้อย 1 รายการ", "error");
    return;
  }

  if (editingPoId) {
    state.pos = state.pos.map(p => {
      if (p.id === editingPoId) {
        return {
          ...p,
          poNumber,
          date,
          supplier,
          status,
          items
        };
      }
      return p;
    });
    showToast("แก้ไขข้อมูลใบสั่งซื้อเรียบร้อยแล้ว");
    editingPoId = null;
  } else {
    const newPo = {
      id: "po-" + Date.now(),
      poNumber,
      date,
      supplier,
      status,
      items
    };
    state.pos.push(newPo);
    showToast("สร้างใบสั่งซื้อใหม่สำเร็จ");
  }

  saveToLocalStorage();
  document.getElementById("addPoForm").reset();
  document.getElementById("addPoModal").classList.remove("active");
  renderPoApp();
}

function deletePo(poId) {
  if (confirm("ต้องการลบใบสั่งซื้อนี้ใช่หรือไม่?")) {
    state.pos = state.pos.filter(p => p.id !== poId);
    saveToLocalStorage();
    showToast("ลบใบสั่งซื้อเรียบร้อยแล้ว");
    renderPoApp();
  }
}

// Export all local storage data as a JSON file
function exportBackupData() {
  const backup = {
    companies: state.companies,
    bills: state.bills,
    pos: state.pos,
    users: state.users,
    currentCycle: state.currentCycle
  };
  
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backup, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute("download", `med_dashboard_backup_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("ดาวน์โหลดไฟล์สำรองข้อมูลเรียบร้อยแล้ว");
}

// Import all local storage data from a JSON file
function importBackupData(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.companies && data.bills && data.pos) {
        state.companies = data.companies;
        state.bills = data.bills;
        state.pos = data.pos;
        if (data.users) {
          // Merge default users with imported users, keeping duplicates clean
          const existingUsernames = new Set(data.users.map(u => u.username));
          const defaultMissing = DEFAULT_USERS.filter(u => !existingUsernames.has(u.username));
          state.users = [...data.users, ...defaultMissing];
        } else {
          state.users = [...DEFAULT_USERS];
        }
        if (data.currentCycle) state.currentCycle = data.currentCycle;
        
        saveToLocalStorage();
        showToast("นำเข้าข้อมูลสำรองเรียบร้อยแล้ว! กำลังรีโหลด...", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        showToast("ไฟล์ข้อมูลไม่ถูกต้อง กรุณาเลือกไฟล์สำรองของระบบ", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("เกิดข้อผิดพลาดในการอ่านไฟล์สำรอง", "error");
    }
  };
  reader.readAsText(file);
  event.target.value = "";
}
