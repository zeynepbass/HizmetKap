"use client";

import React from "react";
import { useParams } from "next/navigation";
import ChatRoom from "../../components/ChatRoom"

const Page = () => {
    const params = useParams();
    const { id } = params;
    return (
        <>
            <ChatRoom id={id} /></>

    )
}

export default Page
