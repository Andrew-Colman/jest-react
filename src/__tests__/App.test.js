import React from "react";
import { shallow } from "enzyme";
import App from "../App";

const wrapper = shallow(<App />);
const welcome = <h2>Welcome to React</h2>;

it("renders welcome message", () => {
  expect(wrapper).toContainReact(welcome);
});

it("should have found h2 element", () => {
  expect(wrapper.find("h2")).toExist();
});
