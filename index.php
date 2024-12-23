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
    $ogMessage = "$days days remaining! (UTC time)";
} elseif ($days === 1) {
    $ogMessage = "Get ready, it's tomorrow! (UTC time)";
} elseif ($days === 0 && $hours > 0) {
    $ogMessage = "Only just $hours hours left! (UTC time)";
} elseif ($days === 0 && $hours === 0 && $minutes > 0) {
    $ogMessage = "It's the final stretch! (UTC time)";
} else {
    $ogMessage = "How many time left?";
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <meta name="description" content="How many time left for this year?">
    <meta name="keywords" content="New year countdown, New year timer, New year, Timer, Countdown">
    <meta name="author" content="Alkanife">
    <meta name="theme-color" content="#0e0d0d">

    <meta property="og:title" content="New year timer"/>
    <meta property="og:type" content="website"/>
    <meta property="og:url" content="https://alka.dev/newyear"/>
    <meta property="og:description" content="<?php echo htmlspecialchars($ogMessage, ENT_QUOTES, 'UTF-8'); ?>"/>
    <meta property="og:image" content="https://alka.dev/newyear/assets/img/thumb.png"/>
    
    <link rel="icon" href="assets/img/firework.svg">
    <link rel="stylesheet" href="assets/style/style.css">
    
    <title>New year timer</title>
</head>

<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HQLYBFK2ZE"></script>
<script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-HQLYBFK2ZE');
</script>
<!--------------------------->

<body>
    <div id="particles-js"></div>
    <h1 id="timer-title" title="Click to dismiss"></h1>
    <main>
        <div class="daysContainer">
            <p class="num" id="days"></p>
            <p class="text" id="days-text"></p>
            <p class="dots"></p>
        </div>
        <div class="hoursContainer">
            <p class="num" id="hours"></p>
            <p class="text" id="hours-text"></p>
            <p class="dots"></p>
        </div>
        <div class="minutesContainer">
            <p class="num" id="minutes"></p>
            <p class="text" id="minutes-text"></p>
            <p class="dots"></p>
        </div>
        <div class="secondsContainer">
            <p class="num" id="seconds"></p>
            <p class="text" id="seconds-text"></p>
        </div>
    </main>
</body>

<script src="js/tsparticles.confetti.bundle.min.js"></script>
<script src="js/particles.min.js"></script>
<script src="js/script.js"></script>
</html>