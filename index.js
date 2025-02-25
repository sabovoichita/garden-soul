let cart = [];

function showNotification(message) {
  const notification = document.createElement("div");
  notification.classList.add("cart-notification");
  notification.textContent = message;
  document.body.appendChild(notification);
  setTimeout(() => {
    notification.style.opacity = "1";
  }, 100);

  setTimeout(() => {
    notification.style.opacity = "0";
    setTimeout(() => {
      notification.remove();
    }, 500);
  }, 2000);
}

function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  if (cartItems) {
    cartItems.innerHTML = "";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <img src="${item.image}" alt="${item.name}" height="50px"/>
          <span>${item.name} (x ${item.quantity} pieces)</span>
          <button onclick="removeFromCart(${index})">❌ Remove</button>
        `;
      cartItems.appendChild(li);
    });
  }
}

async function sendOrderToWhatsApp() {
  if (cart.length === 0) {
    await simpleAlert("Your cart is empty!");
    return;
  }
  const details = await simpleMultiPrompt("Enter your details:", [
    { label: "Name", id: "customerName", placeholder: "Your name" },
    { label: "Address", id: "customerAddress", placeholder: "Your address" },
    {
      label: "Phone Number",
      id: "customerPhone",
      placeholder: "Your phone number",
    },
  ]);
  console.log("Details entered:", details);
  if (!details) {
    console.log("No details provided.");
    return;
  }
  const { customerName, customerAddress, customerPhone } = details;
  console.log("Customer Name:", customerName);
  console.log("Customer Address:", customerAddress);
  console.log("Customer Phone:", customerPhone);
  let message = `🛍 *New Order from The Garden Soul!*\n\n`;
  cart.forEach((item, index) => {
    message += `${index + 1}. ${item.name} (x${item.quantity})\n`;
  });
  message += `\n📞 *Customer Details:*\n- Name: ${customerName}\n- Address: ${customerAddress}\n- Phone: ${customerPhone}`;
  console.log("Final WhatsApp Message:", message); // Debugging line
  const encodedMessage = encodeURIComponent(message);
  const phone = "0034642771871";
  const whatsappURL = `https://wa.me/${phone}?text=${encodedMessage}`;
  console.log("WhatsApp URL:", whatsappURL); // Debugging line
  window.open(whatsappURL, "_blank");
}

function showCategory(category) {
  const allSections = document.querySelectorAll(".productCategory");

  allSections.forEach((section) => {
    if (category === "all") {
      section.style.display = "block";
    } else {
      section.style.display =
        section.id === `category-${category}` ? "block" : "none";
    }
  });
}

function generateProductImages(category, count) {
  let imagesHTML = "";
  for (let i = 1; i <= count; i++) {
    imagesHTML += `
          <div class="productCard">
            <div class="productImgWrap">
              <img src="images/${category}/${category}-${i}.jpg" alt="${category} ${i}" class="productImage" height="200px"/>
            </div>
            <div class="productDetails">
              <h3>${
                category.charAt(0).toUpperCase() + category.slice(1)
              } ${i}</h3>
               <button class="addToCart" data-category="${category}" data-index="${i}">🛒 Add to Cart</button>
            </div>
          </div>
        `;
  }
  return imagesHTML;
}
function generateCategorySection(category, count) {
  return `
      <div class="productCategory" id="category-${category}">
        <h3>${
          category.charAt(0).toUpperCase() + category.slice(1)
        } Collection</h3>
        <div class="productGrid">
          ${generateProductImages(category, count)}
        </div>
      </div>
    `;
}

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
          <li><a href="#" data-page="products">🎎 Products</a></li>
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
function createProductsPage() {
  return `
      <section id="products">
      <h2>🎈 Our Products!</h2>
      <p>🎀 Choose from our unique and personalized gifts.</p>
      <select id="categorySelector" onchange="showCategory(this.value)">
        <option value="all">📦 All Products</option>
        <option value="absolvent">🎓 Absolvent</option>
        <option value="arici">🦔 Arici</option>
        <option value="broasca">🐸 Broasca</option>
        <option value="buburuza">🐞 Buburuza</option>
        <option value="bufnita">🦉 Bufnita</option>
        <option value="caine">🐶 Caine</option>
        <option value="caprioara">🦌 Caprioara</option>
        <option value="cocos">🐔 Cocos</option>
        <option value="copac">🌳 Copac</option>
        <option value="cos">🧺 Cos</option>
        <option value="craniu">💀 Craniu</option>
        <option value="doamna">👩Doamna</option>
        <option value="extraterestru">👽 Extraterestru</option>
        <option value="icoana">🖼 Icoana</option>
        <option value="iepuras">🐰 Iepuras</option>
        <option value="ingeras">👼 Ingeraș</option>
        <option value="lady">💃 Lady</option>
        <option value="lebada">🦢 Lebada</option>
        <option value="leu">🦁 Leu</option>
        <option value="magar">🦄 Măgar</option>
        <option value="mistret">🐗 Mistret</option>
        <option value="pisica">😻 Pisica</option>
        <option value="pitici">🎭 Pitici</option>
        <option value="poneu">🐴 Poneu</option>
        <option value="porumbel">🕊 Porumbel</option>
        <option value="rata">🦆 Rata</option>
        <option value="trunchi">🌴 Trunchi</option>
        <option value="uliu">🦅 Uliu</option>
        <option value="veverita">🐿 Veverita</option>
      </select>
      <div id="productsContainer">
        ${generateCategorySection("absolvent", 9)}
        ${generateCategorySection("arici", 5)}
        ${generateCategorySection("broasca", 4)}
        ${generateCategorySection("buburuza", 1)}
        ${generateCategorySection("bufnita", 1)}
        ${generateCategorySection("caine", 22)}
        ${generateCategorySection("caprioara", 15)}
        ${generateCategorySection("cocos", 3)}
        ${generateCategorySection("copac", 12)}
        ${generateCategorySection("cos", 3)}
        ${generateCategorySection("craniu", 4)}
        ${generateCategorySection("doamna", 70)}
        ${generateCategorySection("extraterestru", 4)}
        ${generateCategorySection("icoana", 3)}
        ${generateCategorySection("iepuras", 33)}
        ${generateCategorySection("ingeras", 37)}
        ${generateCategorySection("lady", 4)}
        ${generateCategorySection("lebada", 36)}
        ${generateCategorySection("leu", 23)}
        ${generateCategorySection("magar", 2)}
        ${generateCategorySection("mistret", 5)}
        ${generateCategorySection("pisica", 8)}
        ${generateCategorySection("pitici", 1)}
        ${generateCategorySection("poneu", 16)}
        ${generateCategorySection("porumbel", 18)}
        ${generateCategorySection("rata", 1)}
        ${generateCategorySection("trunchi", 3)}
        ${generateCategorySection("uliu", 5)}
        ${generateCategorySection("veverita", 21)}
      </div>
    </section>
    `;
}

function createOrdersPage() {
  return `
      <section id="orders">
        <h2>🛒 Your Orders are here!</h2>
        <p>🥂 Thank you for shopping with us!</p>
        <div id="cart">
          <h3>🛍 Your Cart</h3>
          <ul id="cartItems"></ul>
          <button id="placeOrder">✅ Place Order</button>
        </div>
      </section>
      `;
}

function addToCart(category, index) {
  const productName = `${
    category.charAt(0).toUpperCase() + category.slice(1)
  } ${index}`;
  const existingItem = cart.find(
    (item) => item.category === category && item.index === index
  );
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      category: category,
      index: index,
      name: productName,
      image: `images/${category}/${category}-${index}.jpg`,
      quantity: 1,
    });
  }

  updateCartUI();
  showNotification(`${productName} added to cart!`);
}

function removeFromCart(index) {
  if (cart[index].quantity > 1) {
    cart[index].quantity -= 1;
  } else {
    cart.splice(index, 1);
  }
  updateCartUI();
}

function loadPage(page) {
  const main = document.getElementById("main");
  if (page === "home") {
    main.innerHTML = createHomePage();
  } else if (page === "products") {
    main.innerHTML = createProductsPage();
  } else if (page === "orders") {
    main.innerHTML = createOrdersPage();
    updateCartUI();
  } else {
    console.log("creating page");
    main.innerHTML = `<h2>${page} page is under construction</h2>`;
  }
}

function initEvents() {
  document.body.innerHTML = createHeader() + `<main id="main"></main>`;
  loadPage("home");

  document.body.insertAdjacentHTML(
    "afterbegin",
    `<button id="menu-toggle">☰</button>`
  );

  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("top-menu").classList.toggle("active");
  });

  document
    .getElementById("top-menu-ul")
    .addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        const page = e.target.getAttribute("data-page");
        loadPage(page);
      }
    });

  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("addToCart")) {
      const category = e.target.getAttribute("data-category");
      const index = e.target.getAttribute("data-index");
      addToCart(category, index);
    } else if (e.target.id === "placeOrder") {
      sendOrderToWhatsApp();
    }
  });
}

initEvents();
