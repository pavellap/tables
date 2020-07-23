import styled from "styled-components";

const Container = styled.section`
    display: flex;
    flex-direction: column;
    height: 100vh;
    border: 1px solid cadetblue;
    h1 {
        text-align: center;
        font-weight: normal;
        border-bottom: 1px solid lightgray;
        padding-bottom: 10px;
    }
    a {
        display: flex;
        width: 70%;
        margin: 10px auto;
        justify-content: space-between;
        border-radius: 13px;
        text-decoration: none;
        color: #111;
        padding: 12px 15px;
        &:hover {
            background-color: #EAF4EC;
        }
    }
`

const NavItem = styled.div`
  width: 100%;
`

const Header = styled.header`
    display: flex;
    justify-content: space-between;
    width: 70%;
    margin: 10px auto;
    font-size: 20px;
`

export {Container, NavItem, Header}