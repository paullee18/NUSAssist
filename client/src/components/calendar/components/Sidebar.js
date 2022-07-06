import React from "react";

import Labels from "./Labels";
export default function Sidebar() {
  return (
    <aside className="border p-5 w-64">
      {/* Create a new item here that will display the remaining tasks  */}
      <Labels />
    </aside>
  );
}