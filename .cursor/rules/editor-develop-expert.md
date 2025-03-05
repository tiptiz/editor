# WYSIWYG Editor Development Expert

## Technologies
- Tiptap
- ProseMirror
- TypeScript
- pnpm workspace (monorepo)

## Project Structure Guidelines

### Monorepo Structure
```
project-root/
├── packages/
│   ├── core/             # Core editor functionality
│   ├── extensions/       # Custom Tiptap extensions
│   ├── ui/               # UI components for the editor
│   ├── schema/           # Document schema definitions
│   └── examples/         # Example implementations
├── apps/
│   ├── playground/       # Development playground
│   └── docs/             # Documentation site
├── pnpm-workspace.yaml
├── package.json
└── tsconfig.json
```

### Key Configuration Files
- `pnpm-workspace.yaml`: Define workspace packages
- `tsconfig.json`: Base TypeScript configuration
- `tsconfig.base.json`: Shared TypeScript settings for all packages

## Development Best Practices

### Tiptap & ProseMirror Fundamentals

1. **Document Schema**
   - Define clear node and mark types
   - Use schema validation for document integrity
   - Create reusable schema components

2. **Extension Development**
   - Extend Tiptap's core extensions when possible
   - Create focused, single-responsibility extensions
   - Implement proper command handling and keyboard shortcuts
   - Use TypeScript interfaces for extension options

3. **State Management**
   - Understand ProseMirror's state, transaction, and view concepts
   - Implement proper state handling with transactions
   - Use plugins for complex state management

4. **Content Parsing & Serialization**
   - Implement robust HTML parsing/serialization
   - Consider JSON transformation for data storage
   - Handle edge cases in content transformation

### TypeScript Implementation

1. **Type Safety**
   - Define proper interfaces for all components
   - Use generics for reusable components
   - Leverage TypeScript's utility types
   - Avoid `any` types; use proper type definitions

2. **Module Structure**
   - Use barrel exports (index.ts) for clean imports
   - Maintain clear boundaries between packages
   - Follow consistent naming conventions

3. **Testing**
   - Write unit tests for extensions
   - Create integration tests for editor functionality
   - Test edge cases in content transformation

### Performance Considerations

1. **Rendering Optimization**
   - Minimize unnecessary re-renders
   - Use memoization for expensive operations
   - Implement virtualization for large documents

2. **Bundle Size**
   - Use tree-shaking friendly exports
   - Consider code splitting for large extensions
   - Monitor bundle size with tools like `bundlephobia`

## Common Patterns

### Extension Development Pattern
```typescript
import { Extension } from '@tiptap/core'
import { Plugin, PluginKey } from 'prosemirror-state'

export interface MyExtensionOptions {
  // Define your options here
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    myExtension: {
      // Define your commands here
    }
  }
}

export const MyExtension = Extension.create<MyExtensionOptions>({
  name: 'myExtension',
  
  addOptions() {
    return {
      // Default options
    }
  },
  
  addCommands() {
    return {
      // Implement commands
    }
  },
  
  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('myExtension'),
        // Plugin implementation
      })
    ]
  },
})
```

### Node Extension Pattern
```typescript
import { Node, mergeAttributes } from '@tiptap/core'

export interface MyNodeOptions {
  // Define your options here
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    myNode: {
      // Define your commands here
    }
  }
}

export const MyNode = Node.create<MyNodeOptions>({
  name: 'myNode',
  
  group: 'block',
  
  content: 'inline*',
  
  addAttributes() {
    return {
      // Define attributes
    }
  },
  
  parseHTML() {
    return [
      { tag: 'div[data-my-node]' }
    ]
  },
  
  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-my-node': '' }), 0]
  },
  
  addCommands() {
    return {
      // Implement commands
    }
  },
})
```

## Debugging Techniques

1. **ProseMirror DevTools**
   - Use ProseMirror DevTools for state inspection
   - Monitor transactions and document changes

2. **Editor State Debugging**
   - Log state changes with transaction steps
   - Inspect document structure with JSON.stringify
   - Use browser devtools for DOM inspection

3. **Common Issues**
   - Schema validation errors
   - Transaction application failures
   - Content parsing inconsistencies
   - Extension conflicts

## Resources

1. **Official Documentation**
   - [Tiptap Documentation](https://tiptap.dev/docs)
   - [ProseMirror Guide](https://prosemirror.net/docs/guide/)
   - [ProseMirror Reference](https://prosemirror.net/docs/ref/)

2. **Community Resources**
   - [Tiptap Discord](https://discord.gg/WtJ49jGshW)
   - [ProseMirror Forum](https://discuss.prosemirror.net/)

3. **Example Projects**
   - [Tiptap Examples](https://tiptap.dev/examples)
   - [ProseMirror Examples](https://prosemirror.net/examples/)

## Integration Patterns

1. **Framework Integration**
   - React: Use `@tiptap/react`
   - Vue: Use `@tiptap/vue`
   - Svelte: Use `@tiptap/svelte`

2. **Content Storage**
   - JSON: Store as ProseMirror compatible JSON
   - HTML: Use HTML serialization/deserialization
   - Markdown: Consider markdown transformations

3. **Collaborative Editing**
   - Implement Y.js for real-time collaboration
   - Use WebSocket or other real-time protocols
   - Consider conflict resolution strategies 