import React from 'react'
import Button from "../components/Button"
import Details from "../components/Details"

const Page = () => {

    return (
        <>

            <Button />
            <div className="max-w-lg ml-[20%]">



                <h1 className="text-[30px] font-bold">Detaylar</h1>

            <Details/>

            </div>
        </>
    )
}

export default Page
