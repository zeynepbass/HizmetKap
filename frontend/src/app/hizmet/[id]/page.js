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
        <div className="flex flex-col items-center mx-auto gap-6">
        <div className="w-full max-w-xlg text-center">
            <h1 className="text-3xl font-bold mb-4">Detaylar</h1>
            <Details id={id} />
        </div>
    </div></>
    
    )
}

export default Page
