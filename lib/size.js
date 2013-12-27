module.exports = function (size) {
	var units = {
			'gb': 1000000000,
			'mb': 1000000,
			'kb': 1000,
			'b': 1
		},
		power,
		unit,
		number;

	if(!size) return undefined;
	unit = size.match(/\D+/i)[0];
	if(!unit) return undefined;
	number = size.match(/\d+/i)[0];
	if(!number) return undefined;

	return units[unit] * number;
}