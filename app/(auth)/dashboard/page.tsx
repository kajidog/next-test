import UserAvatar from "@/components/ui/UserAvatar";
import { signOut } from "@/auth";
export const metadata = {
  title: "App Router",
};

export default function Page() {
  return (
    <>
      <h1>Dash Board</h1>
      <UserAvatar />
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </>
  );
}
