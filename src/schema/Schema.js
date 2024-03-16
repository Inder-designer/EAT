import * as Yup from 'yup'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,25}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,25}$/;
const EMAIL_REGEX = /^[a-z1-9-_.]{3,25}@([a-z]+\.)[a-z]{2,4}$/;

export const UserSchemas = {
    login: Yup.object({
       email: Yup.string().email("Invalid email: example@mail.abc").matches(EMAIL_REGEX, "Invalid email: example@mail.abc").required("Please enter your email"),
       password: Yup.string().min(4).max(25).required("Please enter your password"),
    }),
    signup: Yup.object({
        username: Yup.string().min(4).max(25).matches(USER_REGEX).required("Please enter your name"),
        email: Yup.string().email().matches(EMAIL_REGEX, "Invalid email: example@mail.abc").required("Please enter your email"),
        password: Yup.string().min(8).max(25).required("Please enter your password"),
        confirm_password: Yup.string().required("Please enter your confirm password").oneOf([Yup.ref('password'), null], "Password must match"),    
    })    
}