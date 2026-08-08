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
            $stmt = $pdo->prepare('SELECT * FROM routes WHERE id = ?');
            $stmt->execute([$id]);
            return jsonResponse($stmt->fetch() ?: []);
        }
        $stmt = $pdo->query('SELECT r.*, t.name AS terminal_name FROM routes r LEFT JOIN terminals t ON r.terminal_id = t.id ORDER BY r.created_at DESC');
        return jsonResponse($stmt->fetchAll());
    }

    if ($method === 'POST') {
        $stmt = $pdo->prepare('INSERT INTO routes (terminal_id, name, board, dropoff, route, walk, walk_time, return_trip, fare, note) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            isset($input['terminal_id']) ? $input['terminal_id'] : null,
            $input['name'] ?? null,
            $input['board'] ?? null,
            $input['dropoff'] ?? null,
            $input['route'] ?? null,
            $input['walk'] ?? null,
            $input['walk_time'] ?? null,
            $input['return_trip'] ?? null,
            $input['fare'] ?? null,
            $input['note'] ?? null
        ]);
        return jsonResponse(['id' => (int)$pdo->lastInsertId(), 'message' => 'Route created successfully'], 201);
    }

    if ($method === 'PUT') {
        if (!$id) {
            return jsonResponse(['error' => 'Route ID is required'], 422);
        }
        $stmt = $pdo->prepare('UPDATE routes SET terminal_id = ?, name = ?, board = ?, dropoff = ?, route = ?, walk = ?, walk_time = ?, return_trip = ?, fare = ?, note = ? WHERE id = ?');
        $stmt->execute([
            isset($input['terminal_id']) ? $input['terminal_id'] : null,
            $input['name'] ?? null,
            $input['board'] ?? null,
            $input['dropoff'] ?? null,
            $input['route'] ?? null,
            $input['walk'] ?? null,
            $input['walk_time'] ?? null,
            $input['return_trip'] ?? null,
            $input['fare'] ?? null,
            $input['note'] ?? null,
            $id
        ]);
        return jsonResponse(['message' => 'Route updated successfully']);
    }

    if ($method === 'DELETE') {
        if (!$id) {
            return jsonResponse(['error' => 'Route ID is required'], 422);
        }
        $stmt = $pdo->prepare('DELETE FROM routes WHERE id = ?');
        $stmt->execute([$id]);
        return jsonResponse(['message' => 'Route deleted successfully']);
    }

    jsonResponse(['error' => 'Method not allowed'], 405);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
