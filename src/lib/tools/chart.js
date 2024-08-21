export const colors = ['#6A6EF4', '#FFB44F', '#F99BAB', '#9BDFC4'];
export const colors2 = [
	'#F79E1B',
	'#FCCC6B',
	'#6DA987',
	'#667BC6',
	'#BEC6A0',
	'#708871',
	'#078B47',
	'#E8C5E5',
	'#6295A2',
	'#A7E6FF'
];
export const colors3 = ['#4CCD99', '#007F73', '#A8CD9F', '#76885B'];
export const colors4 = ['#C31F1F', '#E04C4C', '#FF3800', '#FCB1B1'];
export const chartStyleFont = {
	fontSize: '12px',
	fontFamily: 'Montserrat, sans-serif',
	fontWeight: 500
};

export const getRandomInt = function (/** @type {number} */ min, /** @type {number} */ max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
};
