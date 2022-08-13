import React, { useState } from "react";
import styled from "styled-components";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import VideoCallOutlinedIcon from "@mui/icons-material/VideoCallOutlined";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import Upload from "./Upload";
const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 100%;
  padding: 0px 20px;
  position: relative;
`;
const Search = styled.div`
  width: 40%;
  position: absolute;
  left: 20%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  padding: 5px;
  color: ${({ theme }) => theme.text};
`;
const Input = styled.input`
  border: none;
  width: 100%;
  padding: 10px;
  background-color: transparent;
  color: ${({ theme }) => theme.text};
`;
const User = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #999;
`;

const LButton = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Logoutbtn = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  border-radius: 3px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
`;
const Navbar = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const dispatch = useDispatch();
  const logoutGoogle = () => {
    dispatch(logout());
  };
  return (
    <>
      <Container>
        <Wrapper>
          <Search>
            <Input
              placeholder="Search"
              onChange={(e) => setQ(e.target.value)}
            />
            <SearchOutlinedIcon
              onClick={() => navigate(`/search?q=${q}`)}
            ></SearchOutlinedIcon>
          </Search>
          {currentUser ? (
            <User>
              <VideoCallOutlinedIcon onClick={() => setOpen(true)} />
              <Avatar src={currentUser.img} />
              {currentUser.name}
              <Logoutbtn onClick={logoutGoogle}>logout</Logoutbtn>
            </User>
          ) : (
            <Link
              to="/signin"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <LButton>
                <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>SIGN IN
              </LButton>
            </Link>
          )}
        </Wrapper>
      </Container>
      {open && <Upload setOpen={setOpen} />}
    </>
  );
};

export default Navbar;
