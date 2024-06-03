import React, { useEffect, useRef } from "react";
import "./style.page.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PersonalSchema } from "../../../features/validations";
import { DropDown, DropDownItem, DropDownLoader } from "../../../components";
import useUser from "../../../hooks/useUser";
import { useGetCountriesQuery } from "../../../features/services/countries/countriesService";

const PersonalPage = () => {
  const { user, updateMe, isLoadingUpdate, refetchUser } = useUser();
  const submitButtonRef = useRef();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors, isDirty, isValid },
  } = useForm({
    resolver: yupResolver(PersonalSchema),
  });

  useEffect(() => {
    if (user) {
      setValue("nickname", user.nickname);
      setValue("email", user.email);
      setValue("country", user.country);
      setValue("sex", user.sex);
    }
  }, [user]);

  const onSubmitHandler = async (data) => {
    const res = await updateMe(data);
    console.log(res);
    refetchUser();
  };

  return (
    <>
      <div className="flex r sb ch">
        <div className="profile-user-content-title">Персональні дані</div>
        <button
          className="button primary"
          disabled={!isDirty || !isValid || isLoadingUpdate}
          onClick={() => {
            if (submitButtonRef.current) {
              submitButtonRef.current.click();
            }
          }}
        >
          Зберегти
        </button>
      </div>
      <form
        className="profile-user-content-container"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="personal">
          <div className="personal-items">
            <div className="personal-item">
              <div className="personal-title">Нікнейм</div>
              <input
                type="text"
                {...register("nickname")}
                className="form__input linear"
              />
            </div>
            <div className="personal-item">
              <div className="personal-title">Електронна пошта</div>
              <input
                type="email"
                {...register("email")}
                className="form__input linear"
              />
            </div>
            <div className="personal-item">
              <div className="personal-title">Країна</div>
              <Controller
                name="country"
                control={control}
                render={({ field: { onChange, value } }) => {
                  console.log(value);
                  return (
                    <DropDownLoader
                      query={useGetCountriesQuery}
                      arrayName="countries"
                      limit={6}
                      value={value}
                      onChange={onChange}
                      placeholder="Оберіть країну"
                    />
                  );
                }}
              />
            </div>
            <div className="personal-item">
              <div className="personal-title">Стать</div>
              <Controller
                name="sex"
                control={control}
                render={({ field: { onChange, value } }) => {
                  return (
                    <DropDown
                      value={value}
                      onChange={onChange}
                      placeholder="Оберіть стать"
                      linear
                      fill
                    >
                      <DropDownItem value="Man">Чоловіча</DropDownItem>
                      <DropDownItem value="Woman">Жіноча</DropDownItem>
                    </DropDown>
                  );
                }}
              />
            </div>
          </div>
        </div>
        <button ref={submitButtonRef} type="submit" className="hidden"></button>
      </form>
    </>
  );
};

export default PersonalPage;
