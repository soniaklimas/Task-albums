import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner, Alert } from "reactstrap";
import { RiEmotionSadLine } from "react-icons/ri";
import { consts } from "../utils/consts";
import Sidebar from "../components/Sidebar/Sidebar";

export default function (ComposedComponent) {
  const SidebarHocProvider = (props) => {
    const [albums, setAlbums] = useState([]);
    const [displayedAlbum, setDisplayedAlbum] = useState([]);
    const [userList, setUsersList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      fetchAlbums();
    }, []);

    useEffect(() => {
      showAlbumsHandler(1);
    }, [albums]);

    const fetchAlbums = () => {
      setIsLoading(true);

      axios
        .get(`${consts.baseUrl}/albums`)
        .then((response) => {
          setError(null);
          setIsLoading(false);
          setAlbums(response.data);
        })
        .catch((err) => {
          setError(err.message);
        });
    };

    const showAlbumsHandler = (id) => {
      const displayedAlbums = [];
      albums.forEach((user) => {
        if (!displayedAlbums.includes(user.userId)) {
          displayedAlbums.push(user.userId);
        }
        setUsersList(displayedAlbums);
        const album = albums.filter((album) => album.userId === id);
        setDisplayedAlbum(album);
      });
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
      <>
        {error ? (
          <div className="error">
            {" "}
            <Alert color="danger">
              <RiEmotionSadLine />
              Something went wrong...
              {error}
            </Alert>
          </div>
        ) : (
          <>
            {isLoading ? (
              <Container className="spinner">
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="info" />
                <Spinner type="grow" color="info" />
              </Container>
            ) : (
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
            )}
          </>
        )}
      </>
    );
  };

  return SidebarHocProvider;
}
