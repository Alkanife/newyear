<?php
date_default_timezone_set('UTC');

$currentDate = new DateTime();
$newYearDate = new DateTime('January 1 ' . ($currentDate->format('Y') + 1));
$interval = $currentDate->diff($newYearDate);

$days = (int) $interval->format('%a');
$hours = (int) $interval->format('%h');
$minutes = (int) $interval->format('%i');
$currentYear = $currentDate->format('Y');

if ($currentDate->format('Y-m-d') === $newYearDate->format('Y-m-d')) {
    $ogMessage = "Happy new year " . $newYearDate->format('Y') . "!";
} elseif ($days > 1) {
    $ogMessage = "$days days remaining! (UTC)";
} elseif ($days === 1) {
    $ogMessage = "Get ready, it's tomorrow! (UTC)";
} elseif ($days === 0 && $hours > 0) {
    $ogMessage = "Only just $hours hours left! (UTC)";
} elseif ($days === 0 && $hours === 0 && $minutes > 0) {
    $ogMessage = "It's the final stretch! (UTC)";
} else {
    $ogMessage = "How many time left?";
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <meta property="og:title" content="New year timer"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://alka.dev/newyear"/>
    <meta property="og:description" content="<?php echo htmlspecialchars($ogMessage, ENT_QUOTES, 'UTF-8'); ?>"/>
    <meta property="og:image" content="https://alka.dev/newyear/firework.png"/>
    <meta name="theme-color" content="#0e0d0d">
    
    <link rel="icon" href="firework.png">
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Quantico:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    
    <title>New year timer</title>
</head>
<body>
    <main>
        <h1></h1>
    </main>
</body>

<script src="https://cdn.jsdelivr.net/npm/@tsparticles/confetti@3.7.1/tsparticles.confetti.bundle.min.js"></script>
<script src="script.js"></script>
</html>