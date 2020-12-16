import React from "react";

export type AutocompleteItem = {
  country: string
  id: number
  name: string
};

type AutocompleteItemProps = {
  item: AutocompleteItem
  onClick?(id: number): void
  showExtra?: boolean
};


export const AutocompleteItem = (props: AutocompleteItemProps) => {
  const { item, onClick, showExtra } = props;
  const { id, name, country } = item;

  const onClickItem = () => {
    onClick && onClick(id);
  };

  return (
    <section className="autocomplete-item" onClick={onClickItem}>
      <p>{`${name}${showExtra ? ` - ${country}` : ''}`}</p>
    </section>
  );
};
