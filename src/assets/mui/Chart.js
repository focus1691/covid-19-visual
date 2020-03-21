export const chartStyle = theme => ({
  formControl: {
    margin: theme.spacing(2),
		'& .MuiInputLabel-animated': {
      color: '#08a0da'
    },
		'& .MuiInput-underline': {
			'&:before': {
				borderColor: 'yellow'
			},
			'&:after': {
				borderColor: 'yellow'
			},
			'&:focused': {
				borderColor: 'yellow'
			}
		}
  },
  select: {
    color: '#fff',
    background: 'none',
    border: 'none',
		'& .MuiSelect-select': {
      color: '#fff',
			'& option': {
				color: '#000'
			},
    },
		'& .MuiInputLabel-animated': {
			color: 'red'
    }
  }
});