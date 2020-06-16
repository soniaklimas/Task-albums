import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Container, Row, Col } from "reactstrap";
import axios from "axios";
import { consts } from "../utils/API";

export default function (ComposedComponent) {
  const SidebarHocProvider = (props) => {
    const [albums, setAlbums] = useState([]);
    const [displayedAlbum, setDisplayedAlbum] = useState([]);
    const [userList, setUsersList] = useState([]);
    //  const [isLoading, setIsLoading] = useState(false);

    // const baseUrl = "http://localhost:4000";

    useEffect(() => {
      fetchAlbums(1);
    }, []);

    const fetchAlbums = (id) => {
      axios
        .get(`${consts.baseUrl}/albums`)
        .then((response) => {
          setAlbums(response.data);
          const newArray = [];
          response.data.forEach((user) => {
            if (!newArray.includes(user.userId)) {
              newArray.push(user.userId);
            }
            setUsersList(newArray);
            const album = response.data.filter((album) => album.userId === id);
            setDisplayedAlbum(album);
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    const showAlbumsHandler = (id) => {
      fetchAlbums(id);
    };

    const removeAlbumHandler = (id) => {
      const albumToRemove = albums.filter((album) => album.id === id)[0];
      axios
        .delete(`${consts.baseUrl}/albums/${id}`)
        .then((response) => {
          if (response.status === 200) {
            fetchAlbums(albumToRemove.userId);
          }
        })
        .catch((err) => {
          console.log("err", err);
        });
    };

    return (
      <Container fluid>
        <Row>
          <Col lg="2" md="2" sm="2" xs="3" className="pr-1 pl-1">
            <Sidebar
              userList={userList}
              showAlbumsHandler={showAlbumsHandler}
            />
          </Col>
          <Col lg="10" md="10" sm="10" xs="9">
            <ComposedComponent
              {...props}
              album={displayedAlbum}
              remove={removeAlbumHandler}
              fetchAlbums={fetchAlbums}
              allAlbums={albums}
            />
          </Col>
        </Row>
      </Container>
    );
  };

  return SidebarHocProvider;
}
