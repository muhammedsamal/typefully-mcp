# Typefully MCP Server

This is an MCP (Model Context Protocol) server for Typefully's API that allows Claude and other LLMs to create tweet drafts via Typefully.

## Features

- Create tweet drafts from plain text content
- Support for creating threads (manually or automatically)
- Schedule tweets for later posting
- Support for Typefully's AutoRT and AutoPlug features
- View recently scheduled drafts

## Prerequisites

- [Bun](https://bun.sh/) installed
- A Typefully account with API access
- Typefully API key (from Settings > Integrations)

## Setup

1. Clone this repository:

```bash
git clone https://github.com/yourusername/typefully-mcp.git
cd typefully-mcp
```

2. Install dependencies:

```bash
bun install
```

3. Set your Typefully API key as an environment variable:

```bash
export TYPEFULLY_API_KEY="your_api_key_here"
```

## Usage

Start the MCP server:

```bash
bun run index.ts
```

### With Claude Desktop

1. Open Claude Desktop
2. Go to Settings > Integrations > CLI Tools
3. Click "Add Tool" and enter the command to run your MCP server: `bun run /path/to/typefully-mcp/index.ts`
4. Name your tool (e.g., "Typefully")
5. Save and use it in your conversations

### Example Prompts for Claude

Once the MCP server is connected to Claude, you can use prompts like:

- "Create a tweet that says 'Just launched my new project!'"
- "Create a thread about the benefits of TypeScript"
- "Schedule a tweet for tomorrow about the latest AI advancements"
- "Show me my recently scheduled tweets"

## API Reference

The server exposes the following tools:

### typefully_create_draft

Creates a draft on Typefully given plain-text content.

Parameters:

- `content` (string, required): Content of the draft. Split into multiple tweets by adding 4 consecutive newlines between tweets or use threadify option.
- `threadify` (boolean, optional): If true, content will be automatically split into multiple tweets.
- `share` (boolean, optional): If true, returned payload will include a share_url.
- `schedule_date` (string or "next-free-slot", optional): Schedule date for the draft. Can be an ISO formatted date (e.g.: 2022-06-13T11:13:31.662Z) or 'next-free-slot'.
- `auto_retweet_enabled` (boolean, optional): If true, the post will have an AutoRT enabled, according to the one set on Typefully for the account.
- `auto_plug_enabled` (boolean, optional): If true, the post will have an AutoPlug enabled, according to the one set on Typefully for the account.

### typefully_recently_scheduled_drafts

Gets a list of all the most recently scheduled drafts in Typefully.

Parameters:

- `content_filter` (string, optional): Filters the list of drafts to only include tweets or threads. Possible values: "threads", "tweets".

## License

MIT

## Resources

- [Typefully API Documentation](https://support.typefully.com/en/articles/8718287-typefully-api)
- [Model Context Protocol](https://modelcontextprotocol.io)
