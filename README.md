# Galxe Service

A Node.js service that interacts with the Galxe (formerly Project Galaxy) API to manage credential items. This service provides an endpoint to upsert contract addresses to a specified credential.

## Features

- RESTful endpoint for upserting contract addresses
- Integration with Galxe's GraphQL API
- Environment-based configuration
- CORS enabled
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd galxe-service
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory (copy from `.env.example`):
```bash
cp .env.example .env
```

Then update the values in `.env` with your actual configuration.

## Running the Service

Development:
```bash
npm run build
npm start
```

The service will start on port 3000 (or the port specified in your .env file).

## API Endpoints

### Upsert Address

```http
POST /upsertAddress
Content-Type: application/json

{
    "contractAddress": "0x123...789"
}
```

Example curl command:
```bash
curl -X POST \
  http://localhost:3000/upsertAddress \
  -H 'Content-Type: application/json' \
  -d '{"contractAddress": "0x123456789abcdef0123456789abcdef012345678"}'
```

Success Response:
```json
{
  "data": {
    "credentialItems": {
      "name": "..."
    }
  }
}
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | 3000 |
| `GALXE_ACCESS_TOKEN_c2F6` | Access token for Galxe API | - |

## Error Handling

The service includes comprehensive error handling for:
- Invalid requests (400)
- Missing contract address
- API errors
- Network issues
- Server errors (500)

## License

ISC
