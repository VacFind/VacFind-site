var Airtable = require('airtable');

let linkListElement = document.getElementById("link-list");
linkListElement.innerText = "Loading..."


// Get a base ID and use a read-only API key
var base = new Airtable({ apiKey: 'keyyCSADD61J0D4wQ' }).base('appGzEQkD3QySIDvj');
let groups = {
	"USA": "National (United States)",
	"AL": "Alabama",
	"AK": "Alaska",
	"AS": "American Samoa",
	"AZ": "Arizona",
	"AR": "Arkansas",
	"CA": "California",
	"CO": "Colorado",
	"CT": "Connecticut",
	"DE": "Delaware",
	"DC": "District Of Columbia",
	"FM": "Federated States Of Micronesia",
	"FL": "Florida",
	"GA": "Georgia",
	"GU": "Guam",
	"HI": "Hawaii",
	"ID": "Idaho",
	"IL": "Illinois",
	"IN": "Indiana",
	"IA": "Iowa",
	"KS": "Kansas",
	"KY": "Kentucky",
	"LA": "Louisiana",
	"ME": "Maine",
	"MH": "Marshall Islands",
	"MD": "Maryland",
	"MA": "Massachusetts",
	"MI": "Michigan",
	"MN": "Minnesota",
	"MS": "Mississippi",
	"MO": "Missouri",
	"MT": "Montana",
	"NE": "Nebraska",
	"NV": "Nevada",
	"NH": "New Hampshire",
	"NJ": "New Jersey",
	"NM": "New Mexico",
	"NY": "New York",
	"NC": "North Carolina",
	"ND": "North Dakota",
	"MP": "Northern Mariana Islands",
	"OH": "Ohio",
	"OK": "Oklahoma",
	"OR": "Oregon",
	"PW": "Palau",
	"PA": "Pennsylvania",
	"PR": "Puerto Rico",
	"RI": "Rhode Island",
	"SC": "South Carolina",
	"SD": "South Dakota",
	"TN": "Tennessee",
	"TX": "Texas",
	"UT": "Utah",
	"VT": "Vermont",
	"VI": "Virgin Islands",
	"VA": "Virginia",
	"WA": "Washington",
	"WV": "West Virginia",
	"WI": "Wisconsin",
	"WY": "Wyoming",
	"ETC": "Miscellaneous"
}

let by_group = {}

var loadLinks = async (filterFormula) => {

	let allrecords = []

	await base('links').select({
		sort: [
			{ field: 'group', direction: 'asc' }
		],
		filterByFormula: filterFormula
	}).eachPage(function page(records, fetchNextPage) {
		allrecords.push(records)
		fetchNextPage();
	}, function done(error) {
		if (error) {
			throw new Error(error)
		}
	});

	return allrecords
};
