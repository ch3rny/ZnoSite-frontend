let range = function (start, end) {
	return Array(end - start + 1)
		.fill()
		.map((_, idx) => start + idx);
}

const YEARS = range(2007, 2018)

export default YEARS;