<?php
$servername = "localhost";
$username = "your_db_username"; // ←あなたのDBユーザー名に変更
$password = "your_db_password"; // ←あなたのDBパスワードに変更
$dbname = "webapp_db";

try {
    $pdo = new PDO("mysql:host=$servername;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("DB接続失敗: " . $e->getMessage());
}
?>
