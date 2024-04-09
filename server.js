
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

mongoose.connect('mongodb://localhost/money_tracker', { useNewUrlParser: true, useUnifiedTopology: true });

const Expense = mongoose.model('Expense', {
    description: String,
    amount: Number,
    category: String
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/expenses', (req, res) => {
    const { description, amount, category } = req.body;
    const expense = new Expense({ description, amount, category });
    expense.save()
        .then(() => res.send('Expense added successfully'))
        .catch(err => res.status(400).send(err));
});

app.get('/expenses', (req, res) => {
    Expense.find()
        .then(expenses => res.json(expenses))
        .catch(err => res.status(400).send(err));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
