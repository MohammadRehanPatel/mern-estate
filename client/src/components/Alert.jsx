import React, { useState, useEffect } from "react";
import { MdCheck, MdErrorOutline } from "react-icons/md";

const Alert = ({ text, variant }) => {
  const [alert, setAlert] = useState(true);

  //   useEffect(() => {
  //     // when the component is mounted, the alert is displayed for 3 seconds
  //     setTimeout(() => {
  //       setAlert(false);
  //     }, 3000);
  //   }, []);
  return (
    <div className="absolute right-0 top-[4.7rem]">
      {alert && variant === "MdCheck" ? (
        <div
          id="toast-success"
          class="flex items-center w-full max-w-xs p-3 mb-4 rounded-lg shadow    bg-green-400"
          role="alert"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg ">
            <MdCheck className=" h-4 w-4 text-green-700" />
          </div>
          <div class="ml-3 text-sm font-semibold capitalize text-green-700">
            {text}
          </div>
        </div>
      ) : (
        <div
          id="toast-error"
          role="alert"
          class="flex items-center w-full max-w-xs p-3 mb-4  rounded-lg shadow   bg-red-300"
        >
          <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
            <MdErrorOutline className=" h-5 w-5 text-red-800" />
          </div>
          <div class="ml-3 text-sm font-semibold capitalize text-red-800">
            {text}
          </div>
        </div>
      )}
    </div>
  );
};

export default Alert;
