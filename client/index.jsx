import * as React from "react";
import { createRoot } from "react-dom/client";

import { Application } from "./Games.jsx";

const element = document.getElementById("app");
const root = createRoot(element);

root.render(<Application />);