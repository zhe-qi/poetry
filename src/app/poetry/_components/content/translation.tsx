import React from "react";
import Collapse from "./collapse";

export default function Translation({ shangxi, remark }: { shangxi: string; remark: string }) {
  return (
    <>
      <div className="text-xl">译文及注释</div>
      <div className="pt-6">
        <p className="font-500 text-lg">译文</p>
        <Collapse height={100} lineClamp={4}>
          <p className="">
            {shangxi}
          </p>
        </Collapse>
      </div>
      <div className="pt-6">
      <p className="font-500 text-lg">注释</p>
        <Collapse height={100} lineClamp={4}>
          <p className="">
            {remark}
          </p>
        </Collapse>
      </div>
    </>
  );
}
