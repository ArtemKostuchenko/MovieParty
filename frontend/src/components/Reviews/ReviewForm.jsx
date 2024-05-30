import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReviewSchema } from "../../features/validations";
import useReview from "../../hooks/useReview";
import useUser from "../../hooks/useUser";
import Avatar from "../../assets/avatar.png";

const ReviewForm = ({ videoContentId, disabled = false }) => {
  const { addReview, isLoadingAdd } = useReview();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(ReviewSchema),
  });

  const onSubmitHandler = async (data) => {
    const res = await addReview(videoContentId, data.msg);
    console.log(res);
    reset();
  };

  return (
    <form
      className="reviews__container"
      onSubmit={handleSubmit(onSubmitHandler)}
    >
      <div className="review__owner">
        <div className="review__profile">
          <div className="profile profile__avatar">
            <img src={Avatar} alt="Qwerty" />
          </div>
          <h2 className="profile__name">{user.nickname}</h2>
        </div>
      </div>
      <div className="reviews__form">
        <textarea {...register("msg")} placeholder="Ваш відгук" />
        {errors.msg && (
          <span className="message error">{errors.msg.message}</span>
        )}
        <button
          className="button"
          disabled={disabled || !isDirty || !isValid || isLoadingAdd}
        >
          Додати відгук
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
