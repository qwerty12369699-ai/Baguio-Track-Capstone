<?php
require_once __DIR__ . '/db.php';
header('Content-Type: application/json; charset=utf-8');

$method = $_SERVER['REQUEST_METHOD'];
$id = isset($_GET['id']) ? intval($_GET['id']) : null;
$input = json_decode(file_get_contents('php://input'), true) ?: [];

function jsonResponse($data, $status = 200) {
    http_response_code($status);
    echo json_encode($data);
    exit;
}

try {
    if ($method === 'GET') {
        if ($id) {
            $stmt = $pdo->prepare('SELECT * FROM terminals WHERE id = ?');
            $stmt->execute([$id]);
            return jsonResponse($stmt->fetch() ?: []);
        }
        $stmt = $pdo->query('SELECT * FROM terminals ORDER BY created_at DESC');
        return jsonResponse($stmt->fetchAll());
    }

    if ($method === 'POST') {
        $stmt = $pdo->prepare('INSERT INTO terminals (name, location, description, latitude, longitude, image_url) VALUES (?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $input['name'] ?? null,
            $input['location'] ?? null,
            $input['description'] ?? null,
            isset($input['latitude']) ? $input['latitude'] : null,
            isset($input['longitude']) ? $input['longitude'] : null,
            $input['image_url'] ?? null
        ]);
        return jsonResponse(['id' => (int)$pdo->lastInsertId(), 'message' => 'Terminal created successfully'], 201);
    }

    if ($method === 'PUT') {
        if (!$id) {
            return jsonResponse(['error' => 'Terminal ID is required'], 422);
        }
        $stmt = $pdo->prepare('UPDATE terminals SET name = ?, location = ?, description = ?, latitude = ?, longitude = ?, image_url = ? WHERE id = ?');
        $stmt->execute([
            $input['name'] ?? null,
            $input['location'] ?? null,
            $input['description'] ?? null,
            isset($input['latitude']) ? $input['latitude'] : null,
            isset($input['longitude']) ? $input['longitude'] : null,
            $input['image_url'] ?? null,
            $id
        ]);
        return jsonResponse(['message' => 'Terminal updated successfully']);
    }

    if ($method === 'DELETE') {
        if (!$id) {
            return jsonResponse(['error' => 'Terminal ID is required'], 422);
        }
        $stmt = $pdo->prepare('DELETE FROM terminals WHERE id = ?');
        $stmt->execute([$id]);
        return jsonResponse(['message' => 'Terminal deleted successfully']);
    }

    jsonResponse(['error' => 'Method not allowed'], 405);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
