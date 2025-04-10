import React, { Fragment, useState } from "react";

import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/outline";
import { CheckIcon } from "@heroicons/react/solid";
import { Link } from "react-router-dom";
import {
  CreditCardIcon,
  UserIcon,
  ShoppingCartIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import { GiKnifeFork } from "react-icons/gi";

const links = [
  {
    id: 1,
    name: "Home",
    href: "/Home",
    icon: <HomeIcon className="nav-icon" />,
  },
  {
    id: 2,
    name: "Orders",
    href: "/orders/new",
    icon: <ShoppingCartIcon className="nav-icon" />,
  },
  {
    id: 3,
    name: "Menu",
    href: "/menu",
    icon: <GiKnifeFork className="nav-icon" />,
  },

  {
    id: 5,
    name: "Transactions",
    href: "/transactions",
    icon: <CreditCardIcon className="nav-icon" />,
  },
  {
    id: 6,
    name: "Profile",
    href: "/profile",
    icon: <UserIcon className="nav-icon" />,
  },
];

const NavList = () => {
  const [selected, setSelected] = useState(links[0]);
  return (
    <div className="main-list ">
      <div className="row-0">
        <Listbox value={selected} onChange={setSelected}>
          <div className="list-box">
            <Listbox.Button className="list-btn">
              <span className="span-1">{selected.name}</span>
              <span className="span-2">
                <ChevronDownIcon className="icon" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              as={Fragment}
              leave="leave"
              leaveFrom="leave-from"
              leaveTo="leave-to"
            >
              <Listbox.Options className="list-box-options">
                {links.map((link) => (
                  <Link to={link.href} key={link.id}>
                    <Listbox.Option
                      className={({ active }) =>
                        `list-box-option ${
                          active
                            ? "list-box-option-active"
                            : "list-box-option-inactive"
                        }`
                      }
                      value={link}
                    >
                      {({ selected }) => (
                        <div className="navlink">
                          {selected ? (
                            <span className="span-1">
                              <CheckIcon
                                className="w-5 h-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : (
                            <span />
                          )}
                          <span
                            className={` truncate flex   ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            <div className="list-icon" aria-hidden="true">
                              {link.icon}
                            </div>
                            <div className="px-1">{link.name}</div>
                          </span>
                        </div>
                      )}
                    </Listbox.Option>
                  </Link>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>
      </div>
    </div>
  );
};

export default NavList;
