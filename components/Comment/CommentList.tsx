import { useEffect, useState, FormEvent, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { CampComments, getCampComments } from "../../lib/client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Comment } from "./Comment";

type CommentProps = {
  campId: number;
};

export const CommentList = ({ campId }: CommentProps) => {
  const [comments, setComments] = useState<CampComments[]>([]);
  const [textarea, setTextarea] = useState<string>("");
  const [buttonVisible, setButtonVisible] = useState<boolean>(false);
  const [scrollToCommentButton, setScrollToCommentButton] = useState(false);
  const [editingComment, setEditingComment] = useState<number>(null);
  const [error, setError] = useState<string>("");
  const { data: session } = useSession();
  const commentRef = useRef(null);
  const router = useRouter();

  const setCampComments = async (campid: number, signal: AbortSignal) => {
    const response = await getCampComments(campid);
    const status = response.status;
    if (status !== 200) {
      console.log("coudn't fetch comments");
    } else {
      const commentsList = await response.json();
      setComments(commentsList);
    }
  };
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    setCampComments(campId, signal).catch((e) => console.log(e));

    // cancel controller if leaving the page
    return () => controller.abort();
  }, [campId]);

  useEffect(() => {
    // scroll down to comment buttons when clicked
    if (buttonVisible) {
      const observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) {
          setScrollToCommentButton(true);
        }
      });
      observer.observe(commentRef.current);

      return () => {
        setScrollToCommentButton(false);
        observer.disconnect();
      };
    }
  }, [buttonVisible, commentRef]);

  useEffect(() => {
    if (scrollToCommentButton) {
      commentRef.current.scrollIntoView(false);
      // setTimeout(() => commentRef.current.scrollIntoView(false), 200);
    }
  }, [scrollToCommentButton, commentRef]);

  function onCommentUpdateHandler(comment: CampComments) {
    const updatedComments = comments.map((c) => {
      if (c.id === comment.id) {
        // c.body = comment.body;
        return comment;
      }
      return c;
    });
    setComments(updatedComments);
  }

  function onCommentTextareaClickHandler() {
    if (session?.user) {
      setButtonVisible(true);
    } else {
      signIn();
    }
  }

  async function onCommentSubmitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const commentBody = textarea.trim();
    if (commentBody.length < 1) {
      return;
    }
    const response = await fetch(`/api/camps/${campId}/comments`, {
      method: "POST",
      body: JSON.stringify({
        comment: commentBody,
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
    if (status !== 201) {
      setError(body.message);
      return;
    }
    setTextarea("");
    setComments([body, ...comments]);
    setButtonVisible(false);
  }

  return (
    <div>
      <h2>Comments</h2>
      <section className="commentSection">
        <Form onSubmit={onCommentSubmitHandler} className="mt-3">
          <Form.Group className="mb-3" controlId="commentInput">
            <Form.Control
              as="textarea"
              placeholder="Add a comment..."
              rows={3}
              onClick={onCommentTextareaClickHandler}
              value={textarea}
              onChange={(e) => setTextarea(e.target.value)}
            />
          </Form.Group>
          {/* {auth?.user && but÷tonVisible && ( */}
          <div style={{ marginBottom: "2rem" }} ref={commentRef}>
            {buttonVisible && (
              <>
                {error && (
                  <>
                    <Form.Text className="text-danger">{error}</Form.Text>
                    <br />
                  </>
                )}

                <Button variant="light" type="submit">
                  COMMENT
                </Button>
                <Button
                  variant="secondary"
                  type="button"
                  onClick={(_) => setButtonVisible(false)}
                >
                  CANCEL
                </Button>
              </>
            )}
          </div>
        </Form>
        {comments.map((comment) => (
          <Comment
            key={comment.id}
            isEditing={comment.id === editingComment}
            setEditingComment={setEditingComment}
            comment={comment}
            userEmail={session?.user.email}
            campId={campId}
            // userId={auth?.user?.id}
            onCommentUpdateHandler={onCommentUpdateHandler}
          />
        ))}
      </section>
    </div>
  );
};
