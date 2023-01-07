import React from "react";
import { sfBayApi } from "./sfBayApi";

test("sfBayApi works", async () => {
  const res = await sfBayApi.getTrafficEvents();
  expect(res.length).toBeGreaterThan(0);
});
