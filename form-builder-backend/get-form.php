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

// Get the form ID from the URL
$formId = $_GET['id'];

if (!$formId) {
    echo json_encode(['error' => 'Form ID is required']);
    http_response_code(400);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM forms WHERE id = :id");
    $stmt->bindParam(':id', $formId);
    $stmt->execute();
    $form = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($form) {
        echo json_encode($form);
    } else {
        echo json_encode(['error' => 'Form not found']);
        http_response_code(404);
    }
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500);
}
?>
