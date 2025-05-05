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
  
   