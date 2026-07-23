## Idea Validator API

`POST /api/validate-idea`

Request body:
```json
{ "idea": "AI Laundry Service" }
```

Returns a JSON analysis: competitors, market size, revenue model, 
SWOT, MVP suggestions, marketing plan, risks, and verdict.

## Setup

### Backend