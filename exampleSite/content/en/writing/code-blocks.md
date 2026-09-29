---
title: Code blocks
description: Highlighting, line numbers, highlighted lines and ASCII diagrams.
weight: 20
---

Highlighting is done by Hugo at build time (Chroma), so a page carries no
highlighter script. This site sets the `github-dark` style with inline
styles (`markup.highlight` in `hugo.toml`), and code blocks stay dark on
both themes.

## Languages

````markdown
```yaml
server:
  addr: ":3000"
```
````

```yaml
server:
  addr: ":3000"
  tls:
    enabled: false
```

```json
{
  "id": "0198f2c1-7e0a-7c3b-9d52-3b1f0c6a9e11",
  "status": "queued",
  "tags": ["welcome", "onboarding"]
}
```

```bash
curl -X POST https://api.example.org/v1/items \
  -H "Authorization: Bearer $TOKEN" \
  -d '{"name": "first"}'
```

```python
def greet(name: str) -> str:
    """Return a greeting."""
    return f"Hello, {name}"
```

```sql
SELECT id, created_at
FROM items
WHERE project_id = $1
ORDER BY created_at DESC
LIMIT 50;
```

```diff
- theme = "old-theme"
+ theme = "hugo-docs-theme"
```

A block with no language is plain text. `guessSyntax` is on, so Hugo tries
to guess, and `text` turns that off:

```text
nothing is highlighted here
```

## Line numbers

````markdown
```go {linenos=true}

```
````

```go {linenos=true}
func Sum(xs []int) int {
	total := 0
	for _, x := range xs {
		total += x
	}

	return total
}
```

## Highlighted lines

````markdown
```go {hl_lines=[2,"4-6"], linenos=true, linenostart=10}

```
````

```go {hl_lines=[2,"4-6"], linenos=true, linenostart=10}
func Sum(xs []int) int {
	total := 0

	for _, x := range xs {
		total += x
	}

	return total
}
```

## ASCII diagrams

A fenced block with the language `ascii` is a diagram: it is set in a
monospace stack with full box-drawing coverage, the common indentation is
stripped, and the drawing is centred in the frame as one unit.

````markdown
```ascii
+--------+       +----------+       +----------+
| Client | ----> |  Server  | ----> | Database |
+--------+       +----------+       +----------+
```
````

```ascii
+--------+       +----------+       +----------+
| Client | ----> |  Server  | ----> | Database |
+--------+       +----------+       +----------+
```

Box-drawing characters pass through unchanged:

```ascii
┌─────────┐    submit    ┌─────────┐    deliver    ┌─────────┐
│  App    │ ───────────▶ │  Queue  │ ────────────▶ │  Relay  │
└─────────┘              └────┬────┘               └─────────┘
                              │ retry
                              ▼
                         ┌─────────┐
                         │  Log    │
                         └─────────┘
```

## The highlight shortcode

Hugo's built-in `highlight` shortcode does the same as a fence, for the
rare case where a fence cannot be used:

```go-html-template
{{</* highlight toml "hl_lines=2" */>}}
[params]
landing = true
{{</* /highlight */>}}
```

{{< highlight toml "hl_lines=2" >}}
[params]
landing = true
{{< /highlight >}}
