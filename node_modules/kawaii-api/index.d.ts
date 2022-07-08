declare module "kawaii-api" {
    export class Kawaii {
        public constructor(token: string);

        public get(type: string, endpoint: string, filter: void | string): Promise<string>;
        public text(text: string): Promise<string>;
        public image(image: string): Promise<string>;
        public gif(gif: string): Promise<string>;
        public random(type: string): Promise<string>;
        public endpoints(type: string): Promise<string>;
        public stats(): Promise<object>;
    }
}