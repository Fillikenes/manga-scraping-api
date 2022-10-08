import { Injectable } from '@nestjs/common';
import { JSDOM } from 'jsdom';

@Injectable()
export class HtmlParserService {
    public async parseHtml(content: string): Promise<Document>{
        const dom = new JSDOM(content);
        return dom.window.document;
    }
}
