// Fake API using localStorage
const STORAGE_KEY = 'entrepreneurControlApp';

export function saveProject(projectData) {
    // Load existing project or create new
    let project = loadProject() || {};
    
    // Merge new data with existing
    project = { ...project, ...projectData };
    project.updatedAt = new Date().toISOString();
    
    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
    return project;
}

export function loadProject() {
    const projectStr = localStorage.getItem(STORAGE_KEY);
    return projectStr ? JSON.parse(projectStr) : null;
}

export function getCurrentProject() {
    return loadProject();
}

// In a real app, you would have more sophisticated storage handling
// including error handling, validation, etc.

// Example of more advanced functions you might add:
/*
export async function backupToCloud() {
    // Implementation for cloud backup
}

export async function restoreFromBackup(backupData) {
    // Implementation for restore
}

export function clearLocalData() {
    localStorage.removeItem(STORAGE_KEY);
}
*/