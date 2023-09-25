import os

project_id = os.environ.get('PROJECT_ID')
region = os.environ.get('REGION')
connector_name = os.environ.get('CONNECTOR_NAME')

# app.yml file is generate programmatically so as not to expose sensitive info
with open('../app.yaml', 'w') as f:
    f.write(f"""runtime: nodejs20
vpc_access_connector:
  name: projects/{project_id}/locations/{region}/connectors/{connector_name}
    """)
