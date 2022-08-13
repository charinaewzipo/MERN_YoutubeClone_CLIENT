import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const Home = ({ type }) => {
  const [video, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      let headers = new Headers();

      headers.append("Content-Type", "application/json");
      headers.append("Accept", "application/json");

      headers.append("Origin", `${process.env.REACT_APP_API}`);
      const res = await axios.get(
        `${process.env.REACT_APP_API}/videos/${type}`,
        { mode: "cors", credentials: "include", headers: headers }
      );
      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);
  return (
    <Container>
      {video.map((video) => {
        return <Card key={video._id} video={video} />;
      })}
    </Container>
  );
};

export default Home;
