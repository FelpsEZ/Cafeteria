let total = 0;

function updateTotal() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    total = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .reduce((sum, checkbox) => sum + parseFloat(checkbox.value), 0);

    document.getElementById('valor').value = `R$ ${total.toFixed(2)}`;
}

function finalizarPedido(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const pagamento = document.getElementById('pagamento').value;

    if (!nome) {
        alert('Por favor, digite seu nome.');
        return;
    }

    if (!pagamento) {
        alert('Por favor, selecione um método de pagamento.');
        return;
    }

    alert(`Pedido de ${nome} finalizado com sucesso!\nTotal: R$ ${total.toFixed(2)}`);

    // Limpar seleção e total
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    total = 0;
    document.getElementById('valor').value = 'R$ 0,00';
    document.getElementById('nome').value = '';
    document.getElementById('pagamento').selectedIndex = 0;
}