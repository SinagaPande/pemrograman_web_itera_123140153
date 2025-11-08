// Konstanta untuk localStorage key
const TASKS_KEY = 'tasks';

// State aplikasi
let tasks = [];
let currentEditId = null;
let filters = {
    status: '',
    course: ''
};

// DOM Elements
const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const statsElement = document.getElementById('stats');
const formTitle = document.getElementById('form-title');
const cancelBtn = document.getElementById('cancel-btn');
const statusFilter = document.getElementById('status-filter');
const courseFilter = document.getElementById('course-filter');
const clearFiltersBtn = document.getElementById('clear-filters');

// Inisialisasi aplikasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', initApp);

function initApp() {
    loadTasksFromStorage();
    renderTasks();
    updateStats();
    populateCourseFilter();
    
    // Set deadline default ke hari ini
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deadline').value = today;
    
    // Setup event listeners
    setupEventListeners();
}

function setupEventListeners() {
    taskForm.addEventListener('submit', handleFormSubmit);
    cancelBtn.addEventListener('click', handleCancel);
    statusFilter.addEventListener('change', handleStatusFilter);
    courseFilter.addEventListener('change', handleCourseFilter);
    clearFiltersBtn.addEventListener('click', handleClearFilters);
    
    // Event delegation untuk task actions
    taskList.addEventListener('click', handleTaskActions);
}

function handleTaskActions(e) {
    const target = e.target;
    const taskCard = target.closest('.task-card');
    
    if (!taskCard) return;
    
    const taskId = taskCard.dataset.id;
    
    if (target.classList.contains('btn-success') || target.classList.contains('btn-warning')) {
        toggleTaskStatus(taskId);
    } else if (target.classList.contains('btn-primary') && target.textContent === 'Edit') {
        editTask(taskId);
    } else if (target.classList.contains('btn-danger')) {
        deleteTaskHandler(taskId);
    }
}

// Fungsi untuk memuat tugas dari localStorage
function loadTasksFromStorage() {
    const storedTasks = localStorage.getItem(TASKS_KEY);
    if (storedTasks) {
        try {
            tasks = JSON.parse(storedTasks);
            // Pastikan setiap tugas memiliki struktur yang benar
            tasks = tasks.map(task => ({
                id: task.id || Date.now().toString(),
                name: task.name || '',
                course: task.course || '',
                deadline: task.deadline || '',
                completed: task.completed || false
            }));
        } catch (error) {
            console.error('Error parsing tasks from localStorage:', error);
            tasks = [];
        }
    }
}

// Fungsi untuk menyimpan tugas ke localStorage
function saveTasksToStorage() {
    try {
        localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
        // Bug Fix: Menambahkan error handling jika localStorage penuh 
        console.error('Gagal menyimpan ke localStorage:', error);
        alert('Penyimpanan gagal. Data mungkin terlalu besar atau browser menolak akses.');
    }
}

// Fungsi untuk menambahkan tugas baru
function addTask(taskData) {
    const newTask = {
        id: Date.now().toString(),
        name: taskData.name.trim(),
        course: taskData.course.trim(),
        deadline: taskData.deadline,
        completed: false
    };
    tasks.push(newTask);
    saveTasksToStorage();
    // Memanggil populateCourseFilter setelah menambahkan/mengubah task untuk memperbarui filter
    populateCourseFilter(); 
}

// Fungsi untuk memperbarui tugas yang sudah ada
function updateTask(id, updatedData) {
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updatedData
        };
        saveTasksToStorage();
        // Memanggil populateCourseFilter setelah menambahkan/mengubah task untuk memperbarui filter
        populateCourseFilter();
    }
}

// Fungsi untuk menghapus tugas
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasksToStorage();
    // Memanggil populateCourseFilter setelah menghapus task untuk memperbarui filter
    populateCourseFilter();
}

// Fungsi untuk mengganti status selesai/belum selesai
function toggleTaskStatus(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasksToStorage();
        renderTasks();
        updateStats();
    }
}

// Fungsi untuk memvalidasi form
function validateForm(formData) {
    const errors = [];
    
    if (!formData.name.trim()) {
        errors.push('Nama tugas tidak boleh kosong');
    }
    
    if (!formData.course.trim()) {
        errors.push('Mata kuliah harus diisi');
    }
    
    if (!formData.deadline) {
        errors.push('Deadline harus diisi');
    } else {
        const deadlineDate = new Date(formData.deadline);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        deadlineDate.setHours(0, 0, 0, 0);
        
        if (deadlineDate < today) {
            errors.push('Deadline tidak boleh tanggal di masa lalu');
        }
    }
    
    return errors;
}

// Fungsi untuk merender daftar tugas
function renderTasks() {
    // Hapus: console.log debugging [cite: 85, 86, 87]
    
    // Handle empty state ketika tidak ada tugas sama sekali
    if (tasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state"><p>Belum ada tugas. Tambahkan tugas pertama Anda!</p></div>';
        return;
    }
    
    // Filter tugas berdasarkan filter yang aktif
    let filteredTasks = tasks;
    
    // Hapus: console.log debugging [cite: 85, 86, 87]
    
    // Filter berdasarkan status
    if (filters.status === 'completed') {
        filteredTasks = filteredTasks.filter(task => task.completed === true);
        // Hapus: console.log debugging [cite: 85, 86, 87]
    } else if (filters.status === 'pending') {
        filteredTasks = filteredTasks.filter(task => task.completed === false);
        // Hapus: console.log debugging [cite: 85, 86, 87]
    }
    
    // Filter berdasarkan mata kuliah
    if (filters.course) {
        filteredTasks = filteredTasks.filter(task => 
            task.course.toLowerCase() === filters.course.toLowerCase()
        );
    }
    
    // Hapus: console.log debugging [cite: 85, 86, 87]
    
    // Handle empty state setelah filtering
    if (filteredTasks.length === 0) {
        taskList.innerHTML = '<div class="empty-state"><p>Belum ada tugas yang sesuai dengan filter.</p></div>';
        return;
    }
    
    // Render tasks
    taskList.innerHTML = filteredTasks.map(task => {
        const deadlineDate = new Date(task.deadline);
        const today = new Date();
        
        // Reset waktu untuk perhitungan hari
        deadlineDate.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        
        const timeDiff = deadlineDate.getTime() - today.getTime();
        // Bug Fix: Gunakan Math.floor untuk perhitungan hari yang lebih akurat 
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24)); 
        
        const formattedDate = deadlineDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Tentukan class dan text untuk deadline
        const isUrgent = !task.completed && daysDiff <= 3 && daysDiff >= 0; 
        let deadlineClass = 'task-deadline';
        let deadlineText = formattedDate;

        if (!task.completed && daysDiff < 0) {
            // Tugas Terlewat
            deadlineText = `${formattedDate} (TERLEWAT! ${Math.abs(daysDiff)} hari lalu)`;
            deadlineClass = 'task-deadline urgent';
        } else if (isUrgent) {
            // Tugas Urgent
            deadlineClass = 'task-deadline urgent';
            if (daysDiff === 0) {
                deadlineText = `${formattedDate} (Hari Ini!)`;
            } else if (daysDiff === 1) {
                deadlineText = `${formattedDate} (Besok!)`;
            } else {
                deadlineText = `${formattedDate} (${daysDiff} hari lagi!)`;
            }
        }
        
        return `
            <div class="task-card ${task.completed ? 'completed' : 'pending'}" data-id="${task.id}">
                <div class="task-header">
                    <div class="task-title">
                        ${task.name}
                        <span class="task-status ${task.completed ? 'status-completed' : 'status-pending'}">
                            ${task.completed ? 'SELESAI' : 'BELUM SELESAI'}
                        </span>
                        ${isUrgent ? '<span class="task-priority">PRIORITAS!</span>' : ''}
                    </div>
                </div>
                <div class="task-meta">
                    <span><strong>Mata Kuliah:</strong> ${task.course}</span>
                    <span class="${deadlineClass}"><strong>Deadline:</strong> ${deadlineText}</span>
                </div>
                <div class="task-actions">
                    <button class="btn btn-${task.completed ? 'warning' : 'success'}">
                        ${task.completed ? 'Tandai Belum Selesai' : 'Tandai Selesai'}
                    </button>
                    <button class="btn btn-primary">Edit</button>
                    <button class="btn btn-danger">Hapus</button>
                </div>
            </div>
        `;
    }).join('');
}

// Fungsi untuk memperbarui statistik
function updateStats() {
    const totalTasks = tasks.length;
    const pendingTasks = tasks.filter(task => !task.completed).length;
    const completedTasks = totalTasks - pendingTasks;
    
    statsElement.innerHTML = `
        <strong>Total:</strong> ${totalTasks} | 
        <strong>Belum Selesai:</strong> ${pendingTasks} | 
        <strong>Selesai:</strong> ${completedTasks}
    `;
}

// Fungsi untuk mengisi opsi filter mata kuliah
function populateCourseFilter() {
    const uniqueCourses = [...new Set(tasks.map(task => task.course))].sort();
    let options = '<option value="">Semua Mata Kuliah</option>';
    uniqueCourses.forEach(course => {
        const selected = filters.course === course ? 'selected' : '';
        options += `<option value="${course}" ${selected}>${course}</option>`;
    });
    courseFilter.innerHTML = options;
}

// Event Handlers
function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('task-name').value,
        course: document.getElementById('course').value,
        deadline: document.getElementById('deadline').value
    };
    
    const errors = validateForm(formData);
    
    if (errors.length > 0) {
        alert('Error:\n' + errors.join('\n'));
        return;
    }
    
    if (currentEditId) {
        updateTask(currentEditId, formData);
        currentEditId = null;
        formTitle.textContent = 'Tambah Tugas Baru';
        cancelBtn.style.display = 'none';
    } else {
        addTask(formData);
    }
    
    taskForm.reset();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deadline').value = today;
    
    renderTasks();
    updateStats();
    // Hapus: Pemanggilan populateCourseFilter() redundan di sini karena sudah dipanggil di addTask/updateTask
}

function handleCancel() {
    currentEditId = null;
    taskForm.reset();
    formTitle.textContent = 'Tambah Tugas Baru';
    cancelBtn.style.display = 'none';
    // Bug Fix: Kembalikan deadline ke nilai default (hari ini) saat cancel 
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('deadline').value = today;
}

function handleStatusFilter() {
    // Bug Fix: Menambahkan validasi nilai filter 
    const validStatuses = ['', 'completed', 'pending'];
    filters.status = validStatuses.includes(statusFilter.value) ? statusFilter.value : '';
    // Hapus: console.log debugging [cite: 85, 86, 87]
    renderTasks();
}

function handleCourseFilter() {
    filters.course = courseFilter.value;
    renderTasks();
}

function handleClearFilters() {
    statusFilter.value = '';
    courseFilter.value = '';
    filters.status = '';
    filters.course = '';
    renderTasks();
    populateCourseFilter();
}

// Fungsi global untuk edit tugas
window.editTask = function(id) {
    const task = tasks.find(task => task.id === id);
    if (task) {
        currentEditId = id;
        document.getElementById('task-name').value = task.name;
        document.getElementById('course').value = task.course;
        document.getElementById('deadline').value = task.deadline;
        formTitle.textContent = 'Edit Tugas';
        cancelBtn.style.display = 'inline-block';
        
        // Scroll ke form
        document.querySelector('.form-container').scrollIntoView({ behavior: 'smooth' });
    }
};

// Fungsi global untuk menghapus tugas
window.deleteTaskHandler = function(id) {
    if (confirm('Apakah Anda yakin ingin menghapus tugas ini?')) {
        deleteTask(id);
        renderTasks();
        updateStats();
        // Hapus: Pemanggilan populateCourseFilter() redundan di sini karena sudah dipanggil di deleteTask
    }
};