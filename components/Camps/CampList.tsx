import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import classes from "./CampList.module.css";
import Link from "next/link";
import { fromNow } from "../../util/dates";

type CampsListProps = {
  // camps: Camp[];
  camps: any;
};

export const CampList = ({ camps }: CampsListProps) => {
  const campsList = camps.map((camp) => (
    <Row
      className={`m-3 justify-content-center ${classes.campListItem}`}
      key={camp.id}
    >
      <Col sm={12} lg={9}>
        <Card>
          <Link className={classes.link} href={`/camps/${camp.id}`}>
            <Card.Img variant="top" src={camp.image} />
            <Card.Body>
              <Card.Title>{camp.title}</Card.Title>
              <Card.Text> Rating: {camp.rating}/5</Card.Text>
              <Card.Text>
                {" "}
                {camp.createdAt && <strong>Posted: </strong>}
                {camp.createdAt && fromNow(camp.createdAt)}
              </Card.Text>
              <Card.Text>{camp.content.slice(0, 50)} ....</Card.Text>
            </Card.Body>
          </Link>
        </Card>
      </Col>
    </Row>
  ));
  return <Container>{campsList}</Container>;
};
