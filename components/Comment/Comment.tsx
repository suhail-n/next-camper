import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, FormEvent, Dispatch } from "react";
import { fromNow } from "../../util/dates";
import { CampComments } from "../../lib/client";
import { useRouter } from "next/router";

type CommentProps = {
  comment: CampComments;
  userEmail: string;
  isEditing: boolean;
  campId: number;
  setEditingComment: Dispatch<number>;
  onCommentUpdateHandler: (comment: CampComments) => void;
};

export const Comment = ({
  comment,
  userEmail,
  isEditing,
  setEditingComment,
  onCommentUpdateHandler,
  campId,
}: CommentProps) => {
  const [textarea, setTextarea] = useState(comment.body);
  const [error, setError] = useState("");
  const router = useRouter();
  async function onSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentBody = textarea.trim();
    if (commentBody.length < 1) {
      return;
    }
    const response = await fetch(`/api/camps/${campId}/comments`, {
      method: "PATCH",
      body: JSON.stringify({
        comment: commentBody,
        id: comment.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const status = response.status;
    if (status === 401) {
      router.push("/api/auth/signin");
    }
    const body = await response.json();
    if (status !== 200) {
      setError(body.message);
      return;
    }
    onCommentUpdateHandler({ ...body });
    setTextarea("");
    setEditingComment(null);
  }

  return (
    <Card className="border-0 border-bottom rounded-0">
      <Row>
        <Card.Body>
          <div>
            <Card.Title>
              {comment.owner.firstName + " " + comment.owner.lastName}{" "}
              {comment.createdAt !== comment.updatedAt && (
                <span style={{ fontSize: "0.7em" }} className="text-muted mx-1">
                  <em>(edited)</em>
                </span>
              )}
            </Card.Title>{" "}
            <Card.Subtitle className="mb-2 text-muted">
              {fromNow(comment.createdAt)}
            </Card.Subtitle>
            <span></span>
          </div>
          {isEditing && (
            <Form onSubmit={onSubmitHandler}>
              <Form.Group className="mb-3" controlId="commentInput">
                <Form.Control
                  as="textarea"
                  placeholder="Add a comment..."
                  rows={3}
                  value={textarea}
                  onChange={(e) => setTextarea(e.target.value)}
                />
              </Form.Group>
              {isEditing && (
                <>
                  {error && (
                    <>
                      <Form.Text className="text-danger">{error}</Form.Text>
                      <br />
                    </>
                  )}
                  {error && (
                    <>
                      <Form.Text className="text-danger">{error}</Form.Text>
                      <br />
                    </>
                  )}
                  <Button
                    variant="light"
                    size="sm"
                    type="submit"
                    className="mx-1"
                  >
                    SAVE
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    type="button"
                    className="mx-1"
                    onClick={(_) => {
                      setEditingComment(null);
                      setTextarea(comment.body);
                    }}
                  >
                    CANCEL
                  </Button>
                </>
              )}
            </Form>
          )}
          {!isEditing && (
            <>
              <Card.Text>{comment.body}</Card.Text>
              {comment.owner.email === userEmail && (
                <Button
                  variant="light"
                  size="sm"
                  onClick={() => setEditingComment(comment.id)}
                >
                  Edit
                </Button>
              )}{" "}
            </>
          )}
        </Card.Body>
      </Row>
    </Card>
  );
};
