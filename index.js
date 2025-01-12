const inputs = document.querySelectorAll('input');
const resultadosDiv = document.getElementById('resultados');
const lucroBox = document.getElementById('lucroBox');
const margemBox = document.getElementById('margemBox');
const roiBox = document.getElementById('roiBox');
const comissaoFBABox = document.getElementById('comissaoFBA');
const referalFeeBox = document.getElementById('referalFee');

inputs.forEach(input => {
    input.addEventListener('input', calcularLucro);
});

function calcularLucro() {
    const precoVenda = parseFloat(document.getElementById('precoVenda').value) || 0;
    let precoCompra = parseFloat(document.getElementById('precoCompra').value) || 0;
    const impostoCompra = parseFloat(document.getElementById('impostoCompra').value) || 0;
    const impostoVenda = parseFloat(document.getElementById('impostoVenda').value) || 0;
    const cupomDesconto = parseFloat(document.getElementById('cupomDesconto').value) || 0;
    const custoEnvio = parseFloat(document.getElementById('custoEnvio').value) || 0;
    const outrosCustos = parseFloat(document.getElementById('outrosCustos').value) || 0;
    const custoArmazenamento = parseFloat(document.getElementById('custoArmazenamento').value) || 0;

    // Aplicando o cupom de desconto sobre o preço de compra
    precoCompra -= (precoCompra * cupomDesconto / 100);

    // Cálculos
    const taxaFBA = precoVenda * 0.14;
    const referalFee = precoVenda * 0.1333;

    const custosTotais = precoCompra + 
             (precoCompra * impostoCompra / 100) + 
             custoEnvio + 
             outrosCustos + 
             custoArmazenamento + 
             taxaFBA + 
             referalFee + 
             (precoVenda * impostoVenda / 100);
    
    const custosExtras = 
        custoEnvio + 
        outrosCustos + 
        custoArmazenamento + 
        taxaFBA + 
        referalFee + 
        (precoVenda * impostoVenda / 100);

    const lucro = precoVenda - custosTotais;
    const margem = (lucro / precoVenda) * 100;
    const roi = (lucro / (precoCompra + (precoCompra * cupomDesconto / 100))) * 100;

    // preco de compra sugerido
    const margemDesejada = 0.2; 
    var precoCompraSugerido = precoVenda - (margemDesejada * precoVenda) - custosExtras;
    precoCompraSugerido += (precoCompraSugerido * impostoCompra / 100)
    const precoCompraSugeridoBox = document.querySelector('#precoCompraSugerido');
    precoCompraSugeridoBox.innerHTML = 'Preço de compra sugerido: R$ ' + precoCompraSugerido.toFixed(2);

    // preco de venda sugerido
    const custosTotaisSemVenda = precoCompra +
        (precoCompra * impostoCompra / 100) +
        custoEnvio +
        outrosCustos +
        custoArmazenamento;
    // Considerar os custos variáveis relacionados ao preço de venda
    const precoVendaSugerido = custosTotaisSemVenda / (1 - margemDesejada - 0.14 - 0.1333 - (impostoVenda / 100));
    const precoVendaSugeridoBox = document.querySelector('#precoVendaSugerido');
    precoVendaSugeridoBox.innerHTML = 'Preço de venda sugerido: R$ ' + precoVendaSugerido.toFixed(2);
    
    // Break Even
    const precoBreakEven = custosTotaisSemVenda / (1 - 0.14 - 0.1333 - (impostoVenda / 100));
    const precoBreakEvenBox = document.querySelector('#precoBreakEven');
    precoBreakEvenBox.innerHTML = 'Break Even: R$ ' + precoBreakEven.toFixed(2);


    //desconto necessario
    const descontoNecessario = (precoCompra - precoCompraSugerido) * 100 / precoCompra
    const descontoNecessarioBox = document.querySelector('#descontoNecessario');
    if (descontoNecessario > 0 && precoVenda) {
        descontoNecessarioBox.innerHTML = 'Desconto necessario: %' + descontoNecessario.toFixed(2);
    } else {
        descontoNecessarioBox.innerHTML = 'Desconto necessario: % '
    }
    
    // Mostrar resultados
    if (lucro >= 0) {
        lucroBox.className = "p-4 rounded-md bg-green-600 text-green-100";
        lucroBox.innerHTML = `<p><strong>Lucro:</strong> R$ ${lucro.toFixed(2)}</p>`;
    } else {
        lucroBox.className = "p-4 rounded-md bg-red-600 text-red-100";
        lucroBox.innerHTML = `<p><strong>Prejuízo:</strong> R$ ${lucro.toFixed(2)}</p>`;
    }

    // Mostrar margem com color change
    if (margem >= 0) {
        margemBox.className = "p-4 rounded-md bg-green-500 text-green-100";
        margemBox.innerHTML = `<p><strong>Margem:</strong> ${margem.toFixed(2)}%</p>`;
    } else {
        margemBox.className = "p-4 rounded-md bg-red-500 text-red-100";
        margemBox.innerHTML = `<p><strong>Margem:</strong> ${margem.toFixed(2)}%</p>`;
    }

    // Mostrar ROI
    roiBox.className = "p-4 rounded-md bg-purple-600 text-purple-100";
    roiBox.innerHTML = `<p><strong>ROI:</strong> ${roi.toFixed(2)}%</p>`;

    // Mostrar comissão FBA
    comissaoFBABox.innerHTML = `<p><strong>Comissão FBA (14%):</strong> R$ ${taxaFBA.toFixed(2)}</p>`;
    
    // Mostrar referal fee
    referalFeeBox.innerHTML = `<p><strong>Referal Fee (13.33%):</strong> R$ ${referalFee.toFixed(2)}</p>`;
}
