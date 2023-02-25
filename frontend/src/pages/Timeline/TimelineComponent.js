import React from "react";
import { Timeline, Row, Col, Card } from "antd";
import { NavLink } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";
import TimelineItem from "antd/lib/timeline/TimelineItem";

class TimelineComponent extends React.Component {
  static defaultProps = {
    fullVersion: true,
  };
  render() {
    const articles = this.props.articles;
    const timelineId = this.props.timelineId;
    return (
      <div>
        <Timeline>
          {articles.map((article, index) => {
            var date = article.publish.substring(0, 10);
            var time = article.publish.substring(12, 16);
            var publishTime = date + "   " + time;
            return (
              <TimelineItem key={index}>
                <NavLink
                  className="App-link"
                  to={"/timeline/" + timelineId + "/event/" + article.id}
                  rel="noopener noreferrer"
                >
                  {this.props.fullVersion
                    ? fullTimeline(article, publishTime)
                    : omittedTimeline(article, publishTime)}
                </NavLink>
              </TimelineItem>
            );
          })}
        </Timeline>
      </div>
    );
  }
}

function fullTimeline(article, publishTime) {
  return (
    <Card hoverable className="card">
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <p className="eventTime">{publishTime}</p>
            </Col>
            <Col span={12}></Col>
          </Row>
          <p className="timelineNewsTitle">{article.title}</p>
          <div className="timelineNewsHeadline">
            <LinesEllipsis text={article.headline} maxLine="6">
              <p>{article.headline}</p>
            </LinesEllipsis>
          </div>
        </Col>
        <Col span={12} className="imgContainer">
          <div>
            <img
              src={article.images[0].url}
              alt={article.images[0].title}
            ></img>
          </div>
        </Col>
      </Row>
    </Card>
  );
}

function omittedTimeline(article, publishTime) {
  return (
    <Card hoverable className="card">
      <Row>
        <Col span={12}>
          <p className="eventTime">{publishTime}</p>
        </Col>
      </Row>
      <p className="timelineNewsTitle">{article.title}</p>
    </Card>
  );
}
export default TimelineComponent;
