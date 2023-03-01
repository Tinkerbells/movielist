import { IconProvider } from "@/UI";
import { signIn, useSession } from "next-auth/react";
import { RiErrorWarningLine } from "react-icons/ri";

export const LoginModal = () => {
  const { data: sessionData } = useSession();
  return (
    <>
      {!sessionData && (
        <>
          <input type="checkbox" id="login-modal" className="modal-toggle" />
          <label
            htmlFor="login-modal"
            className="sm:modal-middle modal cursor-pointer"
          >
            <label className="modal-box w-1/6" htmlFor="">
              <div className="alert alert-warning shadow-lg">
                <div>
                  <IconProvider size="1.5rem">
                    <RiErrorWarningLine />
                  </IconProvider>
                  <span>Please login to use this feature!</span>
                </div>
              </div>
              <div className="modal-action ">
                <label
                  className="btn-outline btn-primary btn-wide btn"
                  onClick={() => void signIn()}
                >
                  Login
                </label>
              </div>
            </label>
          </label>
        </>
      )}
    </>
  );
};
