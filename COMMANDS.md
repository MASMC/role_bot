# Bot Commands

Bot commands are organized by their permission level. Permission levels are as follows:

| Permission | Description |
| ---: | :--- |
| O-5 | Owner of the guild |
| O-4 | Guild administrators (defined by owner command) |
| O-3 | Guild moderators (defined by owner command) |
| O-2 | Guild staff (defined by owner command) |
| O-1 | All users (not blacklisted) |
| D | ONLY blacklisted users |

# Command Listing

## Guild Owner commands (Permission level O-5)

| Command | Description | Syntax | Additional Info |
| :---: | :--- | :--- | ---: |
| `!/ownerHelp` | Shows the owner command help menu | `!/ownerHelp` | N/A |
| `!/throwError` | Throws an error, to test error code syntax. | `!/throwError <error code>` | If `<error code>` is not supplied, it throws an error code of `402` |
