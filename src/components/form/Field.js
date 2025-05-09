import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { SelectorIcon } from "@heroicons/react/outline";

const Field = ({ label, select, disabled }) => {
  return (
    <fieldset className=" flex flex-row mt-2 text-foodswipe-turquoise text-sm">
      <label className=" text-right w-20">{label}</label>
      {select ? (
        <Select />
      ) : (
        <input
          type="text"
          disabled={disabled}
          className=" h-8 rounded-md ml-5 pl-2 border-foodswipe-turquoise border-2"
        />
      )}
    </fieldset>
  );
};

const people = [
  { name: "Sandwiches" },
  { name: "Drinks" },
  { name: "Sides" },
  { name: "Soup" },
];

function Select() {
  const [selected, setSelected] = useState(people[0]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative h-8 ml-3 pl-2 w-56">
        <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-5 pr-16 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-20 mt-1 max-h-20 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-2 pr-1 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {person.name}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

export default Field;
