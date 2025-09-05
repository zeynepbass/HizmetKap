"use client";

import React from "react";
import { useParams } from "next/navigation";
import Button from "../../components/Button"
import Details from "../../components/Details"

const Page = () => {
  const params = useParams();
  const { id } = params;
    return (
        <>

            <Button />
            <div className="max-w-lg ml-[20%]">



                <h1 className="text-[30px] font-bold">Detaylar</h1>

            <Details id={id}/>

            </div>
        </>
    )
}

export default Page
