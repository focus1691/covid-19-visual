export const mapChartTimeLine = data => {
	const timeline = [];
	Object.keys(data).forEach((v, key) => {
		timeline.push({
			time: v,
			value: data[v]
		});
	});
	return timeline
};