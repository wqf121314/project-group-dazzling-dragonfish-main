import React from "react";
import { Col, Row, Tag } from "antd";
import { getEventById, getTimelineById } from "../../api/api";
import TimelineComponent from "../Timeline/TimelineComponent";
import PublicBreadcrumb from "../components/Breadcrumb";
import ErrorPage from "../components/ErrorPage";
import Skeleton from "../components/Skeleton";
import { LinkOutlined } from '@ant-design/icons';

class newsPage extends React.Component {
  componentDidMount() {
    const _this = this;
    eventId = _this.props.match.params.eventId;
    groupId = _this.props.match.params.timelineId;
    getNewsData(_this);
    window.onhashchange = function () {
      eventId = _this.props.match.params.eventId;
      groupId = _this.props.match.params.timelineId;
      getNewsData(_this);
    };
  }

  render() {
    error = 0
    if (this.state && this.state.error) {
      error = 1
    }
    if (this.state && this.state.data) {
      data = this.state.data;
      breadCrumb[1].name = this.state.data.article.headline;
      tags = this.state.data.property.tags;
    }
    if (this.state && this.state.group) {
      articles = this.state.group.articles;
      groupId = this.state.group.id;
      breadCrumb[0].name = this.state.group.eventTitle;
      breadCrumb[0].url = "/timeline/" + groupId;
    }

    var contentHtml = getContentHtml(data.article.content);
    var authoerList = data.article.authors[0];
    if (data.article.authors.length > 1) {
      authoerList += " et. al";
    }
    if (this.state && this.state.loading){
      return <Skeleton/>
    }
    else if (error === 0){
      return (
          <div className="news_page_bgk">
            <PublicBreadcrumb bread={breadCrumb}></PublicBreadcrumb>
            <Row gutter={[16, 16]} className="news_page_back">
              <Col span={14}>
                <div className="news_page">
                  <div className="news_page_title">{data.article.headline}</div>
                  <div className="news_flex">
                    <div>{authoerList}</div>
                    <div className="news_page_date">
                      {formatDate(data.article.publish)}
                    </div>
                    <div className="news_page_link">
                      <a
                          onClick={() => {
                            jumpToLink(data.property.originalUrl);
                          }}
                      >
                        <LinkOutlined />
                      </a>
                    </div>
                  </div>
                  <div className="news_tags">
                    {tags.map((item,index) => {
                      return  <Tag key={index} className="news_tag">{item}</Tag>
                    })}
                  </div>
                  <div className="news_page_header_img">
                    <img
                        src={data.article.images[0] && data.article.images[0].url}
                    ></img>
                  </div>
                  <div>{contentHtml}</div>
                </div>
              </Col>
              <Col span={10}>
                <div className="news_page_timeline_bgc">
                  <TimelineComponent
                      articles={articles}
                      timelineId={groupId}
                      fullVersion={false}
                  ></TimelineComponent>
                </div>
              </Col>
            </Row>
          </div>
      );
    } else {
      return(<ErrorPage></ErrorPage>)
    }

  }
}

var data = {
  article: {
    id: "",
    headline: "",
    authors: [],
    description: "",
    images: [],
    publish: "",
    content: [],
  },
  keywords: [],
};

var property: {
  language: "en-US",
  region: "",
  source: "",
  originalUrl: "",
  type: "",
  typeDetail: "",
};

var articles = [];

var breadCrumb = [{ name: "" }, { name: "" }];

var groupId = "";

var eventId = "";

var tags = [];

var error = 0;

function getNewsData(_this) {
  _this.setState({
    error: 0,
    loading: true
  });
  getEventById(eventId).then((res) => {
    _this.setState({
      data: res.data.data,
      loading: false
    });
    if (res.data.code !== 0){
      _this.setState({
        error: 1,
      });
    }
  }).catch(() => {
    _this.setState({
      error: 1,
    });
  });
  getTimelineById(groupId).then((res) => {
    _this.setState({
      group: res.data.data.eventGroup,
      loading: false
    });
    if (res.data.code !== 0){
      _this.setState({
        error: 1,
      });
    }
  }).catch(() => {
    _this.setState({
      error: 1,
    });
  });
}

function formatDate(publishTime) {
  var publish = new Date(publishTime);
  if (!(publish instanceof Date && !isNaN(publish.getTime()))) {
    return "";
  }
  var year = publish.getFullYear() + "";
  var month = publish.getMonth() + 1 + "";
  var date = publish.getDate() + "";
  return year + "/" + month + "/" + date;
}

function jumpToLink(link) {
  window.open(link);
}
function getContentHtml(content) {
  return content.map((str, index) => {
    return (
      <div key={index} className="news_page_content">
        {str}
        <br />
      </div>
    );
  });
}

export default newsPage;
