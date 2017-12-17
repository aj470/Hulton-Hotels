# Hulton API
This documentation lists the endpoints of the API
A basic overview of the routes in this API are as follows:

| Route | Authorization |
|--- | ---|
|/users | Yes|
|/search | No|
|/service | Yes|
|/reserve | Yes|
|/login | No|
|/best | No|

For each route, the specific endpoints are as follows:
#### /users
| Endpoint | HTTP |
|--- | ---|
|/review | GET |
|/review | POST |
|/reservations | GET |
|/reservations/breakfast | POST |
|/reservations/service | POST |

#### /search
| Endpoint | HTTP |
|--- | ---|
|/zip/:zip | GET |
|/name/:startDate&:endDate/:city/:country? | GET |

#### /service
| Endpoint | HTTP |
|--- | ---|
|/service | POST |
|/breakfast | POST |

#### /reserve
| Endpoint | HTTP |
|--- | ---|
|/card | POST |
|/reservation | POST |

#### /login
| Endpoint | HTTP |
|--- | ---|
|/register | POST |
|/logout | GET |
|/ | POST |

#### /best
| Endpoint | HTTP |
|--- | ---|
|/room/:startDate&:endDate | GET |
|/breakfast/:startDate&:endDate | GET |
|/service/:startDate&:endDate | GET |
|/customers/:startDate&:endDate | GET |
