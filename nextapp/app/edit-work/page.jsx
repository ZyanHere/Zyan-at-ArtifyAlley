"use client";
import Navbar from "@components/Navbar";
import React, { useState } from "react";
import Form from "@components/Form";

const UpdateWork = () => {


  const [work, setWork] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    photos: [],
  });


  return loading  (
    
    <>
      <Navbar />
      <Form
        type="Edit"
        work={work}
        setWork={setWork}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default UpdateWork;