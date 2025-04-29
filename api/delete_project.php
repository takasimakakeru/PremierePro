<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["message" => "ログインしてください"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$projectId = $data['id'];

$stmt = $pdo->prepare("DELETE FROM projects WHERE id = ? AND user_id = ?");
$stmt->execute([$projectId, $_SESSION['user_id']]);

echo json_encode(["message" => "プロジェクトを削除しました"]);
?>
