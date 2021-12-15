import React, { createElement, useState } from 'react';
import ReactDOM from 'react-dom';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import foodService from '../../services/food-service';

const CommentBox = (props) => {
  const [likes, setLikes] = useState(parseInt(props.likenum, 10));
  const [dislikes, setDislikes] = useState(parseInt(props.dislikenum, 10));
  const [action, setAction] = useState(null);
  const [voted, setVoted] = useState(0);
  const [id, setId] = useState(props.id);

  const like = () => {
    if (voted === 0){
      setLikes(likes + 1);
      setAction('liked');
      setVoted(1);
      foodService.updateVoteForFood(id, "1");
    }
  };

  const dislike = () => {
    if (voted === 0){
      setDislikes(dislikes + 1);
      setAction('disliked');
      setVoted(1);
      foodService.updateVoteForFood(id, "0");
    }
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={
      props.foodName == null ? <span><a style={{color : "#595959", fontSize: 15}}>{props.name}</a> đã đánh giá {props.rating} sao !</span>
      :  <span><a style={{color : "#595959", fontSize: 15}}>{props.name}</a> đã đánh giá {props.rating} sao ! cho {props.foodName}</span>
      }
      avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
      content={
        <p>
            {props.comment}
            
        </p>
      }
      // datetime={
      //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
      //     <span>{moment().fromNow()}</span>
      //   </Tooltip>
      // }
    />
  );
};

export default CommentBox;