import SectionHeader from '../../components/usage/SectionHeader';
import SyntaxBlock from '../../components/usage/SyntaxBlock';
import InstallTabs from '../../components/usage/InstallTabs';
import { McpIcon } from '../../components/usage/framework/icons';

interface Props {
  markdownContent: string;
  copiedField: string | null;
  onCopy: (text: string, field: string) => void;
}

const MCP_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "npx",
      "args": ["reicon-mcp"]
    }
  }
}`;

const MCP_DEV_CONFIG = `{
  "mcpServers": {
    "reicon": {
      "command": "node",
      "args": ["./packages/reicon-mcp/bin/run.cjs"]
    }
  }
}`;

const SEARCH_TOOL = `search_icons({ query: "heart", weight: "Filled" })`;

const APPLY_TOOL = `apply_icon({
  name: "heart",
  weight: "Filled",
  framework: "react",
  size: 24,
  color: "#ef4444"
})`;

const FILE_MARKER_CMD = `npx reicon-mcp apply heart --framework react --file src/App.tsx --marker "{/* ICON */}"`;

export default function McpUsage({ markdownContent, copiedField, onCopy }: Props) {
  return (
    <section id="mcp" data-section className="mb-16 scroll-mt-24">
      <SectionHeader
        id="mcp"
        title="MCP Server"
        level="h2"
        markdownContent={markdownContent}
        icon={<McpIcon size={30} />}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> package exposes Reicon icons to AI agents through the{' '}
        <a href="https://modelcontextprotocol.io" className="text-[#6C5CE7] hover:underline" target="_blank" rel="noopener noreferrer">
          Model Context Protocol
        </a>
        . Agents can search, preview SVG markup, and generate copy-pasteable code snippets without human input.
      </p>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">What you can accomplish:</p>
      <ul className="text-text-base/60 text-[15px] leading-[1.8] mb-8 space-y-1 list-disc list-inside">
        <li>Search 2,700+ icons by keyword with ranked results</li>
        <li>Preview raw SVG markup before applying an icon</li>
        <li>Generate framework-specific import and usage snippets</li>
        <li>Browse icons by category</li>
        <li>Run the same logic from a CLI for scripts and CI</li>
      </ul>

      {/* Installation */}
      <h3 id="mcp-installation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Installation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Install the package using your preferred package manager.
      </p>

      <InstallTabs
        packageName="reicon-mcp"
        copiedField={copiedField}
        onCopy={onCopy}
      />

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4 mt-6">
        Or build and run the MCP server directly from source in the monorepo:
      </p>

      <SyntaxBlock
        title="monorepo"
        onCopy={() => onCopy('git clone https://github.com/dqev/reicon.git\ncd reicon\nnpm run build:mcp', 'mcp-source')}
        copied={copiedField === 'mcp-source'}
      >
        <span className="text-[#98c379]">git clone</span>
        <span className="text-text-base/70"> https://github.com/dqev/reicon.git</span>
        {'\n'}
        <span className="text-[#98c379]">cd</span>
        <span className="text-text-base/70"> reicon</span>
        {'\n'}
        <span className="text-[#98c379]">npm run</span>
        <span className="text-text-base/70"> build:mcp</span>
      </SyntaxBlock>

      {/* MCP Configuration */}
      <h3 id="mcp-configuration" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        MCP Configuration
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        Add the server to your MCP client (like Claude Desktop or Cursor). With no arguments, <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">reicon-mcp</code> starts a stdio MCP server.
      </p>

      <SyntaxBlock
        title="MCP config"
        onCopy={() => onCopy(MCP_CONFIG, 'mcp-config')}
        copied={copiedField === 'mcp-config'}
      >
        <span className="text-text-base/70">{MCP_CONFIG}</span>
      </SyntaxBlock>

      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4 mt-6">
        For a local development build from the cloned monorepo, point directly to the binary build:
      </p>

      <SyntaxBlock
        title="local dev"
        onCopy={() => onCopy(MCP_DEV_CONFIG, 'mcp-dev-config')}
        copied={copiedField === 'mcp-dev-config'}
      >
        <span className="text-text-base/70">{MCP_DEV_CONFIG}</span>
      </SyntaxBlock>

      {/* Agent Workflow */}
      <h3 id="mcp-agent-workflow" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Agent Workflow
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        A typical two-step flow for an AI agent to locate and insert a Reicon icon:
      </p>

      <div className="space-y-6 text-[14px] text-text-base/50 leading-relaxed mb-8">
        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">1</div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Search with concise keywords</h4>
            <p className="mb-3">Use short, specific query terms like <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">cart</code> or <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">settings</code> — not full sentences.</p>
            <SyntaxBlock
              title="search_icons"
              onCopy={() => onCopy(SEARCH_TOOL, 'mcp-search-tool')}
              copied={copiedField === 'mcp-search-tool'}
            >
              <span className="text-text-base/70">{SEARCH_TOOL}</span>
            </SyntaxBlock>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-6 h-6 rounded-full bg-text-base/10 text-text-base font-bold flex items-center justify-center shrink-0 text-xs mt-1">2</div>
          <div className="flex-1">
            <h4 className="text-text-base font-medium mb-1">Apply the chosen icon</h4>
            <p className="mb-3">Generates the matching <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">importStatement</code> and <code className="text-text-base/70 bg-text-base/6 px-1 py-0.5 rounded text-[12px]">usageSnippet</code> for the agent to insert directly.</p>
            <SyntaxBlock
              title="apply_icon"
              onCopy={() => onCopy(APPLY_TOOL, 'mcp-apply-tool')}
              copied={copiedField === 'mcp-apply-tool'}
            >
              <span className="text-text-base/70 whitespace-pre">{APPLY_TOOL}</span>
            </SyntaxBlock>
          </div>
        </div>
      </div>

      {/* Tools Reference */}
      <h3 id="mcp-tools-reference" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Tools Reference
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The server exposes four primary MCP tools for agentic workflows:
      </p>

      <div className="overflow-x-auto mb-8 rounded-xl border border-text-base/6">
        <table className="w-full text-left text-[14px]">
          <thead>
            <tr className="border-b border-text-base/6 bg-text-base/3">
              <th className="px-5 py-3 font-medium text-text-base">Tool</th>
              <th className="px-5 py-3 font-medium text-text-base">Input</th>
              <th className="px-5 py-3 font-medium text-text-base">Returns</th>
            </tr>
          </thead>
          <tbody className="text-text-base/55">
            <tr className="border-b border-text-base/6">
              <td className="px-5 py-3 font-mono text-text-base/70">search_icons</td>
              <td className="px-5 py-3"><code className="text-[12px]">query</code>, optional <code className="text-[12px]">weight</code>, <code className="text-[12px]">limit</code></td>
              <td className="px-5 py-3">Ranked matches with name, weight, category, tags, score</td>
            </tr>
            <tr className="border-b border-text-base/6">
              <td className="px-5 py-3 font-mono text-text-base/70">view_icon</td>
              <td className="px-5 py-3"><code className="text-[12px]">name</code>, <code className="text-[12px]">weight</code></td>
              <td className="px-5 py-3">Raw SVG string, viewBox, tags, category</td>
            </tr>
            <tr className="border-b border-text-base/6">
              <td className="px-5 py-3 font-mono text-text-base/70">apply_icon</td>
              <td className="px-5 py-3"><code className="text-[12px]">name</code>, <code className="text-[12px]">weight</code>, <code className="text-[12px]">framework</code>, optional <code className="text-[12px]">size</code>, <code className="text-[12px]">color</code></td>
              <td className="px-5 py-3">Framework-specific import and usage snippets</td>
            </tr>
            <tr>
              <td className="px-5 py-3 font-mono text-text-base/70">list_categories</td>
              <td className="px-5 py-3">None</td>
              <td className="px-5 py-3">All distinct category values</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* CLI Usage */}
      <h3 id="mcp-cli-usage" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        CLI Usage
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-6">
        The same binary supports CLI mode when arguments are provided.
      </p>

      <div className="space-y-4 mb-8">
        <SyntaxBlock
          title="Search"
          onCopy={() => onCopy('npx reicon-mcp search "shopping cart"', 'mcp-search')}
          copied={copiedField === 'mcp-search'}
        >
          <span className="text-[#98c379]">npx reicon-mcp search</span>
          <span className="text-text-base/70"> "shopping cart"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="View"
          onCopy={() => onCopy('npx reicon-mcp view heart --weight Filled', 'mcp-view')}
          copied={copiedField === 'mcp-view'}
        >
          <span className="text-[#98c379]">npx reicon-mcp view</span>
          <span className="text-text-base/70"> heart --weight Filled</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Apply"
          onCopy={() => onCopy('npx reicon-mcp apply heart --framework react --size 32 --color "#ef4444"', 'mcp-apply')}
          copied={copiedField === 'mcp-apply'}
        >
          <span className="text-[#98c379]">npx reicon-mcp apply</span>
          <span className="text-text-base/70"> heart --framework react --size 32 --color "#ef4444"</span>
        </SyntaxBlock>

        <SyntaxBlock
          title="Categories"
          onCopy={() => onCopy('npx reicon-mcp categories', 'mcp-categories')}
          copied={copiedField === 'mcp-categories'}
        >
          <span className="text-[#98c379]">npx reicon-mcp categories</span>
        </SyntaxBlock>
      </div>

      {/* Scripted File Insertion */}
      <h3 id="mcp-file-insertion" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Scripted File Insertion
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        For CI or scripts without an agent supervising edits, use <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">--file</code> and <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">--marker</code> to insert code directly.
      </p>

      <SyntaxBlock
        title="file marker"
        onCopy={() => onCopy(FILE_MARKER_CMD, 'mcp-file-marker')}
        copied={copiedField === 'mcp-file-marker'}
      >
        <span className="text-[#98c379]">npx reicon-mcp apply</span>
        <span className="text-text-base/70"> heart --framework react --file src/App.tsx --marker "&#123;/* ICON */&#125;"</span>
      </SyntaxBlock>

      <div className="mt-4 bg-[#6C5CE7]/5 border border-[#6C5CE7]/15 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-6">
        <span className="text-[#6C5CE7] font-medium">Note:</span> Replaces the exact marker with the usage snippet and inserts the import at the top if missing. Exits non-zero if the marker is not found.
      </div>

      {/* Offline Operation */}
      <h3 id="mcp-offline-operation" data-section className="text-lg font-serif text-text-base mb-4 mt-10 scroll-mt-24">
        Offline Operation
      </h3>
      <p className="text-text-base/60 text-[15px] leading-[1.8] mb-4">
        The search index is bundled at build time from <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">data/icon-data.json</code>. No network calls are made at runtime — once installed, the server works fully offline.
      </p>

      <div className="mt-4 bg-text-base/3 border border-text-base/6 rounded-xl p-4 text-[13px] text-text-base/50 leading-relaxed mb-12">
        <span className="text-text-base/70 font-medium">Rebuilding:</span> Rebuild with <code className="text-text-base/70 bg-text-base/6 px-1.5 py-0.5 rounded text-[12px]">npm run build:mcp</code> after the icon dataset changes to refresh the bundled index.
      </div>
    </section>
  );
}
