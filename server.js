import express from 'express';
import sqlite3 from 'sqlite3';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

const db = new sqlite3.Database('shop.db');

app.get('/', (req, res) => {
    res.sendFile('index.html',  { root: 'public' });
});

/*app.post('/buy', (req, res) => {
    // Тут ви могли б обробити POST-запит і оновити БД, але цей приклад лише відображає ідею.
    // Передайте дані з клієнта і оновіть БД за потреби.
    
    // Приклад обробки даних з клієнта:
    const { items } = req.body;

    for (const item of items) {
        const { title, quantity } = item;
        db.run('UPDATE products SET quantity = quantity - ? WHERE title = ?', [quantity, title], (err) => {
            if (err) {
                console.error('Помилка оновлення кількості товару: ' + err.message);
            }
        });
    }

    res.sendStatus(200);
});
*/
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
