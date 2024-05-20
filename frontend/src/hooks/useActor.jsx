import {
  useAddActorMutation,
  useUpdateActorMutation,
  useRemoveActorMutation,
} from "../features/services/actors/actorsService";

const useActor = () => {
  const [addMutation, { isLoading: isLoadingAdd, isSuccess: isSuccessAdd }] =
    useAddActorMutation();

  const [
    updateMutation,
    { isLoading: isLoadingUpdate, isSuccess: isSuccessUpdate },
  ] = useUpdateActorMutation();

  const [
    removeMutation,
    { isLoading: isLoadingRemove, isSuccess: isSuccessRemove },
  ] = useRemoveActorMutation();

  const addActor = async (actor) => {
    return await addMutation(actor).unwrap();
  };

  const updateActor = async (actor) => {
    return await updateMutation(actor).unwrap();
  };

  const removeActor = async (id) => {
    return await removeMutation(id).unwrap();
  };

  return {
    addActor,
    isLoadingAdd,
    isSuccessAdd,
    updateActor,
    isLoadingUpdate,
    isSuccessUpdate,
    removeActor,
    isLoadingRemove,
    isSuccessRemove,
  };
};

export default useActor;
