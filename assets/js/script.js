import './asyncAirtable-beta.min.js';
const asyncAirtable = new AsyncAirtable("keyyCSADD61J0D4wQ", "appGzEQkD3QySIDvj");//, { ...CONFIG }


export var loadLinks = async (filterOpts) => {

	// let allrecords = []

	return asyncAirtable.select('links', {
		sort: [
			{ field: 'group', direction: 'asc' }
		],
		where: filterOpts
	})
};
