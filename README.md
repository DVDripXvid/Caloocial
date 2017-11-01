# Caloocial

## How to try:

note: use 'nodatabase' tag/release 

### Login
- method: POST
- url: http://localhost:4000/uaa/oauth/token?scope=ui&username=Oliver&password=asd12345&grant_type=password
- headers: 
	- Authorization: Basic YnJvd3Nlcjo=
		
### Example endpoint
- method: GET
- http://localhost:4000/example/
- headers:
	- Authorization: Bearer $access_token