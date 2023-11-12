import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('shop.db');

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS products (title TEXT, price REAL, quantity INTEGER)");

  const products = [
    { title: "BABYMETAL", price: 500, quantity: 100 },
    { title: "Korn - SOS Doll", price: 570, quantity: 50 },
    { title: "Lorna Store 1", price: 600, quantity: 50 },
    { title: "Lorna Store 2", price: 650, quantity: 50 },
    { title: "CANNIBAL CORPSE - PLASTIC HEAD", price: 788, quantity: 500 },
    { title: "Korn - Self Titled", price: 800, quantity: 500 },
    { title: "Tshiiiiirt", price: 400, quantity: 500 },
    { title: "SHINING", price: 508, quantity: 500 },
    { title: "ANIME", price: 350, quantity: 100 },
    { title: "IMMORTAL 'UNHOLY FORCES OF EVIL'", price: 1150, quantity: 100 },
    { title: "ШАРФ SLIPKNOT", price: 590, quantity: 100 },
    { title: 'KORN "STILL A FREAK"', price: 1150, quantity: 100 },
    { title: "SLIPKNOT (GOATS LOGO)", price: 1150, quantity: 100 },
    { title: "STEEL 139/140OZ-BLK 36(Р)", price: 4950, quantity: 100 },
    { title: 'CANNIBAL CORPSE "HAMMER SMASHED FACE" (RED)', price: 990, quantity: 100 },
    { title: "БРАСЛЕТ", price: 330, quantity: 100 },
  ];

  const insert = db.prepare("INSERT INTO products VALUES (?, ?, ?)");
  products.forEach((product) => {
    insert.run(product.title, product.price, product.quantity);
  });
  insert.finalize();

  db.each("SELECT * FROM products", (err, row) => {
    console.log(`${row.title}: ₴${row.price} (Кількість: ${row.quantity})`);

    // Отримати div елемент за допомогою title товару
    const productBox = document.querySelector(`.product-box:has([data-title="${row.title}"])`);

    // Додати HTML для виведення кількості товару
    const quantityHTML = `<p class="quantity">Кількість: ${row.quantity}</p>`;
    productBox.insertAdjacentHTML('beforeend', quantityHTML);
  });
});

db.close();