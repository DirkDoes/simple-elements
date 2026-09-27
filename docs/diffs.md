# Diff designs

Patterns → Diffs shows six presentations: side-by-side code, unified code, a translation-key tree, document redlining, spreadsheet changes, and editable patch highlighting.

Code comparisons use [Diff](diff.md). Translation, document, and spreadsheet values use [Diff value](diff-value.md), with existing collections, badges, and collapsible tree rows. The translation tree has functional component-native expand/collapse controls. Patch highlighting uses the new `diff` boolean on [Code](code.md) and [Code editor](code-editor.md), retaining the selected language.

The pattern contains markup-only examples. It presents comparisons; it does not implement a merge workflow or parse document files.
