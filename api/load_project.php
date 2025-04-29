<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["message" => "ログインしてください"]);
    exit;
}

$projectId = $_GET['id'];

$stmt = $pdo->prepare("SELECT project_data FROM projects WHERE id = ? AND user_id = ?");
$stmt->execute([$projectId, $_SESSION['user_id']]);
$project = $stmt->fetch();

if ($project) {
    echo json_encode(["data" => $project['project_data']]);
} else {
    http_response_code(404);
    echo json_encode(["message" => "プロジェクトが見つかりません"]);
}
?>
