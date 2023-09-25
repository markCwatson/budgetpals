import os

project_id = os.environ.get('GCP_PROJECT_ID')
region = os.environ.get('GCP_REGION')
connector_name = os.environ.get('GCP_CONNECTOR_NAME')
print(f'region: {region}')
# app.yml file is generate programmatically so as not to expose sensitive info
with open('api/app.yaml', 'w') as f:
    f.write(f"""runtime: nodejs20
vpc_access_connector:
  name: projects/{project_id}/locations/{region}/connectors/{connector_name}
    """)
