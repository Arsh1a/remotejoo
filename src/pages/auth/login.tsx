import Login from "@/components/PageAuth/Login";
import useAuthStore from "@/context/useAuthStore";
import useStore from "@/hooks/useStore";
import router from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  return <Login />;
}
