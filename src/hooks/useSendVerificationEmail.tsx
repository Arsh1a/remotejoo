import { useMutation } from "@tanstack/react-query";
import { postData } from "@/utils/api";
import { toast } from "react-hot-toast";
import useAppMutation from "./useAppMutation";

//We may later want to instead of pushing user to go to settings and click on sending new verifcation code, we directly send verifaction code
//Anywhere we want.
const useSendVerificationEmail = () => {
  const { mutate, isLoading } = useAppMutation({
    mutationFn: () => postData("/auth/new-verification-token", {}),
    successMessage: "ایمیل تأیید حساب کاربری به ایمیل شما ارسال شد.",
  });

  return { mutate, isLoading };
};

export default useSendVerificationEmail;
