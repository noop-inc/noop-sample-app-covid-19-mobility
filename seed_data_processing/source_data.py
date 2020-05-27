from urllib.request import urlopen
from urllib.error import URLError, HTTPError
import csv
import time

def download_dataset(url, name):
	
	retries = 5
	response = None

	for attempt in range(retries):
		try:
			response = urlopen(url)

		except HTTPError as e:
			if attempt == retries:
				raise Exception('HTTPError: ', e.code, url, name)
			time.sleep(0.2 * attempt)

		except URLError as e:
			if attempt == retries:
				raise Exception('URLError: ', e.reason, url, name)
			time.sleep(0.2 * attempt)
		else:
			break
	
	with open('/tmp/{}.csv'.format(name), 'wb') as f:
		f.write(response.read())

def source_dataset():
	country_codes = {
		'Albania': 'AL',
		'Iceland': 'IS',
		'Guam': 'GU',
		'Macao': 'MO',
		'Morocco': 'MA',
		'Russia': 'RU',
		'Ukraine': 'UA',
		'Virgin Islands': 'VI'
	}

	normalize_apple = {
		'Czech Republic': {
			'code': 'CZ',
			'country': 'Czechia'
		},
		'Republic of Korea': {
			'code': 'RU',
			'country': 'South Korea'
		},
	}

	state_abbrs = {
		'Alabama': 'AL',
		'Alaska': 'AK',
		'Arizona': 'AZ',
		'Arkansas': 'AR',
		'California': 'CA',
		'Colorado': 'CO',
		'Connecticut': 'CT',
		'Delaware': 'DE',
		'District of Columbia': 'CD',
		'Florida': 'FL',
		'Georgia': 'GA',
		'Hawaii': 'HI',
		'Idaho': 'ID',
		'Illinois': 'IL',
		'Indiana': 'IN',
		'Iowa': 'IA',
		'Kansas': 'KS',
		'Kentucky': 'KY',
		'Louisiana': 'LA',
		'Maine': 'ME',
		'Maryland': 'MD',
		'Massachusetts': 'MA',
		'Michigan': 'MI',
		'Minnesota': 'MN',
		'Mississippi': 'MS',
		'Missouri': 'MO',
		'Montana': 'MT',
		'Nebraska': 'NE',
		'Nevada': 'NV',
		'New Hampshire': 'NH',
		'New Jersey': 'NJ',
		'New Mexico': 'NM',
		'New York': 'NY',
		'North Carolina': 'NC',
		'North Dakota': 'ND',
		'Ohio': 'OH',
		'Oklahoma': 'OK',
		'Oregon': 'OR',
		'Pennsylvania': 'PA',
		'Rhode Island': 'RI',
		'South Carolina': 'SC',
		'South Dakota': 'SD',
		'Tennessee': 'TN',
		'Texas': 'TX',
		'Utah': 'UT',
		'Vermont': 'VT',
		'Virginia': 'VA',
		'Washington': 'WA',
		'West Virginia': 'WV',
		'Wisconsin': 'WI',
		'Wyoming': 'WY'
	}

	google_types = {
		'retail_and_recreation_percent_change_from_baseline': 'retailRecreation',
		'grocery_and_pharmacy_percent_change_from_baseline': 'groceryPharmacy',
		'parks_percent_change_from_baseline': 'parks',
		'transit_stations_percent_change_from_baseline': 'transitStations',
		'workplaces_percent_change_from_baseline': 'workplaces',
		'residential_percent_change_from_baseline': 'residential'
	}

	apple_non_date_fields = {
		'geo_type',
		'region',
		'transportation_type',
		'alternative_name',
		'sub-region',
		'country'
	}

	data = [['source', 'geoType', 'region', 'regionCode', 'mobilityType', 'date', 'value']]

	apple_url = 'https://covid19-static.cdn-apple.com/covid19-mobility-data/2008HotfixDev43/v3/en-us/applemobilitytrends-2020-05-25.csv'
	google_url = 'https://www.gstatic.com/covid19/mobility/Global_Mobility_Report.csv'

	download_dataset(apple_url, 'apple')
	download_dataset(google_url, 'google')

	with open('/tmp/google.csv', 'r') as g:
		reader = csv.DictReader(g)

		for row in reader:

			valid_country = row['sub_region_1'] == '' and row['sub_region_2'] == ''
			valid_state = row['country_region'] == 'United States' and row['sub_region_2'] == ''

			if valid_country or valid_state:

				geo_type = ''
				region = ''
				region_code = ''

				if valid_country:
					geo_type = 'country'
					region = row['country_region']
					region_code = row['country_region_code']

					if row['country_region'] not in country_codes:
						country_codes[region] = region_code
				elif valid_state:
					geo_type = 'state'
					region = row['sub_region_1']
					region_code = state_abbrs[region]
				
				for data_type in google_types:
					if row[data_type] != '':
						data.append(['google', geo_type, region, region_code,
									google_types[data_type], row['date'], row[data_type]])

	with open('/tmp/apple.csv', 'r') as a:
		reader = csv.DictReader(a)

		for row in reader:

			valid_country = row['geo_type'] == 'country/region' and row['country'] == ''
			valid_state = row['geo_type'] == 'sub-region' and row['country'] == 'United States'

			if valid_country or valid_state:

				geo_type = ''
				region = row['region']
				region_code = ''
				data_type = row['transportation_type']

				if valid_country or region in country_codes:
					geo_type = 'country'
					
					if region in country_codes:
						region_code = country_codes[region]
					else:
						region_code = normalize_apple[region]['code']
						region = normalize_apple[region]['country']
				
				else:
					geo_type = 'state'
					region_code = state_abbrs[region]
				
				for date in row:
					if date not in apple_non_date_fields and row[date] != '':
						data.append(['apple', geo_type, region, region_code,
									data_type, date, row[date]])

		with open('/tmp/data.csv', 'w', encoding='utf-8') as c:
			writer = csv.writer(c)
			writer.writerows(data)
			