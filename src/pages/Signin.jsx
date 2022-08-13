import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginFailure, loginStart, loginSuccess } from "../redux/userSlice";
import { auth, provider } from "../utils/firebase";
import { signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 56px);
  color: ${({ theme }) => theme.text};
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  padding: 20px 50px;
  gap: 10px;
  flex-direction: column;
`;

const Title = styled.h1`
  font-size: 24px;
`;
const SubTitle = styled.h2`
  font-size: 20px;
  font-weight: 300;
`;
const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
  outline: none;
  width: 100%;
`;
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-weight: 500;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const More = styled.div``;
const Signin = () => {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    dispath(loginStart());
    try {
      const res = await axios.post(
        `${process.env.PROXY_CORS}/${process.env.REACT_APP_API}/auth/signin`,
        {
          name,
          password,
        }
      );
      dispath(loginSuccess(res.data));
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      navigate("/");
    } catch (error) {
      dispath(loginFailure());
    }
  };

  const signInWithGoogle = async () => {
    dispath(loginStart());
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log(result);
        axios
          .post(
            `${process.env.PROXY_CORS}/${process.env.REACT_APP_API}/auth/google`,
            {
              name: result.user.displayName,
              email: result.user.email,
              img: result.user.photoURL,
            }
          )
          .then((res) => {
            console.log(res.data);
            dispath(loginSuccess(res.data));
            navigate("/");
          });
      })
      .catch((error) => {
        dispath(loginFailure());
      });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const signup = await axios.post(
        `${process.env.PROXY_CORS}/${process.env.REACT_APP_API}/auth/signup`,
        {
          name: name,
          email: email,
          password: password,
        }
      );
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Signup in successfully",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "User or password is incorrect",
        icon: "error",
        confirmButtonText: "Cool",
      });
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title> Signin</Title>

        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Sign in</Button>
        <Title>or</Title>
        <Button onClick={signInWithGoogle}>Signin with Google</Button>
        <Input
          placeholder="username"
          onChange={(e) => setName(e.target.value)}
        />
        <Input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup}>Sign Up</Button>
      </Wrapper>
    </Container>
  );
};

export default Signin;
