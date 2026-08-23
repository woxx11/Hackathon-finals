declare module '@google/genai' {
  export interface GenerateContentOptions {
    model?: string;
    contents?: string;
  }

  export interface GenerateContentResponse {
    text?: string;
    [key: string]: any;
  }

  export class GoogleGenAI {
    constructor(opts?: { apiKey?: string } | any);
    models: {
      generateContent(opts: GenerateContentOptions): Promise<GenerateContentResponse>;
      [key: string]: any;
    };
  }

  export { GoogleGenAI };
}
