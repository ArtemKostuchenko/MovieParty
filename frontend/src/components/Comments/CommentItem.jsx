import React from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../features/utils/functions";
import Avatar from "../Avatar/Avatar";

const CommentItem = ({
  videoContent,
  user,
  createdAt,
  message,
  likesCount,
  dislikesCount,
  skeleton = false,
  removable = false,
  editable = false,
}) => {
  if (skeleton) {
    return (
      <div className="user-comments-item loader-skeleton user-comment"></div>
    );
  }

  const {
    title,
    originTitle,
    typeVideoContent: { path },
  } = videoContent;

  const { nickname, avatarURL, avatarColor } = user;

  const previewURL = `${
    import.meta.env.VITE_BACK_HOST
  }/static/files/images/content/${videoContent.previewURL}`;

  const videoContentLink = `/${path}/${originTitle
    .toLowerCase()
    .replace(/\s/g, "-")}`;

  return (
    <div className="user-comments-item">
      <div className="comment">
        <Link to={videoContentLink} className="comment-content-image">
          <img src={previewURL} alt={title} />
        </Link>
        <div className="comment-content-info">
          <div className="comment-content-owner">
            <div className="comment-content-user">
              <Avatar
                photoURL={avatarURL}
                nickname={nickname}
                avatarColor={avatarColor}
                width={40}
                height={40}
              />
              <div className="comment-content-user-nickname">{nickname}</div>
            </div>
            <div className="icon shift" />
            <div className="comment-content-date">
              {formatDate(createdAt, "dots")}
            </div>
            <div className="icon shift" />
            <Link to={videoContentLink} className="comment-content-ref">
              {title}
            </Link>
            {editable && (
              <button className="comment-edit">
                <div className="icon edit" />
              </button>
            )}
            {removable && (
              <button className="comment-delete">
                <div className="icon delete" />
              </button>
            )}
          </div>
          <div className="comment-content-message">{message}</div>
          <div className="comment-content-reactions">
            <div className="comment-reactions">
              <div className="comment__likes">
                <button className="button icon i t" disabled>
                  <div className="icon like" />
                </button>
                <div className="comment-reactions-count">{likesCount}</div>
              </div>
              <div className="comment__dislikes">
                <button className="button icon i t" disabled>
                  <div className="icon dislike" />
                </button>
                <div className="comment-reactions-count">{dislikesCount}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
