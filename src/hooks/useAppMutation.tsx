import {
  MutationFunction,
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "react-hot-toast";

interface AppMutationOptions<
  TData = unknown,
  TVariables = void,
  TError = unknown,
  TContext = unknown
> extends Omit<
    MutationOptions<TData, TError, TVariables, TContext>,
    "mutationFn"
  > {
  successFn?: () => any;
  errorFn?: (error?: any) => any;
  successMessage?: string;
  errorMessage?: string;
  mutationFn: MutationFunction<TData, TVariables>;
  invalidateQueryKeys?: string[];
}

const useAppMutation = <
  TData = unknown,
  TVariables = void,
  TError = unknown,
  TContext = unknown
>(
  options: AppMutationOptions<TData, TVariables, TError, TContext>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    ...options,
    onSuccess: (res) => {
      options.successFn && options.successFn();
      queryClient.invalidateQueries(options.invalidateQueryKeys);
      options.successMessage && toast.success(options.successMessage);
    },
    onError: (error: any) => {
      options.errorFn && options.errorFn();
      toast.error(
        options.errorMessage ||
          (error.response.data.message ?? "مشکلی در انجام عملیات رخ داده.")
      );
    },
  });
};

export default useAppMutation;
