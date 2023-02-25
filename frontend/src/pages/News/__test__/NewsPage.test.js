import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import {getEventById, getTimelineById} from '../../../api/api';
import { render } from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import NewsPage from '../newsPage';


let axiosMock;

beforeAll(() => {
    axiosMock = new MockAdapter(axios);
});

afterEach(() => {
    axiosMock.reset();
});

const dummyEvent =
    {
        code: 0,
        msg: "",
        data: {
            property: {
                language: "en-US",
                region: "North_America_USA",
                source: "WSJ Online",
                originalUrl:
                    "https://www.wsj.com/articles/ex-manhattan-prosecutor-who-resigned-said-he-believed-trump-committed-numerous-felonies-11648087035",
                type: "Article",
                typeDetail: "article",
                tags: ["Ex-Manhattan", "Mark Pomerantz", "a grave failure of justice"],
            },
            article: {
                id: "1",
                headline:
                    "Ex-Manhattan Prosecutor Who Resigned Said He Believed Trump Committed Numerous Felonies",
                authors: ["Corinne Ramey", "Deanna Paul"],
                description:
                    "Mark Pomerantz said in a resignation letter that a failure to prosecute the former president would be ‘a grave failure of justice’",
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
                content: [
                    "A former Manhattan prosecutor who investigated Donald Trump said in a resignation letter last month that he believed the former president committed numerous felonies and the public interest warranted his prosecution.",
                    "“As you know from our recent conversations and presentations, I believe that Donald Trump is guilty of numerous felony violations of the Penal Law in connection with the preparation and use of his annual Statements of Financial Condition,” the lawyer, Mark Pomerantz, wrote in the letter to Manhattan District Attorney Alvin Bragg.",
                    "Mr. Pomerantz said that while Mr. Bragg had the authority to suspend the investigation, “a decision made in good faith may nevertheless be wrong.”",
                    "The New York Times published the text of the letter, whose authenticity was confirmed by people familiar with the matter.",
                    "Mr. Pomerantz and Carey Dunne, both senior prosecutors tapped by then-District Attorney Cyrus Vance Jr. to work on the probe, resigned in February, casting into doubt the future of the yearslong investigation into Mr. Trump and his business. Their departure came after weeks in which the grand jury hearing evidence appeared to pause its activity, The Wall Street Journal previously reported.",
                    "The complex financial investigation had been examining whether Mr. Trump made misrepresentations to tax authorities, insurers and lenders for his own financial benefit. The probe was still ongoing when Mr. Vance left office.",
                    "The investigation earlier led to the indictments of the Trump Organization and its longtime chief financial officer, Allen Weisselberg, on tax-related crimes last summer. Both have pleaded not guilty.",
                    "A spokeswoman for Mr. Bragg on Wednesday said the investigation is continuing. “A team of experienced prosecutors is working every day to follow the facts and the law,” the spokeswoman said. “There is nothing we can or should say at this juncture about an ongoing investigation.”",
                    "A spokeswoman for the Trump Organization called Mr. Pomerantz a “never-Trumper” and said he had “zero credibility.” A lawyer for Mr. Trump didn’t respond to a request for comment.",
                    "In the letter, Mr. Pomerantz said that Mr. Vance had concluded that the facts of the case warranted prosecution.",
                    "“He directed the team to present evidence to a grand jury and to seek an indictment of Mr. Trump and other defendants as soon as reasonably possible,” Mr. Pomerantz wrote.",
                    "He said that Mr. Bragg had devoted significant time and energy to the case, but had ultimately decided not to pursue criminal charges at this time. Mr. Pomerantz said he feared that the district attorney’s conclusion meant that Mr. Trump “will not be held fully accountable for his crimes.”",
                    "“I have worked too hard as a lawyer, and for too long, now to become a passive participant in what I believe to be a grave failure of justice,” Mr. Pomerantz wrote.",
                ],
            },
        },
    };

const dummyTimeline = {
    code: 0,
    msg: "",
    data: {
        eventGroup: {
            id: "123456",
            eventTitle: "Trump•Committed•Numerous Felonies",
            image:
                "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
            publish: "2022-03-23T18:24:00.000Z",
            description:
                "Mark Pomerantz said in a resignation letter that a failure to prosecute the former president would be ‘a grave failure of justice’",
            property: {
                eventGroupType: "Article",
                eventGroupTypeDetail: "article",
            },
            articles: [
                {
                    id: "000001",
                    order: 0,
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
                {
                    id: "000003",
                    order: 2,
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
                {
                    id: "000004",
                    order: 3,
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
                {
                    id: "000005",
                    order: 4,
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
                {
                    id: "000006",
                    order: 5,
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
}

window.matchMedia = window.matchMedia || function() {
    return {
        matches : false,
        addListener : function() {},
        removeListener: function() {}
    };
};

describe('fetchNewsPage', ()=> {
    it('fetch NewsPage successfully', async () => {

        // Setup a mock response from axios - if we send a GET request to the url, simulate returning the dummyEvent.
        axiosMock.onGet('http://localhost:3001/api/v2/event/00000000000000000000000000000000',).reply(200, dummyEvent);

        // Check the result
        const EventData = await getEventById("00000000000000000000000000000000");

        // Make sure the API was called only once with the given url
        expect(axiosMock.history.get[0].url).toEqual('http://localhost:3001/api/v2/event/00000000000000000000000000000000');

        // Check the return data was the same one which was returned by axios
        expect(EventData.data).toEqual(dummyEvent);

        // Setup a mock response from axios - if we send a POST request to the url, simulate returning the dummyData.
        axiosMock.onGet('http://localhost:3001/api/v2/eventgroup/00000000000000000000000000000000',).reply(200, dummyTimeline);

        // Check the result
        const TimelinData = await getTimelineById("00000000000000000000000000000000");

        // Make sure the API was called only once with the given url
        expect(axiosMock.history.get[1].url).toEqual('http://localhost:3001/api/v2/eventgroup/00000000000000000000000000000000');

        // Check the return data was the same one which was returned by axios
        expect(TimelinData.data).toEqual(dummyTimeline);

        const mockedParams = {
            match: {
                 params: {
                    timelineId: '00000000000000000000000000000000',
                    eventId: '00000000000000000000000000000000',
                },
                navigation: ''
            }
        };

        // Check newspage contents are correctly rendered
        const { queryByText }  = render(
            <BrowserRouter>
                <NewsPage {...mockedParams} />
            </BrowserRouter>
        );

        const article = dummyEvent.data.article
        expect(queryByText(article.headline)).toBeDefined();
        expect(queryByText(article.images[0].url)).toBeDefined();
        expect(queryByText(article.content)).toBeDefined();

    });
});
