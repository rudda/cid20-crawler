
# # imports
# import pandas as pd
# import io
# import requests
# import sqlite3

# # Load
# # read CVS from 
# SELIC_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs.11/dados?formato=csv'
# IPCA_URL =  'https://api.bcb.gov.br/dados/serie/bcdata.sgs.4466/dados?formato=csv'

# print('loading...')
# SELIC_CONTENT = requests.get(SELIC_URL).content
# IPCA_CONTENT  = requests.get(IPCA_URL).content

# selic_data = pd.read_csv(io.StringIO(SELIC_CONTENT.decode('utf-8')), sep=';')
# ipca_data  = pd.read_csv(io.StringIO(IPCA_CONTENT.decode('utf-8')), sep=';')

# selic_data['data'] = pd.to_datetime(selic_data['data'], format='%d/%m/%Y')
# ipca_data['data'] = pd.to_datetime(ipca_data['data'], format='%d/%m/%Y')

# print('ok')