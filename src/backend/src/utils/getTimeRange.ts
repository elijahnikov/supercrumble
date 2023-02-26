export const getTimeRange = (year: number, month: number) => {
	let date = new Date();
	date.setFullYear(year, month, 1);

	let y = date.getFullYear();
	let m = date.getMonth();

	let firstDay = new Date(y, m, 1).toISOString().split("T")[0];
	let lastDay = new Date(y, m + 1, 0).toISOString().split("T")[0];

	return { firstDay, lastDay };
};
