let selectedAudioElement = null;

document.getElementById("file-input").addEventListener("change", function (e) {
  const files = Array.from(e.target.files);
  const projectItems = document.getElementById("project-items");
  const sourceList = document.getElementById("source-list");

  files.forEach((file) => {
    const url = URL.createObjectURL(file);
    let element;

    if (file.type.startsWith("image/")) {
      element = document.createElement("img");
      element.src = url;
    } else if (file.type.startsWith("video/")) {
      element = document.createElement("video");
      element.src = url;
      element.controls = true;
      element.width = 100;
    } else if (file.type.startsWith("audio/")) {
      element = document.createElement("audio");
      element.src = url;
      element.controls = true;
    } else {
      element = document.createElement("div");
      element.textContent = "不明なファイル";
    }

    element.classList.add("project-item");
    projectItems.appendChild(element);

    // ソースモニターにも追加（画像・動画）
    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      const thumb = element.cloneNode(true);
      sourceList.appendChild(thumb);
    }

    // ドラッグでタイムラインに追加
    element.draggable = true;
    element.addEventListener("dragstart", (ev) => {
      ev.dataTransfer.setData("fileURL", url);
      ev.dataTransfer.setData("fileType", file.type);
    });
  });
});

document.getElementById("timeline").addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.getElementById("timeline").addEventListener("drop", (e) => {
  e.preventDefault();
  const fileURL = e.dataTransfer.getData("fileURL");
  const fileType = e.dataTransfer.getData("fileType");
  const timeline = document.getElementById("timeline");

  let clip;
  if (fileType.startsWith("image/")) {
    clip = document.createElement("img");
    clip.src = fileURL;
    clip.style.width = "100px";
  } else if (fileType.startsWith("video/")) {
    clip = document.createElement("video");
    clip.src = fileURL;
    clip.controls = true;
    clip.width = 100;
  } else if (fileType.startsWith("audio/")) {
    clip = document.createElement("audio");
    clip.src = fileURL;
    clip.controls = true;
    clip.style.width = "200px";
    clip.addEventListener("click", () => selectAudioClip(clip));
  }

  if (clip) {
    clip.classList.add("timeline-clip");
    timeline.appendChild(clip);
    enableClipDrag(clip);
  }
});

function enableClipDrag(clip) {
  let offsetX;
  clip.addEventListener("mousedown", (e) => {
    offsetX = e.offsetX;
    const onMouseMove = (moveEvent) => {
      const timeline = document.getElementById("timeline");
      let x = moveEvent.clientX - timeline.getBoundingClientRect().left - offsetX;
      x = Math.max(0, Math.min(x, timeline.clientWidth - clip.offsetWidth));
      clip.style.left = ${x}px;
    };
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  });
}

function selectAudioClip(audioElement) {
  selectedAudioElement = audioElement;
  document.getElementById("volume-slider").value = audioElement.volume;
}

document.getElementById("volume-slider").addEventListener("input", (e) => {
  if (selectedAudioElement) {
    selectedAudioElement.volume = parseFloat(e.target.value);
  }
});