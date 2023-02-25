import { Carousel, Row, Col, Card } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const { Meta } = Card;

class HomeNews extends React.Component {
  
  render() {
    const data = this.props.data;
    const status = parseInt(data.code);
    const errorMsg = data.msg;

    if (status === 0) {
      const eventGroup = data.data.recommendEventGroup.eventGroups;
      return (
        <div>
          <Carousel autoplay>
            {eventGroup.slice(0, 4).map((group, index) => (
              <div className="carouselContent" key={index}>
                <Link to={`/timeline/${group.id}`}>
                  <img src={group.image} alt=""/>
                  <h1>{group.eventTitle}</h1>
                </Link>
              </div>
            ))}
          </Carousel>
          <div className="newsTopics">
            <div>
              <h1>News Topics</h1>
            </div>
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
      return <div>{errorMsg}</div>;
    }
  }
}

export default HomeNews;

/*  From dummydata
    import data from './dummydata';
    const status = data[0].code;
    const errorMsg = data[0].msg;
    const eventGroup = data[0].data.recommendEventGroup.eventGroups;
*/
