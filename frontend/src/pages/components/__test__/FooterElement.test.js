import { render } from '@testing-library/react';
import { HashRouter } from 'react-router-dom';
import FooterElement from "../FooterElement";

describe("HeaderContents", () => {
  it("Check render correctly header contents", () => {

    const { queryByText, getAllByRole } = render(
        <HashRouter>
            <FooterElement/>
        </HashRouter>
    );

    // Check all the footers text correctly rendered
    expect(queryByText("News Timeline ©2022 Created by Dazzling Dragonfish")).toBeDefined();

    // Check all the footers' links correctly rendered
    const links = getAllByRole("link");
    expect(links[0].href).toEqual('https://www.facebook.com/');
    expect(links[1].href).toEqual('https://twitter.com/');
    expect(links[2].href).toEqual('https://www.instagram.com/');
    expect(links[3].href).toEqual('https://github.com/UOA-CS732-SE750-Students-2022/project-group-dazzling-dragonfish');
        
  });
});