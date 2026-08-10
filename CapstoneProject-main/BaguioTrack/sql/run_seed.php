<?php
// run_seed.php
// Simple script to import the SQL seed file into local MySQL.
// Usage (browser): http://localhost/CapstoneProject-main/BaguioTrack/sql/run_seed.php
// Optional query params: ?host=127.0.0.1&user=root&pass=&db=baguiotrack

function try_connect_and_import($host, $user, $pass, $db, $sqlFile) {
    echo "Trying: host={$host}, user={$user}, db={$db}" . PHP_EOL;
    $mysqli = @new mysqli($host, $user, $pass, $db);
    if ($mysqli->connect_errno) {
        echo "Connect failed: ({$mysqli->connect_errno}) {$mysqli->connect_error}" . PHP_EOL;
        return false;
    }

    $sql = file_get_contents($sqlFile);
    if ($sql === false) {
        echo "Unable to read SQL file: {$sqlFile}" . PHP_EOL;
        return false;
    }

    // run multi-query
    if (!$mysqli->multi_query($sql)) {
        echo "Import error: ({$mysqli->errno}) {$mysqli->error}" . PHP_EOL;
        $mysqli->close();
        return false;
    }

    // consume results
    do {
        if ($res = $mysqli->store_result()) {
            $res->free();
        }
    } while ($mysqli->more_results() && $mysqli->next_result());

    echo "Import completed successfully." . PHP_EOL;
    $mysqli->close();
    return true;
}

$sqlFile = __DIR__ . DIRECTORY_SEPARATOR . 'seed_baguiotrack.sql';
if (!file_exists($sqlFile)) {
    echo "Seed file not found: {$sqlFile}" . PHP_EOL;
    exit(1);
}

$params = [
    'host' => isset($_GET['host']) ? $_GET['host'] : '127.0.0.1',
    'user' => isset($_GET['user']) ? $_GET['user'] : 'root',
    'pass' => isset($_GET['pass']) ? $_GET['pass'] : '',
    'db'   => isset($_GET['db'])   ? $_GET['db']   : 'baguiotrack'
];

header('Content-Type: text/plain; charset=utf-8');

// Try provided credentials first
if (try_connect_and_import($params['host'], $params['user'], $params['pass'], $params['db'], $sqlFile)) {
    exit(0);
}

// If first try failed, try some common fallbacks
$fallbacks = [
    ['host'=>'127.0.0.1','user'=>'root','pass'=>'','db'=>'baguiotrack'],
    ['host'=>'localhost','user'=>'root','pass'=>'','db'=>'baguiotrack'],
    ['host'=>'localhost','user'=>'root','pass'=>'root','db'=>'baguiotrack']
];

foreach ($fallbacks as $fb) {
    // skip identical to provided
    if ($fb == $params) continue;
    if (try_connect_and_import($fb['host'], $fb['user'], $fb['pass'], $fb['db'], $sqlFile)) {
        exit(0);
    }
}

echo "All attempts failed. Update credentials or run the SQL manually in phpMyAdmin.\n";
echo "You can call this script with query params, for example:\n";
echo "  /sql/run_seed.php?user=root&pass=&db=baguiotrack\n";
exit(1);

?>
