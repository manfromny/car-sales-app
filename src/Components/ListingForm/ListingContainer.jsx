import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUnsubmittedImageKeys } from "../../features/listingImages/listingImagesSlice";
import DataForm from "./DataForm";
import ImageContainer from "./ImageContainer";

const ListingContainer = () => {

  const user = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const listingImagesStatus = useSelector(
    (state) => state.listingImages.status
  );

  useEffect(() => {
    if (user) {
      if (listingImagesStatus === "idle") {
        dispatch(fetchUnsubmittedImageKeys());
      }
    } else {
      return;
    }
  });

  const uploadedImageKeys = useSelector(
    (state) => state.listingImages.listingImages
  );

  return (
    <div
      className="flex flex-col justify-between items-center space-y-4 my-auto 
       py-4 w-full max-w-5xl md:px-2"
    >
      <h1 className="text-2xl text-center h-[5%] font-light bg-slate-100 px-3 py-2 rounded-xl items-center">
        Create a Listing
      </h1>
      <div className="w-[100%] h-[100%] flex flex-col lg:flex-row justify-between space-y-2 space-x-2 items-center ">
        <div
          className="lg:w-[65%] w-[100%] sm:w-[70%] max-w-[100%] flex flex-col
        md:rounded-xl lg:max-h-[36rem] border-4 "
        >
          <ImageContainer uploadedImageKeys={uploadedImageKeys} />
        </div>
        <div className="lg:min-w-[35%] min-w-[90%] flex items-center">
          <DataForm uploadedImageKeys={uploadedImageKeys} />
        </div>
      </div>
    </div>
  );
};

export default ListingContainer;
