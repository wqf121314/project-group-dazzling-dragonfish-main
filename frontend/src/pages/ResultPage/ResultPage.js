import React from 'react'
import { Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import { getTagResult } from '../../api/api';
import ErrorPage from "../components/ErrorPage";
import Skeleton from "../components/Skeleton";

const { Meta } = Card;
let category = "";

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
      category = _this.props.match.params.category;
      _this.setState({
        success: false
      });
      getTagResult(category).then((res) => {
        _this.setState({
          data: res.data,
          title: `${capitalizeFirstLetter(category)}`,
          success: true
        });
      });
      window.onhashchange = function() {
        category = _this.props.match.params.category;
        _this.setState({
          success: false
        });
        getTagResult(category).then((res) => {
          _this.setState({
            data: res.data,
            title: `${capitalizeFirstLetter(category)}`,
            success: true
          });
        });
      };
    }

    render() {

      const data = this.state.data;
      const title = this.state.title;
      const status = parseInt(data.code);
      const errorMsg = data.msg;
      const success = this.state.success;

      if (!success){
        return <Skeleton/>
      } else if (status === 0) {
        const eventGroup_first = data.data.recommendEventGroup.eventGroups[0];
        const eventGroup = data.data.recommendEventGroup.eventGroups.slice(1);
        return (
          <div>
            <div className="newsTopics">
              <div>
                <h1>{title}</h1>
              </div>
              <Row>
                  <Col span={24}>
                      <Link to={`/timeline/${eventGroup_first.id}`}>
                        <Card
                            hoverable
                            className='resultMain'
                            cover={<img alt="" src={eventGroup_first.image} />}
                          >
                            <Meta
                              title={eventGroup_first.eventTitle}
                              description={eventGroup_first.description}
                            />
                        </Card>
                      </Link>
                  </Col>
              </Row>
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
