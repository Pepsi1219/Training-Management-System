const EMPLOYEES = [
  {id:'EMP001',name:'สมชาย มั่งมี',dept:'HR'},
  {id:'EMP002',name:'สมหญิง ใจดี',dept:'Finance'},
  {id:'EMP003',name:'อนันต์ สุขใจ',dept:'IT'},
  {id:'EMP004',name:'วิไล รักดี',dept:'Marketing'},
  {id:'EMP005',name:'ประสิทธิ์ วงศ์ดี',dept:'Operations'},
  {id:'EMP006',name:'สุดา ศรีสวัสดิ์',dept:'HR'},
  {id:'EMP007',name:'ธนากร พรมดี',dept:'IT'},
  {id:'EMP008',name:'พิมพ์ใจ แสนดี',dept:'Finance'},
  {id:'EMP009',name:'นิรันดร์ ชัยมงคล',dept:'Marketing'},
  {id:'EMP010',name:'ลลิตา บุญมาก',dept:'Operations'},
  {id:'EMP011',name:'กิตติ วัฒนา',dept:'IT'},
  {id:'EMP012',name:'มาลี สมบูรณ์',dept:'HR'},
  {id:'EMP013',name:'วิชัย รุ่งเรือง',dept:'Finance'},
  {id:'EMP014',name:'ศิริพร เจริญสุข',dept:'Marketing'},
  {id:'EMP015',name:'พงศ์ธร ทรงศิริ',dept:'Operations'},
  {id:'EMP016',name:'นภาพร ใจงาม',dept:'IT'},
  {id:'EMP017',name:'สิทธิชัย ดำรงค์',dept:'HR'},
  {id:'EMP018',name:'ปิยะดา สุขเกษม',dept:'Finance'},
  {id:'EMP019',name:'จักรกฤษณ์ มีโชค',dept:'Marketing'},
  {id:'EMP020',name:'วรรณา พงษ์สุวรรณ',dept:'Operations'},
  {id:'EMP021',name:'ชาญณรงค์ อินทร์แก้ว',dept:'IT'},
  {id:'EMP022',name:'อัจฉรา โชคดี',dept:'HR'},
  {id:'EMP023',name:'ฐิติพงศ์ แก้วมณี',dept:'Finance'},
  {id:'EMP024',name:'รุ่งนภา สว่างใจ',dept:'Marketing'},
  {id:'EMP025',name:'เกรียงไกร ภู่ระย้า',dept:'Operations'},
  {id:'EMP026',name:'สุภาพร ทองคำ',dept:'IT'},
  {id:'EMP027',name:'ณัฐวุฒิ สุรินทร์',dept:'HR'},
  {id:'EMP028',name:'กาญจนา มีสุข',dept:'Finance'},
  {id:'EMP029',name:'อภิชาติ บัวงาม',dept:'Marketing'},
  {id:'EMP030',name:'ดารณี เพชรรัตน์',dept:'Operations'},
  {id:'EMP031',name:'สมศักดิ์ วิชาดี',dept:'IT'},
  {id:'EMP032',name:'นวลจันทร์ ศักดิ์ดี',dept:'HR'},
  {id:'EMP033',name:'ยุทธนา ไพบูลย์',dept:'Finance'},
  {id:'EMP034',name:'สาวิตรี ชูใจ',dept:'Marketing'},
  {id:'EMP035',name:'บุญมา เจตนาดี',dept:'Operations'},
  {id:'EMP036',name:'ปาริชาต แสงทอง',dept:'IT'},
  {id:'EMP037',name:'วิโรจน์ ศรีทอง',dept:'HR'},
  {id:'EMP038',name:'มณีรัตน์ คำดี',dept:'Finance'},
  {id:'EMP039',name:'ชวลิต พันธุ์งาม',dept:'Marketing'},
  {id:'EMP040',name:'สุนิสา เฉลิมชัย',dept:'Operations'},
  {id:'EMP041',name:'ธีรภัทร วงศ์สุวรรณ',dept:'IT'},
  {id:'EMP042',name:'วันเพ็ญ นาคเจริญ',dept:'HR'},
  {id:'EMP043',name:'กมล อ่อนนุช',dept:'Finance'},
  {id:'EMP044',name:'พัชรี สุขสมบูรณ์',dept:'Marketing'},
  {id:'EMP045',name:'สุรเดช ทวีสุข',dept:'Operations'},
  {id:'EMP046',name:'อรนุช รุ่งโรจน์',dept:'IT'},
  {id:'EMP047',name:'ประเสริฐ มีทรัพย์',dept:'HR'},
  {id:'EMP048',name:'ปรียา สกุลทอง',dept:'Finance'},
  {id:'EMP049',name:'อดิศักดิ์ พลเยี่ยม',dept:'Marketing'},
  {id:'EMP050',name:'สุดารัตน์ บุตรดี',dept:'Operations'},
];

/* ─────────────────────────────────────────
   STATE
───────────────────────────────────────── */
let selectedEmployees = [];
let logs = [];
let logCounter = 0;
let logToDelete = null;
let logToEdit = null;

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
function getInitials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2);
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatDateRange(start, end) {
  if (!start || !end) return '—';

  const startD = new Date(start);
  const endD = new Date(end);

  const startStr = startD.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });
  const endStr = endD.toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' });

  if (start === end) {
    return startStr;
  }

  if (startD.getMonth() === endD.getMonth() && startD.getFullYear() === endD.getFullYear()) {
    return `${startD.getDate()}–${endD.getDate()} ${startD.toLocaleDateString('th-TH', { month: 'short', year: 'numeric' })}`;
  }

  return `${startStr} – ${endStr}`;
}

/* ─────────────────────────────────────────
   EMPLOYEE SEARCH
───────────────────────────────────────── */
function filterEmployees() {
  const input = document.getElementById('empSearch');
  const q = input.value.toLowerCase().trim();
  const dd = document.getElementById('empDropdown');

  // ล้างเนื้อหาเก่าก่อน
  dd.innerHTML = '';

  if (!q) {
    dd.classList.remove('show');
    return;
  }

  // กรองพนักงานที่ยังไม่ถูกเลือก
  const filtered = EMPLOYEES.filter(e =>
    (e.id.toLowerCase().includes(q) || e.name.toLowerCase().includes(q)) &&
    !selectedEmployees.some(s => s.id === e.id)
  ).slice(0, 10);

  if (!filtered.length) {
    dd.innerHTML = '<div style="padding:14px;text-align:center;font-size:13px;color:var(--text-secondary);">ไม่พบพนักงาน</div>';
    dd.classList.add('show');
    return;
  }

  dd.innerHTML = filtered.map(e => `
    <div class="emp-item" onclick="event.stopPropagation(); selectEmployee('${e.id}')" style="cursor:pointer;">
      <div class="emp-avatar">${getInitials(e.name)}</div>
      <div class="emp-info">
        <div class="emp-name">${e.name}</div>
        <div class="emp-id">${e.id} · ${e.dept}</div>
      </div>
    </div>
  `).join('');

  dd.classList.add('show');
}

// เมื่อพิมพ์ในช่องค้นหา → แสดง/อัปเดต dropdown ทันที
function showDropdown() {
  filterEmployees();
}

function selectEmployee(id) {
  const emp = EMPLOYEES.find(e => e.id === id);
  if (!emp || selectedEmployees.some(e => e.id === id)) return;

  selectedEmployees.push(emp);
  renderTags();

  // โฟกัสกลับไปที่ช่องค้นหาเพื่อพิมพ์ต่อได้เลย
  document.getElementById('empSearch').focus();

  // อัปเดต dropdown ทันที (ซ่อนคนที่เพิ่งเลือกออก)
  filterEmployees();

  // สำคัญ: ไม่ปิด dropdown
}

// ลบพนักงานออกจากรายการที่เลือก
function removeEmployee(id) {
  selectedEmployees = selectedEmployees.filter(e => e.id !== id);
  renderTags();

  // อัปเดต dropdown ใหม่ (แสดงคนที่เพิ่งลบออกมาอีกครั้ง)
  filterEmployees();
}

// แสดง tag ผู้เข้าอบรม
function renderTags() {
  const container = document.getElementById('selectedTags');
  if (!selectedEmployees.length) {
    container.innerHTML = '';
    return;
  }
  container.innerHTML = selectedEmployees.map(e => `
    <div class="tag">
      ${e.name}
      <div class="tag-remove" onclick="removeEmployee('${e.id}')">✕</div>
    </div>
  `).join('');
}

// จัดการคลิกนอกเพื่อปิด dropdown - แต่ต้องไม่ปิดทันทีเมื่อคลิกที่ emp-item
document.addEventListener('click', function(e) {
  const searchContainer = document.querySelector('.search-container');
  const dropdown = document.getElementById('empDropdown');
  
  // ถ้าคลิกที่ emp-item อย่าเพิ่งปิด
  if (e.target.closest('.emp-item')) {
    return;
  }
  
  // ถ้าคลิกนอก search container ให้ปิด dropdown
  if (!searchContainer.contains(e.target)) {
    dropdown.classList.remove('show');
  }
});

// กด Esc เพื่อปิด dropdown
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    document.getElementById('empDropdown').classList.remove('show');
  }
});

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function showToast(msg, isWarn = false) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.style.background = isWarn ? 'rgba(255,59,48,0.9)' : 'rgba(30,30,30,0.88)';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

/* ─────────────────────────────────────────
   RESET FORM FUNCTION
───────────────────────────────────────── */
function resetForm() {
  const today = new Date().toISOString().split('T')[0];

  document.getElementById('topic').value = '';
  document.getElementById('startDate').value = today;
  document.getElementById('startTime').value = '09:00';
  document.getElementById('endDate').value = today;
  document.getElementById('endTime').value = '17:00';
  document.getElementById('location').value = '';
  selectedEmployees = [];
  renderTags();
}

/* ─────────────────────────────────────────
   SAVE
───────────────────────────────────────── */
function saveRecord() {
  const topic = document.getElementById('topic').value;
  const startDate = document.getElementById('startDate').value;
  const startTime = document.getElementById('startTime').value;
  const endDate = document.getElementById('endDate').value;
  const endTime = document.getElementById('endTime').value;
  const location = document.getElementById('location').value;

  if (!topic || !startDate || !startTime || !endDate || !endTime || !location || !selectedEmployees.length) {
    showToast('⚠️ กรุณากรอกข้อมูลให้ครบถ้วน', true);
    return;
  }

  if (new Date(endDate) < new Date(startDate)) {
    showToast('⚠️ วันที่เสร็จต้องไม่มาก่อนวันที่เริ่ม', true);
    return;
  }

  logCounter++;
  const logNo = String(logCounter).padStart(3, '0');

  logs.unshift({
    logNo,
    topic,
    startDate,
    startTime,
    endDate,
    endTime,
    location,
    employees: [...selectedEmployees],
    savedAt: new Date().toLocaleString('th-TH'),
  });

  resetForm();
  renderLogs();
  showToast(`บันทึก LOG #${logNo} สำเร็จแล้ว`);
}

/* ─────────────────────────────────────────
   UPDATE
───────────────────────────────────────── */
function updateRecord() {
  if (!logToEdit) return;

  const topic = document.getElementById('topic').value;
  const startDate = document.getElementById('startDate').value;
  const startTime = document.getElementById('startTime').value;
  const endDate = document.getElementById('endDate').value;
  const endTime = document.getElementById('endTime').value;
  const location = document.getElementById('location').value;

  if (!topic || !startDate || !startTime || !endDate || !endTime || !location || !selectedEmployees.length) {
    showToast('⚠️ กรุณากรอกข้อมูลให้ครบถ้วน', true);
    return;
  }

  if (new Date(endDate) < new Date(startDate)) {
    showToast('⚠️ วันที่เสร็จต้องไม่มาก่อนวันที่เริ่ม', true);
    return;
  }

  const index = logs.findIndex(l => l.logNo === logToEdit);
  if (index !== -1) {
    logs[index] = {
      ...logs[index],
      topic,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
      employees: [...selectedEmployees],
      savedAt: new Date().toLocaleString('th-TH') + ' (แก้ไข)'
    };
  }

  const editedLogNo = logToEdit;  // เก็บก่อน reset

  resetForm();

  logToEdit = null;
  document.querySelector('.btn-primary').textContent = 'บันทึกข้อมูลการอบรม';
  document.querySelector('.btn-primary').onclick = saveRecord;
  renderLogs();
  switchTab('log');
  showToast(`อัปเดต LOG #${editedLogNo} สำเร็จแล้ว`);
}

/* ─────────────────────────────────────────
   LOG LIST
───────────────────────────────────────── */
function renderLogs() {
  const container = document.getElementById('logList');
  if (!logs.length) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📋</div>
        <div style="font-size:15px;font-weight:500;">ยังไม่มีข้อมูลการอบรม</div>
        <div style="font-size:13px;margin-top:6px;color:var(--text-tertiary);">บันทึกข้อมูลในแท็บ "บันทึกข้อมูล" ก่อนนะคะ</div>
      </div>`;
    return;
  }

  container.innerHTML = logs.map(log => `
    <div class="log-item" onclick="viewLog('${log.logNo}')">
      <div class="log-header">
        <div>
          <div class="log-no">LOG #${log.logNo}</div>
          <div class="log-date">${formatDateRange(log.startDate, log.endDate)}</div>
        </div>
        <div class="log-actions">
          <button class="action-btn" onclick="event.stopPropagation(); startEdit('${log.logNo}')">✏️</button>
          <button class="action-btn delete" onclick="event.stopPropagation(); requestDelete('${log.logNo}')">🗑️</button>
        </div>
      </div>
      <div class="log-topic">${log.topic}</div>
      <div class="log-meta">
        <span>🗓️ ${formatDateRange(log.startDate, log.endDate)}</span>
        <span>🕐 ${log.startTime} – ${log.endTime} น.</span>
        <span>📍 ${log.location.split('(')[0].trim()}</span>
        <span>👥 ${log.employees.length} คน</span>
      </div>
    </div>
  `).join('');
}

/* ─────────────────────────────────────────
   MODAL
───────────────────────────────────────── */
function viewLog(logNo) {
  const log = logs.find(l => l.logNo === logNo);
  if (!log) return;

  document.getElementById('modal-log-no').textContent = `LOG #${log.logNo}`;

  document.getElementById('modal-body').innerHTML = `
    <div class="detail-row">
      <div class="detail-label">หัวข้ออบรม</div>
      <div class="detail-value">${log.topic}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">ช่วงวันที่อบรม</div>
      <div class="detail-value">${formatDateRange(log.startDate, log.endDate)}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">เวลา</div>
      <div class="detail-value">${log.startTime} – ${log.endTime} น.</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">สถานที่</div>
      <div class="detail-value">${log.location}</div>
    </div>
    <div class="detail-row">
      <div class="detail-label">ผู้เข้าอบรม<br>(${log.employees.length} คน)</div>
      <div class="detail-value">
        <div class="attendee-chips">
          ${log.employees.map(e => `
            <div class="attendee-chip">${e.name} <span style="opacity:.5">${e.id}</span></div>
          `).join('')}
        </div>
      </div>
    </div>
    <div class="detail-row">
      <div class="detail-label">บันทึกเมื่อ</div>
      <div class="detail-value" style="color:var(--text-secondary);font-size:13px;">${log.savedAt}</div>
    </div>
  `;

  document.getElementById('modalOverlay').classList.add('show');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('show');
}

document.getElementById('modalOverlay').addEventListener('click', function(e) {
  if (e.target === this) closeModal();
});

/* ─────────────────────────────────────────
   TAB SWITCH
───────────────────────────────────────── */
function switchTab(tab) {
  document.getElementById('view-form').style.display = tab === 'form' ? 'block' : 'none';
  document.getElementById('view-log').style.display = tab === 'log' ? 'block' : 'none';
  document.getElementById('tab-form').classList.toggle('active', tab === 'form');
  document.getElementById('tab-log').classList.toggle('active', tab === 'log');
}

/* ─────────────────────────────────────────
   DELETE FUNCTIONS
───────────────────────────────────────── */
function requestDelete(logNo) {
  logToDelete = logNo;
  document.getElementById('confirmText').textContent =
    `คุณแน่ใจหรือไม่ที่จะลบ LOG #${logNo} ? การกระทำนี้ไม่สามารถกู้คืนได้`;
  document.getElementById('confirmDeleteModal').classList.add('show');
}

function cancelDelete() {
  logToDelete = null;
  document.getElementById('confirmDeleteModal').classList.remove('show');
}

function confirmDelete() {
  if (!logToDelete) return;
  const deletedNo = logToDelete;
  logs = logs.filter(l => l.logNo !== logToDelete);
  logToDelete = null;
  document.getElementById('confirmDeleteModal').classList.remove('show');
  renderLogs();
  showToast(`ลบ LOG #${deletedNo} สำเร็จแล้ว`);
}

/* ─────────────────────────────────────────
   EDIT FUNCTIONS
───────────────────────────────────────── */
function startEdit(logNo) {
  const log = logs.find(l => l.logNo === logNo);
  if (!log) return;
  logToEdit = logNo;

  document.getElementById('topic').value = log.topic;
  document.getElementById('startDate').value = log.startDate;
  document.getElementById('startTime').value = log.startTime;
  document.getElementById('endDate').value = log.endDate;
  document.getElementById('endTime').value = log.endTime;
  document.getElementById('location').value = log.location;
  selectedEmployees = [...log.employees];
  renderTags();

  switchTab('form');
  document.querySelector('.btn-primary').textContent = 'อัปเดตข้อมูลการอบรม';
  document.querySelector('.btn-primary').onclick = updateRecord;
}

/* ─────────────────────────────────────────
   INIT - ตั้งค่าเริ่มต้นฟอร์มตอนโหลดหน้าเว็บ
───────────────────────────────────────── */
resetForm();
renderLogs();

// เพิ่มฟังก์ชัน Load/Save LocalStorage
function saveToLocal() {
    localStorage.setItem('training_logs', JSON.stringify(logs));
    localStorage.setItem('log_counter', logCounter.toString());
}

function loadFromLocal() {
    const savedLogs = localStorage.getItem('training_logs');
    const savedCounter = localStorage.getItem('log_counter');
    if (savedLogs) logs = JSON.parse(savedLogs);
    if (savedCounter) logCounter = parseInt(savedCounter);
    renderLogs();
}

// แล้วเรียกใช้ saveToLocal() ทุกครั้งที่มีการบันทึก, แก้ไข หรือลบข้อมูล
// และเรียก loadFromLocal() ตอน INIT
