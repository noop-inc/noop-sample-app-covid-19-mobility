import csv
import json
import os
import sys
import gzip
import shutil


def source_dataset():

    data = []

    # google_filename = 'datasets/Global_Mobility_Report.csv'
    # google_types = {
    #     'retail_and_recreation_percent_change_from_baseline': 'Retail and Recreation',
    #     'grocery_and_pharmacy_percent_change_from_baseline': 'Grocery and Pharmacy',
    #     'parks_percent_change_from_baseline': 'Parks',
    #     'transit_stations_percent_change_from_baseline': 'Transit Stations',
    #     'workplaces_percent_change_from_baseline': 'Workplaces',
    #     'residential_percent_change_from_baseline': 'Residential'
    # }

    # with gzip.open(os.path.join(sys.path[0], google_filename + '.gz'), 'rb') as g:
    #     with open(os.path.join(sys.path[0], google_filename), 'wb') as c:
    #         shutil.copyfileobj(g, c)

    # with open(os.path.join(sys.path[0], google_filename), 'r') as g:

    #     google_meta = {'Countries': {'name': 'Google', 'type': 'Countries', 'data': None}, 'States': {
    #         'name': 'Google', 'type': 'States', 'data': None}}
    #     google_regions = {'Countries': {}, 'States': {}}
    #     google_data = {}

    #     reader = csv.DictReader(g)

    #     for row in reader:

    #         valid_country = row['sub_region_1'] == '' and row['sub_region_2'] == ''
    #         valid_state = row['country_region'] == 'United States' and row['sub_region_2'] == ''

    #         if valid_country or valid_state:
    #             geo_type = ''
    #             region = ''

    #             if valid_country:
    #                 geo_type = 'Countries'
    #                 region = row['country_region']
    #             else:
    #                 geo_type = 'States'
    #                 region = '{}, United States'.format(row['sub_region_1'])

    #             if region not in google_regions[geo_type]:
    #                 google_regions[geo_type][region] = []

    #             if region not in google_data:
    #                 google_data[region] = {}

    #             for data_entry in google_types:
    #                 if row[data_entry] != '':
    #                     data_type = google_types[data_entry]
    #                     value = row[data_entry]

    #                     if data_type not in google_data[region]:
    #                         google_data[region][data_type] = {'source': 'Google', 'geo': geo_type, 'name': region, 'type': data_type, 'data': [
    #                             {'date': row['date'], 'value': int(value)}]}
    #                     else:
    #                         google_data[region][data_type]['data'].append(
    #                             {'date': row['date'], 'value': int(value)})

    #                     if data_type not in google_regions[geo_type][region]:
    #                         google_regions[geo_type][region].append(data_type)

    #     google_meta['Countries']['data'] = google_regions['Countries']
    #     google_meta['States']['data'] = google_regions['States']

    #     for key in google_meta:
    #         data.append(google_meta[key])

    #     for key in google_data:
    #         for sub_key in google_data[key]:
    #             data.append(google_data[key][sub_key])

    apple_filename = 'datasets/applemobilitytrends-2021-03-31.csv'
    apple_non_date_fields = {
        'geo_type',
        'region',
        'transportation_type',
        'alternative_name',
        'sub-region',
        'country'
    }

    with gzip.open(os.path.join(sys.path[0], apple_filename + '.gz'), 'rb') as g:
        with open(os.path.join(sys.path[0], apple_filename), 'wb') as c:
            shutil.copyfileobj(g, c)

    with open(os.path.join(sys.path[0], apple_filename), 'r') as a:

        apple_meta = {'Countries': {'name': 'Apple', 'type': 'Countries', 'data': None}, 'States': {
            'name': 'Apple', 'type': 'States', 'data': None}}
        apple_regions = {'Countries': {}, 'States': {}}
        apple_data = []

        reader = csv.DictReader(a)

        for row in reader:

            valid_country = row['geo_type'] == 'country/region' and row['country'] == ''
            valid_state = row['geo_type'] == 'sub-region' and row['country'] == 'United States'

            if valid_country or valid_state:

                geo_type = ''
                region = row['region']
                data_type = row['transportation_type'].title()

                if valid_country:
                    geo_type = 'Countries'
                else:
                    geo_type = 'States'
                    region = '{}, United States'.format(region)

                if region not in apple_regions[geo_type]:
                    apple_regions[geo_type][region] = [data_type]
                else:
                    apple_regions[geo_type][region].append(data_type)

                apple_datum = {'source': 'Apple', 'geo': geo_type, 'name': region,
                               'type': data_type, 'data': []}

                for date in row:
                    value = row[date]
                    if date not in apple_non_date_fields and value != '':
                        apple_datum['data'].append(
                            {"date": date, "value": float(value)})

                apple_data.append(apple_datum)

        apple_meta['Countries']['data'] = apple_regions['Countries']
        apple_meta['States']['data'] = apple_regions['States']

        for key in apple_meta:
            data.append(apple_meta[key])

        for datum in apple_data:
            data.append(datum)
    
    os.mkdir(os.path.join(sys.path[0], 'dist'))

    with open(os.path.join(sys.path[0], 'dist', 'data.json'), 'w', encoding='utf-8') as d:
        d.write(json.dumps(data, ensure_ascii=False))


if __name__ == "__main__":
    source_dataset()
