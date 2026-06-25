import { AIModel } from "@prisma/client";

export class AIService {
  /**
   * Routes a query to the preferred AI model for a given group.
   * This is a mock implementation for Phase 1 MVP.
   */
  async askQuestion(query: string, preferredModel: AIModel, context: string[]): Promise<string> {
    console.log(`[AI Router] Routing query to ${preferredModel}...`);
    
    // 1. RAG Step: Search Vector DB (Supabase pgvector) using the query
    // const similarDocuments = await vectorDb.search(query, groupId);
    const mockContext = context.join("\n");

    let response = "";
    
    switch (preferredModel) {
      case AIModel.OPENAI:
        response = await this.callOpenAI(query, mockContext);
        break;
      case AIModel.ANTHROPIC:
        response = await this.callAnthropic(query, mockContext);
        break;
      case AIModel.GEMINI:
        response = await this.callGemini(query, mockContext);
        break;
      case AIModel.LOCAL:
        response = await this.callLocalModel(query, mockContext);
        break;
      default:
        response = await this.callOpenAI(query, mockContext);
    }

    return response;
  }

  private async callOpenAI(query: string, context: string): Promise<string> {
    return `[GPT-4o] Based on your context:\n${context}\n\nAnswer: To understand ${query}, think of it step-by-step...`;
  }

  private async callAnthropic(query: string, context: string): Promise<string> {
    return `[Claude 3.5] Here is a detailed breakdown of ${query} based on your PDFs and chats...`;
  }

  private async callGemini(query: string, context: string): Promise<string> {
    return `[Gemini 1.5] Analyzing the images and text for ${query}... Here is what I found.`;
  }

  private async callLocalModel(query: string, context: string): Promise<string> {
    return `[Llama 3] Processing query locally to preserve privacy: ${query}`;
  }
}

export const aiService = new AIService();
