import Button from "@/components/Common/Button";
import Card from "@/components/Common/Card";
import Container from "@/components/Common/Container";
import DataNotFound from "@/components/Common/DataNotFound";
import Link from "next/link";

export default function Custom404() {
  return (
    <Container className="flex flex-col items-center justify-center">
      <DataNotFound
        text={
          <div className="flex flex-col items-center justify-center gap-2">
            <h1>404 - صفحه یافت نشد.</h1>
            <Link href="/">
              <Button>بازگشت به خانه</Button>
            </Link>
          </div>
        }
      />
    </Container>
  );
}
