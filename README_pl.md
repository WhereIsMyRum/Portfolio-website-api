<html>
<body>
<h1 class="title">Portfolio Backend</h1>
<h3 class="why">Powód</h3>
<p class="why">Teoretycznie Backend w niniejszej aplikacji nie jest koniecznością, jako że główna funkcjonalność, poza tłumaczeniem strony, leży w wysyłaniu zapytań do API githuba. Niemniej jednak, użycie backendu pozwala na parsowanie danych na serwerze, minimalizując tym samym zużycie zasobów po stronie klienta. Dodatkowo pozwala na generowanie kodu HTML na podstawie plików README pochodzących z repozytoriów, pozwalając tym samym na tworzenie w łatwy sposób szczegółowych stron poszczególnych projektów. No i dzięki temu mogłem poznać lepiej Node.js oraz framework Express.js.</p>
<h3 class="what">Cel</h3>
<div class="what">Zaimplementowanie lekkiego backendu jako REST API przy użyciu Node.js oraz Express.js, posiadającego (na chwilę obecną) jedynie trzy end pointy:
  <ul>
    <li>Ogólna lista projektów <i>(GET /api/projects)</i></li>
    <li>Szczegółowy widok projektu <i>(GET /api/projects/proj-name)</i></li>
    <li>Wysyłanie formularza kontaktowego <i>(POST  /api/contact)</i></li>
  </ul>
</div>
<h3 class="how">Wykonanie</h3>
<p class="how">Od samego początku backend budowany był biorąc pod uwagę możliwość przyszłego jego rozszerzania o dodatkowe elementy / funkcjonalność. Elementem bazowym każdego end pointu jest router, które routują zapytania do odpowiednich kontrollerów. Kontrollery kontaktują się z kolei z właściwymi serwisami, które odpowiadają za logikę biznesową API. Dodatkowo zaimplementowany został middleware, który odpowiada za kontakt i pozyskiwanie danych z redis cache, a także dodatkowe funkcje odpowiadające za parsowanie plików README, które znajdują się w folderze <i>utils</i></p>
<h3 class="technologies">Zastosowane technologie</h3>
<ul class="technologies">
  <li class="technologies" hover="Node.js">Node.js</li>
  <li class="technologies" hover="Express.js">Express.js</li>
  <li class="technologies" hover="Simple Email Service">AWS SES</li>
</ul>
<h3 class="usage">Jak korzystać</h3>
  <p class="usage">Po dokładne informacje odnośnie uruchmonienia projektu zajrzyj do projektu <i>Portfolio website</i>.<</p>
<hr>
<small class="created">Data powstania: December 2019</small>
</body>
</html>
