import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import HeaderElement from "../HeaderElement";

describe("HeaderContents", () => {
  it("Check render correctly header contents", () => {

    const labels = ['Headlines', 'Business', 'Entertainment', 'Health', 'Science', 'Sports'];

    const { queryByText, getAllByRole } = render(
        <HashRouter>
            <HeaderElement/>
        </HashRouter>
    );

    // Check all the headers text correctly rendered
    expect(queryByText("Dazzling Dragonfish")).toBeDefined();
    for (let label of labels) {
        expect(queryByText(label)).toBeDefined();
    }

    // Check all the headers' links correctly rendered
    const links = getAllByRole("link");
    const homeLink = links[0];
    const categoryLink = links.slice(1, 7);
    expect(homeLink.href).toEqual('http://localhost/');
    for (let index = 0; index < categoryLink.length; index++) {
        expect(categoryLink[index].href).toEqual(`http://localhost/#/category/${labels[index].toLocaleLowerCase()}`);
    }    
        
  });
});