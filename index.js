function createTitle() {
  return `<h1>The Garden Soul</h1>`;
}
function createHeader() {
  return `
    <header>
      <div id="logo-wrapper">
          <img src="images/logo/logo.jpg" alt="logo" id="logo" width="100px"/>
      </div>
      ${createTitle()}
      ${createMenuBar()}
    </header>`;
}

function createMenuBar() {
  return `<div id="top-menu">
        <ul id="top-menu-ul">
          <li><a href="#" data-page="home">💚 Home</a></li>
          <li><a href="#" data-page="products">👁‍🗨 Products</a></li>
          <li><a href="#" data-page="orders">💲 Orders</a></li>
          <li><a href="#" data-page="reviews">♻ Reviews</a></li>
          <li><a href="#" data-page="contact">💨 Contact</a></li>
        </ul>
      </div>
      `;
}
function createHomePage() {
  return `
        <section id="home">
          <h2>💌 Welcome to The Garden Soul!</h2>
          <p>✅ Your one-stop shop for unique and personalized  garden gifts.</p>
          <img src="images/logo/home-banner.jpg" alt="Banner" />
        </section>
        `;
}

function loadPage(page) {
  const main = document.getElementById("main");
  if (page === "home") {
    main.innerHTML = createHomePage();
  } else {
    console.log("creating page");
    main.innerHTML = `<h2>${page} page is under construction</h2>`;
  }
}

function initEvents() {
  document.body.innerHTML = createHeader() + `<main id="main"></main>`;
  loadPage("home");
  document
    .getElementById("top-menu-ul")
    .addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        const page = e.target.getAttribute("data-page");
        loadPage(page);
      }
    });
}
initEvents();
