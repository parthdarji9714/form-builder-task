<?php
// Allow CORS from any origin (adjust to your frontend origin if needed)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests (OPTIONS method)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}
header("Content-Type: application/json");
include 'db.php';

try {
    $stmt = $conn->query("SELECT id, form_name, created_at, updated_at FROM forms ORDER BY created_at DESC");
    $forms = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($forms);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500);
}
?>
