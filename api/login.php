<?php
session_start();
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username']);
$password = trim($data['password']);

$stmt = $pdo->prepare("SELECT id, password FROM users WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['user_id'] = $user['id'];
    echo json_encode(["message" => "ログイン成功"]);
} else {
    http_response_code(401);
    echo json_encode(["message" => "ユーザー名またはパスワードが間違っています"]);
}
?>
