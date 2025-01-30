export default class UserError extends Error {
  constructor(name, message, statusCode) {
    super(message);
    this.name = name;
    this.statusCode = statusCode; 
  }
}

export class userExistsError extends UserError {
  constructor(message = "User already exists") {
    super("UserExistsError", message, 409);
  }
}

export class invalidEmailError extends UserError {
  constructor(message = "Invalid email format") {
    super("InvalidEmailError", message, 400);
  }
}

export class invalidPasswordError extends UserError {
  constructor(message = "Password does not meet security requirements") {
    super("InvalidPasswordError", message, 400);
  }
}

export class userNotFoundError extends UserError {
  constructor(message = "User not found") {
    super("UserNotFoundError", message, 404);
  }
}

export class unauthorizedActionError extends UserError {
  constructor(message = "You do not have permission to perform this action") {
    super("UnauthorizedActionError", message, 403);
  }
}