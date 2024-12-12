<?php

// Allow CORS from any origin (adjust to your frontend origin if needed)
header("Access-Control-Allow-Origin: *");

// Allow specific HTTP methods
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

// Allow specific headers
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Handle preflight requests (OPTIONS method)

header("Content-Type: application/json");
include 'db.php';

// Decode the incoming JSON
$data = json_decode(file_get_contents("php://input"), true);

// // Validate input
// if (!isset($data['form_name']) || !isset($data['form_data'])) {
//     echo json_encode(['error' => 'Invalid input']);
//     http_response_code(400);
//     exit;
// }

$formName = $data['form_name'];
$formData = json_encode($data['form_data']);
$timestamp = date('Y-m-d H:i:s');

try {
    $stmt = $conn->prepare("INSERT INTO forms (form_name, form_data, created_at, updated_at) VALUES (:form_name, :form_data, :created_at, :updated_at)");
    $stmt->bindParam(':form_name', $formName);
    $stmt->bindParam(':form_data', $formData);
    $stmt->bindParam(':created_at', $timestamp);
    $stmt->bindParam(':updated_at', $timestamp);
    $stmt->execute();

    echo json_encode(['message' => 'Form saved successfully!', 'form_id' => $conn->lastInsertId()]);
} catch (Exception $e) {
    echo json_encode(['error' => $e->getMessage()]);
    http_response_code(500);
}
?>
