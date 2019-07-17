export function centsToUSD(cent) {
	const decimal = 2
  return (cent / 100).toFixed(decimal);
}