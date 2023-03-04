import React from "react";
import { FADE_IN_ANIMATION_SETTINGS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserDropdown from "./UserDropdown";
import { useSignInModal } from "../modals/SignInModal";

const Header: React.FC = () => {
  const { data: session, status } = useSession();
  const { setShowSignInModal, SignInModal } = useSignInModal();

  const isLoggedIn = !session && status !== "loading";
  return (
    <>
      <SignInModal />

      <div className="fixed top-0 z-30 w-full border-b border-gray-200 bg-white/50 backdrop-blur-xl transition-all">
        <div className="mx-5 flex h-16 max-w-screen-xl items-center justify-between xl:mx-auto">
          <Link href="/" className="flex items-center text-2xl">
            {session?.user?.name
              ? `Mes Notes for ${session?.user?.name}`
              : "Mes Notes"}
          </Link>
          <div>
            <AnimatePresence>
              {isLoggedIn ? (
                <motion.button
                  className="rounded-full border border-black bg-black p-1.5 px-4 text-sm text-white transition-all hover:border-primary hover:bg-primary hover:text-white"
                  onClick={() => setShowSignInModal(true)}
                  {...FADE_IN_ANIMATION_SETTINGS}
                >
                  Sign In
                </motion.button>
              ) : (
                <UserDropdown />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
