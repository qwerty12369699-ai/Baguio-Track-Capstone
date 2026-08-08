<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$rawInput = trim((string)file_get_contents('php://input'));
$input = [];

if ($rawInput !== '') {
    $decoded = json_decode($rawInput, true);
    if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
        $input = $decoded;
    } else {
        parse_str($rawInput, $input);
    }
} elseif (!empty($_POST)) {
    $input = $_POST;
}

if (!is_array($input)) {
    $input = [];
}

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

try {
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare('SELECT * FROM users WHERE id = ?');
            $stmt->execute([$id]);
            $user = $stmt->fetch();
            return jsonResponse($user ?: []);
        }

        $stmt = $pdo->query('SELECT * FROM users ORDER BY created_at DESC');
        return jsonResponse($stmt->fetchAll());
    }

    if ($method === 'POST') {
        if (empty($input['email'])) {
            return jsonResponse(['error' => 'Email is required'], 422);
        }

        $email = strtolower(trim($input['email']));
        $name = trim($input['name'] ?? '');
        $role = in_array($input['role'] ?? 'user', ['user', 'admin'], true) ? $input['role'] : 'user';

        $stmt = $pdo->prepare('INSERT INTO users (email, name, role) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role)');
        $stmt->execute([
            $email,
            $name !== '' ? $name : null,
            $role
        ]);

        $userId = (int)($pdo->lastInsertId() ?: $pdo->query('SELECT id FROM users WHERE email = ' . $pdo->quote($email))->fetchColumn());
        return jsonResponse(['id' => $userId, 'message' => 'User saved successfully']);
    }

    if ($method === 'PUT') {
        if (!$id) {
            return jsonResponse(['error' => 'User ID is required'], 422);
        }

        $stmt = $pdo->prepare('UPDATE users SET email = ?, name = ?, role = ? WHERE id = ?');
        $stmt->execute([
            $input['email'] ?? '',
            $input['name'] ?? null,
            in_array($input['role'] ?? 'user', ['user', 'admin'], true) ? $input['role'] : 'user',
            $id
        ]);
        return jsonResponse(['message' => 'User updated successfully']);
    }

    if ($method === 'DELETE') {
        if (!$id) {
            return jsonResponse(['error' => 'User ID is required'], 422);
        }
        $stmt = $pdo->prepare('DELETE FROM users WHERE id = ?');
        $stmt->execute([$id]);
        return jsonResponse(['message' => 'User deleted successfully']);
    }

    jsonResponse(['error' => 'Method not allowed'], 405);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
