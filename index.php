<?php
  // Algorithmic Ontological agents
  // By 220 (2019)

  $e = $_GET ["e"];
  if ($e=="") $e = 2;
?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />

    <title>Algorithmic Ontological Agents</title>
    <script src="p5/p5.min.js"></script>

    <script src="utils.js"></script>

    <?php include "evolution$e/include.html" ?>

    <style></style>

    <link rel="stylesheet" type="text/css" href="css/agents.css" />
  </head>

  <body>
    <?php include "evolution$e/body.html"; ?>
  </body>
</html>
