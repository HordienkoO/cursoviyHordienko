// Отримання елементів, доданих до кошика
const cartContent = document.querySelector(".cart-content");
const totalPrice = document.querySelector(".total-price");

const savedCartItems = localStorage.getItem("cartItems");
const savedTotalPrice = localStorage.getItem("totalPrice");

if (savedCartItems) {
  cartContent.innerHTML = savedCartItems; // Відображення вмісту кошика
}

if (savedTotalPrice) {
  totalPrice.textContent = savedTotalPrice; // Відображення загальної вартості
}



function createDocument() {
  // Отримуєм значення заповнених полів форми
  const email = document.getElementById('email').value;
  const address = document.getElementById('adr').value;

  // Перевіряєм заповненість полів
  if (email === '' || address === '') {
      alert('Будь ласка, заповніть всі обов\'язкові поля перед підтвердженням покупки.');
      return; // в разі якщо вони не заповнені - зупиняєм функцію
  }

  // Створення чеку
  const cart_content = cartContent.innerHTML;
  const cartPrice = document.querySelector(".cart-price").textContent;
  const cartProductTitle = document.querySelector(".cart-product-title").textContent;
  const totalPrice = document.querySelector(".total-price").textContent;
  const receiptNumber = Math.floor(Math.random() * 1000000) + 1;

  const blob = new Blob([`<h2>Ваш чек</h2>
                       <p><b>Ваші дані: </b></p>
                       <p>Email: ${email}</p>
                       <p>Адреса: ${address}</p>
                       <p><b>Ви купили: </b>${cartProductTitle} за ${cartPrice}</p>
                       <p>Загальна ціна: ${totalPrice}</p>
                       <p>Номер чеку: ${receiptNumber}</p>`], { type: 'text/html' });

  // Посилання для завантаження документа
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = 'purchase_receipt.html';

  // Додає посилання на сторінку success.html
  downloadLink.addEventListener('click', function () {
      window.location.href = 'success.html';
  });

  // Автоматичне натискання посилання для завантаження
  downloadLink.click();
}