import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getEventGroups } from '../../../api/api'; 
import { render } from '@testing-library/react';
import HomeNews from '../HomeNews';


let axiosMock;

beforeAll(() => {
    axiosMock = new MockAdapter(axios);
});

afterEach(() => {
    axiosMock.reset();
});

const dummyData =  
            {
                code: 0,
                msg: "",
                data: {
                    recommendEventGroup: {
                        eventGroups: [
                            {
                                id: "123456",
                                eventTitle: "Trump Committed Numerous Felonies",
                                image: "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
                                publish: "2022-03-23T18:24:00.000Z",
                                description: "Mark Pomerantz said in a resignation letter that a failure to prosecute the former president would be ‘a grave failure of justice’"
                            },
                            {
                                id: "123456",
                                eventTitle: "Trump Committed Numerous Felonies",
                                image: "https://images.wsj.net/im-510991?width=860&size=1.5&pixel_ratio=2",
                                publish: "2022-03-23T18:24:00.000Z",
                                description: "Mark Pomerantz said in a resignation letter that a failure to prosecute the former president would be ‘a grave failure of justice’"
                            }
                            
                        ]
                    }
                }
            };

describe('fetchEventGroup', ()=> {
    it('fetch eventGroup successfully', async () => {    

        // Setup a mock response from axios - if we send a POST request to the url, simulate returning the dummyData.
        axiosMock.onPost('http://localhost:3001/api/v2/eventgroup/recommend', { count: 10 }).reply(200, dummyData);
        
        // Check the result
        const data = await getEventGroups();

        // Make sure the API was called only once with the given url
        expect(axiosMock.history.post[0].url).toEqual('http://localhost:3001/api/v2/eventgroup/recommend');

        // Check the return data was the same one which was returned by axios
        expect(data.data).toEqual(dummyData);

        // Check homenews contents are correctly rendered
        const { queryByText } = render(
            <HomeNews data={data}/>
        );

        const eventGroups = dummyData.data.recommendEventGroup.eventGroups
        for (let eventGroup of eventGroups) {
            expect(queryByText(eventGroup.eventTitle)).toBeDefined();
            expect(queryByText(eventGroup.image)).toBeDefined();
            expect(queryByText(eventGroup.description)).toBeDefined();
        }
        
    });

});


