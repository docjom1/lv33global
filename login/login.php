<?php
session_start();

// Replace with your actual validation logic
$username = $_POST['username'];
$password = $_POST['password'];

// Dummy check for example
if ($username === 'admin' && $password === 'secret') {
    $_SESSION['username'] = $username;
    header("Location: ../homepage.html"); // Adjust the path as needed
    exit();
} else {
    echo "<script>alert('Invalid credentials'); window.location.href = 'page.html';</script>";
}
?>
