# squareCommons

## about

common functions for my projects.

## usage

[Example](./example.js)

## env

1. node js - v18.17.0
2. npm - v9.6.7

## changelog

### v2.2.0

- add fetchFileData.

### v2.1.1

- use strictObject instead of object in types.

### v2.1.0

- API
  - convert RequestCredentialsOptions and AvailableMethods to zod types.
  - better error handling and logging in fetchJSONData.

### v2.0.0

- Migrate types to zod for runtime type checking.

### v1.2.0

- Make credentials configurable in apiUtils -> fetchJSONData.
- Default credentials set to "same-origin" to match browser defaults.
- Previous behavior can be maintained by explicitly setting credentials to "include".

### v1.1.0

- add credentials: "include" in apiUtils -> fetchJSONData.

### v1.0.13

- update type in apiUtils-> fetchJSONData to include PATCH method.

### v1.0.12

- experimental release.

### v1.0.11

- experimental release.

### v1.0.10

- release dist error fix.

### v1.0.9

- fetchJSONData
  - normalize headers before sending.

### v1.0.8

- fetchJSONData
  - remove debug log on result.
  - stringify error log.

### v1.0.7

- fetchJSONData
  - add url in logs.

### v1.0.6

- fetchJSONData
  - add debug log on result.
  - error message and log fix.

### v1.0.5

- add type for API output.
- change export format.

### v1.0.4

- (try to) fix npm upload structure.

### v1.0.3

- (try to) fix npm upload structure.

### v1.0.2

- (try to) fix npm upload structure.

### v1.0.1

- add types in package json.

### v1.0.0

- initial implementation.

## Feedback is appreciated. Thank you!
