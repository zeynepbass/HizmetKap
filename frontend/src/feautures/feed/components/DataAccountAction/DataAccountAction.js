
import { Button } from "@/shared/components/atoms";

export function DataAccountAction({
  item,
  handleAction,
}) {
  return (
    <div className="flex w-full max-w-lg flex-col items-center rounded-3xl border border-gray-200 bg-white p-6 text-center sm:p-8">

      <div className="mb-6 flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl bg-[#EDE7F1]">
        <img
          src={item.image}
          alt={item.title || item.baslik}
          className="h-full w-full object-contain p-3"
        />
      </div>


      <h2 className="text-xl font-semibold tracking-tight text-gray-800">
        {item.baslik}
      </h2>


      <p className="mt-3 max-w-md text-sm leading-6 text-gray-500">
        {item.paragraf}
      </p>


      <Button
        type="button"
        onClick={handleAction}
        className="mt-6 rounded-xl bg-[#4E244D] px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:bg-[#6B4F6D]"
      >
        {item.button}
      </Button>
    </div>
  );
}

