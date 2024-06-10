import {
  useGetSubscriptionQuery,
  useCreateSubscriptionMutation,
  useCancelSubscriptionMutation,
  useRenewSubscriptionMutation,
} from "../features/services/subscriptions/subscriptionsApi";
import useUser from "./useUser";

const useSubscription = () => {
  const { user } = useUser();
  const {
    data: subscription,
    isLoading,
    refetch: refetchSubscription,
  } = useGetSubscriptionQuery(user.subscription ? user.subscription : "");

  const [
    createMutation,
    { isLoading: isLoadingCreate, isSuccess: isSuccessCreate },
  ] = useCreateSubscriptionMutation();

  const [
    cancelMutation,
    { isLoading: isLoadingCancel, isSuccess: isSuccessCancel },
  ] = useCancelSubscriptionMutation();

  const [
    renewMutation,
    { isLoading: isLoadingRenew, isSuccess: isSuccessRenew },
  ] = useRenewSubscriptionMutation();

  const createSubscription = async () => {
    return await createMutation().unwrap();
  };

  const cancelSubscription = async (subscription) => {
    return await cancelMutation(subscription).unwrap();
  };

  const renewSubscription = async (subscription) => {
    return await renewMutation(subscription).unwrap();
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
    refetchSubscription,
    renewSubscription,
    isLoadingRenew,
    isSuccessRenew,
  };
};

export default useSubscription;
