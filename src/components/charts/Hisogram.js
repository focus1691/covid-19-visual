import { createChart } from "lightweight-charts";
import React, { useState, useEffect, useRef } from 'react';

const Histogram = () => {
	const [chart, setChart] = useState(null);
	const chartRef = useRef(null);

	useEffect(() => {
		const createdChart = createChart(chartRef.current, {
			width: window.innerWidth / 1.5,
			height: 500,
			priceScale: {
				mode: 4,
				invertScale: false,
			}
		});
		setChart(createdChart);

		const lineSeries = createdChart.addLineSeries();
		lineSeries.setData([
			{ time: '2019-04-11', value: 80.01 },
			{ time: '2019-04-12', value: 96.63 },
			{ time: '2019-04-13', value: 76.64 },
			{ time: '2019-04-14', value: 81.89 },
			{ time: '2019-04-15', value: 74.43 },
			{ time: '2019-04-16', value: 80.01 },
			{ time: '2019-04-17', value: 96.63 },
			{ time: '2019-04-18', value: 76.64 },
			{ time: '2019-04-19', value: 81.89 },
			{ time: '2019-04-20', value: 74.43 },
		]);
	}, []);

	return (
		<div className="chart-container">
			<h2><u>Daily confirmed cases, deaths, recoveries</u></h2>
			<div ref={chartRef} className="chart" />
		</div>
	);
};

export default Histogram;