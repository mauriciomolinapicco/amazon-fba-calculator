const inputs = document.querySelectorAll('input');
const resultadosDiv = document.getElementById('resultados');
const lucroBox = document.getElementById('lucroBox');
const margemBox = document.getElementById('margemBox');
const roiBox = document.getElementById('roiBox');
const comissaoFBABox = document.getElementById('comissaoFBA');
const referalFeeBox = document.getElementById('referalFee');
const select = document.getElementById('categoria');

inputs.forEach(input => {
    input.addEventListener('input', calcularLucro);
});
select.addEventListener('change', calcularLucro);


function calcularLucro() {
    const precoVenda = parseFloat(document.getElementById('precoVenda').value) || 0;
    let precoCompra = parseFloat(document.getElementById('precoCompra').value) || 0;
    const impostoCompra = parseFloat(document.getElementById('impostoCompra').value) || 0;
    const impostoVenda = parseFloat(document.getElementById('impostoVenda').value) || 0;
    const cupomDesconto = parseFloat(document.getElementById('cupomDesconto').value) || 0;
    const custoEnvio = parseFloat(document.getElementById('custoEnvio').value) || 0;
    const outrosCustos = parseFloat(document.getElementById('outrosCustos').value) || 0;
    const custoArmazenamento = parseFloat(document.getElementById('custoArmazenamento').value) || 0;
    const quantidadeCompra = parseFloat(document.getElementById('quantidadeCompra').value) || 1;
    const taxaFBA = parseFloat(document.getElementById('taxaFBA').value) || 14;
    const categoria = document.getElementById('categoria').value || '';

    // Aplicando o cupom de desconto sobre o preço de compra
    precoCompra -= (precoCompra * cupomDesconto / 100);

    const categoriasImpostos = {
        'Acessórios para dispositivos Amazon': 0.45,
        'Eletrodomésticos - Compactos até $300': 0.15,
        'Eletrodomésticos - Compactos acima de $300': 0.08,
        'Eletrodomésticos - Grandes': 0.08,
        'Automotivo e Motocicletas': 0.12,
        'Ferramentas elétricas de equipamento básico': 0.12,
        'Produtos para bebês até $10': 0.08,
        'Produtos para bebês acima de $10': 0.15,
        'Mochilas, bolsas e bagagens': 0.15,
        'Beleza, Saúde e Cuidados pessoais até $10': 0.08,
        'Beleza, Saúde e Cuidados pessoais acima de $10': 0.15,
        'Suprimentos de Indústria, Empresa e Ciência': 0.12,
        'Roupas e Acessórios até $15': 0.05,
        'Roupas e Acessórios entre $15 e $20': 0.10,
        'Roupas e Acessórios acima de $20': 0.17,
        'Computadores': 0.08,
        'Eletrônicos 2': 0.08,
        'Acessórios para eletrônicos 3 até $100': 0.15,
        'Acessórios para eletrônicos 3 acima de $100': 0.08,
        'Óculos e acessórios': 0.15,
        'Arte até $100': 0.20,
        'Arte entre $100 e $1000': 0.15,
        'Arte entre $1000 e $5000': 0.10,
        'Arte acima de $5000': 0.05,
        'Calçados': 0.15,
        'Móveis até $200': 0.15,
        'Móveis acima de $200': 0.10,
        'Cartões de presente': 0.20,
        'Alimentos até $15': 0.08,
        'Alimentos acima de $15': 0.15,
        'Casa e cozinha': 0.15,
        'Joias até $250': 0.20,
        'Joias acima de $250': 0.05,
        'Jardim': 0.15,
        'Cortadores de grama e sopradores de neve até $500': 0.15,
        'Cortadores de grama e sopradores de neve acima de $500': 0.08,
        'Colchões': 0.15,
        'Multimídia: Livros, DVD, Música, Software e Vídeo': 0.15,
        'Serviços gerenciados pelo vendedor': 0.20,
        'Instrumentos musicais e Produção audiovisual': 0.15,
        'Escritório e papelaria': 0.15,
        'Animais de estimação': 0.15,
        'Esportes e Ar livre': 0.15,
        'Pneus': 0.10,
        'Ferramentas e Melhorias para casa': 0.15,
        'Brinquedos e Jogos': 0.15,
        'Video games e Acessórios para video games': 0.15,
        'Consoles de video game': 0.08,
        'Relógios até $1500': 0.16,
        'Relógios acima de $1500': 0.03,
        'Outros': 0.15
      };
      
    // Cálculos
    const comissaoFBA = precoVenda * taxaFBA / 100;
    var impostoReferalFee = 0
    if (categoria != '') {
        impostoReferalFee = categoriasImpostos[categoria];
    }
    
    // const referalFee = precoVenda * impostoReferalFee;
    const referalFee = precoVenda * impostoReferalFee

    const custosTotais = precoCompra + 
             (precoCompra * impostoCompra / 100) + 
             custoEnvio + 
             outrosCustos + 
             custoArmazenamento + 
             comissaoFBA + 
             referalFee + 
             (precoVenda * impostoVenda / 100);

    const custosExtras = 
        custoEnvio + 
        outrosCustos + 
        custoArmazenamento + 
        comissaoFBA + 
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
    precoCompraSugeridoBox.innerHTML = 'R$ ' + precoCompraSugerido.toFixed(2);

    // preco de venda sugerido
    const custosTotaisSemVenda = precoCompra +
        (precoCompra * impostoCompra / 100) +
        custoEnvio +
        outrosCustos +
        custoArmazenamento;
    // Considerar os custos variáveis relacionados ao preço de venda
    const precoVendaSugerido = custosTotaisSemVenda / (1 - margemDesejada - (taxaFBA / 100) - impostoReferalFee - (impostoVenda / 100));
    const precoVendaSugeridoBox = document.querySelector('#precoVendaSugerido');
    precoVendaSugeridoBox.innerHTML = 'R$ ' + precoVendaSugerido.toFixed(2);
    
    // Break Even
    const precoBreakEven = custosTotaisSemVenda / (1 - (taxaFBA / 100) - impostoReferalFee - (impostoVenda / 100));
    const precoBreakEvenBox = document.querySelector('#precoBreakEven');
    precoBreakEvenBox.innerHTML = 'R$ ' + precoBreakEven.toFixed(2);

    //Investimento, lucro e receita estimada
    const investimento = custosTotais * quantidadeCompra;
    document.getElementById('investimento').innerHTML = 'R$ ' + investimento.toFixed(2);
    const lucroEstimado = lucro * quantidadeCompra;
    document.getElementById('lucroEstimado').innerHTML = 'R$ ' + lucroEstimado.toFixed(2);
    const receitaEstimada = precoVenda * quantidadeCompra;
    document.getElementById('receitaEstimada').innerHTML = 'R$ ' + receitaEstimada.toFixed(2);

    //desconto necessario
    const descontoNecessario = (precoCompra - precoCompraSugerido) * 100 / precoCompra
    const descontoNecessarioBox = document.querySelector('#descontoNecessario');
    if (descontoNecessario > 0 && precoVenda) {
        descontoNecessarioBox.innerHTML = descontoNecessario.toFixed(2) + ' %'
    } else {
        descontoNecessarioBox.innerHTML = '-'
    }
    
    // Mostrar resultados
    if (lucro >= 0) {
        lucroBox.className = "p-4 rounded-md bg-green-600 text-green-100";
        lucroBox.innerHTML = `<p><strong>Lucro:</strong> +R$${lucro.toFixed(2)}</p>`;
    } else {
        lucroBox.className = "p-4 rounded-md bg-red-600 text-red-100";
        lucroBox.innerHTML = `<p><strong>Prejuízo:</strong> R$${lucro.toFixed(2)}</p>`;
    }

    // Mostrar margem com color change
    if (lucro === 0) {
        margemBox.className = "p-4 rounded-md bg-green-600 text-green-100";
        margemBox.innerHTML = `<p><strong>Margem:</strong> 0%</p>`;
    } else if (margem >= 0) {
        margemBox.className = "p-4 rounded-md bg-green-600 text-green-100";
        margemBox.innerHTML = `<p><strong>Margem:</strong> +${margem.toFixed(2)}%</p>`;
    } else {
        margemBox.className = "p-4 rounded-md bg-red-500 text-red-100";
        margemBox.innerHTML = `<p><strong>Margem:</strong> ${margem.toFixed(2)}%</p>`;
    }

    //BOXES
    // Mostrar ROI
    roiBox.className = "p-4 rounded-md bg-purple-600 text-purple-100";
    roiBox.innerHTML = `<p><strong>ROI:</strong> ${roi.toFixed(2)}%</p>`;

    // Mostrar comissão FBA
    comissaoFBABox.innerHTML = `R$ ${comissaoFBA.toFixed(2)}`;
    
    // Mostrar referal fee
    referalFeeBox.innerHTML = `R$ ${referalFee.toFixed(2)}`;
}
