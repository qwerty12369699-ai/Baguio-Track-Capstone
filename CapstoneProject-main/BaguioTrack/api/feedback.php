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
            $stmt = $pdo->prepare('SELECT * FROM feedback_reports WHERE id = ?');
            $stmt->execute([$id]);
            return jsonResponse($stmt->fetch() ?: []);
        }
        $stmt = $pdo->query('SELECT * FROM feedback_reports ORDER BY created_at DESC');
        return jsonResponse($stmt->fetchAll());
    }

    if ($method === 'POST') {
        if (empty($input['message'])) {
            return jsonResponse(['error' => 'Message is required'], 422);
        }

        $stmt = $pdo->prepare('INSERT INTO feedback_reports (user_email, subject, message, status) VALUES (?, ?, ?, ?)');
        $stmt->execute([
            $input['user_email'] ?? null,
            $input['subject'] ?? null,
            $input['message'],
            in_array($input['status'] ?? 'new', ['new', 'reviewed', 'resolved'], true) ? $input['status'] : 'new'
        ]);

        return jsonResponse(['id' => (int)$pdo->lastInsertId(), 'message' => 'Feedback saved successfully']);
    }

    if ($method === 'PUT') {
        if (!$id) {
            return jsonResponse(['error' => 'Feedback ID is required'], 422);
        }
        $stmt = $pdo->prepare('UPDATE feedback_reports SET user_email = ?, subject = ?, message = ?, status = ? WHERE id = ?');
        $stmt->execute([
            $input['user_email'] ?? null,
            $input['subject'] ?? null,
            $input['message'] ?? null,
            in_array($input['status'] ?? 'new', ['new', 'reviewed', 'resolved'], true) ? $input['status'] : 'new',
            $id
        ]);
        return jsonResponse(['message' => 'Feedback updated successfully']);
    }

    if ($method === 'DELETE') {
        if (!$id) {
            return jsonResponse(['error' => 'Feedback ID is required'], 422);
        }
        $stmt = $pdo->prepare('DELETE FROM feedback_reports WHERE id = ?');
        $stmt->execute([$id]);
        return jsonResponse(['message' => 'Feedback deleted successfully']);
    }

    jsonResponse(['error' => 'Method not allowed'], 405);
} catch (PDOException $e) {
    jsonResponse(['error' => 'Database error', 'details' => $e->getMessage()], 500);
}
