import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('sqlite:///nyc_crime.db')


crimeDF = pd.read_csv('nyc_crime.csv')

crimeDF.to_sql('nyc_crime',engine,index=False, if_exists='append')