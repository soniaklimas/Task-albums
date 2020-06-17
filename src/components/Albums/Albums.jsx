import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Input,
  ModalFooter,
  Alert,
} from "reactstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { RiEmotionSadLine } from "react-icons/ri";
import CardPic from "../../assets/mosaic.jpg";
import { consts } from "../../utils/consts";
import withSidebar from "../../hocs/withSidebar";
import AlbumCard from "./AlbumCard/AlbumCard";

const Albums = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const toggle = () => setIsModalOpen(!isModalOpen);

  const createAlbum = () => {
    const data = { title: title };
    const lastObject = props.allAlbums
      .map((album) => album.id)
      .sort((a, b) => (a < b ? 1 : -1))[0];
    data.id = lastObject.id + 1;
    data.userId = props.album[0].userId;

    axios
      .post(`${consts.baseUrl}/albums`, data)
      .then((response) => {
        if (response.status === 201) {
          setIsModalOpen(false);
          props.fetchAlbums(data.userId);
        }
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <AlbumCard
            albums={props.album}
            remove={props.remove}
            fetchAlbums={props.fetchAlbums}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Button className="newItemBtn" onClick={() => setIsModalOpen(true)}>
            {" "}
            <AiFillPlusCircle />
          </Button>
        </Col>
      </Row>
      <Modal isOpen={isModalOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create new Album </ModalHeader>
        <ModalBody>
          <Col lg={{ size: 8, offset: 2 }}>
            {error ? (
              <Alert color="danger">
                <RiEmotionSadLine />
                {error}
              </Alert>
            ) : null}
            <Card>
              <CardImg top width="100%" src={CardPic} alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <Input
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </CardTitle>
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => createAlbum()} size="sm">
            Save
          </Button>
          <Button size="sm" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default withSidebar(Albums);
