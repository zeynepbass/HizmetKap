"use client"
import React, { useState } from 'react'
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
const Index = () => {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(false)
  const router = useRouter();
  return (
    <div className="p-4 border-r border-gray-100 sticky top-0 h-screen overflow-y-auto ">
      <div className="pt-5 pb-5">
      <Link href="/ana-sayfa">
      <img src="/logo.png" width="50%" height="50" />
                            </Link>

      </div>

      <div className="flex items-center rounded-3xl border border-gray-200 pr-2">
        <input
          type="text"
          placeholder="Başka bir ihtiyacın?"
          className="flex-1 p-2 focus:outline-none"
        />
        <SavedSearchIcon
          className="cursor-pointer text-amber-500"
          onClick={() => setOpen(!open)}
        />
      </div>

      {open && (
        <div className="border border-gray-100 rounded-xl p-2 mt-2">
          <h6 className="text-gray-500">Popüler hizmetler</h6>
          <ul className="space-y-4 text-gray-600 mt-4">
            <li className="capitalize">sdfwe</li>
            <li className="capitalize">sdfwe</li>
            <li className="capitalize">sdfwe</li>
          </ul>
        </div>
      )}

      <ul className="pt-5">
        <li
          onClick={() => setActive(!active)}
          className={`flex items-center gap-2 pt-3 rounded-3xl ${active ? "bg-amber-400 text-white" : "bg-gray-100 text-gray-600"
            } p-3`}
        >
          <HomeRepairServiceIcon className="text-xl" />
          <span>İşlerim</span>
        </li>

      </ul>
      <span className='absolute bottom-3'>
        <Card
          sx={{
            display: 'flex',
            boxShadow: 0,
            borderRadius: 0
          }}
        >
          <CardMedia
            component="img"
            sx={{ width: 120 }}
            image="/static/images/cards/live-from-space.jpg"
            alt="kullanıcı resmı"
          />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <CardContent>
              <Typography component="div" variant="h6">
                kullanıcı adı soyadı<br />
                <span onClick={() => router.push("/hesap-bilgilerim")} className='underline text-amber-400 cursor-pointer'>Ayarlar</span>
              </Typography>

            </CardContent>
          </Box>
        </Card>
      </span>
    </div>

  )
}

export default Index
