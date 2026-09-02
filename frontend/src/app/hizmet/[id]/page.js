import React from "react";
import Button from "@/components/Button";//!bakılcak ayırılıcak
import Detay from "@/features/feed/pages/Detay";

const Page = ({ params }) => {
    const { id } = params;
    return (
        <>
            <Button />
            <div className="flex flex-col items-center mx-auto gap-6 min-h-[100vh]">
                <div className="w-full max-w-xlg text-center h-[100vh] overflow-auto">
                    <h1 className="text-md font-bold mb-4 text-gray-600">
                        İletişim Bilgilerini ve Konumunu Eklemek İster misin?
                    </h1>
                    <Detay paramsId={id} />
                </div>
            </div>
        </>
    );
};

export default Page;
