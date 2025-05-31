import { saveProject, getCurrentProject } from './storage.js';

// Task templates for different business types
const TASK_TEMPLATES = {
    ecommerce: [
        { description: "Investigar competencia en el mercado", priority: "high" },
        { description: "Definir modelo de negocio y fuentes de ingresos", priority: "high" },
        { description: "Registrar dominio y hosting", priority: "medium" },
        { description: "Diseñar logo e identidad de marca", priority: "medium" },
        { description: "Desarrollar sitio web o tienda online", priority: "high" },
        { description: "Configurar pasarela de pagos", priority: "high" },
        { description: "Crear políticas de privacidad y términos de servicio", priority: "medium" },
        { description: "Plan de marketing digital inicial", priority: "high" },
        { description: "Establecer proveedores y logística", priority: "high" },
        { description: "Lanzamiento inicial (MVP)", priority: "high" }
    ],
    local: [
        { description: "Estudio de mercado local", priority: "high" },
        { description: "Definir ubicación física (si aplica)", priority: "high" },
        { description: "Tramitar permisos y licencias municipales", priority: "high" },
        { description: "Registro legal de la empresa", priority: "high" },
        { description: "Diseñar identidad visual y materiales", priority: "medium" },
        { description: "Contratar personal inicial (si aplica)", priority: "medium" },
        { description: "Desarrollar plan de marketing local", priority: "high" },
        { description: "Adquirir equipos y mobiliario", priority: "medium" },
        { description: "Crear materiales promocionales", priority: "medium" },
        { description: "Evento de lanzamiento", priority: "high" }
    ],
    saas: [
        { description: "Validar idea con usuarios potenciales", priority: "high" },
        { description: "Definir modelo de suscripción y precios", priority: "high" },
        { description: "Desarrollar prototipo funcional (MVP)", priority: "high" },
        { description: "Configurar infraestructura en la nube", priority: "high" },
        { description: "Implementar sistema de autenticación y pagos", priority: "high" },
        { description: "Crear documentación para desarrolladores", priority: "medium" },
        { description: "Programa beta con usuarios reales", priority: "high" },
        { description: "Desarrollar estrategia de adquisición de clientes", priority: "high" },
        { description: "Plan de soporte y atención al cliente", priority: "medium" },
        { description: "Lanzamiento público", priority: "high" }
    ],
    manufacturing: [
        { description: "Investigación y desarrollo de producto", priority: "high" },
        { description: "Prototipado y pruebas", priority: "high" },
        { description: "Selección de materiales y proveedores", priority: "high" },
        { description: "Diseño de procesos de producción", priority: "high" },
        { description: "Adquisición de maquinaria y equipos", priority: "high" },
        { description: "Certificaciones y cumplimiento normativo", priority: "high" },
        { description: "Desarrollo de embalaje y logística", priority: "medium" },
        { description: "Pruebas de producción a pequeña escala", priority: "high" },
        { description: "Estrategia de distribución y ventas", priority: "high" },
        { description: "Lanzamiento de producción a gran escala", priority: "high" }
    ],
    consulting: [
        { description: "Definir nicho y servicios ofrecidos", priority: "high" },
        { description: "Establecer estructura de precios y paquetes", priority: "high" },
        { description: "Crear materiales de presentación y portafolio", priority: "high" },
        { description: "Desarrollar sitio web profesional", priority: "medium" },
        { description: "Crear perfiles en redes sociales profesionales", priority: "medium" },
        { description: "Diseñar propuesta de valor única", priority: "high" },
        { description: "Plan de networking y generación de leads", priority: "high" },
        { description: "Desarrollar contratos y acuerdos de servicio", priority: "high" },
        { description: "Sistema de seguimiento de clientes y proyectos", priority: "medium" },
        { description: "Lanzar servicio con primeros clientes piloto", priority: "high" }
    ]
};

export function initializeTasks(tasks) {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    if (!tasks || tasks.length === 0) {
        taskList.innerHTML = '<li class="empty-state">No hay tareas aún. Agrega tu primera tarea.</li>';
        return;
    }
    
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
    
    // Initialize task board columns
    updateTaskBoard(tasks);
}

export function addTask(task) {
    const project = getCurrentProject() || {};
    project.tasks = project.tasks || [];
    project.tasks.push(task);
    saveProject(project);
    
    addTaskToDOM(task);
    updateTaskBoard(project.tasks);
}

export function updateTask(taskId, updatedTask) {
    const project = getCurrentProject();
    if (!project || !project.tasks) return;
    
    const taskIndex = project.tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        project.tasks[taskIndex] = { ...project.tasks[taskIndex], ...updatedTask };
        saveProject(project);
        
        // Update DOM
        const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
        if (taskElement) {
            updateTaskElement(taskElement, project.tasks[taskIndex]);
        }
        
        updateTaskBoard(project.tasks);
    }
}

export function deleteTask(taskId) {
    const project = getCurrentProject();
    if (!project || !project.tasks) return;
    
    project.tasks = project.tasks.filter(t => t.id !== taskId);
    saveProject(project);
    
    // Remove from DOM
    const taskElement = document.querySelector(`.task-item[data-id="${taskId}"]`);
    if (taskElement) {
        taskElement.remove();
    }
    
    updateTaskBoard(project.tasks);
}

export function generateRecommendedTasks(businessType) {
    const templates = TASK_TEMPLATES[businessType] || [];
    const taskTemplatesContainer = document.getElementById('taskTemplates');
    taskTemplatesContainer.innerHTML = '';
    taskTemplatesContainer.classList.remove('hidden');
    
    if (templates.length === 0) {
        taskTemplatesContainer.innerHTML = '<p>No hay plantillas disponibles para este tipo de negocio.</p>';
        return;
    }
    
    const header = document.createElement('div');
    header.className = 'template-header';
    header.innerHTML = `
        <h4>Tareas recomendadas para ${businessType}</h4>
        <button id="addAllTasks" class="btn-secondary">Agregar todas</button>
    `;
    taskTemplatesContainer.appendChild(header);
    
    const templateList = document.createElement('ul');
    templateList.className = 'template-list';
    
    templates.forEach((template, index) => {
        const li = document.createElement('li');
        li.className = 'template-item';
        li.innerHTML = `
            <span>${template.description} (${getPriorityText(template.priority)})</span>
            <button class="add-template-btn" data-index="${index}">
                <i class="fas fa-plus"></i> Agregar
            </button>
        `;
        templateList.appendChild(li);
    });
    
    taskTemplatesContainer.appendChild(templateList);
    
    // Add event listeners
    document.querySelectorAll('.add-template-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index') || 
                         e.target.parentElement.getAttribute('data-index');
            addTaskFromTemplate(templates[index]);
        });
    });
    
    document.getElementById('addAllTasks').addEventListener('click', () => {
        templates.forEach(template => addTaskFromTemplate(template));
        taskTemplatesContainer.classList.add('hidden');
    });
}

function addTaskFromTemplate(template) {
    const newTask = {
        id: Date.now().toString(),
        description: template.description,
        priority: template.priority,
        status: 'pending',
        notes: '',
        dueDate: getDefaultDueDate(template.priority)
    };
    
    addTask(newTask);
}

function getDefaultDueDate(priority) {
    const today = new Date();
    let daysToAdd;
    
    switch (priority) {
        case 'high': daysToAdd = 7; break; // 1 week
        case 'medium': daysToAdd = 14; break; // 2 weeks
        case 'low': daysToAdd = 30; break; // 1 month
        default: daysToAdd = 14;
    }
    
    today.setDate(today.getDate() + daysToAdd);
    return today.toISOString().split('T')[0];
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('taskList');
    const emptyState = taskList.querySelector('.empty-state');
    
    if (emptyState) {
        emptyState.remove();
    }
    
    const li = document.createElement('li');
    li.className = `task-item ${task.priority} ${task.status === 'completed' ? 'completed' : ''}`;
    li.setAttribute('data-id', task.id);
    
    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" ${task.status === 'completed' ? 'checked' : ''}>
            <span class="task-text">${task.description}</span>
        </div>
        <div class="task-meta">
            <span class="task-priority ${task.priority}">${getPriorityText(task.priority)}</span>
            ${task.dueDate ? `<span class="task-due">${formatDate(task.dueDate)}</span>` : ''}
        </div>
        <div class="task-actions">
            <button class="edit-btn"><i class="fas fa-edit"></i></button>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;
    
    // Add event listeners
    const checkbox = li.querySelector('input[type="checkbox"]');
    checkbox.addEventListener('change', () => {
        updateTask(task.id, {
            status: checkbox.checked ? 'completed' : 'pending'
        });
    });
    
    li.querySelector('.edit-btn').addEventListener('click', () => showEditTaskModal(task));
    li.querySelector('.delete-btn').addEventListener('click', () => {
        if (confirm('¿Estás seguro de eliminar esta tarea?')) {
            deleteTask(task.id);
        }
    });
    
    taskList.appendChild(li);
}

function updateTaskElement(element, task) {
    element.className = `task-item ${task.priority} ${task.status === 'completed' ? 'completed' : ''}`;
    
    const checkbox = element.querySelector('input[type="checkbox"]');
    checkbox.checked = task.status === 'completed';
    
    element.querySelector('.task-text').textContent = task.description;
    element.querySelector('.task-priority').textContent = getPriorityText(task.priority);
    element.querySelector('.task-priority').className = `task-priority ${task.priority}`;
    
    const dueDateElement = element.querySelector('.task-due');
    if (task.dueDate) {
        if (!dueDateElement) {
            const metaElement = element.querySelector('.task-meta');
            const newDueDateElement = document.createElement('span');
            newDueDateElement.className = 'task-due';
            newDueDateElement.textContent = formatDate(task.dueDate);
            metaElement.appendChild(newDueDateElement);
        } else {
            dueDateElement.textContent = formatDate(task.dueDate);
        }
    } else if (dueDateElement) {
        dueDateElement.remove();
    }
}

function showEditTaskModal(task) {
    // In a real app, this would show a modal with a form to edit the task
    // For simplicity, we'll just prompt for new description
    const newDesc = prompt('Editar descripción de la tarea:', task.description);
    if (newDesc && newDesc !== task.description) {
        updateTask(task.id, { description: newDesc });
    }
}

function updateTaskBoard(tasks) {
    const pendingTasks = tasks.filter(t => t.status === 'pending');
    const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
    const completedTasks = tasks.filter(t => t.status === 'completed');
    
    renderTaskColumn('pendingTasks', pendingTasks);
    renderTaskColumn('inProgressTasks', inProgressTasks);
    renderTaskColumn('completedTasks', completedTasks);
    
    // Make tasks draggable
    setupDragAndDrop();
}

function renderTaskColumn(columnId, tasks) {
    const column = document.getElementById(columnId);
    column.innerHTML = '';
    
    if (tasks.length === 0) {
        column.innerHTML = '<li class="empty-column">No hay tareas</li>';
        return;
    }
    
    tasks.forEach(task => {
        const card = document.createElement('li');
        card.className = 'task-card';
        card.setAttribute('data-id', task.id);
        card.setAttribute('draggable', 'true');
        
        card.innerHTML = `
            <h4>
                ${task.description}
                <span class="task-priority ${task.priority}">${getPriorityText(task.priority).charAt(0)}</span>
            </h4>
            ${task.dueDate ? `<span class="task-due">${formatDate(task.dueDate)}</span>` : ''}
            <button class="view-details-btn">Ver detalles</button>
        `;
        
        card.querySelector('.view-details-btn').addEventListener('click', () => {
            showTaskDetails(task);
        });
        
        column.appendChild(card);
    });
}

function setupDragAndDrop() {
    const cards = document.querySelectorAll('.task-card');
    const columns = document.querySelectorAll('.task-column');
    
    cards.forEach(card => {
        card.addEventListener('dragstart', dragStart);
        card.addEventListener('dragend', dragEnd);
    });
    
    columns.forEach(column => {
        column.addEventListener('dragover', dragOver);
        column.addEventListener('dragenter', dragEnter);
        column.addEventListener('dragleave', dragLeave);
        column.addEventListener('drop', dragDrop);
    });
    
    let draggedItem = null;
    
    function dragStart() {
        draggedItem = this;
        setTimeout(() => {
            this.style.opacity = '0.5';
        }, 0);
    }
    
    function dragEnd() {
        this.style.opacity = '1';
    }
    
    function dragOver(e) {
        e.preventDefault();
    }
    
    function dragEnter(e) {
        e.preventDefault();
        this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
    }
    
    function dragLeave() {
        this.style.backgroundColor = '';
    }
    
    function dragDrop() {
        this.style.backgroundColor = '';
        
        if (draggedItem) {
            const newStatus = this.parentElement.getAttribute('data-status');
            const taskId = draggedItem.getAttribute('data-id');
            
            updateTask(taskId, { status: newStatus });
        }
    }
}

function showTaskDetails(task) {
    const detailContent = document.getElementById('detailContent');
    const taskDetails = document.getElementById('taskDetails');
    
    detailContent.innerHTML = `
        <h4>${task.description}</h4>
        <div class="detail-row">
            <span class="detail-label">Prioridad:</span>
            <span class="detail-value ${task.priority}">${getPriorityText(task.priority)}</span>
        </div>
        <div class="detail-row">
            <span class="detail-label">Estado:</span>
            <span class="detail-value">${getStatusText(task.status)}</span>
        </div>
        ${task.dueDate ? `
        <div class="detail-row">
            <span class="detail-label">Fecha límite:</span>
            <span class="detail-value">${formatDate(task.dueDate)}</span>
        </div>
        ` : ''}
        <div class="detail-row full-width">
            <span class="detail-label">Notas:</span>
            <textarea id="taskNotes">${task.notes || ''}</textarea>
        </div>
        <button id="saveNotes" class="btn-primary">Guardar Notas</button>
    `;
    
    document.getElementById('saveNotes').addEventListener('click', () => {
        const notes = document.getElementById('taskNotes').value;
        updateTask(task.id, { notes });
    });
    
    taskDetails.classList.remove('hidden');
}

function getPriorityText(priority) {
    switch (priority) {
        case 'high': return 'Alta';
        case 'medium': return 'Media';
        case 'low': return 'Baja';
        default: return priority;
    }
}

function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Pendiente';
        case 'in-progress': return 'En Progreso';
        case 'completed': return 'Completado';
        default: return status;
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
}