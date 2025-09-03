"use client"
import React, { useState, useEffect } from 'react'
import Slider from "../../components/Slider"
import Link from "next/link"
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
const Home = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const items = [
    { title: "Aktif işlerim", image: "pngwing.com.png", content: "Aktif işin yok. Hemen arama çubuğuna isteğini yaz, ihtiyacın olan hizmete kolayca ulaş." },
    { title: "Pasif işlerim", image: "Kanepe Döşeme", content: "content", button: "Teklif gelmedi" }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const [control, setControl] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("item");
    if (storedData) setControl(JSON.parse(storedData));
  }, []);

  const Clear = () => {
    localStorage.clear();
    setControl({});
  };
  const [open, setOpen] = useState(false)
  const [answers, setAnswers] = useState("");
  const steps = [
    { question: "Çok zaman harcıyorum." },
    { question: "Aradığım hizmete ulaşamıyorum." },
    { question: "Diğer" },
  ];

  const handleChange = (value) => {
    setAnswers(value);
  };
  return (
    <>
      <div>

        <Dialog open={open} onClose={setOpen} className="relative z-10">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
          />

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <DialogPanel
                transition
                className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-amber-100 sm:mx-0 sm:size-10">
                      <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-amber-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                        Talebi neden iptal etmek istiyorsun?
                      </DialogTitle>
                      <div className="mt-2">
                        {steps.map((option, index) => (
                          <label
                            key={index}
                            className="flex items-center space-x-2 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name="survey"
                              value={option.question}
                              className="form-radio text-amber-600"
                              checked={answers === option.question}
                              onChange={() => handleChange(option.question)}
                            />
                            <span className='text-gray-600'>{option.question}</span>
                          </label>
                        ))}


                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-10 px-4 py-3 sm:px-6 flex justify-center">

                  <button
                    type="button"
                    data-autofocus
                    onClick={() => setOpen(false)}
                    className="mt-3 inline-flex text-white  rounded-md bg-amber-400 px-3 py-2 text-sm font-semibold text-white-900 shadow-xs inset-ring inset-ring-gray-300 hover:bg-amber-50 sm:mt-0 sm:w-auto hover:text-gray-500"
                  >
                    Talebi iptal et
                  </button>
                </div>
              </DialogPanel>
            </div>
          </div>
        </Dialog>
      </div>
      <div className="col-span-12 flex flex-col items-center gap-4">
        {Object.keys(control).length > 0 ? (
          <div className=" flex-col w-[100%]">
            <p className='font-bold text-black text-left p-4 cursor-pointer'>Talebini Aldık</p>
            <p className=' text-gray-300 text-left pl-3'>İstek aldığında e-postana bildirim gelicek.</p>
            <Link href="/hizmet" className="font-bold hover:underline p-4 underline ">
              Detaylara bak
            </Link>

            <img src="siparis.jpg" width="30%" height="30%" className='m-auto' />
            <div className='flex justify-center gap-1 p-5'>

              <button className=' p-3 text-red-600 rounded-md' onClick={() => setOpen(true)}>Talebi iptal et</button>
              <button className='bg-amber-500 pl-4 pr-4 rounded-md text-white cursor-pointer' onClick={Clear}>İşlerime git</button>
            </div>
          </div>
        ) :
          (
            <>

              <div className="flex gap-4 mb-4">
                {items.map((item, index) => (
                  <button
                    key={index}
                    className={`py-3 px-0 font-semibold rounded-md  ${openIndex === index ? "border-b-2 border-amber-300" : ""
                      }`}
                    onClick={() => toggle(index)}
                  >
                    {item.title}
                  </button>
                ))}
              </div>


              {openIndex !== null && items[openIndex] && (
                <div className="flex justify-center items-center bg-gray-50 h-[50vh] flex-col w-[100%]">
                  <img src={items[openIndex].image} width="50%" height="30%" />
                  <p className='font-bold text-gray-200'>{items[openIndex].content}</p>
                  <button className='bg-gray-100 p-3 rounded-md font-bold'>{items[openIndex].button}</button>
                </div>
              )}</>
          )

        }


      </div>

      <div className='col-span-12 min-h-screen pt-5 border-t-1  border-t-gray-100 '>

        <Slider />
      </div>
    </>
  )
}

export default Home
