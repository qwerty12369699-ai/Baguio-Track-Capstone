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
            $stmt = $pdo->prepare('SELECT * FROM tourist_spots WHERE id = ?');
            $stmt->execute([$id]);
            return jsonResponse($stmt->fetch() ?: []);
        }
        $stmt = $pdo->query('SELECT ts.*, t.name AS terminal_name, r.name AS route_name FROM tourist_spots ts LEFT JOIN terminals t ON ts.terminal_id = t.id LEFT JOIN routes r ON ts.route_id = r.id WHERE ts.archived = 0 ORDER BY ts.created_at DESC');
        return jsonResponse($stmt->fetchAll());
    }

    if ($method === 'POST') {
        $stmt = $pdo->prepare('INSERT INTO tourist_spots (name, categories, page, image_url, location, description, terminal_id, route_id, walk, walk_time, return_trip, note, latitude, longitude, archived) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
        $stmt->execute([
            $input['name'] ?? null,
            isset($input['categories']) ? json_encode($input['categories']) : null,
            $input['page'] ?? null,
            $input['image_url'] ?? null,
            $input['location'] ?? null,
            $input['description'] ?? null,
            isset($input['terminal_id']) ? $input['terminal_id'] : null,
            isset($input['route_id']) ? $input['route_id'] : null,
            $input['walk'] ?? null,
            $input['walk_time'] ?? null,
            $input['return_trip'] ?? null,
            $input['note'] ?? null,
            isset($input['latitude']) ? $input['latitude'] : null,
            isset($input['longitude']) ? $input['longitude'] : null,
            isset($input['archived']) ? (int)$input['archived'] : 0
        ]);
        return jsonResponse(['id' => (int)$pdo->lastInsertId(), 'message' => 'Tourist spot created successfully'], 201);
    }

    if ($method === 'PUT') {
        if (!$id) {
            return jsonResponse(['error' => 'Spot ID is required'], 422);
        }
        $stmt = $pdo->prepare('UPDATE tourist_spots SET name = ?, categories = ?, page = ?, image_url = ?, location = ?, description = ?, terminal_id = ?, route_id = ?, walk = ?, walk_time = ?, return_trip = ?, note = ?, latitude = ?, longitude = ?, archived = ? WHERE id = ?');
        $stmt->execute([
            $input['name'] ?? null,
            isset($input['categories']) ? json_encode($input['categories']) : null,
            $input['page'] ?? null,
            $input['image_url'] ?? null,
            $input['location'] ?? null,
            $input['description'] ?? null,
            isset($input['terminal_id']) ? $input['terminal_id'] : null,
            isset($input['route_id']) ? $input['route_id'] : null,
            $input['walk'] ?? null,
            $input['walk_time'] ?? null,
            $input['return_trip'] ?? null,
            $input['note'] ?? null,
            isset($input['latitude']) ? $input['latitude'] : null,
            isset($input['longitude']) ? $input['longitude'] : null,
            isset($input['archived']) ? (int)$input['archived'] : 0,
            $id
        ]);
        return jsonResponse(['message' => 'Tourist spot updated successfully']);
    }

    if ($method === 'DELETE') {
        if (!$id) {
            return jsonResponse(['error' => 'Spot ID is required'], 422);
        }
        $stmt = $pdo->prepare('DELETE FROM tourist_spots WHERE id = ?');
        $stmt->execute([$id]);
        return jsonResponse(['message' => 'Tourist spot deleted successfully']);
    }

    jsonResponse(['error' => 'Method not allowed'], 405);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
