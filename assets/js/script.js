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

	base('links').select({
		sort: [
			{ field: 'group', direction: 'asc' }
		],
		filterByFormula: filterFormula
	}).eachPage(function page(records, fetchNextPage) {

		records.forEach(function (record) {
			const url = record.get("url");
			//the value of the group this belongs to, default to the "Miscellaneous" group if blank
			let group = record.get('group') || "ETC";
			const title = record.get('link_title');

			let listitem = document.createElement("li");
			let link = document.createElement("a");
			link.innerText = title? title : url;
			link.href = url;
			link.dataset.recordId = record.getId();
			listitem.appendChild(link);

			if (!by_group[group]) {
				by_group[group] = []
			}

			by_group[group].push(listitem)
		});

		fetchNextPage();
	}, function done(error) {
		populatePage()
		if (error) {
			throw new Error(error)
		}
	});
};
loadLinks("AND(NOT(OR(Find('raw data', {link_type}), Find('resource', {link_type}))), {public} = TRUE())")

const populatePage = () => {
	linkListElement.innerText = ""

	//create headings for each group
	for (group in groups) {
		if (!by_group[group]) {
			by_group[group] = []
		}

		if (by_group[group].length > 0) {

			let listheading = document.createElement("h3");
			listheading.innerText = groups[group];

			let list = document.createElement("ul");
			list.id = group
			for (let link of by_group[group]) {
				list.appendChild(link)
			}

			linkListElement.appendChild(listheading);
			linkListElement.appendChild(list);
		}
	}
};