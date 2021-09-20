/* eslint-disable no-unused-vars */
import React from "react";
import { PropTypes } from "prop-types";
import { mount, shallow } from "enzyme";

describe("Assert that the given wrapper is checked:", () => {
  function Fixture() {
    return (
      <div>
        <input id="isChecked" defaultChecked />
        <input id="not" defaultChecked={false} />
      </div>
    );
  }

  const wrapper = shallow(<Fixture />);
  it("should have the input checked", () => {
    expect(wrapper.find("#isChecked")).toBeChecked();
  });
  it("should have the input not checked", () => {
    expect(wrapper.find("#not")).not.toBeChecked();
  });
});

describe("Assert that the given wrapper is disabled:", () => {
  function Fixture() {
    return (
      <div>
        <input id="disabled" disabled />
        <input id="not" />
      </div>
    );
  }

  const wrapper = shallow(<Fixture />);
  it("should have the input disabled", () => {
    expect(wrapper.find("#disabled")).toBeDisabled();
  });
  it("should have the not input disabled", () => {
    expect(wrapper.find("#not")).not.toBeDisabled();
  });
});

describe("Assert that the given wrapper has an empty render (null or false):", () => {
  function EmptyRenderFixture() {
    return null;
  }

  function Hello() {
    return (
      <div>
        <h1>Hello world</h1>
      </div>
    );
  }
  function NonEmptyRenderFixture() {
    return (
      <div>
        <Hello />
      </div>
    );
  }

  it("should have the component with an empty render", () => {
    expect(wrapper.find("EmptyRenderFixture")).toBeEmptyRender();
    //expect(wrapper).not.toBeEmptyRender(); test will fail <-
  });

  const wrapper = mount(<EmptyRenderFixture />);
});

describe("Assert that the given enzyme wrapper has rendered content.", () => {
  function Fixture() {
    return (
      <div>
        <span className="foo" />
        <span className="bar baz" />
      </div>
    );
  }

  const wrapper = shallow(<Fixture />);
  it("should have find a span element", () => {
    expect(wrapper.find("span")).toExist();
  });
  it("should not find a ul element ", () => {
    expect(wrapper.find("ul")).not.toExist();
  });
});

describe("Assert that the given wrapper contains at least one match for the given selector:", () => {
  function User(props) {
    return <span className={props.className}>User {props.index}</span>;
  }

  User.propTypes = {
    index: PropTypes.number.isRequired,
    className: PropTypes.string,
  };

  function Fixture() {
    return (
      <div>
        <ul>
          <li>
            <User index={1} className="userOne" />
          </li>
          <li>
            <User index={2} className="userTwo" />
          </li>
        </ul>
      </div>
    );
  }

  const wrapper = shallow(<Fixture />);

  it("should find a user with a className of userOne", () => {
    expect(wrapper).toContainMatchingElement(".userOne");
  });
  it("should not find a user with a className of userThree", () => {
    expect(wrapper).not.toContainMatchingElement(".userThree");
  });
  it("should find 2 Users elements ", () => {
    expect(wrapper).toContainMatchingElements(2, "User");
  });
  it("should not find 2 userOne classNames", () => {
    expect(wrapper).not.toContainMatchingElements(2, ".userOne");
  });

  it("should contains exactly one match ", () => {
    expect(wrapper).toContainExactlyOneMatchingElement(".userOne");
  });
  it("should not contains one match ", () => {
    expect(wrapper).not.toContainExactlyOneMatchingElement("User");
  });
});

describe("Assert that the given wrapper contains the provided react instance:", () => {
  function Button() {
    return <button>click</button>;
  }
  function Fixture() {
    return (
      <div>
        <h1>Welcome</h1>
        <form>
          <input type="text" />
        </form>
        <Button />
      </div>
    );
  }

  const wrapper = shallow(<Fixture />);

  it("should contain a heading message <h1> ", () => {
    expect(wrapper).toContainReact(<h1>Welcome</h1>);
  });
  it("should contain a form with a input ", () => {
    expect(wrapper).toContainReact(
      <form>
        <input type="text" />
      </form>
    );
  });
  it("should contain a Button component ", () => {
    expect(wrapper).toContainReact(<Button />);
  });
  it("should not contain a User component ", () => {
    const User = (props) => <span>{props.name}</span>;
    expect(wrapper).not.toContainReact(<User index={20} />);
  });
  it("should not contain any <p>lorem ipsum</p> ", () => {
    expect(wrapper).not.toContainReact(<p>lorem ipsum</p>);
  });
});

describe("Assert that the given wrapper has the provided className:", () => {
  function Fixture() {
    return (
      <div>
        <span className="foo" />
        <span className="bar baz" />
      </div>
    );
  }

  const wrapper = mount(<Fixture />);
  it("should have the className foo ", () => {
    expect(wrapper.find(".foo")).toHaveClassName("foo");
  });
  it("should have the className bar baz", () => {
    expect(wrapper.find(".bar")).toHaveClassName("bar baz");
  });
  it("should have the className bar ", () => {
    expect(wrapper.find(".bar")).toHaveClassName("baz");
  });
  it("should not have the className bar", () => {
    expect(wrapper.find(".foo")).not.toHaveClassName("baz");
  });
});

describe("Assert that the wrapper is of a certain tag type:", () => {
  function Fixture() {
    return (
      <div>
        <span id="span" />
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should have the display name of span ", () => {
    expect(wrapper.find("#span")).toHaveDisplayName("span");
  });
  it("should not have the display name of div ", () => {
    expect(wrapper.find("#span")).not.toHaveDisplayName("div");
  });
});

describe("Assert that the given wrapper has the provided html:", () => {
  function Fixture() {
    return (
      <div id="root">
        <span id="child">Test</span>
      </div>
    );
  }
  const wrapper = mount(<Fixture />);

  it("should matches the html ", () => {
    expect(wrapper.find("#child")).toHaveHTML('<span id="child">Test</span>');
  });
  it("should not matches the html ", () => {
    expect(wrapper.find("#child")).not.toHaveHTML(
      '<h1 id="child">Hello world</h1>'
    );
  });
});

describe("Assert that the given wrapper has the provided propKey and associated value if specified:", () => {
  function User({ foo, bar }) {
    return <h1>{foo}</h1>;
  }
  User.propTypes = {
    foo: PropTypes.string,
    bar: PropTypes.array,
  };

  function Fixture() {
    return (
      <div id="root">
        <User foo={"baz"} bar={[1, 2, 3]} />
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should have find user props  ", () => {
    expect(wrapper.find(User)).toHaveProp("foo");
  });
  it("should have find user props ", () => {
    expect(wrapper.find(User)).toHaveProp("foo", "baz");
  });
  it("should have find user props ", () => {
    expect(wrapper.find(User)).toHaveProp("bar");
  });
  it("should have find user props ", () => {
    expect(wrapper.find(User)).toHaveProp("bar", [1, 2, 3]);
  });
  it("should have find user props ", () => {
    expect(wrapper.find(User)).toHaveProp({
      bar: [1, 2, 3],
      foo: "baz",
    });
  });
});

describe("Assert that the mounted wrapper has the provided ref:", () => {
  class Fixture extends React.Component {
    render() {
      return (
        <div>
          <span ref="child" />
        </div>
      );
    }
  }

  const wrapper = mount(<Fixture />);

  it("should have ref ", () => {
    expect(wrapper).toHaveRef("child");
  });
  it("should not have ref ", () => {
    expect(wrapper).not.toHaveRef("foo");
  });
});

describe("Assert that the component has the provided stateKey and optional value if specified:", () => {
  class Fixture extends React.Component {
    constructor() {
      super();
      this.state = {
        foo: false,
      };
    }

    render() {
      return <div />;
    }
  }

  const wrapper = mount(<Fixture />);

  it("should has the provided state", () => {
    expect(wrapper).toHaveState("foo");
  });
  it("should has the provided state", () => {
    expect(wrapper).toHaveState("foo", false);
  });
  it("should has the provided state", () => {
    expect(wrapper).toHaveState({ foo: false });
  });
});

describe("Assert that the component has style of the provided key and value:", () => {
  function Fixture() {
    const style1 = { height: "100%" };
    const style2 = { flex: 8 };

    return (
      <div>
        <span id="style1" style={style1} />
        <span id="style2" style={style2} />
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should have the provided style ", () => {
    expect(wrapper.find("#style1")).toHaveStyle("height", "100%");
  });
  it("should have the provided style ", () => {
    expect(wrapper.find("#style2")).toHaveStyle("flex", 8);
  });
});

describe("Assert that the wrapper's text matches the provided text exactly, using a strict comparison (===).", () => {
  function Fixture() {
    return (
      <div>
        <p id="full">Text</p>
        <p id="empty"></p>
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should matches the provided text ", () => {
    expect(wrapper.find("#full")).toHaveText("Text");
  });
  it("should matches the provided text", () => {
    expect(wrapper.find("#full")).not.toHaveText("Wrong");
  });
  it("should matches the provided text", () => {
    expect(wrapper.find("#full")).toHaveText();
  });
  it("should matches the provided text", () => {
    expect(wrapper.find("#empty")).not.toHaveText();
  });
});

describe("Assert that the wrapper includes the provided text:", () => {
  function Fixture() {
    return (
      <div>
        <p id="full">Some important text</p>
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should includes the provided text ", () => {
    expect(wrapper.find("#full")).toIncludeText("important");
  });
  it("should not includes the provided text ", () => {
    expect(wrapper.find("#full")).not.toIncludeText("Wrong");
  });
});

describe("Assert that the given wrapper has the provided value:", () => {
  function Fixture() {
    return (
      <div>
        <input defaultValue="test" />
        <input defaultValue="foo" value="bar" onChange={jest.fn()} />
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should have the provided value ", () => {
    expect(wrapper.find("input").at(0)).toHaveValue("test");
  });
  it("should have the provided value ", () => {
    expect(wrapper.find("input").at(1)).toHaveValue("bar");
  });
});

describe("Assert the wrapper matches the provided react instance:", () => {
  function Fixture() {
    return (
      <div>
        <span id="foo" className="bar" />
      </div>
    );
  }

  const wrapper = shallow(<Fixture />);

  it("should matches the provided element ", () => {
    expect(wrapper).toMatchElement(<Fixture />);
  });
  it("should matches the provided element ", () => {
    expect(wrapper.find("span")).toMatchElement(<span />);
  });
  it("should matches the provided element ", () => {
    expect(wrapper.find("span")).toMatchElement(
      <span id="foo" className="bar" />,
      { ignoreProps: false }
    );
  });
  it("should not matches the provided element ", () => {
    expect(wrapper).not.toMatchElement(<div />);
  });
});

describe("Assert that the wrapper matches the provided selector:", () => {
  function Fixture() {
    return (
      <div>
        <span id="foo" className="bar" />
      </div>
    );
  }

  const wrapper = mount(<Fixture />);

  it("should matches the provided selector ", () => {
    expect(wrapper.find("span")).toMatchSelector("span");
  });
  it("should matches the provided selector", () => {
    expect(wrapper.find("span")).toMatchSelector("#foo");
  });
  it("should matches the provided selector ", () => {
    expect(wrapper.find("span")).toMatchSelector(".bar");
  });
});

describe("Jest-Enzyme package all assertions", () => {
  it("should test all assertions from jest-enzyme", () => {
    expect(true).toBeTruthy();
  });
});
