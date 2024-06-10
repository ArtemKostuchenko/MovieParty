import {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
} from "../features/services/subscriptions/subscriptionsApi";
import useUser from "./useUser";

const useSubscription = () => {
  const { user } = useUser();
  const {
    data: subscription,
    isLoading,
    refetch,
  } = useGetSubscriptionQuery(user.subscription ? user.subscription : "");

  const [
    createMutation,
    { isLoading: isLoadingCreate, isSuccess: isSuccessCreate },
  ] = useCreateSubscriptionMutation();

  const [
    cancelMutation,
    { isLoading: isLoadingCancel, isSuccess: isSuccessCancel },
  ] = useCancelSubscriptionMutation();

  const createSubscription = async () => {
    return await createMutation().unwrap();
  };

  const cancelSubscription = async (subscription) => {
    return await cancelMutation(subscription).unwrap();
  };

  return {
    subscription,
    isLoading,
    createSubscription,
    isLoadingCreate,
    isSuccessCreate,
    cancelSubscription,
    isLoadingCancel,
    isSuccessCancel,
  };
};

export default useSubscription;
