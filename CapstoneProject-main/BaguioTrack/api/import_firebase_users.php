<?php
require_once __DIR__ . '/db.php';

$filename = $argv[1] ?? __DIR__ . '/firebase_users.json';

if (!is_readable($filename)) {
    fwrite(STDERR, "Usage: php import_firebase_users.php [firebase_users.json]\n");
    fwrite(STDERR, "File not found or unreadable: $filename\n");
    exit(1);
}

$content = file_get_contents($filename);
$data = json_decode($content, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    fwrite(STDERR, "Invalid JSON in $filename: " . json_last_error_msg() . "\n");
    exit(1);
}

$users = [];
if (isset($data['users']) && is_array($data['users'])) {
    $users = $data['users'];
} elseif (is_array($data)) {
    $users = $data;
} else {
    fwrite(STDERR, "Expected a JSON array or a Firebase export object with a 'users' array.\n");
    exit(1);
}

$insert = $pdo->prepare(
    'INSERT INTO users (email, name, role) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role)'
);

$imported = 0;
$skipped = 0;

foreach ($users as $user) {
    if (!isset($user['email']) || !is_string($user['email']) || trim($user['email']) === '') {
        $skipped++;
        continue;
    }

    $email = strtolower(trim($user['email']));
    $name = trim((string)($user['displayName'] ?? $user['name'] ?? $email));
    $role = in_array($user['role'] ?? 'user', ['user', 'admin'], true) ? $user['role'] : 'user';

    try {
        $insert->execute([$email, $name !== '' ? $name : null, $role]);
        $imported++;
    } catch (PDOException $e) {
        fwrite(STDERR, "Failed to import $email: " . $e->getMessage() . "\n");
    }
}

echo "Imported $imported users. Skipped $skipped invalid entries.\n";
exit(0);
