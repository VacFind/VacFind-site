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


export const retrieveBackupData = async () => {
	console.log("retrieving from backup")

	const json = await fetch('/VacFind-site/assets/js/backupdata.json')
		.then(response => {
			if (!response.ok) {
				throw new Error("HTTP error  retrieving backup data" + response.status);
			}
			return response.json();
		})
	return json
}

