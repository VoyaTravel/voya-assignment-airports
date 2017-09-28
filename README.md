# Airports project

Technical assignment for FE candidates.

This repo contains a set of specifications for a project that FE candidates must complete in order to demonstrate their ability to use **Angular 4+**, **RxJS** and **TypeScript**.

It also contains a simplistic server implementation that provides authentication & airport search functionality. This should be used as the BE resource while implementig the FE project.

## Requirements

Implement an app with login and airport search functionality, using Angular framework, featuring two pages: **Login** and **Airports**.

#### Login page:

- accessible only for unauthenticated users
- contains a simple **email + password** form with FE + BE validation
- preferrably implemented using Angular Forms
- after successful authentication, users should remain logged in when returning to the website

#### Airports page:

- accessible only for authenticated users 
- contains a text input where the user can type an airport name / iata code / ...
- when typing, the user should see a list of airports that match the search text
- each airport is represented by a component showing airport name, iata, type & size if available
- search gets triggered automatically when typing
- (optional) when clicking on an aiport, it should load a map on the page with a pinpoint indicating the airport location
- (optional) implement internationalisation (language switcher EN/DE, translate some labels, buttons, titles, ...)
- (optional) implement pagination (if more than one page of results)
 
**Note #1.** The list of airports would be prefferably an observable array.

**Note #2.** Authentication should be implemented using a simple string token. On successful login, a valid token is provided. This token should be appended to http request headers, otherwise api calls will result in `403 Forbidden` responses.

**Note #3.** For testing, use these credentials:

- email: `test@email.com`
- password: `test123`

## Server setup

Requires `node` & `npm`.

Run `npm install` to setup.

Run `npm run serve` to start the server.


## Server API

#### `POST /api/login`
```
Request Payload: {
	email: "test@email.com",
	password: "test123"
}

Response Body: {
	token: "0123456789"
}
```


#### `GET /api/airports?search=buc&page=2&size=10`
```
Request Headers: {
	"x-auth-token": "0123456789"
}

Response Body: [
    {
        "iata": "UCN",
        "lon": "-10.033333",
        "iso": "LR",
        "status": 1,
        "name": "Buchanan Airport",
        "continent": "AF",
        "type": "airport",
        "lat": "5.95",
        "size": "small"
    },
    ...
]

Response Headers: {
	"x-pagination-page": "1",	
	"x-pagination-size": "10",
	"x-pagination-total": "678",	
}
```