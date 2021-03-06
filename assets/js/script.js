
/// take an array of keys and an airtable record and check for a value at each key and returning the first one found
/// needs testing
const findValueWithKeys = (record, keys) => {
	
	for (let key of keys) {
		if (record.fields[key]) {
			return record.fields.verification_status
		}
	}

}
