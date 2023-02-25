import React from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Button, AutoComplete } from "antd";
import { NavLink } from "react-router-dom";
class SearchBar extends React.Component {
  static defaultProps = {
    placeholder: "Global Search",
  };

  constructor(props) {
    super(props);
    this.state = {
      inputValue: null,
    };
  }

  render() {
    const data = this.props.data;
    const status = data.code;
    var linkTo = "/";

    if (status === 0) {
      const hotWords = data.data.hotWords;
      var hotWordsOptions = [];
      for (var i in hotWords) {
        var hotwordObject = {};
        hotwordObject.value = hotWords[i];
        hotWordsOptions.push(hotwordObject);
      }
      return (
        <div className="barPosition">
          <label className="searchBar">
            <AutoComplete
              style={{ width: "100%", height: "100%" }}
              placeholder={this.props.placeholder}
              options={hotWordsOptions}
              filterOption={(inputValue, option) =>
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                -1
              }
              onChange={(event) => {
                this.setState({
                  inputValue: event,
                });
              }}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  window.location.assign("/#" + linkTo);
                }
              }}
            />
            {(() => {
              if (this.state.inputValue != null) {
                linkTo = "/search/" + this.state.inputValue;
              }
            })()}
            <NavLink className="App-link" to={linkTo} rel="noopener noreferrer">
              <Button>
                <SearchOutlined />
              </Button>
            </NavLink>
          </label>
        </div>
      );
    } else {
      return (
        <div>
          <label className="searchBar">
            <input placeholder={this.props.placeholder} />
            <Button>
              <SearchOutlined />
            </Button>
          </label>
        </div>
      );
    }
  }
}

export default SearchBar;
