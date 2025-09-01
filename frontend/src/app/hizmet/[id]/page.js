import React from 'react'
import Button from "../../components/Button"
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

const page = () => {
    return (
        <>

            <Button />
            <div className="max-w-lg ml-[20%]">



                <h1 className="text-[30px] font-bold">Detaylar</h1>

                <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2">
                        <AddLocationAltIcon className="w-[30px] h-[30px] text-amber-500" />
                        <span>Now this is a story all about how, my life got flipped-turned upside down</span>
                    </li>

                    <li className="flex items-center gap-2">
                        <LocalPhoneIcon className="w-[30px] h-[30px] text-green-500" />
                        <span>Now this is a story all about how, my life got flipped-turned upside down</span>
                    </li>
                </ul>

                <hr />

                <h1 className="text-[30px] font-bold">Detaylar</h1>

                <ul className="list-none space-y-2">
                    <li className="flex items-center gap-2">

                        kaç odalı ev?
                    </li>

                    <li className=" items-left gap-2 flex flex-col">
                        <span className="text-[20px] font-bold">Mesajlar</span><br />
                        <span>
                             <Card sx={{ display: 'flex' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 120 }}
                                image="/static/images/cards/live-from-space.jpg"
                                alt="Live from space album cover"
                            />
                            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5">
                                        Live From Space
                                    </Typography>
                                    <Typography
                                        variant="subtitle1"
                                        component="div"
                                        sx={{ color: 'text.secondary' }}
                                    >
                                        Mac Miller
                                    </Typography>
                                </CardContent>

                            </Box>

                        </Card></span>
                    </li>
                </ul>

            </div>
        </>
    )
}

export default page
