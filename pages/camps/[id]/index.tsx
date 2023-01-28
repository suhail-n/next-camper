import { Card, Col, Container, Row } from "react-bootstrap";
import { GetServerSideProps } from "next";
import { fromNow } from "../../../util/dates";
import { CommentList } from "../../../components/Comment/CommentList";
import prisma from "../../../lib/prisma";
import { Camp } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const campId = +context.params.id;

  const foundCamp = await prisma.camp.findUniqueOrThrow({
    where: {
      id: campId,
    },
    include: {
      author: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });
  return {
    props: {
      camp: {
        ...foundCamp,
        createdAt: foundCamp.createdAt.toUTCString(),
        updatedAt: foundCamp.updatedAt.toUTCString(),
      },
    }, // will be passed to the page component as props
  };
};

export default function CampDetail({ camp }: { camp: Camp }) {
  if (camp.title === undefined) {
    return <h1>Loading ....</h1>;
  }
  return (
    <Container>
      <Row className="m-3 justify-content-center">
        <Col sm={12}>
          <Card>
            <Card.Img variant="top" src={camp.image} />
            <Card.Body>
              <Card.Title>{camp.title}</Card.Title>
              <Card.Text> Rating: {camp.rating}/5</Card.Text>
              <Card.Text>
                {" "}
                {camp.createdAt !== undefined && <strong>Posted: </strong>}
                {camp.createdAt !== undefined && fromNow(camp.createdAt)}
              </Card.Text>
              <Card.Text>{camp.content}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <CommentList campId={camp.id} />
    </Container>
  );
}
