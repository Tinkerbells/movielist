import { signIn, useSession } from "next-auth/react";

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
              <h3 className="text-center text-lg font-bold">
                Please login to use this feature
              </h3>
              <div className="modal-action">
                <label
                  className="btn-primary btn-wide btn"
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
