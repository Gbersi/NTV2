document.getElementById("add-expense-btn").addEventListener("click", addExpense);

function fetchExpenses() {
    fetch('http://localhost:3001/api/expenses')
        .then(response => response.json())
        .then(data => {
            const expenseList = document.getElementById('expense-items');
            const totalAmountElement = document.getElementById('total-amount');
            expenseList.innerHTML = ''; 

            let totalExpenses = 0; 

            data.response.forEach(expense => {
                const li = document.createElement('li');
                li.innerHTML = `${expense.name} - $${expense.cost.toFixed(2)} <button class="delete-btn" onclick="deleteExpense(${expense.id})">Delete</button>`;
                expenseList.appendChild(li);

         
                totalExpenses += expense.cost;
            });

            
            totalAmountElement.textContent = totalExpenses.toFixed(2);
        });
}

function addExpense() {
    const name = document.getElementById('expense-name').value;
    const cost = document.getElementById('expense-cost').value;

    if (!name || !cost) {
        alert("Please provide both expense name and cost.");
        return;
    }

    fetch('http://localhost:3001/api/create-expense', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            cost: parseFloat(cost)
        })
    })
    .then(response => response.json())
    .then(() => {
        fetchExpenses();
    })
    .catch(error => console.error('Error:', error));
}

function deleteExpense(id) {
    fetch(`http://localhost:3001/api/expense/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(() => {
        fetchExpenses(); 
    })
    .catch(error => console.error('Error:', error));
}


window.onload = fetchExpenses;
