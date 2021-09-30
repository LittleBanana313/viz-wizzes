from flask import Flask, render_template, jsonify
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine
import numpy as np


engine = create_engine('postgresql://postgres:Tablenature1@localhost:5432/Project_ETL')

# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

# Save reference to the table
nyc_crime = Base.classes.nyc_crime

app = Flask(__name__)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/')
@app.route('/home')
def home():
    return render_template('index.html')

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/visualization')
def crime():
    return render_template('visualization.html')

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/heatmap')
def heatmap():
    return render_template('heatmap.html')

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
@app.route('/db_call')
def dbCall():
    session = Session(engine)

    
    # Query all passengers
    results = session.query(nyc_crime.arrest_key, nyc_crime.arrest_date,nyc_crime.pd_desc, nyc_crime.ofns_desc, nyc_crime.law_cat_cd,
    nyc_crime.age_group, nyc_crime.perp_sex).all()

  


    session.close()
    nyc_crime_data = []
    for arrest_key, arrest_date, pd_desc, ofns_desc, law_cat_cd, age_group, perp_sex in results:
        n = {
            "arrest_key" : arrest_key,
            "arrest_date": arrest_date,
            "pd_desc": pd_desc,
            "ofns_desc": ofns_desc,
            "law_cat_cd": law_cat_cd,
            "age_group": age_group,
            "perp_sex": perp_sex

        }

        nyc_crime_data.append(n)



    return jsonify(nyc_crime_data)


# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #
if __name__ == '__main__':

    # Run this when running on LOCAL server...
    app.run(debug=True)

    # ...OR run this when PRODUCTION server.
    # app.run(debug=False)