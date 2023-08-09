import { useMutation } from "@tanstack/react-query";
import { postData } from "@/utils/api";
import { toast } from "react-hot-toast";

const useSendVerificationEmail = () => {
  const { mutate, isLoading } = useMutation({
    mutationFn: () => postData("/auth/new-verification-token", {}),
    onSuccess: () => {
      toast.success("ایمیل تأیید حساب کاربری به ایمیل شما ارسال شد.");
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });

  return { mutate, isLoading };
};

export default useSendVerificationEmail;
