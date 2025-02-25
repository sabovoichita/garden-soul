console.log("Welcome");

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

function initEvents() {
  document.body.innerHTML = createHeader();
}
initEvents();
