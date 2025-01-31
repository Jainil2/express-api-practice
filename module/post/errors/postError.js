class PostErrors extends Error {
    constructor(message) {
        super(message)
        this.name = 'PostErrors'
    }
}

export class PostNotFoundError extends PostErrors {
    constructor() {
        super('Post not found')
        this.name = 'PostNotFoundError'
    }
}

export class PostNotCreatedError extends PostErrors {
    constructor() {
        super('Post not created')
        this.name = 'PostNotCreatedError'
    }
}

export class PostNotUpdatedError extends PostErrors {
    constructor() {
        super('Post not updated')
        this.name = 'PostNotUpdatedError'
    }
}

export class PostNotDeletedError extends PostErrors {
    constructor() {
        super('Post not deleted')
        this.name = 'PostNotDeletedError'
    }
}

export class unauthorizedActionError extends PostErrors {
    constructor(message = 'You do not have permission to perform this action') {
        super('UnauthorizedActionError', message, 403)
    }
}

export default PostErrors
