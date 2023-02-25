# A Novel News Attention Application by Timeline

Welcome to the project-group-dazzling-dragonfish. This project tends to implement a news event webapp in chronological order. When people encounter hot issues in society, they always want to see the causes and consequences of the events. However, many media sites nowadays have fragmented event news that cannot be organised into a complete timeline. Based on the above situation, a new news browsing platform was born. This novel news web application will show the top 10 most viewed events you subscribed to. An intelligent recommendation system will recommend ten hot events of interest according to each person's environment and hot spots of concern. On this README, you can find out the background introduction, installation guide, key features introduction and management of the project.

> <a name="home">Table of Contents  
> 1. [Installation Guide](#ch1)  
> 2. [Key Features Introduction](#ch2)  
> 3. [What Technologies We Leveraged?](#ch3)  
> 4. [Project Management](#ch4)

## <a name="ch1">Installation Guide

This novel news application has already been published at http://newsapp.bilibalabow.idv.tw, you can feel free to enjoy
the complete experience without any installation. Furthermore, we still provide an installation guide if you wish to
execute the app locally. The following installation guide assumes that you already have the knowledge to maintain a
full-stack application: MERN.

### Step 1: Pull the repository

Use Git to pull the code via the URL: [project-group-dazzling-dragonfish](https://github.com/UOA-CS732-SE750-Students-2022/project-group-dazzling-dragonfish.git)

### Step 2: Update the dependencies

- If you are using VS Studio Code, please open a new Termial and using following command to update the dependencies
  
  - **Backend**: Change directory to the root folder of the backend and execute the command `npm install` or `yarn install`
  
  - **Frontend**: Change directory to the root folder of the frontend and execute the command `npm install` or `yarn install`
  
- Other than VS Studio Code, please open the Command Promote ans change the path to the project then update the dependencise 
  
  - **Backend**: Change directory to the root folder of the backend and execute the command `npm install` or `yarn install`
  
  - **Frontend**: Change directory to the root folder of the frontend and execute the command `npm install` or `yarn install`

### Step 3: Make sure the MongoDB service is installed and ready to use

- The default path:port is `http://localhost:27017`
- If you want a customer one, please update the configuration
  in `[root]/backend/config/default[developement][production].json`

### Step 4: Run the App  
  
- **Backend Server**: Change directory to the root folder of the backend and execute the command `npm run start` or `yarn start`
- **Frontend Server**: Change directory to the root folder of the frontend and execute the command `npm run start` or `yarn start`

[:top:](#home)

## <a name="ch2">Key Features Introduction

### :key: News Display System 

We developed our news display system to fully integrate our target requirements, data structure, and UX simulations. The home page displays the top 10 recommend events. The category page and search page display the events based on their category and search keywords. The timeline page displays single event's relevant news and lists them from the latest to the oldest. Finally, the news page displays the news content from the event's timeline.
  
### Target requirements
The following targets are we planned to meet at the start of the project:
1. List the top 10 recommended events on the home page. Each event has corresponding link to their timeline.
2. A search system that users can search for the corresponding information based on keywords
3. A tagging system provides multi-dimensional tagging based on the news data, such as regional dimension, news classification dimension, etc.
  
### Data structure
In our project, we display our news data in the hierarchy from the top to the bottom as the following:
1. `News event`: organized event with a link to the corresponding timeline
2. `Timeline`: list all the news that corresponds to the target event 
3. `News content`: the news content from the timeline

### UX (User experience) simulation
We simulate the possible users' experience and list the possible interactions as the following:
1. `Track 1`: Home page :arrow_right: click recommend events :arrow_right: event's timeline :arrow_right: click one of the news from the timeline :arrow_right: news content
2. `Track 2`: Home page :arrow_right: search events from the searching bar :arrow_right: search result :arrow_right: click event :arrow_right: event's timeline :arrow_right: click one of the news from the timeline :arrow_right: news content  
3. `Track 3`: Home page :arrow_right: click one of the categories from the header :arrow_right: category result :arrow_right: click event :arrow_right: event's timeline :arrow_right: click one of the news from the timeline :arrow_right: news content 

### UI (User interface) design
Based on the targe requirements and user experience simulation, we built five pages to our website. Each page possesses several features to meet our targets and fulfil user requirements.
  
#### Home page  
There are five sections on our home page. Among them, the header area and footer area are displayed in every website page. In addition, the following screenshots show the sample of the home page.
1. `Header area`: this area displays the name of our website ("Dazzling Dragonfish") and six categories. The name of our website has a link to the home page, and the other category name items have links to their each category page.
2. `Search bar`: users can search for the events based on keywords. Once users click the searching bar, five hot words will appear beneath the searching bar. User can simply click the hot words or type any keywords they want.
3. `Sliding recommend events`: this section has carousel feature that will automatically slide 4 recommend events. Users will be navigated to the event's tiemline page once they click it.
4. `Recommend top 10 events`: the "News Topics" area will display top 10 recommend events. Users will be navigated to the event's tiemline page once they click it.
5. `Footer area`: this area displays three social media links and our project's github link, so users can know more the details if they desire.  
  
  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168003147-6e8c541d-f610-451b-900d-37c862b7ddb3.png"></kbd></p>
  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168003227-b04a2915-5a84-423b-acff-edd29d462150.png"></kbd></p> 
  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168003244-67df54e8-be47-4226-8071-bc2ee16e5fd7.png"></kbd></p>  
  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168003267-4d0ffb60-bb18-4206-aee2-29eecdcb7aee.png"></kbd></p>  

#### Category page
  Once users click category items on the header area, they will be naviagted to the category page. Each category page contains several relevant events. The following screenshot shows the sample of the category page:
  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168004022-9f7d951e-2226-41e8-bad3-202d19fba5f5.png"></kbd></p>

#### Search result page  
  Users will be navigate to the search result page once they click the search button on the search bar. The following represents an example of hot words search result. The following screenshot shows the sample of the search result page.

  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168008352-0d91be47-bbbc-4079-90c0-deedf7c06c78.png"></kbd></p>

#### Timeline page  
  Once users click the event cards, they'll be navigated to the event's timeline page. On the event's timeline page, there are three sections of the timeline page:
  1. `Breadcrumb`: the breadcrumb displays the current location within a hierarchy. User can easily navigate back to a higher level if they want.
  2. `Event's title`: one event might have several titles, so we split the title into some keywords and each keywords shows as a small card. Each title is restricted to displaying only one line of data, user can hover to the cards to see the whole title names.
  3. `Event's timeline`: the event's timeline, all news in this event is displayed from newest to oldest. Each news item is presented in the form of a card, including the time, title, headlines and images. The headline section is restricted to displaying only the first six data lines, and the overflow section is displayed as an ellipsis.

  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168008288-82a0d0ab-4b3b-4a48-b326-b6bad6ed2ec5.png"></kbd></p>

#### News content page  
  Once users click the timeline page's news item, they'll be navigated to the news content page. There are three sections of our news content page:
  1. `Breadcrumb`: the breadcrumb displays the current location within a hierarchy. Users can easily navigate back to a higher level if they want.
  2. `News content`: the whole news contents, including title name, publish time, resource name and link, and the content.
  3. `Tagging system`: provides multi-dimensional tagging based on the news data.
  4. `Event's timeline`: an abbreviated version of the timeline of this event, showing only the time of the news with the headline, so that users can more easily navigate to other news about the same event.

  <p><kbd><img src="https://user-images.githubusercontent.com/93987431/168008212-118ccdfe-9ce3-47f2-a199-25372986f1a2.png"></kbd></p>

### :key: News Collection and Organization

News data collection flow is the linchpin to providing sources for the whole project. Below flow chart show the data acquisitionf flow step-by-step: 1. Get Google-trends data from the API :arrow_right: 2. Parsing response as Event-groups object :arrow_right: 3. Enrich more news via newsAPI by keywords :arrow_right: 4. Add news in Event-groups object :arrow_right: 5-6. Update news content :arrow_right: 7. Store data in MongoDB for Sevice Layer use.  

<p><kbd><img src="https://user-images.githubusercontent.com/87575042/167853577-0c854360-982b-4dcd-8bce-7f13a1691318.png"></kbd></p>

### :key: News Search Service
To improve the ease of use of the system, we added a search system in the second iteration of the project so that users
can easily find relevant news content. The search function is based on the search of event groups. Event groups: individual news items organised in groups of
events by content topic. To achieve this we have added a query request to the one provided in Issue 1 to get the
recommended event groups. When the interface receives a query field request, the back-end service will determine the
query word and pass it to the EventGroupServer service for searching. The search field will be the title of the
EventGroup object, with other parameters to assemble the data and return it.

```shell
#Phase I interface definition
curl --location --request POST 'http://localhost:3001/api/v1/eventgroup/recommend' \
--header 'Content-Type: application/json' \
--data-raw '{
    "count":10
}'

#Phase II Interface Definition
curl --location --request POST 'http://localhost:3001/api/v2/eventgroup/recommend' \
--header 'Content-Type: application/json' \
--data-raw '{
    "category":"business",
    "query":"a",
    "count":3
}'
```

Further, in order to improve the content matching rate, I have improved the keyword matching by means of regular
expressions in the search interface. Also added to the search is the ability to sort by time of publication.

```js
EventGroup.find({eventTitle: {$regex: new RegExp(title, "i")}}).populate({
    path: 'articles', populate: {path: 'article'}
}).populate("property").limit(count).sort({"publish": -1});
```

### :key: News Tagging Service  
To provide a better news reading experience, we designed a content tagging service to provide numbers of keyword by leveraging the `3rd-party keywords extraction library` to characterise the news content.  In this way, each news data will return with a series tag representation at the left-top of the news page.

Based on the definition of our news object and scalability considerations, it's consider tags to be a feature of news, so the tag for each news item exists in the `ArticleProperty` object. Each news item will have multiple tags, so this is an array object. The tag data for this news will be available in the Event object via the NewsEvent.property property.

```js
const articlePropertySchema = new Schema({
    language: String,     // Article used language
    region: String,       // The country or region where the content of the article takes place
    source: String,       // Article source's website
    originalUrl: String,  // URLs of specific article sources
    tags: Array           // Article by tags
    ...
});
```
[:top:](#home)
## <a name="ch3">What Technologies We Leveraged?

### :bulb:React
We used React to build our web page. Axios was used to handle our asynchronous requests to the API.
Our web application is a Single-Page Applicant（SPA）that requires only a single page load in a web browser and routing with React Router and use NavLink to jump between pages. React-router-config was the tool used to implement the centralized configurable routing, assigning different paths to the correspond components, e.g. "/" as the path of the homepage component. 
 ```js
    {
    path: "/",
    component: HomePage,
    exact: true,
  },
 ```
  For any unexcepted path, an error page with the corresponding error message will be displayed.
  
  We have five pages in total.
- The Home page: `http://localhost:3000/#/` 
- The Search page shows the result of searching: `http://localhost:3000/#/search/:searchWord`
- The Result page shows the event groups in categories: `http://localhost:3000/#/category/:category`
- The Timeline page shows the grouped events in a timeline: `http://localhost:3000/#/timeline/:timelineId`
- The news page shows each individual news in detail: `http://localhost:3000/#/timeline/:timelineId`  
  
We have also used some other packages to Implement some of the features. For example, we have used react-lines-ellipsis to control the length of the text display and convert the overflow to an ellipsis.

### :bulb:Ant Design
There are many UI libraries in place, but we choose to use Ant Design because there are many high quality components, which are really convenient for us to build up a website.
We utilize several Ant Design components in our project. For example, we use `Layout` component to build the `Header`, `Content`, and `Footer` layouts. We also use `Carousel` component in the home page to provide sliding images and titles of the grouped news. Besides, we use `Grid` and `Card` components to display the news with beautiful pictures, titles and descriptions under the card format. We also use `Timeline` component to display the news in timeline page and `Breadcrumb` component to reveal the relationship between each article and the timeline. 
  
As an example, we used the Menu component from Ant Design to implement our menu on the header. We insert the defined categories as `<Menu.Item>` one by one into a `<Menu>` component. We also set the `theme` parameter in the `<Menu>` component to `"dark"` and the `mode` parameter to `"horizontal"`, so that our menu can be displayed horizontally and in a dark theme on our web application.
```js
<Menu theme="dark" mode="horizontal" className='menu'>
    {new Array(6).fill(null).map((_, index) => {
        const key = index + 1;
        return <Menu.Item key={key}><Link to={`/category/${label[index].toLocaleLowerCase()}`}>{label[index]}</Link></Menu.Item>;
    })}
</Menu>
```
  
### :bulb:Jest 

#### Frontend Testing  

You can run the frontend testing by the follows command: [project root]\frontend> `yarn test`, the jest will go through 10 test suites, 12 test cases. Below introductions show the testing purpose and how.   

According to the structure of the code, we mainly test the following four points to ensure that the content of the module meets our expectations for the function of the module.
  
1. For the part of API interface,  virtual data into the interface is called and return value is detected. If the return value is the same as the set value, the content of the API interface is determined to be correct.
2. For content testing,  specific values or specific content in the module are deteced. If the content contains the expected value or string, it is judged as passing the test
3. Input the parameters into the module and render the modal. Test whether relevant parameters are filled into the module. If the relevant contents in the parameters exist in the module, it is determined to pass the test
4. For the test of jump links, integrate all links in the module and test each link. If the jump path of each link is the same as the expected value, it is determined to pass the test.

Through the test, we ensure the correctness and accuracy of each module function, so as to achieve the purpose of testing the whole project.
  
#### Backend Testing  

You can run the backend testing by the follows command: [project root]\backend> `yarn test`, the jest will go through 21 test suites, 176 test cases. Below introductions show the testing purpose and how. 

- In the unit testing of the interface module of the back-end service, there are two main types of tests. 
  - The first type of testing is for the service's startup script, server.js, which needs to be referenced for testing. This type of testing mainly verifies exception scenarios, such as non-existent URLs, illegal requests, and also verifies that the underlying routing is available.  
  - The second type of test is to verify the business logic of the service interface, which requires mocking the Koa framework and the MongoServer service. Our router is divided into two versions of the interface, V1 and V2, so these routes need to be validated independently, and the validation of the routes for each version will include both empty data cases and data presence cases. Of course, there are also a number of scenarios where the interface is requested and the request field is abnormal.
- In the testing of news data acquisition from the API, the main purpose is to actually get the news data from the API and handle the exception properly. The test cases will firstly test the falsy input to make sure the exception as expected then input some fake arguments to test default response. Furthermore, mock a valid data object for the target and check all values of the response as expected.
- In the testing of 3rd-party libraries, the main purpose is to test the algorithm running as expected and handle the exception properly. Firstly, mock input has already execute once and get the response before testing. In the testing, the test will go through falsy inputs to make sure the exception as expected. After that, the test case will focus on the response reproducibility testing to ensure the result keeps the same as expected.

### :bulb:KOA2  
The system uses the Nodejs+Koa2+mongoBD framework. The first thing to explain is why we upgraded from the Express architecture to the Koa2 architecture. Firstly, the Express framework integrates routing and static file function modules, while the Koa framework only provides web services, so Koa is more lightweight compared to Express; this is also more in line with our positioning of back-end services in the overall system. Secondly, the Koa framework can define error reporting middleware to unify the controller's error reporting interception; this is much more user friendly than dealing with Express' error reporting.

It is worth mentioning that in the project I was able to accomplish two things by intercepting requests. 1. unified API request listening. This makes it possible to listen to all requests sent to the back-end without the need for sub-module processing. 2. URL connection, determining that if a non-existent ULR is requested, an exception is returned directly.
```js
//Log filtering, where request data is fetched and logged for each request
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    log4js.info(`${ctx.method} ${ctx.url} ${JSON.stringify(ctx.request.body)} - ${ms}ms`) 
})

// Using middleware to Handling 404
app.use(async (ctx, next) => {
    await next(); // Call next to execute the next middleware
    if (ctx.status === 404) {
        const result = {code: 1, msg: 'URL is not exist!!'}
        ctx.response.type = 'json';
        ctx.response.body = result; // Removing the method of reading pages
    }
});
```
### :bulb:Log4js  
Log4js is one of the best modules for logging in Node.js in the backend services. In our backend system, I introduced this module and divided the log messages into four categories: debug, warning, error and message. The logs are printed differently depending on the category and exported to a log file, which is then managed through the config module.

```js
// utils/log4js.js
exports.debug = (content) => {                // export.warn | export.info | export.error
    let logger = log4js.getLogger('default')  
    logger.level = levels.debug               // level.warn | level.info | level.error
    logger.debug(content)                     // logger.warn(content) | logger.info(content) | logger.error(content)
}

```

### :bulb:Configuration Extraction  
During the deployment of the program, different environments (production, development) have different configuration parameters for the program, such as database information configuration. In the project I use the third-party module config to manage the operational configuration files. This way the application configuration information in different runtime environments is extracted into a separate file, and the module automatically determines the current application runtime environment (the value of -NODE_ENV in the environment variable configuration) and reads the corresponding configuration information, which greatly provides the maintenance cost of the application configuration information and avoids the need to manually go to the project code to modify the configuration information when the runtime environment is repeatedly switched several times.
```json lines
  "scripts": {
    "start": "node -r esm ./src/server.js",
    "production": "cross-env NODE_ENV=production node -r esm ./src/server.js",
    "test": "cross-env NODE_ENV=development jest --runInBand --forceExit --colors",
    "test-only-failures": "cross-env NODE_ENV=development jest --runInBand --forceExit --colors --only-failures"
  },
```

### :bulb:Third-party API: google-trends, newsAPI, upleash, keywords-extraction  
Getting news data from the internet is the first encounter issue of this project. After the study, we figured out that [google trends API](https://www.npmjs.com/package/google-trends-api) can provide the most popular news keywords and some related news. But the news was only limited to the past 1 to 2 days. Hence, we leveraged [news API](https://newsapi.org/) for more news acquisition by keywords query API. However, we figure out some news images from the google-trends API or news API with terrible image quality. Hence, we leveraged [unsplash](https://unsplash.com/documentation) image API for higher quality image acquisition. Furthermore, to enable the function of the news tag system, the [keywords-extractor](https://www.npmjs.com/package/keyword-extractor) API has been used to extract a sentance into [ngram](https://en.wikipedia.org/wiki/N-gram) keywords as news tags.  

### :bulb:Apply web crawler to catch additional information from the Web  
Although the news content from the API provides much information, but some of the news content is fragmented, and we do not have time to validate every single news in person. Using web crawler such as [Puppeteer](https://pptr.dev/) can locate the web title and news content rapidly.
### :bulb:MongoDB Snapshot 
News dataset is not build in a second. To minimized the waitinng time to evaluate the whole project, We use the MongoDB [mongoDB database expport tool](https://www.mongodb.com/docs/database-tools/mongoexport/) to snapshot a well-prepared news dataset for immediate use. The detail of the process is to write a batch script to execute the export tool command as follows:

```
mongoexport --db [dbname] --collection [collectionName] --out [outputFolder/file.json] --jsonArray
```

Once the snapshots ready, the backend server will restore the JSON based db snapshots into the MongoDB in second when server start.  
  
[:top:](#home)
## <a name="ch4">Project Management

Our team will follow the 3C project management framework to ensure the project is successful as follows:

### Communication

- Daily information exchange by WeChat and co-draft document by Notion.
- The meeting will be held every Wednesday at 9 P.M (GMT+8). Each team member will take turns to note the meeting
  minutes and post them on GitHub Wiki.

### Code Development and Management

- Parallel development: boost the development efficiency by modularising requirements into small pieces function and
  using JSON format or Key-pair data structure as the single connection object.
- Project control: define a development schedule which grouping by the necessity of the function, then review the
  progress in the weekly meeting and management by online service: Trello.
- Quality matters: each module will assign a member as the leader and form a code review group to make sure the result
  and efficiency are as expected.

### Consistency of the Development

- Development environment alignment before coding.
- Mandatory defines the comment format and naming rules to maintain the code’s maintainability.

[:top:](#home)




