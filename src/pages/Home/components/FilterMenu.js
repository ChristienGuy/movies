import React from "react";
import { Menu } from "./Menu";

const filtersList = [
  {
    name: "Watched",
    value: "watched"
  },
  {
    name: "Unwatched",
    value: "unwatched"
  },
  {
    name: "All",
    value: "all"
  }
];

const FilterMenu = ({ onFilter, className }) => (
  <Menu
    buttonText="Filters"
    items={filtersList}
    onItemClick={onFilter}
    className={className}
  />
);

export { FilterMenu };
