# Typefully MCP Server

Connect Typefully to Claude Desktop (or any MCP-compatible AI assistant) to create and manage Twitter/X content directly from your AI conversations.

## What is this?

An MCP (Model Context Protocol) server that lets AI assistants interact with Typefully's API. Create tweets, threads, and manage your content without leaving your AI chat.

## Features

- Create tweet drafts and threads
- Schedule posts for specific times or use Typefully's smart scheduling
- View recently scheduled drafts
- View recently published posts (new!)
- Filter content by type (tweets vs threads)

## Setup

### 1. Get your Typefully API key
1. Log in to Typefully
2. Go to Settings → Integrations
3. Create API Key
4. Copy and save it

### 2. Install
```bash
git clone https://github.com/muhammedsamal/typefully-mcp.git
cd typefully-mcp
bun install
```

### 3. Set API key
```bash
export TYPEFULLY_API_KEY="your_api_key_here"
# Or create .env file
echo "TYPEFULLY_API_KEY=your_api_key_here" > .env
```

### 4. Add to Claude Desktop
1. Open Claude Desktop settings
2. Go to Developer → Edit Config
3. Add:
```json
{
  "mcpServers": {
    "typefully": {
      "command": "bun",
      "args": ["run", "/path/to/typefully-mcp/index.ts"],
      "env": {
        "TYPEFULLY_API_KEY": "your_api_key_here"
      }
    }
  }
}
```
4. Restart Claude Desktop

## Available Tools

### `typefully_create_draft`
Create a new tweet or thread.

**Parameters:**
- `content` (required): Your tweet text
- `threadify`: Auto-split into thread
- `schedule_date`: ISO date or "next-free-slot"
- `auto_retweet_enabled`: Enable auto-retweet
- `auto_plug_enabled`: Enable auto-plug
- `share`: Get shareable URL

**Example:**
```javascript
{
  "content": "Just shipped something cool!",
  "schedule_date": "next-free-slot"
}
```

### `typefully_recently_scheduled_drafts`
Get your scheduled drafts that haven't been published yet.

**Parameters:**
- `content_filter`: Filter by "tweets" or "threads"

### `typefully_recently_published_drafts` (NEW!)
Get your recently published posts.

**Parameters:**
- `content_filter`: Filter by "tweets" or "threads"

## Example Prompts

- "Create a tweet about my new project"
- "Schedule a thread about TypeScript benefits for tomorrow at 9 AM"
- "Show me my scheduled tweets"
- "What did I publish recently?"
- "Show me my recent threads that were published"

## Troubleshooting

**API key not working?**
- Check it's correctly set in environment
- Verify in Typefully dashboard
- Make sure it hasn't expired

**Can't connect to Claude?**
- Restart Claude Desktop after config changes
- Check file paths are correct
- Ensure Bun is installed (`curl -fsSL https://bun.sh/install | bash`)

## Development

```bash
# Run in dev mode
bun run dev

# Build
bun run build

# Start production
bun run start
```

## Tech Stack
- Bun.js
- TypeScript
- MCP SDK
- Typefully API v1

## License

MIT

---

Built with ❤️ using MCP and Typefully API