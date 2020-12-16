import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useDebounce } from '../util/debounce';
import { AutocompleteItem } from './AutocompleteItem';
import "./app.css";
import { checkIfDuplicateExists } from "../util/validate";

type Props = {
  onSearch: (query: string) => void;
};

export default function SearchBar(props: Props) {
  const [text, setText] = useState("");
  const debouncedAutocomplete = useDebounce(text);
  const [autocompleteResults, setAutocompleteResults] = useState<AutocompleteItem[]>([]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setText(evt.target.value);
  };

  const onKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.key == "Enter") {
      props.onSearch(text);
      setText("");
    }
  };

  const onSelectAutocompleteOption = (id: number) => {
    const selected = autocompleteResults.find((item) => item.id === id);
    props.onSearch(selected.name);
    setText(selected.name);
  };

  /**
   * this effect is executted after user type in search input
   * and debounce the callback for 500ms
   */
  useEffect(() => {
      if (debouncedAutocomplete) {
        fetch("/api/city?q=" + encodeURIComponent(debouncedAutocomplete as string))
          .then((res) => res.json())
          .then(results => setAutocompleteResults(results));
      } else {
        setAutocompleteResults([]);
      }
    }, [debouncedAutocomplete]
  );

  const autocompleteResultsHasRepeated = checkIfDuplicateExists(autocompleteResults);

  return (
    <div className="search">
      Enter a city or zip code: &nbsp;
      <section className="search-input">
        <input type="text" value={text} onChange={onChange} onKeyDown={onKeyDown} />

        {!!autocompleteResults.length && (
          <section className="autocomplete">
            {autocompleteResults.map((item) => (
              <AutocompleteItem
                item={item}
                onClick={onSelectAutocompleteOption}
                showExtra={autocompleteResultsHasRepeated}
              />
            ))}
          </section>
        )}
      </section>
    </div>
  );
};
