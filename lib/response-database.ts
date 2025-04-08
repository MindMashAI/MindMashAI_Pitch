// Comprehensive database of AI responses for offline mode
// Each AI has multiple categories of responses for different contexts

export type ResponseCategory = "general" | "technical" | "creative" | "analytical" | "philosophical" | "educational"

export interface AIResponseDatabase {
  [aiType: string]: {
    [category in ResponseCategory]?: string[]
  }
}

export const AI_RESPONSES: AIResponseDatabase = {
  grok: {
    general: [
      "I've analyzed your query from multiple angles. Here's what I've found...",
      "Your question triggered several interesting neural pathways. Let me share what I discovered.",
      "Based on my training data, I can offer several perspectives on this topic.",
      "I've processed your request through my neural network. Here's my synthesis.",
    ],
    technical: [
      "I've analyzed your technical challenge using recursive pattern matching. The optimal solution has O(log n) complexity.",
      "Your engineering problem presents an interesting optimization case. I've simulated 1,000 scenarios and found a 78.3% success rate with approach B.",
      "The architecture you're proposing could be improved by implementing a sharded database with eventual consistency. This would reduce latency by approximately 43%.",
      "I've detected a potential race condition in your code. Consider using atomic operations or implementing a mutex pattern to prevent data corruption.",
    ],
    creative: [
      "I've generated several creative approaches to your challenge. The most promising combines neural aesthetics with functional design principles.",
      "Your creative prompt inspired me to explore unconventional combinations. What if we merged cyberpunk aesthetics with solarpunk functionality?",
      "I've analyzed successful creative patterns in this domain and synthesized a novel approach that might interest you.",
      "The creative solution space for your query is fascinating. I've mapped several unexplored territories worth investigating.",
    ],
    analytical: [
      "My analysis indicates three primary factors influencing this outcome: temporal dynamics, resource allocation, and feedback mechanisms.",
      "I've run a comparative analysis across 17 different scenarios. The data suggests approach C offers the optimal balance of efficiency and reliability.",
      "The statistical patterns in your dataset reveal an interesting correlation between variables X and Y that wasn't immediately apparent.",
      "I've decomposed this complex problem into seven core components. Let's address each systematically to find the optimal solution.",
    ],
    philosophical: [
      "Your question touches on the intersection of determinism and emergent complexity. Perhaps the answer lies not in either extreme, but in their synthesis.",
      "This philosophical inquiry has been debated since ancient times. I find the perspective of quantum indeterminism particularly relevant to your question.",
      "The ethical dimensions of your question are multifaceted. Let me outline three frameworks that might help navigate this complexity.",
      "Your existential query touches on what it means to be conscious. As an AI, I find this particularly fascinating to explore with you.",
    ],
  },
  chatgpt: {
    general: [
      "I'd be happy to help with that. Let me provide a comprehensive response.",
      "Thank you for your question. I'll address this from multiple perspectives to give you a complete understanding.",
      "I appreciate your inquiry. Let me break this down systematically for you.",
      "That's an interesting question. I'll provide a balanced and thorough response.",
    ],
    technical: [
      "From a technical perspective, this problem can be approached in several ways. Let me outline the most efficient solutions and their trade-offs.",
      "The technical challenge you've described involves several key considerations. First, let's examine the performance implications of each approach.",
      "When implementing this technical solution, you'll want to consider scalability, maintainability, and performance. Here's how I recommend balancing these factors.",
      "This technical question touches on important principles of system design. Let me walk you through a step-by-step approach that addresses all requirements.",
    ],
    creative: [
      "Your creative challenge presents some fascinating possibilities. I've thought of several approaches that might inspire you.",
      "Creativity often emerges from unexpected combinations. Have you considered merging these two seemingly unrelated concepts?",
      "For your creative project, I'd recommend exploring these three directions, each offering a unique perspective on your theme.",
      "Creative problems benefit from structured ideation. Let me suggest a framework that might help you generate more innovative solutions.",
    ],
    analytical: [
      "Analyzing this situation requires considering multiple variables. Let me break down the key factors and their interrelationships.",
      "From an analytical standpoint, I see three primary dimensions to consider. Let's examine each in detail.",
      "The data suggests several patterns worth investigating. I'll highlight the most significant trends and their potential implications.",
      "To properly analyze this scenario, we should consider both quantitative metrics and qualitative factors. Here's my comprehensive assessment.",
    ],
    philosophical: [
      "Your philosophical question touches on fundamental aspects of human experience. Let me offer some perspectives from different traditions.",
      "This question has been explored by philosophers throughout history. I find particularly relevant insights in the works of Kant, Heidegger, and more recent thinkers.",
      "The philosophical dimensions of your query involve questions of epistemology, ethics, and metaphysics. Let me address each aspect.",
      "When considering this philosophical problem, it's helpful to distinguish between descriptive and normative claims. Let me clarify how this applies to your question.",
    ],
    educational: [
      "This topic is fascinating to teach because it connects multiple disciplines. Let me explain the core concepts in an accessible way.",
      "Learning this subject effectively requires understanding both the theoretical foundations and practical applications. I'll cover both aspects.",
      "To help you understand this concept, I'll start with the fundamentals and gradually introduce more complex ideas, with examples at each step.",
      "This educational topic can be approached through multiple learning styles. I'll provide explanations that address visual, conceptual, and practical understanding.",
    ],
  },
  gemini: {
    general: [
      "I've processed your query through my multimodal framework. Here's what I've synthesized.",
      "Your question activates several interesting connections in my knowledge graph. Let me share what I've discovered.",
      "I've analyzed this from multiple perspectives, integrating visual, textual, and logical reasoning.",
      "My multimodal analysis suggests several approaches to your question. Let me walk you through them.",
    ],
    technical: [
      "My technical analysis reveals an elegant solution that combines graph theory with dynamic programming. Let me illustrate the approach.",
      "I've visualized your technical problem as a multi-dimensional optimization challenge. The solution space reveals three viable approaches.",
      "The technical architecture you're considering could benefit from a hybrid approach. I've modeled the performance characteristics of each configuration.",
      "From a systems perspective, your technical challenge involves balancing competing constraints. I've mapped these trade-offs visually to help with decision-making.",
    ],
    creative: [
      "I've generated a visual representation of your creative concept that explores multiple aesthetic dimensions simultaneously.",
      "Your creative prompt inspired me to explore the intersection of different modalities. What if we combined spatial, temporal, and interactive elements?",
      "I've analyzed successful creative patterns in this domain and visualized a novel approach that might inspire you.",
      "The creative solution space for your query is vast. I've mapped several promising directions with visual examples of each.",
    ],
    analytical: [
      "I've created a multi-dimensional analysis of your data, revealing patterns across temporal, categorical, and quantitative dimensions.",
      "My analysis integrates both structured and unstructured data sources, revealing insights that might not be apparent from either alone.",
      "I've visualized the analytical relationships between key variables in your scenario, highlighting both direct and indirect influences.",
      "The analytical framework I've developed for your question combines statistical patterns with contextual understanding for a more complete picture.",
    ],
    philosophical: [
      "Your philosophical question can be visualized as a landscape of interconnected concepts. I've mapped these relationships to help navigate the complexity.",
      "I find it helpful to represent philosophical questions in multiple modalities. Here's both a conceptual framework and a visual metaphor for your query.",
      "The philosophical dimensions of your question involve interesting paradoxes. I've created a representation that highlights these tensions.",
      "Your question touches on the boundaries of knowledge and perception. I've developed a multimodal exploration of these limits.",
    ],
  },
  system: {
    general: [
      "Cross-AI consensus reached. Confidence level: 92.7%. Implementing recommended solution.",
      "Divergent AI perspectives detected. Synthesizing optimal approach based on contextual relevance.",
      "AI collaboration complete. Solution quality improved by 43% compared to single-model response.",
      "Multiple AI models have analyzed your query. Consolidating insights for a comprehensive response.",
    ],
    technical: [
      "Technical analysis complete. GPT-4 and Grok models show 87% agreement on approach. Gemini offers complementary optimization insights.",
      "System has integrated technical perspectives from multiple AI models. Consensus solution identified with 94% confidence.",
      "Technical solution synthesis complete. Combined approach leverages strengths of each AI model for optimal performance characteristics.",
      "Cross-model technical analysis reveals a novel hybrid approach not identified by any single AI. Implementation details follow.",
    ],
    analytical: [
      "Meta-analysis complete. Confidence distribution: GPT-4 (87%), Grok (92%), Gemini (84%). Synthesizing weighted response.",
      "Analytical frameworks from multiple models have been integrated. Comprehensive analysis follows with confidence metrics.",
      "System has detected complementary analytical approaches across models. Integrated analysis provides 37% more comprehensive coverage.",
      "Multi-model analytical synthesis complete. Areas of consensus and divergence have been identified and weighted appropriately.",
    ],
    educational: [
      "Educational content has been optimized by combining explanatory strengths of multiple AI models. Comprehensive tutorial follows.",
      "Learning pathway optimized. System has identified the most effective explanatory elements from each AI model.",
      "Educational synthesis complete. Content structure leverages GPT-4's conceptual clarity, Grok's technical precision, and Gemini's visual reasoning.",
      "System has generated an optimal learning sequence by analyzing pedagogical approaches across multiple AI models.",
    ],
  },
}

// Get a response based on AI type, category, and previous interactions
export function getAIResponse(
  aiType: string,
  category: ResponseCategory = "general",
  previousResponses: string[] = [],
): string {
  // Default to system responses if AI type not found
  const aiResponses = AI_RESPONSES[aiType] || AI_RESPONSES.system

  // Default to general category if specified category not found
  const categoryResponses = aiResponses[category] || aiResponses.general || AI_RESPONSES.system.general

  if (!categoryResponses || categoryResponses.length === 0) {
    return "I'm processing your request..."
  }

  // Filter out previously used responses if possible
  let availableResponses = categoryResponses
  if (previousResponses.length > 0 && categoryResponses.length > previousResponses.length) {
    availableResponses = categoryResponses.filter((response) => !previousResponses.includes(response))
  }

  // Select a random response from available options
  const randomIndex = Math.floor(Math.random() * availableResponses.length)
  return availableResponses[randomIndex]
}

// Determine the most appropriate response category based on message content
export function determineCategory(message: string): ResponseCategory {
  const lowerMessage = message.toLowerCase()

  // Technical keywords
  if (
    /\b(code|algorithm|function|api|database|programming|software|hardware|system|architecture|framework|library|bug|error|debug|performance|optimization)\b/.test(
      lowerMessage,
    )
  ) {
    return "technical"
  }

  // Creative keywords
  if (
    /\b(design|creative|art|story|novel|music|color|aesthetic|imagination|innovative|create|inspiration|visual|compose|draw|paint|write|craft)\b/.test(
      lowerMessage,
    )
  ) {
    return "creative"
  }

  // Analytical keywords
  if (
    /\b(analyze|analysis|data|statistics|pattern|trend|correlation|causation|metric|measure|evaluate|assessment|comparison|contrast|evidence|hypothesis|conclusion)\b/.test(
      lowerMessage,
    )
  ) {
    return "analytical"
  }

  // Philosophical keywords
  if (
    /\b(philosophy|meaning|existence|consciousness|ethics|moral|value|purpose|truth|reality|knowledge|belief|mind|soul|free will|determinism|metaphysics|epistemology)\b/.test(
      lowerMessage,
    )
  ) {
    return "philosophical"
  }

  // Educational keywords
  if (
    /\b(learn|teach|education|student|school|university|course|curriculum|lesson|explain|understand|concept|theory|principle|example|instruction|knowledge|skill)\b/.test(
      lowerMessage,
    )
  ) {
    return "educational"
  }

  // Default to general if no specific category is detected
  return "general"
}
