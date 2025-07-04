import { EditorView, basicSetup } from 'codemirror'
import { xml } from '@codemirror/lang-xml'
import { oneDark } from '@codemirror/theme-one-dark'

export class EditorSVG {
  private editorView: EditorView

  constructor(element: HTMLElement, initialContent: string = '') {
    this.editorView = new EditorView({
      doc: initialContent,
      extensions: [
        basicSetup,
        xml(),
        oneDark,
        EditorView.lineWrapping,
        EditorView.theme({
          '&': {
            height: '100%',
          },
          '.cm-scroller': {
            fontFamily: "'Fira Code', monospace",
            overflow: 'auto',
          },
        }),
      ],
      parent: element,
    })
  }

  get value(): string {
    return this.editorView.state.doc.toString()
  }

  set value(content: string) {
    this.editorView.dispatch({
      changes: {
        from: 0,
        to: this.editorView.state.doc.length,
        insert: content,
      },
    })
  }

  destroy() {
    this.editorView.destroy()
  }
}
