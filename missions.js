let missions = [
    {
        id: 1,
        name: "Charli",
        description: "Routine border surveillance operation",
        priority: "high",
        coordinates: { lat: "34.0522", lng: "-118.2437" },
        status: "active",
        createdAt: new Date(Date.now() - 3600000)
    },
    {
        id: 2,
        name: "Bravo",
        description: "Medical supplies to forward base",
        priority: "medium",
        coordinates: { lat: "40.7128", lng: "-74.0060" },
        status: "pending",
        createdAt: new Date(Date.now() - 7200000)
    },
    {
        id: 3,
        name: "John",
        description: "Civilian evacuation from conflict zone",
        priority: "critical",
        coordinates: { lat: "51.5074", lng: "-0.1278" },
        status: "active",
        createdAt: new Date(Date.now() - 1800000)
    },
    {
        id: 4,
        name: "Roosy",
        description: "Enemy territory reconnaissance",
        priority: "high",
        coordinates: { lat: "48.8566", lng: "2.3522" },
        status: "completed",
        createdAt: new Date(Date.now() - 86400000)
    }
];

let logs = [
    { time: new Date(Date.now() - 5000), message: "Mission Border Patrol Alpha entered restricted airspace", type: "warning" },
    { time: new Date(Date.now() - 15000), message: "New mission created: Emergency Evac Charlie", type: "info" },
    { time: new Date(Date.now() - 25000), message: "Supply Delivery Bravo delayed due to weather conditions", type: "warning" },
    { time: new Date(Date.now() - 35000), message: "Recon Delta completed successfully", type: "success" },
    { time: new Date(Date.now() - 45000), message: "System diagnostics completed", type: "info" },
    { time: new Date(Date.now() - 65000), message: "Warning: Low fuel alert for Border Patrol Alpha", type: "warning" },
    { time: new Date(Date.now() - 85000), message: "Emergency signal received from sector 4-Delta", type: "critical" },
    { time: new Date(Date.now() - 95000), message: "All systems operational", type: "info" },
    { time: new Date(Date.now() - 105000), message: "Mission Recon Delta assets returning to base", type: "info" },
    { time: new Date(Date.now() - 125000), message: "Communication established with Supply Delivery Bravo", type: "success" }
];

function createMission(name, description, priority, lat, lng) {
    const newMission = {
        id: missions.length + 1,
        name,
        description,
        priority,
        coordinates: { lat, lng },
        status: "pending",
        createdAt: new Date()
    };
    
    missions.unshift(newMission);
    addLog(`Mission launched: ${name} (Priority: ${priority})`, 'info');
    
    setTimeout(() => {
        if (newMission.status === "pending") {
            newMission.status = "active";
            addLog(`Mission ${name} is now active`, 'success');
            if (window.location.pathname.endsWith('index.html')) {
                renderMissions();
            }
        }
    }, 3000);
    
    return newMission;
}

function renderMissions() {
    const missionGrid = document.getElementById('mission-grid');
    if (!missionGrid) return;
    
    missionGrid.innerHTML = '';
    
    missions.forEach(mission => {
        const card = document.createElement('div');
        card.className = `mission-card ${mission.priority}`;
        
        const priorityClass = `priority-${mission.priority}`;
        const statusClass = `status-${mission.status}`;
        
        card.innerHTML = `
            <div class="mission-header">
                <div class="mission-title">${mission.name}</div>
                <div class="mission-priority ${priorityClass}">${mission.priority.toUpperCase()}</div>
            </div>
            <div class="mission-details">
                ${mission.description}<br>
                <span class="mission-status ${statusClass}">
                    <span class="status-indicator ${getStatusIndicatorClass(mission.status)}"></span>
                    ${mission.status.toUpperCase()}
                </span>
            </div>
            <div class="mission-coords">${mission.coordinates.lat}, ${mission.coordinates.lng}</div>
            <div class="mission-actions">
                <button onclick="updateMissionStatus(${mission.id}, 'completed')">Complete</button>
                <button onclick="updateMissionStatus(${mission.id}, 'failed')">Fail</button>
                <button onclick="abortMission(${mission.id})">Abort</button>
            </div>
        `;
        
        missionGrid.appendChild(card);
    });
}

function getStatusIndicatorClass(status) {
    switch(status) {
        case 'active': return 'indicator-active';
        case 'completed': return 'indicator-success';
        case 'failed': return 'indicator-danger';
        case 'pending': return 'indicator-warning';
        default: return '';
    }
}

function renderRecentLogs() {
    const recentLogs = document.getElementById('recent-logs');
    if (!recentLogs) return;
    
    recentLogs.innerHTML = '';
    const recent = logs.slice(0, 5);
    
    recent.forEach(log => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <div class="log-time">${formatTime(log.time)}</div>
            <div class="log-message log-${log.type}">${log.message}</div>
        `;
        recentLogs.appendChild(entry);
    });
}

function renderSystemLogs(logsToRender = logs) {
    const systemLogs = document.getElementById('system-logs');
    if (!systemLogs) return;
    
    systemLogs.innerHTML = '';
    
    logsToRender.forEach(log => {
        const entry = document.createElement('div');
        entry.className = 'log-entry';
        entry.innerHTML = `
            <div class="log-time">${formatTime(log.time)}</div>
            <div class="log-message log-${log.type}">${log.message}</div>
        `;
        systemLogs.appendChild(entry);
    });
}

function renderMissionCoordinates() {
    const missionCoordinatesList = document.getElementById('mission-coordinates-list');
    if (!missionCoordinatesList) return;
    
    missionCoordinatesList.innerHTML = '';
    
    missions.forEach(mission => {
        const coordItem = document.createElement('div');
        coordItem.className = 'log-entry';
        coordItem.innerHTML = `
            <div class="log-time">${formatTime(mission.createdAt)}</div>
            <div class="log-message">
                <strong>${mission.name}</strong>: ${mission.coordinates.lat}, ${mission.coordinates.lng}
                <span class="mission-priority priority-${mission.priority}" style="margin-left: 10px;">
                    ${mission.priority.toUpperCase()}
                </span>
            </div>
        `;
        missionCoordinatesList.appendChild(coordItem);
    });
}

function addLog(message, type = 'info') {
    const newLog = {
        time: new Date(),
        message,
        type
    };

    logs.unshift(newLog);

    if (window.location.pathname.endsWith('index.html')) {
        renderRecentLogs();
    }
    if (window.location.pathname.endsWith('logs.html')) {
        renderSystemLogs();
    }
}

function updateMissionStatus(id, status) {
    const mission = missions.find(m => m.id === id);
    if (mission) {
        mission.status = status;
        addLog(`Mission ${mission.name} status updated to ${status}`,
            status === 'completed' ? 'success' : 'warning');

        if (window.location.pathname.endsWith('index.html')) {
            renderMissions();
        }
        if (window.location.pathname.endsWith('map.html')) {
            renderMissionCoordinates();
        }

        if (status === 'completed') {
            setTimeout(() => {
                missions = missions.filter(m => m.id !== id);
                if (window.location.pathname.endsWith('index.html')) {
                    renderMissions();
                }
                if (window.location.pathname.endsWith('map.html')) {
                    renderMissionCoordinates();
                }
            }, 5000);
        }
    }
}

function abortMission(id) {
    const mission = missions.find(m => m.id === id);
    if (mission && confirm(`Are you sure you want to abort mission ${mission.name}?`)) {
        mission.status = 'failed';
        addLog(`Mission ${mission.name} was aborted`, 'critical');
        
        if (window.location.pathname.endsWith('index.html')) {
            renderMissions();
        }
        if (window.location.pathname.endsWith('map.html')) {
            renderMissionCoordinates();
        }
        
        setTimeout(() => {
            missions = missions.filter(m => m.id !== id);
            if (window.location.pathname.endsWith('index.html')) {
                renderMissions();
            }
            if (window.location.pathname.endsWith('map.html')) {
                renderMissionCoordinates();
            }
        }, 3000);
    }
}

function filterLogs(type) {
    const filteredLogs = type === 'all' ? logs : logs.filter(log => log.type === type);
    renderSystemLogs(filteredLogs);
}

window.updateMissionStatus = updateMissionStatus;
window.abortMission = abortMission;
window.filterLogs = filterLogs;