import mongoose from 'mongoose';
import {Article} from '../event/domain/Article';
import {ArticleProperty } from '../event/domain/ArticleProperty';
import {NewsEvent} from '../event/domain/Event';
import {EventGroupProperty} from '../eventGroup/domain/EventGroupProperty';
import {EventGroup} from '../eventGroup/domain/EventGroup';
const log4js = require("../utils/log4js")



export default async function dbFeeding(dataObj)
{
    
    try{
        let resultIDList = [];
        // for each event group
        for( let eventGroup of dataObj){

            log4js.debug(`[dbFeeding] eventGroup: ${eventGroup}`);
            log4js.debug(`[dbFeeding] add eventGroup: ${eventGroup.eventTitle} related articles`)
            
            let articlesIDList = [];
            let articlesPropsIDList = [];
            let newsIDList = [];

            // step 1: add atom event (news) first
            for (let event of eventGroup.articles){
                // step 1.1 add article
                log4js.debug(`[dbFeeding] add article title: ${event.title}`);
                const addArticle = new Article(event);
                await addArticle.save();
                log4js.debug(`[dbFeeding] article id is : ${addArticle._id}`);
                log4js.info(`[dbFeeding] article id is : ${addArticle._id}`);
                log4js.info(`[dbFeeding] article url is : ${event.originalUrl}`);
                articlesIDList.push(addArticle._id)
                // step 1.2 add articleProperty
                log4js.debug(`[dbFeeding] add article property for ${addArticle._id}`);
                const addArticleProperty = new ArticleProperty(event);
                await addArticleProperty.save();
                log4js.debug(`[dbFeeding] articleProperty id is : ${addArticleProperty._id}`);
                articlesPropsIDList.push(addArticleProperty._id)

                // steo 1.3 add event
                log4js.debug(`[dbFeeding] add newsevent mapping`)
                const addNewsEvent = new NewsEvent();
                addNewsEvent.property = addArticleProperty._id;
                addNewsEvent.article = addArticle._id;
                await addNewsEvent.save();
                log4js.debug(`[dbFeeding] event id is : ${addNewsEvent._id}`);
                newsIDList.push(addNewsEvent._id);
            }

            // step 2: add eventGroups

            // step 2.1: add property of the eventgroup
            log4js.debug(`[dbFeeding] add property of the eventgroup`);
            const addEventGroupProperty = new EventGroupProperty();
            addEventGroupProperty.category = eventGroup.category;
            addEventGroupProperty.hotWords = eventGroup.hotWords;

            addEventGroupProperty.save();
            log4js.debug(`[dbFeeding] eventGroupProperty id is : ${addEventGroupProperty._id}`);

            //steo 2.2: add event group
            log4js.debug(`[dbFeeding] add event group`);
            const addEventGroup = new EventGroup(eventGroup);
            addEventGroup.articles = newsIDList;
            addEventGroup.property = [addEventGroupProperty._id];
            addEventGroup.save();

            //add IDLists for test purpose

            resultIDList.push({
                "articlesIDList": articlesIDList,
                "articlesPropsIDList": articlesPropsIDList,
                "newsIDList": newsIDList,
                "eventGroupPropertyID": addEventGroupProperty._id,
                "eventGroupID": addEventGroup._id
            });
        }
        return resultIDList;
    }
    catch (e){
        return "Parsing Data Object with Exception"
    }


}