import csv
import time
import json
import os
import sys
import gzip
import shutil


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
        'District of Columbia': 'DC',
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

    data = []

    google_filename = 'datasets/Global_Mobility_Report.csv'

    with gzip.open(os.path.join(sys.path[0], google_filename + '.gz'), 'rb') as g:
        with open(os.path.join(sys.path[0], google_filename), 'wb') as c:
            shutil.copyfileobj(g, c)

    with open(os.path.join(sys.path[0], google_filename), 'r') as g:

        google_meta = {'country': {'name': 'Google', 'type': 'countries', 'data': None}, 'state': {
            'name': 'Google', 'type': 'states', 'data': None}}
        google_regions = {'country': {'data': {}}, 'state': {'data': {}}}
        google_data = {}

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

                if region not in google_regions[geo_type]['data']:
                    google_regions[geo_type]['data'][region] = {'region': region,
                                                                'regionCode': region_code, 'values': []}

                if region not in google_data:
                    google_data[region] = {}

                for data_type in google_types:
                    if row[data_type] != '':

                        if google_types[data_type] not in google_data[region]:
                            google_data[region][google_types[data_type]] = {
                                'source': 'Google', 'geo': geo_type, 'name': region, 'type': google_types[data_type], 'data': [{'date': row['date'], 'value': int(row[data_type])}]}

                        elif google_types[data_type] in google_data[region]:
                            google_data[region][google_types[data_type]
                                                ]['data'].append({'date': row['date'], 'value': int(row[data_type])})

                        if google_types[data_type] not in google_regions[geo_type]['data'][region]['values']:
                            google_regions[geo_type]['data'][region]['values'].append(
                                google_types[data_type])

        google_meta['country']['data'] = sorted(
            google_regions['country']['data'].values(), key=lambda k: k['region'])
        google_meta['state']['data'] = sorted(
            google_regions['state']['data'].values(), key=lambda k: k['region'])

        for key in google_meta:
            data.append(google_meta[key])

        for key in google_data:
            for sub_key in google_data[key]:
                data.append(google_data[key][sub_key])

    apple_filename = 'datasets/applemobilitytrends-2020-06-14.csv'

    with gzip.open(os.path.join(sys.path[0], apple_filename + '.gz'), 'rb') as g:
        with open(os.path.join(sys.path[0], apple_filename), 'wb') as c:
            shutil.copyfileobj(g, c)

    with open(os.path.join(sys.path[0], apple_filename), 'r') as a:

        apple_meta = {'country': {'name': 'Apple', 'type': 'countries', 'data': None}, 'state': {
            'name': 'Apple', 'type': 'states', 'data': None}}
        apple_regions = {'country': {'data': {}}, 'state': {'data': {}}}
        apple_data = []

        reader = csv.DictReader(a)

        for row in reader:

            valid_country = row['geo_type'] == 'country/region' and row['country'] == ''
            valid_state = row['geo_type'] == 'sub-region' and row['country'] == 'United States'
            valid_dc = row['geo_type'] == 'city' and row['region'] == "Washington DC"

            if valid_country or valid_state or valid_dc:

                geo_type = ''
                region = row['region']
                region_code = ''
                data_type = row['transportation_type']

                if valid_dc:
                    region = "District of Columbia"

                if (valid_state and region in state_abbrs) or valid_dc:
                    geo_type = 'state'
                    region_code = state_abbrs[region]
                else:
                    geo_type = 'country'

                    if region in country_codes:
                        region_code = country_codes[region]
                    else:
                        region_code = normalize_apple[region]['code']
                        region = normalize_apple[region]['country']

                if region not in apple_regions[geo_type]['data']:
                    apple_regions[geo_type]['data'][region] = {'region': region,
                                                               'regionCode': region_code, 'values': [data_type]}
                elif region in apple_regions[geo_type]['data']:
                    apple_regions[geo_type]['data'][region]['values'].append(
                        data_type)

                apple_datum = {'source': 'Apple', 'geo': geo_type, 'name': region,
                               'type': data_type, 'data': []}

                for date in row:
                    if date not in apple_non_date_fields and row[date] != '':
                        apple_datum['data'].append(
                            {"date": date, "value": float(row[date])})

                apple_data.append(apple_datum)

        apple_meta['country']['data'] = sorted(
            apple_regions['country']['data'].values(), key=lambda k: k['region'])
        apple_meta['state']['data'] = sorted(
            apple_regions['state']['data'].values(), key=lambda k: k['region'])

        for key in apple_meta:
            data.append(apple_meta[key])

        for datum in apple_data:
            data.append(datum)

    with open(os.path.join(sys.path[0], 'data.json'), 'w', encoding='utf-8') as d:
        d.write(json.dumps(data, ensure_ascii=False))

    with open(os.path.join(sys.path[0], 'data.json'), 'rb') as d:
        with gzip.open(os.path.join(sys.path[0], 'data.json.gz'), 'wb', 9) as g:
            shutil.copyfileobj(d, g)


if __name__ == "__main__":
    source_dataset()
