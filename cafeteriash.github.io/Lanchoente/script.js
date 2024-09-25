let total = 0;

function updateTotal() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    total = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .reduce((sum, checkbox) => sum + parseFloat(checkbox.value), 0);

    document.getElementById('valor').value = `R$ ${total.toFixed(2)}`;
    updateItensSelecionados(); 
}

function updateItensSelecionados() {
    const itensSelecionados = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    checkboxes.forEach(checkbox => {
        const label = checkbox.nextElementSibling.textContent;
        itensSelecionados.push(label);
    });

    const itensDiv = document.getElementById('itens-selecionados');
    itensDiv.innerHTML = itensSelecionados.length > 0 
        ? itensSelecionados.join('<br>') 
        : 'Nenhum item selecionado.';
}

let contadorPedidos = 0; // Variável global para contar os pedidos

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

    // Gerar um identificador único para o pedido
    const idPedido = `PEDIDO-${++contadorPedidos}`; // Incrementa e gera o ID

    const pedido = {
        id: idPedido, // Adiciona o ID ao pedido
        nome: nome,
        pagamento: pagamento,
        total: total.toFixed(2),
        itens: Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(checkbox => checkbox.nextElementSibling.textContent)
    };

    localStorage.setItem(idPedido, JSON.stringify(pedido)); // Salva o pedido com o ID

    alert(`Pedido de ${nome} finalizado com sucesso!\nID: ${idPedido}\nTotal: R$ ${total.toFixed(2)}`);

    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    total = 0;
    document.getElementById('valor').value = 'R$ 0,00';
    document.getElementById('nome').value = '';
    document.getElementById('pagamento').selectedIndex = 0;

    updateItensSelecionados();
}
