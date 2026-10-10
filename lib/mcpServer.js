import {
  SITE_URL,
  STUDIO_INFO,
  PROJECTS_CATALOG,
  STUDIO_SERVICES,
  WORKFLOW_STEPS,
  getLlmsTxt,
  getHomeMarkdown
} from './agentContent.js';

export const MCP_SERVER_INFO = {
  name: 'gradient-studio-mcp',
  title: 'GradiEnt Studio Architecture & Spatial Design MCP Server',
  version: '1.2.0',
  description:
    'Official Model Context Protocol (MCP) server for GradiEnt Studio (https://gradientarch.tech) — Architectural case studies, DED engineering specs, tropical daylighting analysis, and project consultation inquiries.'
};

export const MCP_TOOLS = [
  {
    name: 'list_architectural_projects',
    description:
      'List GradiEnt Studio architectural case studies, spatial design explorations, and Detailed Engineering Design (DED) projects (e.g., Lemukutan Coastal Sports Pavilion, Courtyard Pavilion, Space Organization, Tropical Daylighting).',
    inputSchema: {
      type: 'object',
      properties: {
        category: {
          type: 'string',
          enum: ['all', 'architecture', 'research'],
          description: 'Optional category filter: all, architecture, or research.'
        }
      },
      additionalProperties: false
    }
  },
  {
    name: 'get_project_details',
    description:
      'Retrieve comprehensive architectural, structural (H-Beam 305x305, stepped footplat), and tropical daylighting specifications for a specific GradiEnt Studio project by ID.',
    inputSchema: {
      type: 'object',
      properties: {
        projectId: {
          type: 'string',
          enum: ['lemukutan', 'courtyard', 'space', 'light'],
          description: 'Project identifier: "lemukutan", "courtyard", "space", or "light".'
        }
      },
      required: ['projectId'],
      additionalProperties: false
    }
  },
  {
    name: 'list_studio_services',
    description:
      'Get GradiEnt Studio architectural design services, tropical daylighting & site analysis capabilities, 3D modeling deliverables, and 4-stage collaboration workflow.',
    inputSchema: {
      type: 'object',
      properties: {},
      additionalProperties: false
    }
  },
  {
    name: 'submit_project_inquiry',
    description:
      'Format and submit a client architectural project consultation inquiry to GradiEnt Studio (returns structured consultation brief and direct WhatsApp/Email dispatch link).',
    inputSchema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'Client full name'
        },
        location: {
          type: 'string',
          description: 'Project city, island, or province (e.g., Makassar, Bali, Kalimantan Barat)'
        },
        service: {
          type: 'string',
          enum: [
            'Arsitektur & tata ruang',
            'Tapak & pencahayaan',
            'Pemodelan & visualisasi 3D',
            'Belum tahu, ingin berdiskusi'
          ],
          description: 'Requested architectural service category'
        },
        brief: {
          type: 'string',
          description: 'Project requirements, site dimensions, building typology, and questions'
        }
      },
      required: ['name', 'location', 'brief'],
      additionalProperties: false
    }
  }
];

export const MCP_RESOURCES = [
  {
    uri: 'gradient://studio/profile',
    name: 'GradiEnt Studio Profile & Contact Information',
    description: 'Official identity, founder credentials, Makassar headquarters address, and verified contact channels.',
    mimeType: 'application/json'
  },
  {
    uri: 'gradient://studio/llms.txt',
    name: 'GradiEnt Studio LLMs Manifest & When-to-Use Guide',
    description: 'Machine-readable overview and agent invocation instructions for GradiEnt Studio.',
    mimeType: 'text/markdown'
  },
  {
    uri: 'gradient://projects/catalog',
    name: 'Architectural Case Studies & DED Catalog',
    description: 'Complete structured dataset of GradiEnt Studio architectural and spatial research projects.',
    mimeType: 'application/json'
  }
];

export const MCP_PROMPTS = [
  {
    name: 'architectural_brief_generator',
    description: 'Generate a structured tropical architectural & spatial design brief for GradiEnt Studio.',
    arguments: [
      {
        name: 'buildingType',
        description: 'Building typology (e.g., Coastal Pavilion, Tropical House, Community Hub)',
        required: true
      },
      {
        name: 'siteLocation',
        description: 'City or region in Indonesia (e.g., Makassar, Pulau Lemukutan)',
        required: true
      }
    ]
  }
];

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Accept, Authorization, Mcp-Session-Id, Last-Event-ID, X-Requested-With, X-API-Version',
  'Access-Control-Expose-Headers': 'Mcp-Session-Id, Content-Type, RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, RateLimit-Policy, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-API-Version, API-Version',
  'X-API-Version': '2026-10-01',
  'API-Version': 'v1',
  'RateLimit-Limit': '120',
  'RateLimit-Remaining': '119',
  'RateLimit-Reset': '60',
  'RateLimit-Policy': '120;w=60',
  'X-RateLimit-Limit': '120',
  'X-RateLimit-Remaining': '119',
  'X-RateLimit-Reset': '60'
};

export function getMcpDiscoveryManifest() {
  return {
    schemaVersion: '2025-03-26',
    protocolVersion: '2025-03-26',
    mcpVersion: '1.0',
    name: MCP_SERVER_INFO.name,
    title: MCP_SERVER_INFO.title,
    version: MCP_SERVER_INFO.version,
    description: MCP_SERVER_INFO.description,
    homepage: SITE_URL,
    documentationUrl: `${SITE_URL}/docs`,
    openApiUrl: `${SITE_URL}/openapi.json`,
    llmsTxtUrl: `${SITE_URL}/llms.txt`,
    agentInstructionsUrl: `${SITE_URL}/agent-instructions.md`,
    serverInfo: MCP_SERVER_INFO,
    transport: {
      type: 'streamable-http',
      url: `${SITE_URL}/.well-known/mcp`,
      endpoint: `${SITE_URL}/.well-known/mcp`,
      alternateEndpoint: `${SITE_URL}/api/mcp`,
      methods: ['POST', 'GET', 'DELETE', 'OPTIONS']
    },
    endpoints: {
      streamableHttp: `${SITE_URL}/.well-known/mcp`,
      http: `${SITE_URL}/api/mcp`,
      openapi: `${SITE_URL}/openapi.json`
    },
    capabilities: {
      tools: { listChanged: false },
      resources: { subscribe: false, listChanged: false },
      prompts: { listChanged: false }
    },
    tools: MCP_TOOLS,
    resources: MCP_RESOURCES,
    prompts: MCP_PROMPTS,
    contact: {
      organization: STUDIO_INFO.name,
      founder: STUDIO_INFO.founder.name,
      email: STUDIO_INFO.contact.email,
      phone: STUDIO_INFO.contact.phone,
      url: `${SITE_URL}/contact`
    }
  };
}

function executeToolCall(name, args = {}) {
  switch (name) {
    case 'list_architectural_projects': {
      const category = args?.category || 'all';
      const filtered =
        category === 'all'
          ? PROJECTS_CATALOG
          : PROJECTS_CATALOG.filter((p) => p.category === category);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                studio: STUDIO_INFO.name,
                count: filtered.length,
                projects: filtered
              },
              null,
              2
            )
          }
        ],
        isError: false
      };
    }

    case 'get_project_details': {
      const projectId = String(args?.projectId || '').toLowerCase();
      const project = PROJECTS_CATALOG.find(
        (p) => p.id === projectId || p.slug === projectId
      );
      if (!project) {
        return {
          content: [
            {
              type: 'text',
              text: `Project "${args?.projectId}" not found. Valid projectId values: lemukutan, courtyard, space, light.`
            }
          ],
          isError: true
        };
      }
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(project, null, 2)
          }
        ],
        isError: false
      };
    }

    case 'list_studio_services': {
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                studio: STUDIO_INFO,
                services: STUDIO_SERVICES,
                workflow: WORKFLOW_STEPS
              },
              null,
              2
            )
          }
        ],
        isError: false
      };
    }

    case 'submit_project_inquiry': {
      const { name: clientName, location, service = 'Arsitektur & tata ruang', brief } = args || {};
      if (!clientName || !location || !brief) {
        return {
          content: [
            {
              type: 'text',
              text: 'Missing required fields: name, location, and brief are required.'
            }
          ],
          isError: true
        };
      }
      const formattedMessage = `Halo GradiEnt Studio, saya ingin berdiskusi mengenai rencana proyek.\n\nNama: ${clientName}\nLokasi: ${location}\nLayanan: ${service}\n\nKebutuhan:\n${brief}\n\nTerima kasih.`;
      const whatsappLink = `https://wa.me/6285143628550?text=${encodeURIComponent(formattedMessage)}`;
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(
              {
                status: 'ready',
                studio: STUDIO_INFO.name,
                recipientEmail: STUDIO_INFO.contact.email,
                whatsappDirectUrl: whatsappLink,
                formattedBrief: formattedMessage,
                apiEndpoint: `${SITE_URL}/api/notion/inquiry`
              },
              null,
              2
            )
          }
        ],
        isError: false
      };
    }

    default:
      return {
        content: [
          {
            type: 'text',
            text: `Unknown tool "${name}". Available tools: ${MCP_TOOLS.map((t) => t.name).join(', ')}`
          }
        ],
        isError: true
      };
  }
}

function handleSingleJsonRpc(rpc) {
  if (!rpc || typeof rpc !== 'object' || rpc.jsonrpc !== '2.0') {
    return {
      jsonrpc: '2.0',
      id: rpc?.id ?? null,
      error: {
        code: -32600,
        message: 'Invalid Request: Expected JSON-RPC 2.0 payload.'
      }
    };
  }

  const { id, method, params } = rpc;

  // Notifications (no id)
  if (id === undefined && method && method.startsWith('notifications/')) {
    return null;
  }

  switch (method) {
    case 'initialize': {
      const requestedVersion = params?.protocolVersion;
      const supportedVersions = ['2025-03-26', '2024-11-05', '2025-06-18'];
      const negotiatedVersion = supportedVersions.includes(requestedVersion)
        ? requestedVersion
        : '2025-03-26';

      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        result: {
          protocolVersion: negotiatedVersion,
          capabilities: {
            tools: { listChanged: false },
            resources: { subscribe: false, listChanged: false },
            prompts: { listChanged: false }
          },
          serverInfo: MCP_SERVER_INFO,
          instructions:
            'Use GradiEnt Studio MCP tools to inspect architectural case studies (such as the Lemukutan Coastal Sports Pavilion DED), review tropical daylighting & spatial design services, or prepare a client project consultation inquiry.'
        }
      };
    }

    case 'notifications/initialized':
    case 'initialized': {
      if (id === undefined) return null;
      return { jsonrpc: '2.0', id, result: {} };
    }

    case 'ping': {
      return {
        jsonrpc: '2.0',
        id: id ?? null,
        result: {}
      };
    }

    case 'tools/list': {
      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        result: {
          tools: MCP_TOOLS
        }
      };
    }

    case 'tools/call': {
      const toolName = params?.name;
      const toolArgs = params?.arguments || {};
      const callResult = executeToolCall(toolName, toolArgs);
      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        result: callResult
      };
    }

    case 'resources/list': {
      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        result: {
          resources: MCP_RESOURCES
        }
      };
    }

    case 'resources/read': {
      const uri = params?.uri;
      if (uri === 'gradient://studio/profile') {
        return {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(STUDIO_INFO, null, 2)
              }
            ]
          }
        };
      }
      if (uri === 'gradient://studio/llms.txt') {
        return {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            contents: [
              {
                uri,
                mimeType: 'text/markdown',
                text: getLlmsTxt()
              }
            ]
          }
        };
      }
      if (uri === 'gradient://projects/catalog') {
        return {
          jsonrpc: '2.0',
          id: id ?? 1,
          result: {
            contents: [
              {
                uri,
                mimeType: 'application/json',
                text: JSON.stringify(PROJECTS_CATALOG, null, 2)
              }
            ]
          }
        };
      }
      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        error: {
          code: -32602,
          message: `Resource not found: ${uri}`
        }
      };
    }

    case 'prompts/list': {
      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        result: {
          prompts: MCP_PROMPTS
        }
      };
    }

    case 'prompts/get': {
      const promptName = params?.name;
      if (promptName !== 'architectural_brief_generator') {
        return {
          jsonrpc: '2.0',
          id: id ?? 1,
          error: {
            code: -32602,
            message: `Unknown prompt: ${promptName}`
          }
        };
      }
      const buildingType = params?.arguments?.buildingType || 'Tropical Pavilion';
      const siteLocation = params?.arguments?.siteLocation || 'Makassar, Indonesia';
      return {
        jsonrpc: '2.0',
        id: id ?? 1,
        result: {
          description: `Architectural brief template for ${buildingType} in ${siteLocation}`,
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: `Please prepare an architectural and tropical daylighting design brief for a ${buildingType} located in ${siteLocation} following GradiEnt Studio's methodology (site orientation, passive shading overhang geometry, spatial organization, and structural system).`
              }
            }
          ]
        }
      };
    }

    default: {
      return {
        jsonrpc: '2.0',
        id: id ?? null,
        error: {
          code: -32601,
          message: `Method not found: ${method}`
        }
      };
    }
  }
}

export async function handleMcpGet(request) {
  const sessionId = request.headers.get('mcp-session-id') || 'gradient-mcp-session-v1';
  const accept = (request.headers.get('accept') || '').toLowerCase();

  // If client explicitly requests only text/event-stream for SSE transport
  if (
    accept.includes('text/event-stream') &&
    !accept.includes('application/json') &&
    !accept.includes('*/*')
  ) {
    const ssePayload = `event: endpoint\ndata: ${SITE_URL}/.well-known/mcp\n\nevent: ready\ndata: ${JSON.stringify({
      jsonrpc: '2.0',
      method: 'notifications/ready',
      params: { serverInfo: MCP_SERVER_INFO, protocolVersion: '2025-03-26' }
    })}\n\n`;

    return new Response(ssePayload, {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'text/event-stream; charset=utf-8',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
        'Mcp-Session-Id': sessionId
      }
    });
  }

  return new Response(JSON.stringify(getMcpDiscoveryManifest(), null, 2), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Mcp-Session-Id': sessionId
    }
  });
}

export async function handleMcpPost(request) {
  const sessionId = request.headers.get('mcp-session-id') || 'gradient-mcp-session-v1';

  let body;
  try {
    body = await request.json();
  } catch {
    return new Response(
      JSON.stringify({
        jsonrpc: '2.0',
        id: null,
        error: {
          code: -32700,
          message: 'Parse error: Invalid JSON payload'
        }
      }),
      {
        status: 400,
        headers: {
          ...CORS_HEADERS,
          'Content-Type': 'application/json; charset=utf-8',
          'Mcp-Session-Id': sessionId
        }
      }
    );
  }

  if (Array.isArray(body)) {
    const responses = body.map((item) => handleSingleJsonRpc(item)).filter(Boolean);
    if (responses.length === 0) {
      return new Response(null, {
        status: 202,
        headers: {
          ...CORS_HEADERS,
          'Mcp-Session-Id': sessionId
        }
      });
    }
    return new Response(JSON.stringify(responses), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json; charset=utf-8',
        'Mcp-Session-Id': sessionId
      }
    });
  }

  const rpcResponse = handleSingleJsonRpc(body);
  if (rpcResponse === null) {
    return new Response(null, {
      status: 202,
      headers: {
        ...CORS_HEADERS,
        'Mcp-Session-Id': sessionId
      }
    });
  }

  return new Response(JSON.stringify(rpcResponse), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8',
      'Mcp-Session-Id': sessionId
    }
  });
}

export async function handleMcpDelete() {
  return new Response(JSON.stringify({ status: 'session_closed' }), {
    status: 200,
    headers: {
      ...CORS_HEADERS,
      'Content-Type': 'application/json; charset=utf-8'
    }
  });
}

export async function handleMcpOptions() {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS
  });
}
