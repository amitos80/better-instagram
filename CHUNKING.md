# CHUNKING.md: Rules for Selecting an AI Chunking Strategy

Effective chunking is essential for Retrieval-Augmented Generation (RAG) and other Large Language Model (LLM) applications. The goal is to create chunks that are small enough for efficient retrieval but large enough to maintain a single, coherent context.

## Decision Rules for Chunking Strategy

| User Case / Data Type | Optimal Strategy | Key Rule |
| :--- | :--- | :--- |
| **Simple Text / Logs** | **Fixed-Size Chunking** (e.g., 512 tokens with 10% overlap) | When structure is irrelevant, prioritize speed and uniform chunk size. |
| **General Documentation / Articles** | **Recursive Chunking** | Use hierarchical separators (e.g., `\n\n`, `.`, `,`) to respect natural breaks (paragraphs, sentences) first. |
| **Source Code (Code Chunking)** | **Document-Aware Chunking** | Split based on logical code structures: **classes, functions, or methods** to maintain functional context. |
| **Conversational Transcripts / QA** | **Semantic Chunking** | Identify topic shifts using embedding similarity to ensure each chunk is about one continuous idea. |
| **Complex Technical Manuals** | **Parent-Child Chunking** | Use small, precise chunks for retrieval, but retrieve an associated larger "parent" chunk to provide context to the LLM. |

## General Guidelines

1.  **Start with Overlap:** Always use an overlap (e.g., 10-20% of the chunk size) between adjacent chunks to prevent context loss at the boundaries.
2.  **Chunk Size vs. Query Type:**
    * **Small Chunks (256-512 tokens):** Better for **factoid** or highly specific questions (high precision).
    * **Large Chunks (1024+ tokens):** Better for **analytical** or summarization tasks (high context).
3.  **Iterate and Test:** The optimal strategy and size must be determined empirically (through experimentation) for your specific data and LLM.
