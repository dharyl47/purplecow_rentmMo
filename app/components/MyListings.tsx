"use client";
import React, { useState, useEffect, useRef } from "react";
import { ICar } from "../types/types";
import imageUnavailable from "../assets/logo/image_not_available.png";
import { CardContent, Card, Pagination } from "@mui/material";
import {
  BsFillStarFill,
  BsMapFill,
  BsTelephoneFill,
  BsCashCoin,
} from "react-icons/bs";

import axios from "axios";
import Modal from "react-responsive-modal";
import ListingStepper from "./ListingStepperUpdate";
import { initialInfoState } from "../types/initialInfo";
import iconsCar from "../assets/logo/icons8-car.png";
import Image from "next/image";
import "react-responsive-modal/styles.css";
import noImage from "../assets/images/noImage.png";
import { useServiceCarContext } from "../context/ServiceCarContext";

import { useUser } from "./../hooks/useUser";

const MyListings = () => {
  const store = useUser();
  const user: any = store?.user || {};

  const [myListing, setMyListing] = useState<ICar[]>([]);

  const [update, setUpdate] = useState(false);
  const [updateData, setUpdateData] = useState(initialInfoState);
  const [itemsPerPage, setItemsPerPage] = useState(4); // Number of items to display per page
  //const [data, setData] = useState<ICar[]>([]);
  const [deleteItem, setDeleteItem] = useState<ICar>();
  const [currentItems, setCurrentItems] = useState<ICar[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [count, setCount] = useState(0);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const updateRef = useRef<HTMLDivElement | null>(null);

  const { data, fetchData } = useServiceCarContext();

  const handleUpdate = (item: any) => {
    setUpdate(!update);
    setUpdateData(item);
    if (update && updateRef.current) {
      updateRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  function openModal(item: ICar) {
    setIsOpen(true);
    setDeleteItem(item);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleDelete = async () => {
    const deleteItemID = deleteItem?._id;

    try {
      await axios.delete(`/api/listing`, {
        data: { _id: deleteItemID },
      });
      window.location.reload(); // Reload the page after successful deletion
    } catch (error) {
      console.log(error);
    }
  };
  // Add this function to handle the update
  const handleSubmit = async (updatedData: Partial<ICar>) => {
    try {
      // await updateListing(updatedData);
      await axios.put("/api/listing", updatedData);
      setUpdate(false);
      fetchData(); // Refresh the data after the update
      fetchMyListing();
    } catch (error) {
      console.error("Error updating listing:", error);
      // Handle specific error types here if needed
    }
  };

  const fetchMyListing = async () => {
    try {
      const response = await axios.get(`/api/listing/listingOwner`, {
        params: {
          ownerId: user._id,
        },
      });

      setMyListing(response.data.listings);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchMyListing();

    const updateItemsPerPage = () => {
      if (window.innerWidth < 600) {
        setItemsPerPage(1);
      } else if (window.innerWidth < 1630) {
        setItemsPerPage(2);
      } else if (window.innerWidth < 1900) {
        setItemsPerPage(3);
      } else {
        setItemsPerPage(4);
      }
    };

    // Initial update
    updateItemsPerPage();

    // Event listener for window resize
    window.addEventListener("resize", updateItemsPerPage);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const toDisplay = Array.isArray(myListing)
      ? myListing.slice(indexOfFirstItem, indexOfLastItem)
      : [];
    const displayCount = Math.ceil(myListing.length / itemsPerPage);
    setCount(displayCount);
    setCurrentItems(toDisplay);
  }, [currentPage, myListing]);

  const handlePageChange = (newPage: any) => {
    setCurrentPage(newPage);
  };

  const handleChangeUpdates = (name: string, value: any) => {
    // Call the parent handleChange function to update the state
    handlePageChange({
      target: {
        name,
        value,
      },
    });
  };

  return (
    <>
      <div
        ref={update ? updateRef : null}
        className="w-full h-fit flex flex-col items-center justify-center p-0 gap-10"
      >
        <div className="flex w-full items-center">
          <Image className="h-8" width={30} src={iconsCar} alt="logo" />
          <p className="block p-2 no-select w-full">
            {myListing.length + " Listing/s"}
          </p>
        </div>
        <div className="w-full items-center justify-start flex flex-wrap gap-4 mx-auto">
          {currentItems.map((item, index) => (
            <Card
              className="drop-shadow-lg 2xl:hover:-translate-y-2 hover:transition-transform sm:w-64 w-full"
              key={index}
            >
              <div className="relative transition p-2">
                {item?.vehiclePhotos?.[0] &&
                  (item.vehiclePhotos[0].startsWith("http://") ||
                  item.vehiclePhotos[0].startsWith("https://") ? (
                    <Image
                      src={item.vehiclePhotos[0].toString()}
                      width={200}
                      height={200}
                      alt={`Image ${index}`}
                      onError={(e: any) => {
                        e.target.src = imageUnavailable;
                        e.target.onerror = null;
                      }}
                      className="mx-auto w-full h-48 object-cover select-none object-center rounded-md"
                    />
                  ) : (
                    <Image
                      src={imageUnavailable}
                      width={200}
                      height={200}
                      alt={`Image ${index}`}
                      className="mx-auto w-full h-48 object-cover select-none object-center rounded-md"
                    />
                  ))}
              </div>

              <CardContent className="flex flex-col w-full h-12 gap-0 justify-center text-center items-center">
                <h4 className="flex text-xl font-extrabold">
                  {item.brand + " " + item.model}
                </h4>
                <p className="flex text-md font-semibold">
                  Php {item.price}/day
                </p>
              </CardContent>
              <div className="flex justify-between items-center p-4">
                <button
                  onClick={() => openModal(item)}
                  className=" hover:bg-gray-300 transition-colors bg-gray-400 px-4 py-1 rounded-sm"
                >
                  Remove
                </button>
                <Modal open={modalIsOpen} onClose={() => closeModal()} center>
                  <div className="w-64 h-20 font-Messina-Sans">
                    Are you sure?
                  </div>
                  <div className="flex gap-4 justify-end font-Messina-Sans">
                    <button
                      onClick={() => handleDelete()}
                      className="transition-colors bg-yellow hover:bg-[#fff8af] text-gray-800 px-6 py-1 rounded-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => closeModal()}
                      className="transition-colors bg-gray-500 hover:bg-gray-200 text-gray-800 px-6 py-1 rounded-sm"
                    >
                      No
                    </button>
                  </div>
                </Modal>
                <button
                  onClick={() => handleUpdate(item)}
                  className="hover:shadow-md transition-transform bg-yellow-500 px-4 py-1 rounded-sm"
                >
                  Update
                </button>
              </div>
            </Card>
          ))}
        </div>
        <Pagination
          className=" self-center"
          count={count}
          color="standard"
          shape="rounded"
          page={currentPage}
          onChange={(event, newPage) => handlePageChange(newPage)}
        />
      </div>
      <div
        ref={!update ? updateRef : null}
        className={`self-center w-fit transition-transform ${
          update ? "w-full scale-y-100 h-fit" : "scale-y-0 h-0"
        }`}
      >
        <ListingStepper
          itemData={updateData}
          onSubmit={handleSubmit}
          handleChangeUpdates={handleChangeUpdates}
        />
      </div>
    </>
  );
};

export default MyListings;
