import styled from "styled-components";
import dots from "./assets/dotsn.png";

export const LoginContainer = styled.div`
  color: black;
  background-color: white;
  border-radius: 8px;
  padding: 40px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .input-div {
    width: 100%;
  }
  input {
    border: black 1px solid;
  }

  @media screen and (max-width: 480px) {
    & {
      width: 90%;
    }
  }
  button {
    width: 100%;
    margin-top: 8px;
    border: black 1px solid;
  }
`;

export const Container = styled.div`
  width: 100%;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  color: grey;
  justify-content: center;
  align-items: center;
  background-image: url(${dots});
  background-repeat: repeat;
  background-color: #c13237;
  padding: 16px 0;
  img {
    width: 200px;
  }
  h2 {
    font-size: 50px;
  }
`;

export const FormContainer = styled.form`
  background-color: white;
  width: 50%;
  border: 1px solid rgba(0, 0, 0, 0.5);
  display: flex;
  padding: 20px;
  border-radius: 8px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
  @media screen and (max-width: 480px) {
    & {
      width: 90%;
    }
  }
  .title-form {
    text-align: center;
    font-size: 30px;
  }
  ul {
    display: flex;
    flex-direction: column;
    padding: 8px;
    border: 1px solid rgba(0, 0, 0, 0.5);
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    margin: 0;
    margin-top: 8px;
    width: 100%;
    li {
      margin: 0;
      width: 100%;
    }
    .buttons {
      display: flex;
      justify-content: space-around;
      padding: 4px;
      img {
        width: 13%;
        cursor: pointer;
      }
    }
  }
  .form-input {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 8px 0;
    border: 1px solid rgba(0, 0, 0, 0.5);
    border-radius: 8px;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.5);
    padding: 8px;
    input {
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 8px;
      width: 100%;
      padding: 4px;
    }

    &.card-musica {
    }
  }
`;
