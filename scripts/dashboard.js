async function loadProjects() {
    const response = await fetch('api/list_projects.php');
    const data = await response.json();
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    if (data.projects.length === 0) {
        projectList.innerHTML = '<p>プロジェクトがありません。</p>';
        return;
    }

    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-item';
        div.innerHTML = `
            <h3>${project.project_name}</h3>
            <button onclick="openProject('${project.project_id}')">開く</button>
            <button onclick="deleteProject('${project.project_id}')">削除</button>
        `;
        projectList.appendChild(div);
    });
}

async function openProject(projectId) {
    localStorage.setItem('currentProjectId', projectId);
    window.location.href = 'app.html';
}

async function deleteProject(projectId) {
    if (!confirm('このプロジェクトを削除しますか？')) return;

    const response = await fetch('api/delete_project.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ project_id: projectId })
    });

    const data = await response.json();
    if (data.success) {
        loadProjects();
    } else {
        alert('削除に失敗しました');
    }
}

async function logout() {
    await fetch('api/logout.php');
    window.location.href = 'index.html';
}

// ページロード時にプロジェクト一覧を読み込む
window.onload = loadProjects;
