import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Container from "../../Common/Container";
import {
  dashboardTabs,
  employeeTabs,
  employerTabs,
} from "@/constants/links.constants";
import useAuthRedirect from "@/hooks/useAuthRedirect";

interface Props {
  children: React.ReactNode;
}

const PanelLayout = ({ children }: Props) => {
  useAuthRedirect(false);

  return (
    <>
      <TabLayout />
      <Container className="w-full">{children}</Container>
    </>
  );
};

export default PanelLayout;
const TabLayout = () => {
  const router = useRouter();

  const links = router.pathname.includes("/employer")
    ? employerTabs
    : router.pathname.includes("/employee")
    ? employeeTabs
    : dashboardTabs;

  return (
    <div className="bg-main border-t border-primary text-white">
      <Container>
        <ul className="flex items-center gap-y-4 gap-x-10 flex-wrap">
          {links.map((l) => (
            <li key={l.url}>
              <Link
                href={l.url}
                className={`hover:opacity-70 transition px-4 py-2 rounded-full -mr-2${
                  router.pathname === l.url ? " bg-secondary" : ""
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
};
