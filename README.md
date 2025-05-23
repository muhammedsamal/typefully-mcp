# Typefully MCP Server

A sophisticated Model Context Protocol (MCP) server that seamlessly integrates Typefully's powerful tweet management platform with AI assistants like Claude Desktop. This server enables AI models to create, schedule, and manage Twitter threads and individual tweets directly through Typefully's API, bringing professional social media management capabilities to your AI workflow.

## 🚀 Features

### Core Functionality
- **Draft Creation**: Create tweet drafts from plain text with intelligent content processing
- **Thread Management**: Automatic and manual thread creation with smart content splitting
- **Scheduling**: Schedule tweets for optimal posting times or use Typefully's smart scheduling
- **Content Optimization**: Support for Typefully's AutoRT and AutoPlug features
- **Draft Management**: View and manage recently scheduled drafts with filtering options

### Advanced Capabilities
- **Intelligent Threading**: Automatic content splitting into tweet-sized chunks with context preservation
- **Flexible Scheduling**: Support for both specific timestamps and Typefully's "next-free-slot" scheduling
- **Content Filtering**: Filter drafts by type (tweets vs threads) for better organization
- **Error Handling**: Robust error handling with detailed feedback for troubleshooting
- **Environment Security**: Secure API key management through environment variables

### Integration Features
- **Claude Desktop Integration**: Seamless integration with Claude Desktop and other MCP-compatible AI tools
- **Cross-Platform**: Works with any MCP-compatible client or AI assistant
- **Real-time Processing**: Instant draft creation and scheduling without delays
- **API Compliance**: Full compliance with Typefully's API specifications and best practices

## 🏗️ Architecture

### System Overview

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   AI Assistant  │    │   MCP Server     │    │   Typefully     │
│   (Claude, etc) │───▶│   (TypeScript)   │───▶│   API Platform  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
                              │
                              ▼
                       ┌──────────────────┐
                       │   Tool Registry  │
                       │   - Create Draft │
                       │   - List Drafts  │
                       └──────────────────┘
```

### Technical Stack

- **Runtime**: Bun.js for high-performance TypeScript execution
- **Protocol**: Model Context Protocol (MCP) for AI assistant integration
- **Validation**: Zod for robust input validation and type safety
- **API Integration**: RESTful API communication with Typefully
- **Transport**: STDIO-based communication for reliable data exchange

## 📋 Prerequisites

### Required Software
- **Bun**: Latest version of Bun runtime (`curl -fsSL https://bun.sh/install | bash`)
- **Node.js**: For MCP compatibility (optional, Bun handles most operations)

### Required Accounts & Access
- **Typefully Account**: Active account with API access enabled
- **Typefully API Key**: Available from Settings > Integrations in your Typefully dashboard
- **AI Assistant**: Claude Desktop, Cline, or other MCP-compatible AI tool

## 🔧 Installation

### 1. Repository Setup
```bash
# Clone the repository
git clone https://github.com/muhammedsamal/typefully-mcp.git
cd typefully-mcp

# Install dependencies
bun install
```

### 2. Environment Configuration
```bash
# Set your Typefully API key
export TYPEFULLY_API_KEY="your_api_key_here"

# Or create a .env file
echo "TYPEFULLY_API_KEY=your_api_key_here" > .env
```

### 3. API Key Setup
1. Log in to your Typefully account
2. Navigate to **Settings** > **Integrations**
3. Click **Create API Key**
4. Copy the generated key and save it securely
5. Use the key in your environment configuration

## 🚀 Usage

### Development Mode
```bash
# Start the MCP server in development mode
bun run dev

# Alternative: Run directly
bun run index.ts
```

### Production Build
```bash
# Build for production
bun run build

# Run production build
bun run start
```

## 🔌 AI Assistant Integration

### Claude Desktop Setup

1. **Open Claude Desktop**
2. **Navigate to Settings**:
   - Go to **Settings** > **Integrations** > **CLI Tools**
3. **Add MCP Server**:
   - Click **"Add Tool"**
   - Enter command: `bun run /path/to/typefully-mcp/index.ts`
   - Name: "Typefully"
   - Description: "Twitter thread and tweet management via Typefully"
4. **Save Configuration**
5. **Test Integration**: Start a new conversation and try the example prompts below

### Cline/Other MCP Clients

For other MCP-compatible clients, configure the server connection using:
- **Command**: `bun run index.ts`
- **Working Directory**: Path to the typefully-mcp directory
- **Environment Variables**: Ensure `TYPEFULLY_API_KEY` is accessible

## 🤖 Available Tools

### `typefully_create_draft`
Creates a new tweet draft with comprehensive customization options.

**Parameters**:
- `content` (string, required): The tweet content or thread text
- `threadify` (boolean, optional): Auto-split content into multiple tweets
- `share` (boolean, optional): Generate a shareable URL for the draft
- `schedule_date` (string|"next-free-slot", optional): When to publish the tweet
- `auto_retweet_enabled` (boolean, optional): Enable Typefully's AutoRT feature
- `auto_plug_enabled` (boolean, optional): Enable Typefully's AutoPlug feature

**Example Usage**:
```javascript
{
  "content": "Just launched my new AI project! Here's what makes it special:\n\n1. Advanced ML algorithms\n2. Real-time processing\n3. Easy API integration",
  "threadify": true,
  "schedule_date": "2024-12-25T10:00:00Z",
  "auto_retweet_enabled": true
}
```

### `typefully_recently_scheduled_drafts`
Retrieves your most recently scheduled drafts with optional filtering.

**Parameters**:
- `content_filter` (enum, optional): Filter by "threads" or "tweets"

**Example Usage**:
```javascript
{
  "content_filter": "threads"
}
```

## 💬 Example Prompts for AI Assistants

### Basic Tweet Creation
```
"Create a tweet that says 'Just launched my new project!'"
```

### Thread Creation
```
"Create a Twitter thread about the benefits of TypeScript with 5 key points"
```

### Scheduled Content
```
"Schedule a tweet for tomorrow at 9 AM about the latest AI advancements"
```

### Smart Scheduling
```
"Create a thread about productivity tips and schedule it for the next optimal posting time"
```

### Draft Management
```
"Show me my recently scheduled tweet threads"
```

### Advanced Features
```
"Create a tweet about my new blog post, enable auto-retweet, and schedule it for prime time"
```

## 📊 API Reference

### Typefully API Integration

The server integrates with Typefully's REST API v1:

**Base URL**: `https://api.typefully.com/v1`

**Endpoints Used**:
- `POST /drafts/` - Create new drafts
- `GET /drafts/recently-scheduled/` - Get recent drafts

**Authentication**: Bearer token via `X-API-KEY` header

### Response Formats

**Successful Draft Creation**:
```json
{
  "id": "draft_123456",
  "content": "Your tweet content",
  "status": "scheduled",
  "scheduled_date": "2024-12-25T10:00:00Z",
  "share_url": "https://typefully.com/share/abc123"
}
```

**Recently Scheduled Drafts**:
```json
{
  "drafts": [
    {
      "id": "draft_123",
      "content": "Tweet content",
      "type": "thread",
      "scheduled_date": "2024-12-25T10:00:00Z"
    }
  ]
}
```

## 🔧 Configuration

### Environment Variables

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| `TYPEFULLY_API_KEY` | Yes | Your Typefully API key | `tyf_abc123...` |

### Thread Creation Options

**Manual Threading**:
- Separate tweets with 4 consecutive newlines (`\n\n\n\n`)
- Each section becomes a separate tweet in the thread

**Automatic Threading**:
- Set `threadify: true` in the request
- Typefully intelligently splits content based on character limits

### Scheduling Options

**Specific Time**:
```json
{
  "schedule_date": "2024-12-25T10:00:00Z"
}
```

**Smart Scheduling**:
```json
{
  "schedule_date": "next-free-slot"
}
```

## 🛠️ Development

### Project Structure
```
typefully-mcp/
├── index.ts              # Main MCP server implementation
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── bun.lockb             # Dependency lock file
├── .gitignore            # Git ignore rules
└── README.md             # This documentation
```

### Key Dependencies
- `@modelcontextprotocol/sdk`: MCP protocol implementation
- `zod`: Runtime type validation and schema definition
- `typescript`: Type safety and modern JavaScript features

### Local Development
```bash
# Install dependencies
bun install

# Run in development mode with auto-reload
bun run dev

# Type checking
bun run build

# Test the server
bun run start
```

## 🧪 Testing

### Manual Testing with Claude Desktop

1. **Setup**: Ensure the MCP server is configured in Claude Desktop
2. **Basic Test**: "Create a simple tweet saying hello world"
3. **Thread Test**: "Create a thread with 3 tweets about TypeScript benefits"
4. **Scheduling Test**: "Schedule a tweet for tomorrow morning"
5. **Listing Test**: "Show me my recent drafts"

### API Testing

```bash
# Test with curl (replace YOUR_API_KEY)
curl -X POST https://api.typefully.com/v1/drafts/ \
  -H "X-API-KEY: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test tweet from API"}'
```

## 🔒 Security & Best Practices

### API Key Security
- **Never commit API keys** to version control
- **Use environment variables** for configuration
- **Rotate keys regularly** for enhanced security
- **Monitor API usage** in Typefully dashboard

### Error Handling
- **Graceful degradation** when API is unavailable
- **Detailed error messages** for troubleshooting
- **Rate limiting awareness** to respect API limits
- **Input validation** to prevent malformed requests

### Privacy Considerations
- **Content privacy**: Drafts are stored in your Typefully account
- **API logging**: Be aware of what gets logged in server output
- **Sharing controls**: Use share URLs judiciously

## 🚀 Deployment

### Local Production
```bash
# Build for production
bun run build

# Run production server
bun run start
```

### Server Deployment
For persistent deployment, consider:
- **PM2**: Process management for Node.js applications
- **Docker**: Containerized deployment
- **systemd**: System service integration
- **Cloud platforms**: Railway, Heroku, or similar

### Example PM2 Configuration
```bash
# Install PM2
npm install -g pm2

# Start server
pm2 start dist/index.js --name typefully-mcp

# Monitor
pm2 logs typefully-mcp
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper TypeScript types
4. Test thoroughly with your API key
5. Commit changes (`git commit -m 'Add amazing feature'`)
6. Push to branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Contribution Guidelines
- **Type Safety**: Maintain strict TypeScript typing
- **Error Handling**: Add comprehensive error handling
- **Documentation**: Update README for new features
- **Testing**: Test with real Typefully API integration
- **Code Style**: Follow existing patterns and conventions

## 📝 License

This project is licensed under the MIT License. See the LICENSE file for details.

## 📚 Resources & Links

### Official Documentation
- [Typefully API Documentation](https://support.typefully.com/en/articles/8718287-typefully-api)
- [Model Context Protocol](https://modelcontextprotocol.io)
- [Claude Desktop Integration Guide](https://claude.ai/desktop)

### Related Tools
- [Bun Runtime](https://bun.sh/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Zod Validation Library](https://zod.dev/)

### Community
- [MCP GitHub Organization](https://github.com/modelcontextprotocol)
- [Typefully Support](https://support.typefully.com/)
- [Claude Community](https://claude.ai/community)

## 🆘 Support & Troubleshooting

### Common Issues

**API Key Not Working**:
- Verify key is correctly set in environment
- Check key permissions in Typefully dashboard
- Ensure key hasn't expired or been revoked

**MCP Connection Issues**:
- Restart Claude Desktop after configuration changes
- Check file paths in MCP configuration
- Verify Bun is installed and accessible

**Draft Creation Failures**:
- Check content length (Twitter limits apply)
- Verify API rate limits haven't been exceeded
- Test API key with direct curl requests

### Getting Help
1. **Check logs**: Review server output for error messages
2. **Test API directly**: Use curl to test Typefully API
3. **MCP debugging**: Enable verbose logging in your AI assistant
4. **Create issues**: Report bugs in the GitHub repository
5. **Contact support**: Reach out to Typefully support for API issues

---

**Built with ❤️ using Bun, TypeScript, and the Model Context Protocol**