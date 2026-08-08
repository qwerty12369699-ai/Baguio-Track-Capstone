# Baguio Track API

This folder contains PHP endpoints for a MySQL backend.

## Setup
1. Create the database and tables:
   - Run `php -f api/init.sql` in a MySQL client, or import `api/init.sql` using your database tool.
2. Configure environment variables or edit `BaguioTrack/api/db.php`:
   - `DB_HOST` (default `127.0.0.1`)
   - `DB_NAME` (default `baguiotrack`)
   - `DB_USER` (default `root`)
   - `DB_PASS` (default empty)

## Endpoints
- `api/users.php`
  - GET: list users or `?id=` for single user
  - POST: create/update user
  - PUT: update user by `?id=` 
  - DELETE: delete user by `?id=` 

- `api/import_firebase_users.php`
  - CLI helper to import Firebase auth users from a JSON export into MySQL
  - Usage: `php import_firebase_users.php firebase_users.json`

- `api/terminals.php`
  - GET: list terminals or `?id=` for single terminal
  - POST: create terminal
  - PUT: update terminal by `?id=` 
  - DELETE: delete terminal by `?id=` 

- `api/routes.php`
  - GET: list routes or `?id=` for single route
  - POST: create route
  - PUT: update route by `?id=` 
  - DELETE: delete route by `?id=` 

- `api/spots.php`
  - GET: list tourist spots or `?id=` for single spot
  - POST: create spot
  - PUT: update spot by `?id=` 
  - DELETE: delete spot by `?id=` 

- `api/feedback.php`
  - GET: list feedback or `?id=` for single report
  - POST: submit feedback
  - PUT: update feedback by `?id=` 
  - DELETE: delete feedback by `?id=` 

## Notes
- All endpoints return JSON.
- CORS is enabled for any origin in `api/db.php`.
