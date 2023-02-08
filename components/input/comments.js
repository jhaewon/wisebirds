import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if(showComments){
      fetch('/api/comments/'+eventId).then((response=>response.json()))
      .then((data) => {
        setComments(data.comments);
      })
    }
  },[showComments]);
  
  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {

    notificationCtx.showNotification({
      title: "Sending comment",
      message: "Comment being stored",
      status: "pending",
    });

    // send data to API
    fetch('/api/comments/'+eventId, {
      method:'POST',
      body:JSON.stringify(commentData),
      headers:{
        'Content-Type':'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      response.json().then(data=>{
        throw new Error(data.message || 'Someting went wrong');
      })
      .catch(error=>{
        notificationCtx.showNotification({
          title: "error",
          message: error.message || "Someting went wrong",
          status: "error",
        });
      });
    })
    .then(data => {
      notificationCtx.showNotification({
        title: "Success",
        message: "Comment saved",
        status: "success",
      });
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments}/>}
    </section>
  );
}

export default Comments;
