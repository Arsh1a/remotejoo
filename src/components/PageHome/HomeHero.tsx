import React, { useState } from "react";
import { FilterType } from "@/types";
import { useRouter } from "next/router";
import { FiSearch } from "react-icons/fi";
import Image from "next/image";
import Container from "../Common/Container";
import Button from "../Common/Button";
import TextInput from "../Common/TextInput";
import GradientBackground from "../Common/GradientBackground";

interface Props {}
const HomeHero = ({}: Props) => {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/jobs?text=${search}`);
  };

  return (
    <main className="text-center hero-bg py-20 pt-24 text-white relative flex items-center justify-center">
      {/* <GradientBackground /> */}
      <Container className="flex flex-col justify-center items-center text-center relative overflow-hidden">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-semibold">
          به راحتی کار{" "}
          <strong className="font-extrabold text-transparent text-5xl md:text-8xl bg-clip-text bg-white">
            ریموت
          </strong>{" "}
          پیدا کن!
        </h1>
        <p className="text-xl my-5 md:my-10">
          با{" "}
          <strong className="text-transparent tracking-tight text-3xl bg-clip-text bg-main-orange">
            ریموتجو
          </strong>
          ، فرصت‌های شغلی دورکاری در ایران را در دستان خود داشته باش.
        </p>
        <form
          onSubmit={(e) => handleSearch(e)}
          className={`backdrop-blur-sm bg-neutral-800 bg-opacity-20 outline outline-1 transition-[outline-color] outline-primary p-2 rounded-full w-full md:w-[600px] flex justify-between`}
        >
          <TextInput
            className="focus:!outline-none !ring-0 !p-0 !px-2 text-white w-full !bg-transparent placeholder:text-white placeholder:opacity-50"
            placeholder="عنوان شغلی, مهارت یا..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button variant="primary" className="!py-2 md:!py-3" type="submit">
            <FiSearch size={18} />
            جستوجو
          </Button>
        </form>
        <div className="flex flex-col gap-10 mt-14">
          <div className="flex flex-wrap items-center justify-around sm:justify-center gap-6 sm:gap-20 brightness-0 invert-[1]">
            <div className="h-[47.55px] w-[130px] relative">
              <Image
                alt="Jobinja"
                sizes="130px"
                src="/images/jobinja.png"
                fill
              />
            </div>
            <div className="h-[49.05px] w-[111px] relative">
              <Image alt="Jobvision" src="/images/jobvision.svg" fill />
            </div>
            <div className="h-[35px] w-[35px] relative">
              <Image
                alt="E-Estekhdam"
                src="/images/e-estekhdam.png"
                sizes="35px"
                fill
              />
            </div>
            <div className="h-[32px] w-[122px] relative">
              <Image alt="E-Estekhdam" src="/images/quera.svg" fill />
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default HomeHero;
