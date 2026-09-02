export function AnasayfaEmptyState({ tab }) {
    return (
      <div className="flex flex-col h-[50vh] items-center justify-center pb-4 bg-gray-50 w-full text-center">
        {tab.image && (
          <img
            src={tab.image}
            className="w-[50vh]"
            alt=""
          />
        )}
  
        <p className="font-bold text-[rgb(242,247,250)] mb-2">
          {tab.content}
        </p>
  
        {tab.button && (
          <Button className="text-gray-500 p-3 rounded-md font-bold mt-2">
            {tab.button}
          </Button>
        )}
      </div>
    );
  }