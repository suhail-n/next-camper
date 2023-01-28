export function validateEmail(email: string): boolean {
    return new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    ).test(String(email).toLowerCase());
}

/**
 * Password must be
 * atleast 8 characters
 * atleast 1 capital letter
 * atleast 1 lowercase letter
 * atleast 1 digit
 * atleast 1 of the following symbols "!&$%&? "
 */
export function validatePassword(password: string): boolean {
    return new RegExp(
        /^.*(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!&$%#&? "]).*$/
    ).test(String(password));
}