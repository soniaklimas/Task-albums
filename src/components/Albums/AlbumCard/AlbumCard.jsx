import React, { useState } from "react";
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Col,
  Row,
} from "reactstrap";
import { GoTrashcan } from "react-icons/go";
import MyModal from "../NewAlbumModal/NewAlbumModal";
import axios from "axios";
import { consts } from "../../../utils/API";
import CardPic from "../../../assets/mosaic.png";

const AlbumCard = (props) => {
  // const baseUrl = "http://localhost:4000";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedAlbum, setEditedAlbum] = useState({});
  const changeModalFlag = (flag) => {
    setIsModalOpen(flag);
  };

  const editAlbumHandler = (data) => {
    console.log("data", data);
    axios
      .put(`${consts.baseUrl}/albums/${data.id}`, data)
      .then((response) => {
        if (response.status === 200) {
          console.log("res", response);
          props.fetchAlbums(data.userId);
          setIsModalOpen(false);
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  return (
    <Row>
      {props.albums.map((album) => (
        <Col lg="3" md="4" sm="6" xs="12" className="card-deck">
          <Card className="my-sm-2" key={album.id}>
            <CardImg top width="100%" src={CardPic} alt="Card image cap" />
            <CardBody>
              <CardTitle>{album.title}</CardTitle>
              <CardSubtitle>{album.id}</CardSubtitle>{" "}
              <Button
                onClick={() => {
                  setEditedAlbum(album);
                  setIsModalOpen(true);
                }}
                size="sm"
                color="info"
              >
                Edit
              </Button>
              <Button
                className="float-right "
                size="sm"
                onClick={() => props.remove(album.id)}
              >
                <GoTrashcan />
              </Button>
            </CardBody>
          </Card>
        </Col>
      ))}
      {editedAlbum ? (
        <MyModal
          album={editedAlbum}
          isModalOpen={isModalOpen}
          edit={editAlbumHandler}
          changeModalFlag={changeModalFlag}
        />
      ) : null}
    </Row>
  );
};

export default AlbumCard;
