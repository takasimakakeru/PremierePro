<?php
session_start();
require 'db.php';

if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(["message" => "ログインしてください"]);
    exit;
}

$stmt = $pdo->prepare("SELECT id, project_name, created_at FROM projects WHERE user_id = ?");
$stmt->execute([$_SESSION['user_id']]);
$projects = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($projects);
?>
