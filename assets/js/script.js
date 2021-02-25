import './asyncAirtable-beta.min.js';
const asyncAirtable = new AsyncAirtable("keyyCSADD61J0D4wQ", "appGzEQkD3QySIDvj", {baseURL: "https://api.vacfind.org/v0"});//, { ...CONFIG }


export var loadLinks = async (filterOpts) => {

	// let allrecords = []

	return asyncAirtable.select('links', {
		sort: [
			{ field: 'group', direction: 'asc' }
		],
		where: filterOpts
	}).then( (results) => persistToStorage(results))
};

const persistToStorage = (results) => {
	console.log("persisting to storage")
	if (results) {
		localStorage.setItem("vacFind-links", JSON.stringify(results));
	}
	return results
}

export const retrieveFromStorage = () => {
	console.log("retrieving from storage")
	return JSON.parse(localStorage.getItem("vacFind-links"))
}


export const isOfficialResource = (record) => {
	return record.fields.verification_status == "government resource" || record.fields.source_type == "government";
}

/// take an array of keys and an airtable record and check for a value at each key and returning the first one found
/// needs testing
const findValueWithKeys = (record, keys) => {
	
	for (let key of keys) {
		if (record.fields[key]) {
			return record.fields.verification_status
		}
	}

}
