// Class untuk mengelola data tugas
class Task {
    constructor(id, title, description, dueDate, priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.createdAt = new Date().toISOString();
    }
}

// Class untuk mengelola data catatan
class Note {
    constructor(id, title, content) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = new Date().toISOString();
    }
}

// Konstanta untuk elemen DOM
const themeToggle = document.getElementById('themeToggle');
const taskList = document.getElementById('taskList');
const noteList = document.getElementById('noteList');
const addTaskBtn = document.getElementById('addTaskBtn');
const addNoteBtn = document.getElementById('addNoteBtn');
const taskModal = document.getElementById('taskModal');
const noteModal = document.getElementById('noteModal');
const confirmModal = document.getElementById('confirmModal');
const closeTaskModal = document.getElementById('closeTaskModal');
const closeNoteModal = document.getElementById('closeNoteModal');
const closeConfirmModal = document.getElementById('closeConfirmModal');
const taskForm = document.getElementById('taskForm');
const noteForm = document.getElementById('noteForm');
const deleteTaskBtn = document.getElementById('deleteTaskBtn');
const deleteNoteBtn = document.getElementById('deleteNoteBtn');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const confirmMessage = document.getElementById('confirmMessage');

// Variabel untuk menyimpan item yang akan dihapus
let itemToDelete = null;
let deleteType = null; // 'task' atau 'note'

// Fungsi untuk memuat data dari localStorage
const loadData = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    return { tasks, notes };
};

// Fungsi untuk menyimpan data ke localStorage
const saveData = (data) => {
    localStorage.setItem('tasks', JSON.stringify(data.tasks));
    localStorage.setItem('notes', JSON.stringify(data.notes));
};

// Arrow function untuk memformat tanggal
const formatDate = (dateString) => {
    if (!dateString) return 'Tidak ada tanggal';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
};

// Arrow function untuk memformat waktu
const formatTime = (date) => {
    return date.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
};

// Arrow function untuk memformat tanggal penuh
const formatFullDate = (date) => {
    return date.toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

// Fungsi untuk menampilkan toast notification
const showToast = (message, type = 'success') => {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-circle';
    if (type === 'warning') icon = 'fas fa-exclamation-triangle';
    
    toast.innerHTML = `
        <i class="${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Tampilkan toast
    setTimeout(() => toast.classList.add('show'), 100);
    
    // Sembunyikan dan hapus toast setelah 3 detik
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
};

// Fungsi untuk memperbarui jam digital
const updateClock = () => {
    const now = new Date();
    document.getElementById('currentTime').textContent = formatTime(now);
    document.getElementById('currentDate').textContent = formatFullDate(now);
};

// Fungsi untuk memuat data cuaca
const loadWeatherData = async () => {
    try {
        // Menampilkan loading state
        document.getElementById('weatherLocation').innerHTML = '<div class="loading"></div> Memuat lokasi...';
        document.getElementById('weatherTemp').textContent = '--°C';
        document.getElementById('weatherDescription').textContent = 'Memuat cuaca...';
        
        // Simulasi loading
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Menggunakan data mock untuk demo
        const mockWeather = {
            location: "Jakarta, Indonesia",
            temp: "28°C",
            description: "Cerah Berawan"
        };
        
        document.getElementById('weatherLocation').textContent = mockWeather.location;
        document.getElementById('weatherTemp').textContent = mockWeather.temp;
        document.getElementById('weatherDescription').textContent = mockWeather.description;
        
        showToast('Data cuaca berhasil dimuat', 'success');
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        document.getElementById('weatherLocation').textContent = "Gagal memuat cuaca";
        document.getElementById('weatherTemp').textContent = "--°C";
        document.getElementById('weatherDescription').textContent = "Coba lagi nanti";
        showToast('Gagal memuat data cuaca', 'error');
    }
};

// Fungsi untuk merender daftar tugas
const renderTasks = (tasks) => {
    if (tasks.length === 0) {
        taskList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-tasks"></i>
                <p>Belum ada tugas. Tambahkan tugas baru!</p>
            </div>
        `;
        return;
    }

    taskList.innerHTML = tasks.map(task => `
        <div class="task-item" data-id="${task.id}">
            <div class="task-header">
                <div>
                    <div class="task-title">${task.title}</div>
                    <div class="task-date">${formatDate(task.dueDate)}</div>
                </div>
                <span class="priority-badge priority-${task.priority}">${task.priority === 'low' ? 'Rendah' : task.priority === 'medium' ? 'Sedang' : 'Tinggi'}</span>
            </div>
            <div class="task-description">${task.description || ''}</div>
            <div class="task-actions">
                <button class="btn btn-sm btn-primary edit-task" data-id="${task.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger delete-task" data-id="${task.id}">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        </div>
    `).join('');
};

// Fungsi untuk merender daftar catatan
const renderNotes = (notes) => {
    if (notes.length === 0) {
        noteList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-sticky-note"></i>
                <p>Belum ada catatan. Tambahkan catatan baru!</p>
            </div>
        `;
        return;
    }

    noteList.innerHTML = notes.map(note => `
        <div class="note-item" data-id="${note.id}">
            <div class="note-header">
                <div class="note-title">${note.title}</div>
                <div class="note-date">${formatDate(note.createdAt)}</div>
            </div>
            <div class="note-content">${note.content}</div>
            <div class="note-actions">
                <button class="btn btn-sm btn-primary edit-note" data-id="${note.id}">
                    <i class="fas fa-edit"></i> Edit
                </button>
                <button class="btn btn-sm btn-danger delete-note" data-id="${note.id}">
                    <i class="fas fa-trash"></i> Hapus
                </button>
            </div>
        </div>
    `).join('');
};

// Fungsi untuk membuka modal tugas
const openTaskModal = (task = null) => {
    document.getElementById('taskModalTitle').textContent = task ? 'Edit Tugas' : 'Tambah Tugas Baru';
    document.getElementById('taskId').value = task ? task.id : '';
    document.getElementById('taskTitle').value = task ? task.title : '';
    document.getElementById('taskDescription').value = task ? task.description : '';
    document.getElementById('taskDueDate').value = task && task.dueDate ? task.dueDate.split('T')[0] : '';
    document.getElementById('taskPriority').value = task ? task.priority : 'medium';
    deleteTaskBtn.style.display = task ? 'inline-block' : 'none';
    taskModal.style.display = 'flex';
    
    // Set minimum date untuk input tanggal (hari ini)
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('taskDueDate').min = today;
};

// Fungsi untuk membuka modal catatan
const openNoteModal = (note = null) => {
    document.getElementById('noteModalTitle').textContent = note ? 'Edit Catatan' : 'Tambah Catatan Baru';
    document.getElementById('noteId').value = note ? note.id : '';
    document.getElementById('noteTitle').value = note ? note.title : '';
    document.getElementById('noteContent').value = note ? note.content : '';
    deleteNoteBtn.style.display = note ? 'inline-block' : 'none';
    noteModal.style.display = 'flex';
};

// Fungsi untuk membuka modal konfirmasi
const openConfirmModal = (type, id, title) => {
    deleteType = type;
    itemToDelete = id;
    
    const itemType = type === 'task' ? 'tugas' : 'catatan';
    confirmMessage.textContent = `Apakah Anda yakin ingin menghapus ${itemType} "${title}"?`;
    confirmModal.style.display = 'flex';
};

// Fungsi untuk menutup modal
const closeModal = (modal) => {
    modal.style.display = 'none';
    taskForm.reset();
    noteForm.reset();
};

// Fungsi untuk mengganti tema
const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    showToast(`Mode ${document.body.classList.contains('dark-mode') ? 'gelap' : 'terang'} diaktifkan`);
};

// Inisialisasi aplikasi
const initApp = () => {
    // Muat tema dari localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Muat data dari localStorage
    const { tasks, notes } = loadData();
    renderTasks(tasks);
    renderNotes(notes);

    // Muat data cuaca
    loadWeatherData();

    // Mulai jam digital
    updateClock();
    setInterval(updateClock, 1000);

    // Event listeners
    themeToggle.addEventListener('click', toggleTheme);
    addTaskBtn.addEventListener('click', () => openTaskModal());
    addNoteBtn.addEventListener('click', () => openNoteModal());
    closeTaskModal.addEventListener('click', () => closeModal(taskModal));
    closeNoteModal.addEventListener('click', () => closeModal(noteModal));
    closeConfirmModal.addEventListener('click', () => closeModal(confirmModal));
    cancelDeleteBtn.addEventListener('click', () => closeModal(confirmModal));

    // Event listener untuk form tugas
    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('taskId').value;
        const title = document.getElementById('taskTitle').value;
        const description = document.getElementById('taskDescription').value;
        const dueDate = document.getElementById('taskDueDate').value;
        const priority = document.getElementById('taskPriority').value;

        // Validasi tanggal
        if (dueDate) {
            const selectedDate = new Date(dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            
            if (selectedDate < today) {
                showToast('Tanggal jatuh tempo tidak boleh di masa lalu', 'warning');
                return;
            }
        }

        const { tasks, notes } = loadData();
        
        if (id) {
            // Update existing task
            const taskIndex = tasks.findIndex(t => t.id === id);
            if (taskIndex !== -1) {
                tasks[taskIndex] = new Task(id, title, description, dueDate, priority);
                showToast('Tugas berhasil diperbarui', 'success');
            }
        } else {
            // Add new task
            const newTask = new Task(Date.now().toString(), title, description, dueDate, priority);
            tasks.push(newTask);
            showToast('Tugas berhasil ditambahkan', 'success');
        }
        
        saveData({ tasks, notes });
        renderTasks(tasks);
        closeModal(taskModal);
    });

    // Event listener untuk form catatan
    noteForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = document.getElementById('noteId').value;
        const title = document.getElementById('noteTitle').value;
        const content = document.getElementById('noteContent').value;

        const { tasks, notes } = loadData();
        
        if (id) {
            // Update existing note
            const noteIndex = notes.findIndex(n => n.id === id);
            if (noteIndex !== -1) {
                notes[noteIndex] = new Note(id, title, content);
                showToast('Catatan berhasil diperbarui', 'success');
            }
        } else {
            // Add new note
            const newNote = new Note(Date.now().toString(), title, content);
            notes.push(newNote);
            showToast('Catatan berhasil ditambahkan', 'success');
        }
        
        saveData({ tasks, notes });
        renderNotes(notes);
        closeModal(noteModal);
    });

    // Event delegation untuk tombol edit dan hapus
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-task') || e.target.closest('.edit-task')) {
            const taskId = e.target.closest('.edit-task').dataset.id;
            const { tasks } = loadData();
            const task = tasks.find(t => t.id === taskId);
            openTaskModal(task);
        }
        
        if (e.target.classList.contains('delete-task') || e.target.closest('.delete-task')) {
            const taskId = e.target.closest('.delete-task').dataset.id;
            const { tasks } = loadData();
            const task = tasks.find(t => t.id === taskId);
            openConfirmModal('task', taskId, task.title);
        }
    });

    noteList.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-note') || e.target.closest('.edit-note')) {
            const noteId = e.target.closest('.edit-note').dataset.id;
            const { notes } = loadData();
            const note = notes.find(n => n.id === noteId);
            openNoteModal(note);
        }
        
        if (e.target.classList.contains('delete-note') || e.target.closest('.delete-note')) {
            const noteId = e.target.closest('.delete-note').dataset.id;
            const { notes } = loadData();
            const note = notes.find(n => n.id === noteId);
            openConfirmModal('note', noteId, note.title);
        }
    });

    // Event listener untuk tombol hapus di modal
    deleteTaskBtn.addEventListener('click', () => {
        const id = document.getElementById('taskId').value;
        if (id) {
            const { tasks } = loadData();
            const task = tasks.find(t => t.id === id);
            openConfirmModal('task', id, task.title);
        }
    });

    deleteNoteBtn.addEventListener('click', () => {
        const id = document.getElementById('noteId').value;
        if (id) {
            const { notes } = loadData();
            const note = notes.find(n => n.id === id);
            openConfirmModal('note', id, note.title);
        }
    });

    // Event listener untuk konfirmasi penghapusan
    confirmDeleteBtn.addEventListener('click', () => {
        if (deleteType === 'task' && itemToDelete) {
            const { tasks, notes } = loadData();
            const updatedTasks = tasks.filter(t => t.id !== itemToDelete);
            saveData({ tasks: updatedTasks, notes });
            renderTasks(updatedTasks);
            showToast('Tugas berhasil dihapus', 'success');
        } else if (deleteType === 'note' && itemToDelete) {
            const { tasks, notes } = loadData();
            const updatedNotes = notes.filter(n => n.id !== itemToDelete);
            saveData({ tasks, notes: updatedNotes });
            renderNotes(updatedNotes);
            showToast('Catatan berhasil dihapus', 'success');
        }
        
        closeModal(confirmModal);
        itemToDelete = null;
        deleteType = null;
    });

    // Tutup modal saat klik di luar konten
    window.addEventListener('click', (e) => {
        if (e.target === taskModal) closeModal(taskModal);
        if (e.target === noteModal) closeModal(noteModal);
        if (e.target === confirmModal) closeModal(confirmModal);
    });
};

// Jalankan aplikasi saat DOM siap
document.addEventListener('DOMContentLoaded', initApp);