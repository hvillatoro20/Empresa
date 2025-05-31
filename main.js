:root {
    --primary-color: #2c3e50;
    --secondary-color: #3498db;
    --accent-color: #2ecc71;
    --text-color: #333;
    --light-bg: #f9f9f9;
    --card-bg: #fff;
    --border-color: #ddd;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    --transition: all 0.3s ease;
}

[data-theme="dark"] {
    --primary-color: #34495e;
    --secondary-color: #2980b9;
    --accent-color: #27ae60;
    --text-color: #ecf0f1;
    --light-bg: #2c3e50;
    --card-bg: #34495e;
    --border-color: #46627f;
    --shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: var(--light-bg);
    color: var(--text-color);
    line-height: 1.6;
    transition: var(--transition);
}

.container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 15px;
}

.hidden {
    display: none !important;
}

/* Header */
.app-header {
    background-color: var(--primary-color);
    color: white;
    padding: 1rem 0;
    box-shadow: var(--shadow);
    position: sticky;
    top: 0;
    z-index: 100;
}

.app-header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.app-header h1 {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.theme-switch button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    transition: var(--transition);
}

.theme-switch button:hover {
    transform: rotate(30deg);
}

/* Tabs */
.tabs {
    background-color: var(--card-bg);
    box-shadow: var(--shadow);
    margin-bottom: 2rem;
}

.tabs .container {
    display: flex;
    overflow-x: auto;
}

.tab-btn {
    padding: 1rem 1.5rem;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    font-weight: 600;
    color: var(--text-color);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    gap: 8px;
    white-space: nowrap;
}

.tab-btn.active {
    border-bottom-color: var(--accent-color);
    color: var(--accent-color);
}

.tab-btn:hover:not(.active) {
    background-color: rgba(0, 0, 0, 0.05);
}

/* Tab Content */
.tab-content {
    display: none;
    padding: 2rem 0;
    animation: fadeIn 0.5s ease;
}

.tab-content.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Forms */
.form-group {
    margin-bottom: 1.5rem;
}

.form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-row .form-group {
    flex: 1;
    margin-bottom: 0;
}

label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background-color: var(--card-bg);
    color: var(--text-color);
    transition: var(--transition);
}

input:focus, select:focus, textarea:focus {
    outline: none;
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
}

textarea {
    min-height: 100px;
    resize: vertical;
}

/* Buttons */
.btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    gap: 8px;
}

.btn-primary {
    background-color: var(--accent-color);
    color: white;
}

.btn-primary:hover {
    background-color: #24a956;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: var(--secondary-color);
    color: white;
}

.btn-secondary:hover {
    background-color: #247eb3;
    transform: translateY(-2px);
}

.btn-ai {
    background-color: #9b59b6;
    color: white;
}

.btn-ai:hover {
    background-color: #8e44ad;
    transform: translateY(-2px);
}

/* Planning Section */
.planning-grid {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
}

.task-generator {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
}

.task-list {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
}

.task-items {
    list-style: none;
    margin-top: 1.5rem;
}

.task-item {
    background-color: var(--light-bg);
    padding: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: var(--transition);
    border-left: 4px solid var(--border-color);
}

.task-item:hover {
    transform: translateX(5px);
}

.task-item.high {
    border-left-color: #e74c3c;
}

.task-item.medium {
    border-left-color: #f39c12;
}

.task-item.low {
    border-left-color: #3498db;
}

.task-item.completed {
    opacity: 0.7;
    text-decoration: line-through;
}

.task-actions {
    display: flex;
    gap: 8px;
}

.task-actions button {
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
    transition: var(--transition);
}

.task-actions button:hover {
    color: var(--secondary-color);
}

/* Execution Section */
.execution-container {
    display: flex;
    gap: 2rem;
}

.task-board {
    flex: 3;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.board-column {
    background-color: var(--card-bg);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
}

.board-column h3 {
    text-align: center;
    margin-bottom: 1rem;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid var(--border-color);
}

.task-column {
    list-style: none;
    min-height: 200px;
    padding: 0.5rem;
    background-color: var(--light-bg);
    border-radius: 4px;
}

.task-card {
    background-color: var(--card-bg);
    padding: 0.75rem;
    margin-bottom: 0.75rem;
    border-radius: 4px;
    box-shadow: var(--shadow);
    cursor: grab;
    transition: var(--transition);
}

.task-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.task-card h4 {
    margin-bottom: 0.5rem;
    display: flex;
    justify-content: space-between;
}

.task-priority {
    font-size: 0.8rem;
    padding: 0.2rem 0.5rem;
    border-radius: 12px;
}

.priority-high {
    background-color: #e74c3c;
    color: white;
}

.priority-medium {
    background-color: #f39c12;
    color: white;
}

.priority-low {
    background-color: #3498db;
    color: white;
}

.task-due {
    font-size: 0.8rem;
    color: #7f8c8d;
    display: block;
    margin-top: 0.5rem;
}

.task-details {
    flex: 1;
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
    position: sticky;
    top: 120px;
    max-height: 80vh;
    overflow-y: auto;
}

/* Tracking Section */
.tracking-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
}

.gantt-chart, .kpi-panel {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
}

.kpi-cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    margin: 1.5rem 0;
}

.kpi-card {
    background-color: var(--light-bg);
    padding: 1rem;
    border-radius: 8px;
    text-align: center;
    transition: var(--transition);
}

.kpi-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.kpi-value {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-color);
}

.kpi-label {
    font-size: 0.9rem;
    color: var(--text-color);
    opacity: 0.8;
}

.reminders {
    margin-top: 2rem;
}

.reminders ul {
    list-style: none;
    margin-top: 1rem;
}

.reminders li {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background-color: var(--light-bg);
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

/* Dashboard Section */
.dashboard-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
}

.summary-card, .progress-card, .export-card, .ai-assistant-card {
    background-color: var(--card-bg);
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow);
}

.progress-card {
    grid-column: span 1;
}

.export-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.ai-assistant-card {
    grid-column: span 2;
}

/* AI Feedback */
.ai-feedback {
    background-color: var(--light-bg);
    padding: 1rem;
    margin-top: 1rem;
    border-radius: 8px;
    border-left: 4px solid #9b59b6;
}

/* Footer */
footer {
    background-color: var(--primary-color);
    color: white;
    padding: 1.5rem 0;
    text-align: center;
    margin-top: 2rem;
}

/* Responsive Design */
@media (max-width: 992px) {
    .planning-grid, .tracking-grid {
        grid-template-columns: 1fr;
    }
    
    .execution-container {
        flex-direction: column;
    }
    
    .task-board {
        grid-template-columns: 1fr;
    }
    
    .dashboard-grid {
        grid-template-columns: 1fr;
    }
    
    .progress-card, .ai-assistant-card {
        grid-column: span 1;
    }
}

@media (max-width: 768px) {
    .form-row {
        flex-direction: column;
        gap: 0;
    }
    
    .kpi-cards {
        grid-template-columns: 1fr;
    }
}