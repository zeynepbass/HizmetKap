import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { Heading } from "@/shared/components/atoms";

export function DataAccountOptions({
  items,
  openIndex,
  toggle,
}) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {items.map((item, index) => (
        <div key={index}>
          <Heading
            onClick={() => toggle(index)}
            title={
              <>
                {item.title}

                {openIndex === index ? (
                  <KeyboardArrowDownIcon />
                ) : (
                  <ArrowForwardIosIcon />
                )}
              </>
            }
            desc={item.content}
          />
        </div>
      ))}
    </div>
  );
}