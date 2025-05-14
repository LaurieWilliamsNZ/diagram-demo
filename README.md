# IAG-Themed Flowchart

A React + TypeScript application to create, edit, and visualize dynamic process diagrams, themed with IAG's brand colors. (sort of)

## Features

* **Add Nodes**: Click on blank canvas to add a new node.
* **Inline Editing**: Double-click a node to edit its label inline.
* **Drag & Snap**: Move nodes around; they snap to a 20×20 grid for neat alignment.
* **Connect Nodes**: Drag from a node’s top/bottom handle to create edges.
* **Context Menu**: Right-click a node to:

  * Edit Label
  * Duplicate Node
  * Delete Node
* **MiniMap & Controls**: Overview map, zoom, and pan controls for large diagrams.
* **Branded Styling**: IAG purple gradient background, dotted overlay, styled context menu.
* **State Management**: Powered by Zustand for global node/edge store, enabling easy persistence.

## Installation

```bash
# Clone the repo
git clone git@github.com:LaurieWilliamsNZ/diagram-demo.git
cd diagram-demo

# Install dependencies
yarn install

# Run in development mode
yarn dev
```

## Project Structure

```
src/
├── App.tsx          # Main component and entry point
├── components/     # Extracted React components
├── store/          # Zustand store definitions
└── index.tsx       # ReactDOM.render and providers
```

## Usage

Bugs: Fantom nodes... will fix but probably not since this is just a case study.
I don't think lock works. Will I fix it, probably not. But maybe.

Disclaimer: Not production ready this is just for a tech interview.

1. **Add a node**: Click an empty area.
2. **Edit a node**: Double-click its label and type. Press Enter or click outside to save.
3. **Duplicate/Delete a node**: Right-click and choose the action.
4. **Connect nodes**: Drag from a handle to another node.
5. **Move nodes**: Drag and they’ll snap to the grid.
6. **Pan/Zoom**: Use controls or mouse wheel.


