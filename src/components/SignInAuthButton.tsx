import { useSignIn } from "@clerk/clerk-react";

const SignInAuthButton = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) return null;

  const signInWithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback", 
      redirectUrlComplete: "/auth-callback"
    });
  };

  return (
    <button
      onClick={signInWithGoogle}
      className="px-4 py-2 rounded-md bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition"
    >
      Continue with Google
    </button>
  );
};

export default SignInAuthButton;
