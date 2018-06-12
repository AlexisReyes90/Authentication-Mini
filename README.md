1.) Create server. Add yarn modules: `mongoose` and `express`
2.) Connect to MongoDB (use db 'AuthDemo')
3.) Create a User Schema and Model, this Schem will take a username(unique) and a password.
4.) Create a route, '/register' that takes a post method. The body will have a username and password field.
5.) Using Postman create one new user (with plain text password)
6.) Add the yarn module `bcrypt`
7.) On the UserSchema, add a `.pre('save'` middleware.
8.) The mongoose pre middleware will take the existing password and hash it.
9.) Store the new hashed password on the User document.