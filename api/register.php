<?php
require 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username']);
$password = trim($data['password']);

if (empty($username) || empty($password)) {
    http_response_code(400);
    echo json_encode(["message" => "ユーザー名とパスワードを入力してください"]);
    exit;
}

// すでに存在するか確認
$stmt = $pdo->prepare("SELECT id FROM users WHERE username = ?");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    http_response_code(409);
    echo json_encode(["message" => "このユーザー名はすでに使われています"]);
    exit;
}

// 新規登録
$hashedPassword = password_hash($password, PASSWORD_BCRYPT);
$stmt = $pdo->prepare("INSERT INTO users (username, password) VALUES (?, ?)");
$stmt->execute([$username, $hashedPassword]);

echo json_encode(["message" => "登録成功"]);
?>
