<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["message" => "ログインしてください"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$projectName = trim($data['name']);
$projectData = $data['data'];

$stmt = $pdo->prepare("INSERT INTO projects (user_id, project_name, project_data) VALUES (?, ?, ?)");
$stmt->execute([$_SESSION['user_id'], $projectName, $projectData]);

echo json_encode(["message" => "保存完了"]);
?>
