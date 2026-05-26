<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'
import { useResumeStore, stripHtml } from '../stores/resume'

import { marked } from 'marked'
import CodePanel from '../components/jd-radar/CodePanel.vue'
import RadarScan from '../components/jd-radar/RadarScan.vue'

const store = useResumeStore()

// --- State ---
const jdText = ref('')
const resumeText = ref('')
const loading = ref(false)
const resultHtml = ref('')
const rawResult = ref('')
const outputRef = ref<HTMLElement | null>(null)
const errorText = ref('')

// --- On mount: auto-fill resume from store ---
onMounted(() => {
  const p = store.personal
  let md = ''
  if (p.name) md += `# ${p.name} (${p.nameEn})\n`
  if (p.title) md += `**${p.title}**\n`
  if (p.slogan) md += `> ${p.slogan}\n`
  if (p.summary) md += `\n${stripHtml(p.summary)}\n`

  if (store.skillGroups.length) {
    md += `\n## Skills\n`
    for (const g of store.skillGroups) {
      md += `- **${g.title}**: ${g.skills.map(s => `${s.name} (${s.level}%)`).join(', ')}\n`
    }
  }

  if (store.experiences.length) {
    md += `\n## Work Experience\n`
    for (const e of store.experiences) {
      md += `### ${e.company} — ${e.position} (${e.period})\n`
      if (e.description) md += `${stripHtml(e.description)}\n`
      if (e.achievements) md += `${stripHtml(e.achievements)}\n`
      if (e.techStack.length) md += `> Tech: ${e.techStack.join(', ')}\n`
    }
  }

  if (store.projects.length) {
    md += `\n## Projects\n`
    for (const pr of store.projects) {
      md += `### ${pr.name} (${pr.type})\n`
      md += `- Role: ${pr.role}\n- Period: ${pr.period}\n`
      if (pr.intro) md += `- Intro: ${stripHtml(pr.intro)}\n`
      if (pr.techStack) md += `- Tech: ${pr.techStack}\n`
      if (pr.tags.length) md += `- Tags: ${pr.tags.join(', ')}\n`
    }
  }

  resumeText.value = md || '<!-- Paste your resume data here -->'
})

// --- API config ---
const showApiConfig = ref(false)
const apiEndpoint = ref('/api/chat/completions')
const apiKey = ref('')
const modelName = ref('gpt-4o')

// --- Prompt template ---
const systemPrompt = `You are a senior technical HR and architect interviewer. Compare the provided Job Description (JD) with the candidate's Resume and perform a strict match analysis.

Output EXACTLY in this Markdown format — no extra text:

### 综合匹配度
[Output only a percentage number, e.g.: 85%]

### 🎯 命中核心技能
- keyword1
- keyword2

### ⚠️ 缺失/薄弱项预警
- missing skill 1
- missing skill 2

### 💡 简历修改建议 (Action Items)
1. Suggestion 1...
2. Suggestion 2...`

// --- Parse result ---
function parseResult(text: string) {
  const scoreMatch = text.match(/综合匹配度\s*\n\s*(\d+)%/)
  const score = scoreMatch ? scoreMatch[1] : null

  const hitSection = text.match(/命中核心技能\s*\n([\s\S]*?)(?=###|$)/)
  const hitKeywords = hitSection
    ? hitSection[1].match(/- .+/g)?.map(s => s.replace(/^- /, '').trim()) ?? []
    : []

  const missSection = text.match(/缺失.*预警\s*\n([\s\S]*?)(?=###|$)/)
  const missKeywords = missSection
    ? missSection[1].match(/- .+/g)?.map(s => s.replace(/^- /, '').trim()) ?? []
    : []

  return { score, hitKeywords, missKeywords }
}

const parsed = computed(() => parseResult(rawResult.value))

// --- Throttled markdown render ---
let renderTimer: ReturnType<typeof setTimeout> | null = null
let pendingRender = false

function scheduleRender(text: string) {
  if (renderTimer) {
    pendingRender = true
    return
  }
  resultHtml.value = marked.parse(text) as string
  renderTimer = setTimeout(() => {
    renderTimer = null
    if (pendingRender) {
      pendingRender = false
      resultHtml.value = marked.parse(rawResult.value) as string
    }
  }, 80)
}

// --- Auto-scroll ---
function scrollToBottom() {
  nextTick(() => {
    if (outputRef.value) {
      outputRef.value.scrollTop = outputRef.value.scrollHeight
    }
  })
}

// --- Abort controller ---
let abortController: AbortController | null = null

// --- Cleanup on unmount ---
let destroyed = false
onUnmounted(() => {
  destroyed = true
  abortController?.abort()
  if (renderTimer) {
    clearTimeout(renderTimer)
    renderTimer = null
  }
})

// --- Streaming fetch ---
async function startScan() {
  if (!jdText.value.trim()) return
  loading.value = true
  rawResult.value = ''
  resultHtml.value = ''
  errorText.value = ''

  abortController = new AbortController()
  const timeoutId = setTimeout(() => abortController?.abort(), 120000)

  try {
    const res = await fetch(apiEndpoint.value, {
      method: 'POST',
      signal: abortController.signal,
      headers: {
        'Content-Type': 'application/json',
        ...(apiKey.value ? { Authorization: `Bearer ${apiKey.value}` } : {}),
      },
      body: JSON.stringify({
        model: modelName.value,
        stream: true,
        messages: [
          { role: 'system', content: systemPrompt },
          {
            role: 'user',
            content: `## Target Job Description\n\n${jdText.value}\n\n## Candidate Resume\n\n${resumeText.value}`,
          },
        ],
      }),
    })

    if (!res.ok || !res.body) {
      errorText.value = `HTTP ${res.status}: ${res.statusText}`
      return
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      if (destroyed) break
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data: ')) continue
        const data = trimmed.slice(6)
        if (data === '[DONE]') continue

        try {
          const json = JSON.parse(data)
          const delta = json.choices?.[0]?.delta?.content
          if (delta) {
            rawResult.value += delta
            scheduleRender(rawResult.value)
            scrollToBottom()
          }
        } catch {
          // skip malformed chunks
        }
      }
    }
    if (renderTimer) {
      clearTimeout(renderTimer)
      renderTimer = null
    }
    resultHtml.value = marked.parse(rawResult.value) as string
  } catch (err: any) {
    if (err.name === 'AbortError') {
      errorText.value = 'Request timed out (120s)'
    } else {
      errorText.value = err.message
    }
  } finally {
    clearTimeout(timeoutId)
    abortController = null
    loading.value = false
  }
}

function cancelScan() {
  abortController?.abort()
}
</script>

<template>
  <div class="jd-radar-shell">
    <!-- Top Nav -->
    <div class="jd-radar-toolbar">
      <div class="toolbar-actions">
        <button class="tb" @click="showApiConfig = !showApiConfig">
          {{ showApiConfig ? '&#10005; Close' : '&#9881; Config' }}
        </button>
      </div>
    </div>

    <!-- API Config Dropdown -->
    <Transition name="config-slide">
      <div v-if="showApiConfig" class="config-bar">
        <label class="config-label">Endpoint</label>
        <input v-model="apiEndpoint" class="config-input flex-1" />
        <label class="config-label">Model</label>
        <input v-model="modelName" class="config-input w-32" />
        <label class="config-label">API Key</label>
        <input v-model="apiKey" type="password" placeholder="sk-..." class="config-input w-48" />
      </div>
    </Transition>

    <!-- Main Body -->
    <div class="jd-radar-body">
      <!-- Left Column -->
      <div class="jd-radar-left">
        <CodePanel
          v-model="jdText"
          title="Target Job Description (目标岗位 JD)"
          filename="jd-input.md"
          dot-color="accent"
          placeholder="Paste the target JD here..."
        />
        <CodePanel
          v-model="resumeText"
          title="My Resume (当前简历数据)"
          filename="resume-data.md"
          dot-color="warm"
          placeholder="Your resume data will auto-populate..."
        />

        <!-- Scan Button -->
        <button
          :disabled="loading || !jdText.trim()"
          class="scan-btn"
          @click="loading ? cancelScan() : startScan()"
        >
          <span v-if="loading" class="scan-sweep" />
          <span class="btn-label">
            {{ loading ? '&#10227; Cancel Scan' : '&#10024; Start AI Radar Scan' }}
          </span>
        </button>
      </div>

      <!-- Right Column -->
      <div ref="outputRef" class="jd-radar-output">
        <!-- Output header -->
        <div class="output-header">
          <div class="dots">
            <span /><span /><span />
          </div>
          <span class="filename">analysis-output.md</span>
          <span v-if="rawResult" class="status-badge" :class="{ streaming: loading }">
            {{ loading ? '&#9679; Streaming' : '&#9679; Complete' }}
          </span>
        </div>

        <div class="output-content">
          <!-- Empty state -->
          <div v-if="!rawResult && !loading && !errorText" class="empty-state">
            <div class="empty-icon">&#128225;</div>
            <p class="empty-title">Awaiting scan parameters...</p>
            <p class="empty-sub">Paste a JD and click "Start AI Radar Scan"</p>
          </div>

          <!-- Loading -->
          <div v-if="loading && !rawResult" class="loading-state">
            <RadarScan />
          </div>

          <!-- Error -->
          <div v-if="errorText" class="error-card">
            <p class="error-label">Error</p>
            <p class="error-msg">{{ errorText }}</p>
          </div>

          <!-- Score -->
          <Transition name="score-pop">
            <div v-if="parsed.score" class="score-section">
              <p class="section-label">Match Score</p>
              <span class="score-number">{{ parsed.score }}%</span>
              <div class="score-bar-track">
                <div class="score-bar-fill" :style="{ width: parsed.score + '%' }" />
              </div>
            </div>
          </Transition>

          <!-- Hit keywords -->
          <div v-if="parsed.hitKeywords.length" class="keyword-section">
            <p class="section-label">
              <span class="dot dot-green" />
              命中核心技能
              <span class="count">({{ parsed.hitKeywords.length }})</span>
            </p>
            <div class="tags">
              <span v-for="kw in parsed.hitKeywords" :key="kw" class="tag tag-hit">{{ kw }}</span>
            </div>
          </div>

          <!-- Missing keywords -->
          <div v-if="parsed.missKeywords.length" class="keyword-section">
            <p class="section-label">
              <span class="dot dot-red" />
              缺失 / 薄弱项
              <span class="count">({{ parsed.missKeywords.length }})</span>
            </p>
            <div class="tags">
              <span v-for="kw in parsed.missKeywords" :key="kw" class="tag tag-miss">{{ kw }}</span>
            </div>
          </div>

          <!-- Markdown render -->
          <div v-if="resultHtml" class="result-prose" v-html="resultHtml" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* ── Shell ── */
.jd-radar-shell {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: var(--bg-deep);
  overflow: hidden;
}

/* ── Toolbar ── */
.jd-radar-toolbar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 52px;
  padding: 0 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.toolbar-actions {
  display: flex;
  gap: 8px;
}
.tb {
  font-size: 0.85rem;
  padding: 6px 14px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--text-dim);
  cursor: pointer;
  transition: all 0.2s;
}
.tb:hover {
  border-color: var(--border-hover);
  color: var(--text);
  background: var(--surface-hover);
}

/* ── Config bar ── */
.config-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 24px;
  background: var(--surface);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
}
.config-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-dim);
  flex-shrink: 0;
}
.config-input {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  font-variant-numeric: tabular-nums;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--bg-deep);
  color: var(--text);
  outline: none;
  transition: border-color 0.2s;
}
.config-input:focus {
  border-color: var(--accent);
}
.config-input::placeholder {
  color: var(--text-muted);
}
.config-slide-enter-active,
.config-slide-leave-active {
  transition: all 0.2s ease;
}
.config-slide-enter-from,
.config-slide-leave-to {
  opacity: 0;
  max-height: 0;
  padding-top: 0;
  padding-bottom: 0;
  overflow: hidden;
}

/* ── Body grid ── */
.jd-radar-body {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
  overflow-y: auto;
  scrollbar-width: none;
}
.jd-radar-body::-webkit-scrollbar {
  display: none;
}

/* ── Left column ── */
.jd-radar-left {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 0;
}

/* ── Scan button ── */
.scan-btn {
  flex-shrink: 0;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: 2px solid var(--accent);
  background: var(--surface);
  color: var(--accent);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}
.scan-btn:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}
.scan-btn:not(:disabled):hover {
  background: var(--surface-hover);
  box-shadow: 0 0 24px var(--accent-glow);
}
.btn-label {
  position: relative;
  z-index: 1;
}
.scan-sweep {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent-subtle) 40%,
    var(--accent-glow) 50%,
    var(--accent-subtle) 60%,
    transparent 100%
  );
  opacity: 0.5;
  animation: sweep-move 2s ease-in-out infinite;
}
@keyframes sweep-move {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* ── Output panel ── */
.jd-radar-output {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--accent-glow) transparent;
}
.jd-radar-output::-webkit-scrollbar {
  width: 4px;
}
.jd-radar-output::-webkit-scrollbar-thumb {
  background: var(--accent-glow);
  border-radius: 2px;
}

.output-header {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 40px;
  padding: 0 16px;
  background: var(--surface-hover);
  border-bottom: 1px solid var(--border);
  flex-shrink: 0;
  border-radius: 12px 12px 0 0;
}
.dots {
  display: flex;
  gap: 5px;
}
.dots span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--border);
}
.filename {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--text-dim);
}
.status-badge {
  margin-left: auto;
  font-family: var(--font-mono);
  font-size: 0.72rem;
  padding: 2px 10px;
  border-radius: 10px;
  background: var(--surface);
  color: var(--text-dim);
}
.status-badge.streaming {
  background: var(--accent-subtle);
  color: var(--accent);
}

.output-content {
  flex: 1;
  padding: 24px;
}

/* ── Empty state ── */
.empty-state {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.empty-icon {
  font-size: 3rem;
  opacity: 0.2;
}
.empty-title {
  font-size: 1.15rem;
  font-weight: 600;
  color: var(--text);
}
.empty-sub {
  font-size: 0.95rem;
  color: var(--text-dim);
}

.loading-state {
  height: 100%;
}

/* ── Error ── */
.error-card {
  margin-bottom: 16px;
  padding: 14px 18px;
  border-radius: 10px;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.3);
}
.error-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #ef4444;
  margin-bottom: 4px;
}
.error-msg {
  font-size: 0.9rem;
  color: #fca5a5;
}

/* ── Score ── */
.score-section {
  text-align: center;
  margin-bottom: 28px;
}
.section-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: var(--text-dim);
  margin-bottom: 10px;
}
.score-number {
  display: inline-block;
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
  background: linear-gradient(135deg, var(--accent), #06b6d4);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  filter: drop-shadow(0 0 30px var(--accent-glow));
  animation: score-glow 2s ease-in-out infinite alternate;
}
@keyframes score-glow {
  0% { filter: drop-shadow(0 0 20px var(--accent-glow)); }
  100% { filter: drop-shadow(0 0 40px var(--accent-glow)); }
}
.score-bar-track {
  margin: 16px auto 0;
  max-width: 280px;
  height: 6px;
  border-radius: 3px;
  background: var(--border);
  overflow: hidden;
}
.score-bar-fill {
  height: 100%;
  border-radius: 3px;
  background: linear-gradient(90deg, var(--accent), #06b6d4);
  animation: bar-fill 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  transform-origin: left;
}
@keyframes bar-fill {
  0% { transform: scaleX(0); }
  100% { transform: scaleX(1); }
}

/* ── Keywords ── */
.keyword-section {
  margin-bottom: 20px;
}
.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
}
.dot-green { background: #10b981; }
.dot-red { background: #ef4444; }
.count {
  color: var(--text-muted);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}
.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: all 0.2s;
  cursor: default;
}
.tag:hover {
  transform: scale(1.04);
}
.tag-hit {
  background: rgba(16, 185, 129, 0.1);
  color: #10b981;
  border: 1px solid rgba(16, 185, 129, 0.3);
}
.tag-hit:hover {
  background: rgba(16, 185, 129, 0.18);
}
.tag-miss {
  background: rgba(239, 68, 68, 0.08);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.25);
}
.tag-miss:hover {
  background: rgba(239, 68, 68, 0.15);
}

/* ── Score transition ── */
.score-pop-enter-active {
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.score-pop-enter-from {
  opacity: 0;
  transform: scale(0.7) translateY(10px);
}

/* ── Prose ── */
.result-prose :deep(h2) {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text);
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  letter-spacing: 0.03em;
}
.result-prose :deep(h3) {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-dim);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
}
.result-prose :deep(p) {
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 0.5rem;
}
.result-prose :deep(strong) {
  color: var(--text-warm);
  font-weight: 600;
}
.result-prose :deep(ul) {
  list-style: none;
  padding-left: 0;
}
.result-prose :deep(ul li) {
  position: relative;
  padding-left: 1.25rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 0.25rem;
}
.result-prose :deep(ul li::before) {
  content: '\25B8';
  position: absolute;
  left: 0;
  color: var(--accent);
  opacity: 0.5;
  font-size: 0.7rem;
}
.result-prose :deep(ol) {
  list-style: none;
  padding-left: 0;
  counter-reset: item;
}
.result-prose :deep(ol li) {
  counter-increment: item;
  position: relative;
  padding-left: 1.5rem;
  font-size: 1rem;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 0.25rem;
}
.result-prose :deep(ol li::before) {
  content: counter(item) '.';
  position: absolute;
  left: 0;
  color: var(--accent);
  opacity: 0.6;
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.result-prose :deep(blockquote) {
  border-left: 3px solid var(--accent);
  background: var(--accent-subtle);
  padding: 0.5rem 1rem;
  margin: 0.75rem 0;
  border-radius: 0 6px 6px 0;
  font-size: 0.95rem;
  color: var(--text-dim);
}
.result-prose :deep(hr) {
  border: none;
  border-top: 1px solid var(--border);
  margin: 1.5rem 0;
}
</style>
