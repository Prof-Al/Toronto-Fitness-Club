import React from 'react'
import {
    Container,
    FormWrap,
    Icon,
    FormButton,
    FormContent,
    Form,
    FormH1,
    FormInput,
    FormLabel,
    Text
} from '../AccountElements'

const Register = () => {
    return (
        <>
            <Container id="register">
                <FormWrap>
                    <Icon to='/'>Toronto Fitness Club</Icon>
                    <FormContent>
                        <Form id="registerform" action='register'>
                            <FormH1>Register</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>First Name</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Last Name</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Phone</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required />
                            <FormLabel htmlFor='for'>Repeat Password</FormLabel>
                            <FormInput type='password' required />
                            <FormLabel htmlFor='for'>Avatar</FormLabel>
                            <FormInput type='file' />
                            <FormButton type='submit'>Sign up</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

const RegisterPage = () => {
    return (
        <>
            <Register />
        </>
    )
}

export default RegisterPage;