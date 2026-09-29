---
title: Встановлення
description: Додайте тему як модуль Hugo, git-підмодуль або просту копію.
weight: 10
---

## Як модуль Hugo

```toml
# hugo.toml
[module]
  [[module.imports]]
    path = "github.com/YouSysAdmin/hugo-docs-theme"
```

## Як git-підмодуль

```bash
git submodule add https://github.com/YouSysAdmin/hugo-docs-theme.git themes/hugo-docs-theme
```

```toml
# hugo.toml
theme = "hugo-docs-theme"
```

{{< callout type="warning" title="Клонуйте з `--recurse-submodules`" >}}
Клон без підмодуля збирає сайт із **порожніх сторінок**, і Hugo повідомляє
про успіх.
{{< /callout >}}

## Перевірка

```bash
hugo server
```
