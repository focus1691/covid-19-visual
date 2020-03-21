import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import { HorizontalBar } from "react-chartjs-2";
import _ from "lodash";
import { filterInfectedCountries, getCountryLabels, getCountryData } from "../../utils/ChartHelper";
import { chartStyle } from "../../assets/mui/Chart";

const useStyles = makeStyles(theme => ({ ...chartStyle(theme) }));

const Histogram = ({ countries }) => {
	const classes = useStyles();
	const [data, setData] = useState(null);
	const [category, setCategory] = useState("confirmed");
	const [limit, setLimit] = useState(25);

	const updateChart = () => {
		if (!_.isEmpty(countries)) {
			const filteredCountries = filterInfectedCountries(countries, category, limit);
			setData({
				labels: getCountryLabels(filteredCountries),
				datasets: [
					{
						label: "Countries / Provinces",
						backgroundColor: '#31db2e',
						data: getCountryData(filteredCountries, category)
					}
				]
			});
		}
	};

	useEffect(() => {
		updateChart();
	}, [countries, category, limit]);

	return (
		<div className="chart-container">
			<h3>Compare the infected countries / provinces for daily confirmed cases, deaths, recoveries</h3>
			<div class="chart-container" style={{ position: "relative", height: "70vh", width: "80vw", display: "inline-block" }}>
				<FormControl className={classes.formControl}>
					<InputLabel id="category-select-label">Category</InputLabel>
					<Select
						native
						className={classes.select}
						value={category}
						onChange={e => setCategory(e.target.value)}
						inputProps={{
							name: "Category",
							id: "category-native-simple"
						}}>
						<option value="confirmed" key="confirmed">
							Confirmed
						</option>
						<option value="deaths" key="deaths">
							Deaths
						</option>
						<option value="recovered" key="recovered">
							Recovered
						</option>
					</Select>
				</FormControl>

				<FormControl className={classes.formControl}>
					<InputLabel id="limit-select-label">Limit</InputLabel>
					<Select
						native
						className={classes.select}
						value={limit}
						onChange={e => setLimit(parseInt(e.target.value))}
						inputProps={{
							name: "Limit",
							id: "limit-native-simple"
						}}>
						<option value={10} key="10">
							10
						</option>
						<option value={25} key="25">
							25
						</option>
						<option value={35} key="35">
							35
						</option>
						<option value={50} key="50">
							50
						</option>
					</Select>
				</FormControl>
				{_.isEmpty(data) ? null : (
					<HorizontalBar
						data={data}
						className="horizontal-bar"
						width={100}
						height={50}
						options={{
							maintainAspectRatio: false,
							scales: {
								yAxes: [
									{
										ticks: {
											min: 0,
											stepSize: 1,
											fontColor: "#fff",
											fontSize: 14
										},
										gridLines: {
											color: "#fff",
											lineWidth: 1,
											zeroLineColor: "#fff",
											zeroLineWidth: 1
										},
										stacked: true
									}
								],
								xAxes: [
									{
										ticks: {
											fontColor: "#fff",
											fontSize: 14
										},
										gridLines: {
											color: "#fff",
											lineWidth: 1
										}
									}
								]
							}
						}}></HorizontalBar>
				)}
			</div>
		</div>
	);
};

export default Histogram;