import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Col,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  Input,
} from "reactstrap";
import CardPic from "../../../assets/mosaic.png";

const MyModal = (props) => {
  const { className } = props;
  const [title, setTitle] = useState(props.album.title);
  const toggle = () => props.changeModalFlag(!props.isModalOpen);

  useEffect(() => {
    setTitle(props.album.title);
  }, [props.album.title]);

  return (
    <div>
      <Modal isOpen={props.isModalOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Edit Album </ModalHeader>
        <ModalBody>
          <Col lg={{ size: 8, offset: 2 }}>
            <Card key="1">
              <CardImg top width="100%" src={CardPic} alt="Card image cap" />
              <CardBody>
                <CardTitle>
                  <Input
                    placeholder="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </CardTitle>
                <CardSubtitle>1</CardSubtitle>
              </CardBody>
            </Card>
          </Col>
        </ModalBody>
        <ModalFooter>
          <Button
            onClick={() =>
              props.edit({
                id: props.album.id,
                userId: props.album.userId,
                title: title,
              })
            }
            size="sm"
          >
            Save
          </Button>
          <Button size="sm" color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default MyModal;
