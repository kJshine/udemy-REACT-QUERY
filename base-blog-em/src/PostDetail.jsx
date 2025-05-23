import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateTitleMutation }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["postComments", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return (
      <>
        <div>error</div>
        <p>{error.toString()}</p>
      </>
    );
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>{" "}
        {deleteMutation.isPending && (
          <p className="Loading">Deleting the post</p>
        )}
        {deleteMutation.isError && (
          <p className="error">
            Error deleting the post: {deleteMutation.error.toString()}
          </p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post was (not) deleted</p>
        )}
      </div>
      <div>
        <button onClick={() => updateTitleMutation.mutate(post.id)}>
          Update title
        </button>
        {updateTitleMutation.isPending && (
          <p className="loading">updating the title</p>
        )}
        {updateTitleMutation.isError && (
          <p className="eeror">
            Error updating the post title:{" "}
            {updateTitleMutation.error.toString()}
          </p>
        )}
        {updateTitleMutation.isSuccess && (
          <p className="success">Post title was (not) updated</p>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
