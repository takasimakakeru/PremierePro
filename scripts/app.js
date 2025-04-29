let projectData = {
  clips: [],
  textOverlays: []
};

function addClip(fileURL, type) {
  projectData.clips.push({ fileURL, type });
  renderTimeline();
}

function addTextOverlay(text, position) {
  projectData.textOverlays.push({ text, position });
  renderTimeline();
}

function renderTimeline() {
  const timeline = document.getElementById('timeline');
  timeline.innerHTML = '';

  projectData.clips.forEach(clip => {
      const div = document.createElement('div');
      div.className = 'timeline-clip';
      div.textContent = clip.type.startsWith('video/') ? '🎬 Video' : '🖼 Image';
      timeline.appendChild(div);
  });

  projectData.textOverlays.forEach(overlay => {
      const div = document.createElement('div');
      div.className = 'timeline-clip';
      div.textContent = '📝 ' + overlay.text;
      timeline.appendChild(div);
  });
}

async function saveProject() {
  const projectName = prompt('プロジェクト名を入力してください');
  if (!projectName) return;

  const response = await fetch('api/save_project.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          project_name: projectName,
          project_data: JSON.stringify(projectData)
      })
  });

  const data = await response.json();
  if (data.success) {
      alert('プロジェクト保存成功！');
  } else {
      alert('保存失敗: ' + data.message);
  }
}

// ページロード時、保存ボタンにイベント追加
window.onload = () => {
  document.getElementById('save-button').addEventListener('click', saveProject);
};
