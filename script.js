document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');

    expenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(expenseForm);
        const description = formData.get('description');
        const amount = formData.get('amount');
        const category = formData.get('category');

        try {
            const response = await fetch('/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ description, amount, category })
            });
            if (response.ok) {
                const data = await response.text();
                alert(data); 
                expenseForm.reset(); 
                loadExpenses(); 
            } else {
                const error = await response.text();
                alert(error); 
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });

    function loadExpenses() {
        fetch('/expenses')
            .then(response => response.json())
            .then(expenses => {
                expenseList.innerHTML = ''; 
                expenses.forEach(expense => {
                    const li = document.createElement('li');
                    li.textContent = `${expense.description} - $${expense.amount} (${expense.category})`;
                    expenseList.appendChild(li);
                });
            })
            .catch(error => console.error('Error:', error));
    }

    loadExpenses();
});
