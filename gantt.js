import { getCurrentProject } from './storage.js';

let ganttChartInstance = null;
let progressChartInstance = null;

export function initializeGanttChart(tasks) {
    if (!tasks || tasks.length === 0) return;
    
    const ctx = document.getElementById('ganttChart').getContext('2d');
    if (ganttChartInstance) {
        ganttChartInstance.destroy();
    }
    
    // Prepare data for Gantt chart
    const ganttData = prepareGanttData(tasks);
    
    ganttChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ganttData.labels,
            datasets: [{
                label: 'Tareas',
                data: ganttData.data,
                backgroundColor: ganttData.colors,
                borderColor: ganttData.borderColors,
                borderWidth: 1,
                barThickness: 'flex',
                categoryPercentage: 0.8
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'day',
                        displayFormats: {
                            day: 'MMM d'
                        }
                    },
                    min: ganttData.minDate,
                    max: ganttData.maxDate
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                }
            },
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const task = ganttData.tasks[context.dataIndex];
                            let label = task.description || 'Tarea';
                            
                            if (task.dueDate) {
                                const dueDate = new Date(task.dueDate);
                                label += ` - Vence: ${dueDate.toLocaleDateString('es-ES')}`;
                            }
                            
                            if (task.status) {
                                label += ` (${getStatusText(task.status)})`;
                            }
                            
                            return label;
                        }
                    }
                },
                legend: {
                    display: false
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
    
    // Initialize progress chart on dashboard
    initializeProgressChart(tasks);
}

export function updateGanttChart(tasks) {
    if (!ganttChartInstance) {
        initializeGanttChart(tasks);
    } else {
        const ganttData = prepareGanttData(tasks);
        
        ganttChartInstance.data.labels = ganttData.labels;
        ganttChartInstance.data.datasets[0].data = ganttData.data;
        ganttChartInstance.data.datasets[0].backgroundColor = ganttData.colors;
        ganttChartInstance.data.datasets[0].borderColor = ganttData.borderColors;
        ganttChartInstance.options.scales.x.min = ganttData.minDate;
        ganttChartInstance.options.scales.x.max = ganttData.maxDate;
        ganttChartInstance.update();
        
        updateProgressChart(tasks);
    }
}

function prepareGanttData(tasks) {
    const filteredTasks = tasks.filter(task => task.dueDate);
    if (filteredTasks.length === 0) return {};
    
    // Sort tasks by due date
    filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    
    // Calculate date range for chart
    const dates = filteredTasks.map(task => new Date(task.dueDate));
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));
    
    // Adjust date range to have some padding
    minDate.setDate(minDate.getDate() - 7);
    maxDate.setDate(maxDate.getDate() + 7);
    
    // Prepare data for Chart.js
    const data = filteredTasks.map(task => {
        const startDate = new Date();
        const endDate = new Date(task.dueDate);
        
        return {
            x: [startDate, endDate],
            y: task.description.substring(0, 30) + (task.description.length > 30 ? '...' : '')
        };
    });
    
    const colors = filteredTasks.map(task => {
        if (task.status === 'completed') return '#2ecc71'; // Green
        if (new Date(task.dueDate) < new Date()) return '#e74c3c'; // Red for overdue
        return '#3498db'; // Blue for pending
    });
    
    const borderColors = filteredTasks.map(task => {
        if (task.status === 'completed') return '#27ae60';
        if (new Date(task.dueDate) < new Date()) return '#c0392b';
        return '#2980b9';
    });
    
    return {
        labels: filteredTasks.map(task => task.description.substring(0, 30) + (task.description.length > 30 ? '...' : '')),
        data: data,
        colors: colors,
        borderColors: borderColors,
        minDate: minDate,
        maxDate: maxDate,
        tasks: filteredTasks
    };
}

function initializeProgressChart(tasks) {
    const ctx = document.getElementById('progressChart').getContext('2d');
    if (progressChartInstance) {
        progressChartInstance.destroy();
    }
    
    const progressData = calculateProgressData(tasks);
    
    progressChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completadas', 'En Progreso', 'Pendientes'],
            datasets: [{
                data: [progressData.completed, progressData.inProgress, progressData.pending],
                backgroundColor: [
                    '#2ecc71', // Green
                    '#f39c12', // Orange
                    '#e74c3c'  // Red
                ],
                borderColor: '#fff',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            const label = context.label || '';
                            const value = context.raw || 0;
                            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
                            const percentage = Math.round((value / total) * 100);
                            return `${label}: ${value} (${percentage}%)`;
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function updateProgressChart(tasks) {
    if (!progressChartInstance) {
        initializeProgressChart(tasks);
    } else {
        const progressData = calculateProgressData(tasks);
        
        progressChartInstance.data.datasets[0].data = [
            progressData.completed, 
            progressData.inProgress, 
            progressData.pending
        ];
        progressChartInstance.update();
    }
}

function calculateProgressData(tasks) {
    const completed = tasks.filter(t => t.status === 'completed').length;
    const inProgress = tasks.filter(t => t.status === 'in-progress').length;
    const pending = tasks.filter(t => t.status === 'pending').length;
    
    return { completed, inProgress, pending };
}

function getStatusText(status) {
    switch (status) {
        case 'pending': return 'Pendiente';
        case 'in-progress': return 'En Progreso';
        case 'completed': return 'Completado';
        default: return status;
    }
}