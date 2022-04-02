"use strict";
import accordion from "./modules/accordion";
import card from "./modules/card";
import date from "./modules/date";
import form from "./modules/form";
import loader from "./modules/loader";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import { openModal } from "./modules/modal";
import { closeModal } from "./modules/modal";

window.addEventListener("DOMContentLoaded", () => {
  const modalTimer = setTimeout(() => openModal(".modal", modalTimer), 50000);
  loader();
  tabs();
  modal("[data-modal]", ".modal", modalTimer);
  slider();
  form(modalTimer);
  date();
  card();
  accordion();

  console.log("Assalomu aleeykum");
});
