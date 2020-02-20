import styled from "styled-components";

export const Nav = styled.div`
    background-color: blue;

    .hamburger-menu {
        background: red;
        width: 50px;
        height: 50px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;

        .hamburger-menu__line {
            width: 100%;
            height: 10px;
            background: purple;
        }
    }
`;
