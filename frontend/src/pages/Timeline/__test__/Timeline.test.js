import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import { getTimelineById } from "../../../api/api";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import TimelineComponent from "../TimelineComponent";
let axiosMock;

const dummyNews = [
  {
    code: 0,
    msg: "",
    data: {
      eventGroup: {
        id: "123456",
        eventTitle: "Trump Committed Numerous Felonies",
        image:
          "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
        publish: "2022-03-23T18:24:00.000Z",
        description:
          "Mark Pomerantz said in a resignation letter that a failure to prosecute the former president would be ‘a grave failure of justice’",
        property: {
          type: "Article",
          typeDetail: "article",
        },
        articles: [
          {
            id: "000001",
            order: 0,
            title: "Trump Committed Numerous Felonies",
            headline:
              "Ex-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous Felonies",
            authors: ["Corinne Ramey", "Deanna Paul"],
            images: [
              {
                id: "111111",
                title: "Trump",
                content:
                  "A spokeswoman for the firm of former President Donald Trump said the ex-Manhattan prosecutor had ‘zero credibility.’",
                url: "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
              },
              {
                id: "222222",
                title: "Mark Pomerantz",
                content:
                  "Mark Pomerantz, in this 2002 photo, said in a resignation letter that public interest warranted the ex-president’s prosecution.",
                url: "https://images.wsj.net/im-510990?width=639&size=0.6666666666666666&pixel_ratio=2",
              },
            ],
            publish: "2022-03-23T18:24:00.000Z",
          },
          {
            id: "000002",
            order: 1,
            title: "Trump Committed Numerous Felonies",
            headline:
              "Ex-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous Felonies",
            authors: ["Corinne Ramey", "Deanna Paul"],
            images: [
              {
                id: "111111",
                title: "Trump",
                content:
                  "A spokeswoman for the firm of former President Donald Trump said the ex-Manhattan prosecutor had ‘zero credibility.’",
                url: "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
              },
              {
                id: "222222",
                title: "Mark Pomerantz",
                content:
                  "Mark Pomerantz, in this 2002 photo, said in a resignation letter that public interest warranted the ex-president’s prosecution.",
                url: "https://images.wsj.net/im-510990?width=639&size=0.6666666666666666&pixel_ratio=2",
              },
            ],
            publish: "2022-03-23T18:24:00.000Z",
          },
        ],
      },
    },
  },
];

const dummyArticle = [
  {
    id: "000001",
    order: 0,
    title: "1Trump Committed Numerous Felonies",
    headline:
      "Ex-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous FeloniesEx-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous Felonies",
    authors: ["Corinne Ramey", "Deanna Paul"],
    images: [
      {
        id: "111111",
        title: "Trump",
        content:
          "A spokeswoman for the firm of former President Donald Trump said the ex-Manhattan prosecutor had ‘zero credibility.’",
        url: "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
      },
      {
        id: "222222",
        title: "Mark Pomerantz",
        content:
          "Mark Pomerantz, in this 2002 photo, said in a resignation letter that public interest warranted the ex-president’s prosecution.",
        url: "https://images.wsj.net/im-510990?width=639&size=0.6666666666666666&pixel_ratio=2",
      },
    ],
    publish: "2022-03-23T18:24:00.000Z",
  },
  {
    id: "000002",
    order: 1,
    title: "2Trump Committed Numerous Felonies",
    headline:
      "Ex-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous Felonies",
    authors: ["Corinne Ramey", "Deanna Paul"],
    images: [
      {
        id: "111111",
        title: "Trump",
        content:
          "A spokeswoman for the firm of former President Donald Trump said the ex-Manhattan prosecutor had ‘zero credibility.’",
        url: "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
      },
      {
        id: "222222",
        title: "Mark Pomerantz",
        content:
          "Mark Pomerantz, in this 2002 photo, said in a resignation letter that public interest warranted the ex-president’s prosecution.",
        url: "https://images.wsj.net/im-510990?width=639&size=0.6666666666666666&pixel_ratio=2",
      },
    ],
    publish: "2022-03-23T18:24:00.000Z",
  },
];
beforeAll(() => {
  axiosMock = new MockAdapter(axios);
});

afterEach(() => {
  axiosMock.reset();
});

global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

describe("fetchTimeline", () => {
  it("fetch Timeline successfully", async () => {
    // Setup a mock response from axios - if we send a GET request to the url, simulate returning the dummyNews.
    axiosMock
      .onGet("http://localhost:3001/api/v2/eventgroup/123456")
      .reply(200, dummyNews);

    // Check the result
    const data = await getTimelineById("123456");

    // Make sure the API was called only once with the given url
    expect(axiosMock.history.get[0].url).toEqual(
      "http://localhost:3001/api/v2/eventgroup/123456"
    );
    // Check the return data was the same one which was returned by axios
    expect(data.data).toEqual(dummyNews);
  });
});

describe("Timeline component render", () => {
  it("Render full timeline component correctly", async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <TimelineComponent articles={dummyArticle} />
      </MemoryRouter>
    );
    // Check homenews contents are correctly rendered
    const eventGroups = dummyArticle;

    for (let eventGroup of eventGroups) {
      expect(queryByText(eventGroup.id)).toBeDefined();
      expect(queryByText(eventGroup.images)).toBeDefined();
      expect(queryByText(eventGroup.title)).toBeDefined();
      expect(queryByText(eventGroup.headline)).toBeDefined();
    }
  });
  it("Render omitted timeline component correctly", async () => {
    const { queryByText } = render(
      <MemoryRouter>
        <TimelineComponent articles={dummyArticle} fullVersion={false} />
      </MemoryRouter>
    );
    // Check homenews contents are correctly rendered
    const eventGroups = dummyArticle;
    for (let eventGroup of eventGroups) {
      expect(queryByText(eventGroup.id)).toBeDefined();
      expect(queryByText(eventGroup.title)).toBeDefined();
    }
  });
});
