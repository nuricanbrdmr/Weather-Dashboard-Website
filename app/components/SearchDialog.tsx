"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { Modal, Input, Button, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { searchIcon } from "../icons";
import { fetchGeocoded } from "../redux/geocodedSlice";
import { setActiveCityCoords } from "../redux/citycoordsSlice";

const SearchDialog = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { geocodedData, loading, error } = useSelector(
    (state: RootState) => state.geocoded
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Update search results based on geocoded data and search input
  useEffect(() => {
    if (geocodedData && searchText) {
      const filteredResults = geocodedData
        .filter((item) => {
          const nameMatch = item.name
            .toLowerCase()
            .includes(searchText.toLowerCase());
          const localNameMatch = Object.values(item.local_names || {}).some(
            (localName: string) =>
              localName.toLowerCase().includes(searchText.toLowerCase())
          );
          return nameMatch || localNameMatch;
        })
        .map((item) => ({
          name: item.name,
          country: item.country,
          local_names: item.local_names,
          lat: item.lat,
          lon: item.lon,
        }));

      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  }, [geocodedData, searchText]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSearchText("");
    setSearchResults([]);
  };

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim()) {
      dispatch(fetchGeocoded(text));
    }
  };

  return (
    <>
      <Button
        onClick={showModal}
        className="flex items-center dark:bg-dark-grey dark:text-white"
      >
        {searchIcon} Search Here...
      </Button>

      <Modal
        open={isModalOpen}
        closeIcon={false}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Type to search..."
          allowClear
          className="dark:bg-dark-grey dark:text-white"
          suffix={<SearchOutlined />}
        />

        {loading && <Spin />}

        {error && <div>Error: {error}</div>}

        {searchResults.length > 0 ? (
          <ul className="py-4 flex flex-col gap-3">
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() =>
                  dispatch(
                    setActiveCityCoords({ lat: result.lat, lon: result.lon })
                  )
                }
                className="py-2 px-2 text-sm rounded-lg cursor-pointer border dark:text-white dark:bg-dark-grey hover:bg-accent dark:hover:bg-gray-900"
              >
                {result.name} ({result.country})
              </li>
            ))}
          </ul>
        ) : (
          searchText && <div>No results found.</div>
        )}
      </Modal>
    </>
  );
};

export default SearchDialog;
