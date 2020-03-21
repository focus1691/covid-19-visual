import _ from "lodash";

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

export const filterInfectedCountries = (data, filterBy, limit) => {
	const res = Object.values(data).map(v => v);
	const sortedCountries = _.sortBy(res, o => o.latest[filterBy]).reverse();
	return sortedCountries.slice(0, limit);
};

export const getCountryLabels = locations => {
	return locations.map(v => _.isEmpty(v.province) ? v.country : v.province);
};

export const getCountryData = (locations, category) => {
	return locations.map(v => v.latest[category]);
};