import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const TYPEFULLY_API_BASE = "https://api.typefully.com/v1";

// Create server instance
const server = new McpServer({
  name: "typefully-mcp",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Define the schema for the create draft tool
const createDraftSchema = z.object({
  content: z
    .string()
    .describe(
      "Content of the draft. Split into multiple tweets by adding 4 consecutive newlines between tweets or use threadify option."
    ),
  threadify: z
    .boolean()
    .optional()
    .describe(
      "If true, content will be automatically split into multiple tweets."
    ),
  share: z
    .boolean()
    .optional()
    .describe("If true, returned payload will include a share_url."),
  schedule_date: z
    .union([
      z
        .string()
        .describe("ISO formatted date (e.g.: 2022-06-13T11:13:31.662Z)"),
      z.literal("next-free-slot"),
    ])
    .optional()
    .describe(
      "Schedule date for the draft. Can be an ISO formatted date or 'next-free-slot'."
    ),
  auto_retweet_enabled: z
    .boolean()
    .optional()
    .describe(
      "If true, the post will have an AutoRT enabled, according to the one set on Typefully for the account."
    ),
  auto_plug_enabled: z
    .boolean()
    .optional()
    .describe(
      "If true, the post will have an AutoPlug enabled, according to the one set on Typefully for the account."
    ),
});

// Define the schema for the recently scheduled drafts tool
const recentlyScheduledSchema = z.object({
  content_filter: z
    .enum(["threads", "tweets"])
    .optional()
    .describe("Filters the list of drafts to only include tweets or threads"),
});

// Register the create draft tool properly
server.tool(
  "typefully_create_draft",
  "Create a draft on Typefully given some plain-text content.",
  {
    content: createDraftSchema.shape.content,
    threadify: createDraftSchema.shape.threadify,
    share: createDraftSchema.shape.share,
    schedule_date: createDraftSchema.shape.schedule_date,
    auto_retweet_enabled: createDraftSchema.shape.auto_retweet_enabled,
    auto_plug_enabled: createDraftSchema.shape.auto_plug_enabled,
  },
  async (args, extra) => {
    try {
      // Get API key from environment variable
      const apiKey = process.env.TYPEFULLY_API_KEY;
      if (!apiKey) {
        throw new Error("TYPEFULLY_API_KEY environment variable is not set");
      }

      // Convert camelCase to snake_case for Typefully API
      const payload: Record<string, any> = {};
      for (const [key, value] of Object.entries(args)) {
        // Convert schedule_date to schedule-date as required by Typefully API
        if (key === "schedule_date") {
          payload["schedule-date"] = value;
        } else {
          payload[key] = value;
        }
      }

      // Make the API request to create a draft
      const response = await fetch(`${TYPEFULLY_API_BASE}/drafts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": `Bearer ${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to create draft: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("Error creating draft:", error);
      return {
        content: [
          {
            type: "text",
            text:
              error instanceof Error ? error.message : "Unknown error occurred",
          },
        ],
      };
    }
  }
);

// Register the recently scheduled drafts tool
server.tool(
  "typefully_recently_scheduled_drafts",
  "Get a list of all the most recently scheduled drafts in Typefully",
  {
    content_filter: recentlyScheduledSchema.shape.content_filter,
  },
  async (args, extra) => {
    try {
      // Get API key from environment variable
      const apiKey = process.env.TYPEFULLY_API_KEY;
      if (!apiKey) {
        throw new Error("TYPEFULLY_API_KEY environment variable is not set");
      }

      // Build URL with query params if provided
      let url = `${TYPEFULLY_API_BASE}/drafts/recently-scheduled/`;
      if (args.content_filter) {
        url += `?content_filter=${args.content_filter}`;
      }

      // Make the API request to get recently scheduled drafts
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "X-API-KEY": `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to get recently scheduled drafts: ${response.status} ${errorText}`
        );
      }

      const result = await response.json();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    } catch (error) {
      console.error("Error getting recently scheduled drafts:", error);
      return {
        content: [
          {
            type: "text",
            text:
              error instanceof Error ? error.message : "Unknown error occurred",
          },
        ],
      };
    }
  }
);

// Create the transport and start the server
const transport = new StdioServerTransport();
server.connect(transport);

console.error("Typefully MCP server is running...");
