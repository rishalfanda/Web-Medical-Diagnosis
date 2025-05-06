/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { useUser } from "../hooks/authentication/useUser"
import Spinner from "./Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`

function ProtectedRouted({children}) {
    const navigate = useNavigate()

    //1 load the auth user
    const {isLoading, isAuthenticated} = useUser();

    //2 if there is no user, redirect to login
    useEffect(function(){
        if(!isAuthenticated && !isLoading)
            navigate("/login")
    }, [isAuthenticated, isLoading, navigate])
    
    //3 while loading show the spinner
    if(isLoading) return(
        <FullPage>
            <Spinner/>
        </FullPage>
    )

    //4 if there user, show the app
    if(isAuthenticated) return children
    
}

export default ProtectedRouted
