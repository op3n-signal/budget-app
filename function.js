(() => {

    document.getElementById('add').addEventListener('click', function (e) {
        e.preventDefault();
        const item = document.getElementById('item');
        const amount = document.getElementById('amount');
        const type = document.getElementById('type');
        const list = document.querySelector('.' + type.value + '-list');

        addItem(item.value, amount.value, type.value, list);
    });
})();

let budget = 0;

//adding item here
function addItem(_item, _amount, _type, _list) {
    const isItem = document.getElementById(_item + '-');
    let errorEl = document.querySelector('.text-danger');

    if (_item == '' || _amount == '' || isItem != null) {
        errorEl.innerHTML = 'item already exists';
        return;
    }

    if (errorEl.innerHTML != '') errorEl.innerHTML = '';

    const rowHtml = `
        <tr id="${_item}-" class="item-row">
            <td>${_item}</td>
            <td>${_amount}</td>
        </tr>
        `;

    _list.innerHTML += rowHtml;

    modifyBudget(_type, _amount);
}

//modifying the budget here
function modifyBudget(_type, _amount) {
    const budgetEl = document.getElementById('budget');
    budget = _type == 'expense' ? budget - parseFloat(_amount) : budget + parseFloat(_amount);

    //insert commas
    budgetEl.textContent = setAsCurrency(budget);
}

function setAsCurrency(_budget) {
    let result = _budget.toFixed(2).split('.');
    const internationalNumberFormat = new Intl.NumberFormat('en-US');
    const newFormat = internationalNumberFormat.format(result[0]);
    result[0] = newFormat;
    result.splice(1, 0, '.');
    return result.join('');
}