// scripts/pip.js

async function renderPIP(mainFile, pipFile, canvas) {
  const ctx = canvas.getContext("2d");

  // メイン動画とPIP動画を作成
  const mainVideo = document.createElement("video");
  const pipVideo = document.createElement("video");

  mainVideo.src = URL.createObjectURL(mainFile);
  pipVideo.src = URL.createObjectURL(pipFile);

  mainVideo.muted = true;
  pipVideo.muted = true;

  // 再生準備
  await Promise.all([
    mainVideo.play(),
    pipVideo.play()
  ]);

  // キャンバスサイズをメイン動画に合わせる
  canvas.width = mainVideo.videoWidth;
  canvas.height = mainVideo.videoHeight;

  // PIPのサイズと位置
  const pipWidth = mainVideo.videoWidth / 4;
  const pipHeight = mainVideo.videoHeight / 4;
  const pipX = canvas.width - pipWidth - 20;
  const pipY = canvas.height - pipHeight - 20;

  function draw() {
    if (mainVideo.ended || pipVideo.ended) return;

    // メイン動画を全体に描画
    ctx.drawImage(mainVideo, 0, 0, canvas.width, canvas.height);

    // PIP動画を右下に描画
    ctx.drawImage(pipVideo, pipX, pipY, pipWidth, pipHeight);

    requestAnimationFrame(draw);
  }

  draw();
}
