import Modal from "@/components/shared/Modal";
import { signIn } from "next-auth/react";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  useCallback,
  useMemo,
} from "react";
import Image from "next/image";
import { Github } from "lucide-react";
import Button from "@/components/shared/Button";
import Google from "@/components/shared/icons/Google";

interface SignInModalProps {
  showSignInModal: boolean;
  setShowSignInModal: Dispatch<SetStateAction<boolean>>;
}

enum SIGN_IN_PROVIDER {
  GITHUB = "github",
  GOOGLE = "google",
}

const SignInModal: React.FC<SignInModalProps> = ({
  showSignInModal,
  setShowSignInModal,
}) => {
  const [loading, setLoading] = useState(false);

  const buttonClassName = `${
    loading
      ? "cursor-not-allowed border-gray-200 bg-gray-100"
      : "border border-gray-200 bg-white text-black hover:bg-gray-50"
  } flex h-10 w-full items-center justify-center space-x-3 rounded-md border text-sm shadow-sm transition-all duration-75 focus:outline-none`;

  const handleSignIn = useCallback((provider: SIGN_IN_PROVIDER) => {
    setLoading(true);
    void signIn(provider, { callbackUrl: "/notes" });
  }, []);

  return (
    <Modal showModal={showSignInModal} setShowModal={setShowSignInModal}>
      <div className="w-full overflow-hidden shadow-xl md:max-w-md md:rounded-2xl md:border md:border-gray-200">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center md:px-16">
          <Image src="/logo.png" alt="Mes Notes Logo" width={50} height={50} />

          <h3 className="text-2xl font-bold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Only your email address and profile picture will be stored.
          </p>
        </div>

        <div className="flex flex-col space-y-4 bg-gray-50 px-4 py-8 md:px-16">
          <Button
            disabled={loading}
            className={buttonClassName}
            onClick={() => handleSignIn(SIGN_IN_PROVIDER.GITHUB)}
            loading={loading}
          >
            <Github className="h-5 w-5" />
            <p>Sign In with Github</p>
          </Button>
          <Button
            disabled={loading}
            className={buttonClassName}
            onClick={() => handleSignIn(SIGN_IN_PROVIDER.GOOGLE)}
            loading={loading}
          >
            <Google className="h-5 w-5" />
            <p>Sign In with Google</p>
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export function useSignInModal() {
  const [showSignInModal, setShowSignInModal] = useState(false);

  const SignInModalCallback = useCallback(() => {
    return (
      <SignInModal
        showSignInModal={showSignInModal}
        setShowSignInModal={setShowSignInModal}
      />
    );
  }, [showSignInModal, setShowSignInModal]);

  return useMemo(
    () => ({ setShowSignInModal, SignInModal: SignInModalCallback }),
    [setShowSignInModal, SignInModalCallback]
  );
}
