import { Button } from "@/shared/components/atoms";

export function VeriAccountAction({
  item,
  handleAction,
}) {
  return (
    <div className="flex justify-center items-center h-auto flex-col w-[60%]">
      <br />

      <h6 className="pb-4 font-bold text-xl m-auto text-gray-500">
        {item.baslik}
      </h6>

      <img
        src={item.image}
        width="50%"
        height="30%"
        alt={item.title}
      />

      <p className="font-bold text-gray-400 text-md">
        {item.paragraf}
      </p>

      <Button
        onClick={handleAction}
        className="p-3 rounded-md font-bold mt-5 text-[rgb(78,36,77)] mx-auto cursor-pointer underline hover:text-[rgb(255,176,73)]"
      >
        {item.button}
      </Button>
    </div>
  );
}