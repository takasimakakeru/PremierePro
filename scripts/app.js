// scripts/app.js の下部に追加 

  

document.getElementById('file-input').addEventListener('change', function (event) { 

    const files = event.target.files; 
  
    const projectItems = document.getElementById('project-items'); 
  
    projectItems.innerHTML = ''; 
  
    
  
    Array.from(files).forEach(file => { 
  
      const url = URL.createObjectURL(file); 
  
      let element; 
  
    
  
      if (file.type.startsWith('image/')) { 
  
        element = document.createElement('img'); 
  
        element.src = url; 
  
      } else if (file.type.startsWith('video/')) { 
  
        element = document.createElement('video'); 
  
        element.src = url; 
  
        element.controls = true; 
  
        element.muted = true; 
  
        element.style.width = '25%'; 
  
      } else { 
  
        return; 
  
      } 
  
    
  
      projectItems.appendChild(element); 
  
    
  
      // ついでにタイムラインに追加 
  
      addClip(url, file.type); 
  
    }); 
  
  }); 
  
  document.getElementById('select-tool').addEventListener('click', () => { 
  
    alert('選択ツールが有効になりました（仮）'); 
  
  }); 
  
    
  
  document.getElementById('split-tool').addEventListener('click', () => { 
  
    alert('分割ツールはまだ未実装です'); 
  
  }); 
  
    
  
  document.getElementById('text-horizontal').addEventListener('click', () => { 
  
    const text = prompt('横書きテロップを入力:'); 
  
    if (text) addTextOverlay(text, 'horizontal'); 
  
  }); 
  
    
  
  document.getElementById('text-vertical').addEventListener('click', () => { 
  
    const text = prompt('縦書きテロップを入力:'); 
  
    if (text) addTextOverlay(text, 'vertical'); 
  
  }); 
  
    
  
  document.getElementById('ai-tool').addEventListener('click', () => { 
  
    alert('AIツールは今後実装予定です'); 
  
  }); 
  // scripts/webcodecs-utils.js

// 基本のカット編集：動画を読み込み、指定範囲のみデコードしてCanvasに描画する
async function cutVideoSegment(file, startTime, endTime, canvas) {
  const ctx = canvas.getContext("2d");
  const video = document.createElement("video");
  video.src = URL.createObjectURL(file);
  video.muted = true;

  await video.play(); // 再生開始してメタデータ読み取り

  const duration = video.duration;
  if (startTime >= duration || endTime > duration || startTime >= endTime) {
    console.error("無効なカット範囲");
    return;
  }

  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  video.currentTime = startTime;

  let drawing = true;
  video.addEventListener("seeked", () => {
    const drawFrame = () => {
      if (!drawing) return;

      ctx.drawImage(video, 0, 0, width, height);

      if (video.currentTime >= endTime) {
        drawing = false;
        console.log("カット完了");
        return;
      }

      requestAnimationFrame(drawFrame);
    };

    drawFrame();
  });
}

   