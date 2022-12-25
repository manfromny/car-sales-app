import React, { useState } from "react";
import { LikeIcon, ListingOwnerIcon, MessageIcon } from "../UI/Icons";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeFavorite } from "../../features/favorites/favoritesSlice";
import { removeFromFavorites } from "../../utils/utils";

const FavoritesItem = ({ item }) => {
  const [liked, setLiked] = useState(true);
  const dispatch = useDispatch();

  const handleRemoveFromFavorites = async (event) => {
    event.stopPropagation();
    setLiked(!liked);
    const listingID = item.listing.listingId;
    //wait for 2 second before removing from favorites
    setTimeout(async () => {
      const resp = await removeFromFavorites(listingID);
      if (resp === "success") {
        dispatch(removeFavorite(listingID));
      }
    }, 1500);
  };

  return (
    <div
      className="flex min-h-[5rem] max-h-[10rem] w-full bg-slate-50 
    rounded-xl shadow-md"
    >
      <Link
        to={`/listing/${item.listing.listingId}`}
        className="left-0 w-[30%] h-[10rem]"
      >
        <img
          src={item.pictures.cover}
          alt={item.make}
          className="h-full w-full object-cover rounded-l-xl "
        />
      </Link>
      {!liked ? (
        <div className="flex flex-col items-center justify-around mx-auto">
          <h1 className="text-center text-xl md:text-2xl font-normal text-slate-500 animate-pulse">
            Removing from your favorites...
          </h1>
        </div>
      ) : (
        <div className="flex justify-between mx-auto w-[80%] py-3 px-2">
          <div
            name="listing_details"
            className="flex flex-col mx-auto space-y-2 w-[70%]"
          >
            <div className="flex flex-col space-y-2" name="primary details">
              <h1 className="text-xl font-normal">{`${
                item.year + " " + item.make + " " + item.model
              }`}</h1>
              <h1 className="text-lg">{`${(
                item.trim +
                " - " +
                item.engine.capacity
              ).substring(0, 30)}`}</h1>
              <h1 className="text-lg hidden sm:flex">{`${
                item.condition
              } - ${Number(item.miles).toLocaleString()} miles  `}</h1>
            </div>
            <div className="flex flex-col my-auto">
              <h1 className="text-lg font-bold my-auto">{`$${Number(
                item.price.original
              ).toLocaleString()}`}</h1>
              {/* <h1 className="text-md font-normal">{`Listed at ${item.listing.createdAt.toLocaleString(
              "en",
              options
            )}`}</h1> */}
            </div>
          </div>
          <div
            name="contact_details"
            className="flex flex-col justify-between w-[20%] text-center items-center py-1 px-1"
          >
            <div onClick={handleRemoveFromFavorites}>
              <LikeIcon liked={liked} />
            </div>
            <MessageIcon />
            <Link
              to={`/user/profile/${item.listing.listingOwnerId}"`}
              className="hover:text-purple-500 transition duration-200"
            >
              <ListingOwnerIcon />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesItem;
