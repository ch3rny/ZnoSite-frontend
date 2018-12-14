let range = (start, end) => Array(end - start + 1)
	.fill()
	.map((_, idx) => (start + idx).toString());


const YEARS = range(2007, 2018).reverse()

export default YEARS;