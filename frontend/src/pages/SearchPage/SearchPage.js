import React from "react";
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import { getSearchResult } from "../../api/api";
import SearchBar from "../components/SearchBar";
import ErrorPage from "../components/ErrorPage";
import Skeleton from "../components/Skeleton";

const { Meta } = Card;
let searchWord = "";

class ResultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      title: "",
    };
  }

  componentDidMount() {
    const _this = this;
    searchWord = _this.props.match.params.searchWord;
    _this.setState({
      success: false
    });
    getSearchResult(searchWord).then((res) => {
      _this.setState({
        data: res.data,
        title: `${capitalizeFirstLetter(searchWord)}`,
        success: true
      });
    });
    window.onhashchange = function () {
      searchWord = _this.props.match.params.searchWord;
      _this.setState({
        success: false
      });
      getSearchResult(searchWord).then((res) => {
        _this.setState({
          data: res.data,
          title: `${capitalizeFirstLetter(searchWord)}`,
          success: true
        });
      });
    };
  }

  render() {
    const data = this.state.data;
    const status = parseInt(data.code);
    const errorMsg = data.msg;
    const success = this.state.success;

    if (!success){
      return <Skeleton/>
    } else if (status === 0) {
      const eventGroup = data.data.recommendEventGroup.eventGroups;
      return (
        <div>
          <SearchBar
            data={data}
            placeholder={this.props.match.params.searchWord}
          />

          <div className="newsTopics">
            <Row gutter={[16, 16]}>
              {eventGroup.map((group, index) => (
                <Col span={8} key={index}>
                  <Link to={`/timeline/${group.id}`}>
                    <Card
                      hoverable
                      className="cards"
                      cover={<img alt="" src={group.image} />}
                    >
                      <Meta
                        title={group.eventTitle}
                        description={group.description}
                      />
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>
          </div>
        </div>
      );
    } else {
      return <ErrorPage ErrorMessage={errorMsg}></ErrorPage>;
    }
  }
}

export default ResultPage;

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
