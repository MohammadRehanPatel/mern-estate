import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";
import { MdDeleteForever, MdListAlt, MdEdit } from "react-icons/md";
import { FaSignOutAlt, FaEdit } from "react-icons/fa";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);
  const dispatch = useDispatch();

  // firebase storage
  // allow read;
  // allow write: if
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setShowListingsError(false);
      const res = await fetch(`/api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        return;
      }

      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleListingDelete = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="p-2 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-6">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        {fileUploadError ? (
          <Alert
            variant="error"
            text=" Error Image upload (image must be less than 2 mb)"
          />
        ) : filePerc > 0 && filePerc < 100 ? (
          <div className="flex ">
            <p
              style={{ width: `${filePerc}%` }}
              className="text-white bg-blue-900 inline-block   p-1 align rounded-md items-center justify-center  text-xs transition duration-500 ease-in-out"
            >{`Uploading ${filePerc}%`}</p>
          </div>
        ) : filePerc === 100 ? (
          <div>
            <Alert text={"Image successfully uploaded!"} variant={"MdCheck"} />
          </div>
        ) : (
          ""
        )}
        <input
          type="text"
          placeholder="username"
          defaultValue={currentUser.username}
          id="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          onChange={handleChange}
          id="password"
          className="border p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-blue-900 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5 ">
        <button
          onClick={handleSignOut}
          className="inline-flex items-center  px-4 py-2 bg-red-600 hover:opacity-95 text-white text-sm font-medium rounded-md"
        >
          <MdDeleteForever className="h-6 w-6 mx-1 my-0" />
          Delete Account
        </button>
        <button
          onClick={handleSignOut}
          className="inline-flex items-center px-4 py-2 bg-red-600 hover:opacity-95 text-white text-sm font-medium rounded-md"
        >
          <FaSignOutAlt className="h-4 w-4 mx-2 my-0" />
          Sign Out
        </button>
      </div>

      {error ? <Alert text={error} variant={"error"} /> : ""}
      {updateSuccess ? (
        <Alert text={"User is updated successfully!"} variant={"success"} />
      ) : (
        ""
      )}
      <div className="flex items-center justify-center   ">
        <button
          onClick={handleShowListings}
          className="text-white inline-flex items-center px-4  py-1 text-md bg-blue-600 hover:opacity-95  font-semibold rounded-md"
        >
          <MdListAlt className="h-7 w-7 " />
          Show Listings
        </button>
      </div>
      {showListingsError ? (
        <Alert variant="error" text="Error in showing listings" />
      ) : (
        ""
      )}

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-3 ">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="border rounded-lg p-3 flex justify-between items-center bg-gray-100 gap-4 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-lg "
            >
              <Link to={`/listing/${listing._id}`} className=" ">
                <img
                  src={listing.imageUrls[0]}
                  alt="listing cover"
                  className="h-16 w-16 object-contain"
                />
              </Link>
              <Link
                className="text-slate-700 font-semibold  hover:underline truncate flex-1"
                to={`/listing/${listing._id}`}
              >
                <p>{listing.name}</p>
              </Link>

              <div className="flex flex-col item-center">
                <button
                  onClick={() => handleListingDelete(listing._id)}
                  className=" uppercase inline-flex items-center px-4 py-2 bg-red-600 hover:opacity-95 text-white text-sm font-medium rounded-md"
                >
                  <MdDeleteForever className="h-4 w-4 mx-2 my-0" />
                  Delete
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className=" uppercase inline-flex items-center px-4 py-2 bg-green-600 hover:opacity-95 text-white text-md font-medium rounded-md ">
                    <FaEdit className="h-4 w-4 mx-2 my-0" />
                    Edit
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
