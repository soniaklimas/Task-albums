import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  Button,
  Col,
  Row,
  Modal,
  ModalHeader,
  ModalFooter,
} from "reactstrap";
import { consts } from "../../../utils/consts";
import { GoTrashcan } from "react-icons/go";
import CardPic from "../../../assets/mosaic.jpg";

import EditAlbum from "./../EditAlbum/EditAlbum";

const AlbumCard = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRemoveOpen, setIsRemoveOpen] = useState(false);
  const [editedAlbum, setEditedAlbum] = useState({});
  const [idToRemove, setIdToRemove] = useState(null);

  const changeModalFlag = (flag) => {
    setIsModalOpen(flag);
  };

  const toggle = () => setIsRemoveOpen(!isRemoveOpen);

  const editAlbumHandler = (data) => {
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

  const startDelete = (id) => {
    setIdToRemove(id);
    setIsRemoveOpen(true);
  };

  return (
    <Row>
      {props.albums.map((album) => (
        <Col lg="3" md="4" sm="6" xs="12" className="card-deck" key={album.id}>
          <Card className="my-sm-2" key={album.id}>
            <CardImg top width="100%" src={CardPic} alt="Card image cap" />
            <CardBody className=" p-1">
              <CardSubtitle className="p-2">{album.title}</CardSubtitle>{" "}
              <div className="bottom pr-2">
                <Button
                  onClick={() => {
                    setEditedAlbum(album);
                    setIsModalOpen(true);
                  }}
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  className="float-right"
                  size="sm"
                  onClick={() => startDelete(album.id)}
                >
                  <GoTrashcan />
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
      <>
        {editedAlbum ? (
          <EditAlbum
            album={editedAlbum}
            isModalOpen={isModalOpen}
            edit={editAlbumHandler}
            changeModalFlag={changeModalFlag}
          />
        ) : null}
        <Modal isOpen={isRemoveOpen} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Are you sure you want to delete?
          </ModalHeader>
          <ModalFooter>
            <Button onClick={() => props.remove(idToRemove)} size="sm">
              Delete
            </Button>
            <Button size="sm" color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </>
    </Row>
  );
};

export default AlbumCard;
