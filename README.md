<html>
<body>
<h1 class="title">Portfolio Backend</h1>
<h3 class="why">Why</h3>
<p class="why">Backend in this application is not technically a necessity, as all there is here are some queries to the github API (well, maybe for the form submission). Nevertheless, making a custom backend allows data parsing on the server, taking the load off the client. Moreover, it allows an easy custom HTML generation based on the README.md file, which allows creating easily customizable detailed page about every project. And allows me to learn some Node and Express = profit.</p>
<h3 class="what">What</h3>
<p class="what">A thin backend implemented as a REST API using Express and Node, with just three endpoints:
  <ul>
    <li>General projects list <i>(GET /api/projects)</i></li>
    <li>Project's details <i>(GET /api/projects/proj-name)</i></li>
    <li>Submitting contact from <i>(POST  /api/contact)</i></li>
  </ul></p>
<h3 class="how">How</h3>
<p class="how">From the start the backend component was built with possible future extensibility in mind. That's why the main focus was on organized code structure. The code was divided into routes, which route to corresponding controllers, which then contact with correct services which handle the business logic of the application. In addition to that, a custom middleware for redis caching was implemented, as well as some utility functions, which can be found in the <i>utils</i> folder.</p>
<h3 class="technologies">Technologies used</h3>
<ul class="technologies">
  <li class="technologies" hover="Node.js">Node.js</li>
  <li class="technologies" hover="Express.js">Express.js</li>
  <li class="technologies" hover="Simple Email Service">AWS SES</li>
</ul>
<h3 class="usage">How to use</h3>
  <p class="usage">Please refer to <i>How to use</i> section of the Portfolio Website project.</p>
<hr>
<small class="created">Created: December 2019</small>
</body>
</html>
