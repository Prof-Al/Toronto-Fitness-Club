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

const LogIn = () => {
    return (
        <>
            <Container>
                <FormWrap>
                    <Icon to='/'>Toronto Fitness Club</Icon>
                    <FormContent>
                        <Form id="loginform" action='register'>
                            <FormH1>Login</FormH1>
                            <FormLabel htmlFor='for'>Email</FormLabel>
                            <FormInput type='email' required />
                            <FormLabel htmlFor='for'>Password</FormLabel>
                            <FormInput type='password' required />
                            <FormButton type='submit'>Continue</FormButton>
                        </Form>
                    </FormContent>
                </FormWrap>
            </Container>
        </>
    )
}

const LoginPage = () => {
    return (
        <>
            <LogIn />
        </>
    )
}

export default LoginPage;