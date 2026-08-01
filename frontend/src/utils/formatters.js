export function formatarTelefone(numero) {
  if (!numero) return '';

  // Tira tudo que não é dígito e remove o código do Brasil (55) do início
  const digitos = numero.replace(/\D/g, '').replace(/^55/, '');
  const ddd = digitos.slice(0, 2);
  const resto = digitos.slice(2);

  if (resto.length === 9) {
    return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`;
  }
  if (resto.length === 8) {
    return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`;
  }

  return numero;
}