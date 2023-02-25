import React from "react";
import "antd/dist/antd.min.css";
import { Layout, Card, Row, Col, Tooltip } from "antd";
import { getTimelineById } from "../../api/api";
import TimelineComponent from "./TimelineComponent";
import PublicBreadcrumb from "../components/Breadcrumb";
import Skeleton from "../components/Skeleton";
import LinesEllipsis from "react-lines-ellipsis";
import ErrorPage from "../components/ErrorPage";

class TimelinePage extends React.Component {
  static defaultProps = {
    width: "70%",
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      success: false,
    };
  }

  componentDidMount() {
    const _this = this;
    getTimelineById(_this.props.match.params.timelineId)
      .then((res) => {
        _this.setState({
          data: res.data,
          success: true,
        });
      })
      .catch(() => {
        _this.setState({
          data: { code: 1 },
          success: true,
        });
      });
    window.onhashchange = function () {
      getTimelineById(_this.props.match.params.timelineId)
        .then((res) => {
          _this.setState({
            data: res.data,
            success: true,
          });
        })
        .catch(() => {
          _this.setState({
            data: { code: 1 },
            success: true,
          });
        });
    };
  }

  render() {
    if (this.state.success === true) {
      var data = this.state.data;
      const status = data.code;
      const errorMsg = data.msg;
      const timelineComponentStyle = {
        width: this.props.width,
        height: "90%",
        margin: "0 auto",
      };

      if (status === 0) {
        const eventGroup = data.data.eventGroup;
        const articles = eventGroup.articles;
        var eventTitle = eventGroup.eventTitle.split("•");
        const bread = [{ name: data.data.eventGroup.eventTitle }];
        return (
          <Layout>
            <PublicBreadcrumb bread={bread}></PublicBreadcrumb>
            <div className="timelinePageContainer">
              <Row gutter={8}>
                {eventTitle.map((title, index) => {
                  return (
                    <Col key={index} span={3}>
                      <Tooltip
                        placement="bottom"
                        title={title}
                        overlayClassName="eventGroupTitle"
                      >
                        <Card
                          hoverable
                          className="eventGroupTitle"
                          size="small"
                          style={{ backgroundColor: "lightgrey" }}
                        >
                          <LinesEllipsis
                            className="eventGroupTitleFont"
                            text={title}
                            maxLine="1"
                          />
                        </Card>
                      </Tooltip>
                    </Col>
                  );
                })}
              </Row>
              <div>
                <br></br>
                <br></br>
              </div>
              <div style={timelineComponentStyle}>
                <TimelineComponent
                  articles={articles}
                  timelineId={this.props.match.params.timelineId}
                />
              </div>
            </div>
          </Layout>
        );
      } else {
        return <ErrorPage ErrorMessage={errorMsg} />;
      }
    } else {
      return <Skeleton />;
    }
  }
}

export default TimelinePage;
