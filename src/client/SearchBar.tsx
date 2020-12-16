import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import "./app.css";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar(props: Props) {
  const [text, setText] = useState("");

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value);
  };

  const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key == "Enter") {
      props.onSearch(text);
      setText("");
    }
  };

  return (
    <div className="search">
      Enter a city or zip code: &nbsp;
      <input type="text" value={text} onChange={onChange} onKeyDown={onKeyDown} />
    </div>
  );
}
