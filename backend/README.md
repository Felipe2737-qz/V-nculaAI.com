# Backend - Node.js + Express + MongoDB

## Setup

```bash
npm install
cp .env.example .env
# Edit .env with your values
npm run dev
```

## Environment Variables

See `.env.example` for all required variables.

## API Response Format

All responses follow:
```json
{
  "success": boolean,
  "message": "string",
  "data": {}
}
```

## Error Codes

- 401: Not authenticated
- 403: No vínculos / No permission
- 422: Validation error
- 500: Server error
