import { Avatar } from "@mui/material";
import { auth } from "@/auth";

export default async function UserAvatar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <div>
      <Avatar src={session.user.image || ""} alt="User Avatar" />
    </div>
  );
}
