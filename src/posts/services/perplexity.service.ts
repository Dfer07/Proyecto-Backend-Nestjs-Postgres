import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Perplexity from '@perplexity-ai/perplexity_ai';

@Injectable()
export class PerplexityService {
  private client: Perplexity;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('PERPLEXITY_API_KEY');
    this.client = new Perplexity({ apiKey });
  }

  /**
   * Genera un summary para un post basado en su título y contenido
   */
  async generateSummary(title: string, postContent: string): Promise<string> {
    try {
      const prompt = `Based on the following blog post, create a concise summary (max 100 characters):
      
Title: ${title}
Content: ${postContent}

Provide only the summary text, nothing else.`;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await this.client.chat.completions.create({
        model: 'sonar',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const messageContent = response.choices[0]?.message?.content;
      const summary = typeof messageContent === 'string' ? messageContent.trim() : '';
      // Limitar a 255 caracteres (límite de la base de datos)
      return summary.substring(0, 255);
    } catch (error) {
      console.error('Error generating summary:', error);
      throw new Error('Failed to generate summary with Perplexity AI');
    }
  }

  /**
   * Genera una URL de imagen relevante para un post basado en su título
   */
  async generateImageUrl(title: string, postContent: string): Promise<string> {
    try {
      const prompt = `Based on this blog post title and content, suggest a relevant, high-quality, professional stock photo search query (just keywords, max 5 words):

Title: ${title}
Content: ${postContent.substring(0, 200)}...

Provide only the search keywords, nothing else.`;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const response = await this.client.chat.completions.create({
        model: 'sonar',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
      });

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const messageContent = response.choices[0]?.message?.content;
      const keywords = typeof messageContent === 'string' ? messageContent.trim() : 'technology blog';

      // Usar Unsplash Source API para obtener una imagen aleatoria basada en las keywords
      const unsplashUrl = `https://source.unsplash.com/1200x630/?${encodeURIComponent(keywords)}`;

      return unsplashUrl;
    } catch (error) {
      console.error('Error generating image URL:', error);
      // Retornar una imagen por defecto en caso de error
      return 'https://source.unsplash.com/1200x630/?blog,article';
    }
  }
}
