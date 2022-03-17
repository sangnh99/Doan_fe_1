// import React, { createElement, useState, useEffect } from 'react';
// import ReactDOM from 'react-dom';
// import { Comment, Tooltip, Avatar } from 'antd';
// import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
// import foodService from '../../services/food-service';

// const CommentBox = (props) => {
//   const [likes, setLikes] = useState(0);
//   const [dislikes, setDislikes] = useState(0);
//   const [action, setAction] = useState(null);
//   const [voted, setVoted] = useState(0);
//   const [id, setId] = useState(props.id);

//   useEffect(() => {
//     setLikes(parseInt(props.likenum));
//     setDislikes(parseInt(props.dislikenum));
//     setVoted(0);
//     setAction(null);
//   }, [])

//   useEffect(() => {
//     setLikes(parseInt(props.likenum));
//     setDislikes(parseInt(props.dislikenum));
//     setVoted(0);
//     setAction(null);
//   }, props.id);

//   const like = () => {
//     if (voted === 0) {
//       setLikes(likes + 1);
//       setAction('liked');
//       setVoted(1);
//       foodService.updateVoteForFood(props.id, "1");
//     }
//   };

//   const dislike = () => {
//     if (voted === 0) {
//       setDislikes(dislikes + 1);
//       setAction('disliked');
//       setVoted(1);
//       foodService.updateVoteForFood(props.id, "0");
//     }
//   };

//   const actions = [
//     <Tooltip key="comment-basic-like" title="Like">
//       <span onClick={like}>
//         {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
//         <span className="comment-action">{likes}</span>
//       </span>
//     </Tooltip>,
//     <Tooltip key="comment-basic-dislike" title="Dislike">
//       <span onClick={dislike}>
//         {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
//         <span className="comment-action">{dislikes}</span>
//       </span>
//     </Tooltip>,
//     <span key="comment-basic-reply-to">{props.createddate}</span>,
//   ];

//   return (
//     <Comment
//       actions={actions}
//       author={
//         props.foodName == null ? <span><a style={{ color: "#595959", fontSize: 15 }}>{props.name}</a> đã đánh giá {props.rating} sao !</span>
//           : <span><a style={{ color: "#595959", fontSize: 15 }}>{props.name}</a> đã đánh giá {props.rating} sao ! cho {props.foodName}</span>
//       }
//       avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
//       content={
//         <div>
//           <p>
//             {props.comment}
//           </p>

//           {
//             props.listimage.length != 0 && (
//               <div className='row' style={{marginTop : 15}}>
//                 {
//                   props.listimage.map(item => {
//                     return (
//                       <div className='col-xl-2'>
//                         <img src={item} style={{ height: 130, width: "100%" }}></img>
//                       </div>
//                     );
//                   })
//                 }
//               </div>
//             )
//           }
//         </div>
//       }
//     // datetime={
//     //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
//     //     <span>{moment().fromNow()}</span>
//     //   </Tooltip>
//     // }
//     />
//   );
// };

// export default CommentBox;

import React, { createElement, useState, useEffect } from 'react';
import { Comment, Tooltip, Avatar } from 'antd';
import { DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled } from '@ant-design/icons';
import foodService from '../../services/food-service';
import { Link, useHistory } from 'react-router-dom';


export default function CommentBoxStore(props) {
  const [likes, setLikes] = useState(0);
  const [listImage, setListImage] = useState([]);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);
  const [voted, setVoted] = useState(0);
  const history = useHistory();

  useEffect(() => {
    setLikes(parseInt(props.likenum));
    setDislikes(parseInt(props.dislikenum));
    setListImage(props.listimage)
    setAction(null);
    setVoted(0);
  }, [])

  useEffect(() => {
    setLikes(parseInt(props.likenum));
    setDislikes(parseInt(props.dislikenum));
    setListImage(props.listimage);
    setAction(null);
    setVoted(0);
  }, [props.id]);



  const like = () => {
    if (voted === 0) {
      setLikes(likes + 1);
      setAction('liked');
      setVoted(1);
      foodService.updateVoteForFood(props.id, "1");
    }
  };

  const dislike = () => {
    if (voted === 0) {
      setDislikes(dislikes + 1);
      setAction('disliked');
      setVoted(1);
      foodService.updateVoteForFood(props.id, "0");
    }
  };


  return (
    <Comment
      author={
        props.foodName == null ? <span><a style={{ color: "#595959", fontSize: 17 }}>{props.name}</a> đã đánh giá {props.rating} sao !</span>
          : <span><a style={{ color: "#595959", fontSize: 16 }}>{props.name}</a> đã đánh giá {props.rating} sao ! cho {props.foodName}</span>
      }
      avatar={<Avatar src={props.useravatar} alt="Han Solo" />}
      content={
        <div>
          <p>
            {props.comment}
          </p>

          {
            listImage.length != 0 && (
              <div className='row' style={{ marginTop: 15 }}>
                {
                  listImage.map(item => {
                    return (
                      <div className='col-xl-2'>
                        <img src={item} style={{ height: 130, width: "100%" }}></img>
                      </div>
                    );
                  })
                }
              </div>
            )
          }

          <div style={{marginTop : 10, marginBottom : -8}}>
            {
              props.listlikefood.length != 0 && (
                <p style={{ fontFamily: "Nunito" }}><span>Người dùng này đã thích : </span>
                  {
                    props.listlikefood.map(recomm => {
                      return (
                        // <a onClick={() => { history.push(`/food/${recomm.food_id}`) }}>&ensp;{recomm.food_name}&ensp;</a>
                        <Link to={"/food/" + recomm.food_id}><span>&ensp;{recomm.food_name}&ensp;</span></Link>
                      )
                    }
                    )
                  }
                </p>
              )
            }
          </div>

          <div style={{ marginTop: 15, color: "rgba(0,0,0,.45)", fontFamily: "Nunito", fontSize: 14 }}>
            <Tooltip title="Like">
              <span onClick={like}>
                {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
                <span>{likes}</span>
              </span>

            </Tooltip>&ensp;
            <Tooltip title="Dislike">
              <span onClick={dislike}>
                {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
                <span>{dislikes}</span>
              </span>

            </Tooltip> &ensp;
            <span key="comment-basic-reply-to">{props.createddate}</span>
          </div>
        </div>
      }
    // datetime={
    //   <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
    //     <span>{moment().fromNow()}</span>
    //   </Tooltip>
    // }
    />
  );
};
