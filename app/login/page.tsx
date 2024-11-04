import { LoginForm } from "@/features/auth/components/LoginForm";
import { Typography } from "@mui/material";

export default () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-xl">
        <Typography
          className="mt-6 text-3xl font-extrabold text-gray-900"
          variant="h2"
          fontSize={25}
        >
          はじめましょう！👋
        </Typography>
        <Typography variant="subtitle1">
          続行するにはログインしてください。
        </Typography>
        <LoginForm />
      </div>
    </div>
  );
};
