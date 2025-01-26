import Button from "@mui/material/Button";
import Link from "next/link";

export const metadata = {
  title: "Welcome!!",
};

export default function Page() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link href="/login">
        <Button variant="outlined">ログイン</Button>
      </Link>
    </div>
  );
}
