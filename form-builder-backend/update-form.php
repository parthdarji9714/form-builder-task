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

$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (!isset($data['form_name']) || !isset($data['form_data']) || !isset($_GET['id'])) {
    echo json_encode(['error' => 'Invalid input']);
    http_response_code(400);
    exit;
}

$formId = $_GET['id'];
$formName = $data['form_name'];
$formData = json_encode($data['form_data']);
$timestamp = date('Y-m-d H:i:s');

try {
    $stmt = $conn->prepare("UPDATE forms SET form_name = :form_name, form_data = :form_data, updated_at = :updated_at WHERE id = :id");
    $stmt->bindParam(':form_name', $formName);
    $stmt->bindParam(':form_data', $formData);
    $stmt->bindParam(':updated_at', $timestamp);
    $stmt->bindParam(':id', $formId);
    $stmt->execute();

    echo json_encode(['message' => 'Form updated successfully!']);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500);
}
?>
