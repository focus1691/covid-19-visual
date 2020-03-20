import React from "react"

export default (({ countries }) => (
	countries.map(country => {
		return (
			<option value={country.id} key={country.id}>
				{country.province === "" ? country.country : country.province}
			</option>
		);
	})
));